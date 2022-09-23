import { constVoid, constant } from 'fp-ts/function';
import * as Option from 'fp-ts/Option';
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, setDoc } from 'firebase/firestore/lite';

import { secrets } from "../../../secrets";
import { encryptStore } from "../encryptStore";
import { CryptedExternalStore } from "../ExternalStore";

const firebaseConfig = {
  apiKey: secrets.firebaseApiKey,
  authDomain: secrets.firebaseAuthDomain,
  projectId: secrets.firebaseProjectId,
  storageBucket: secrets.firebaseStorageBucket,
  messagingSenderId: secrets.firebaseMessagingSenderId,
  appId: secrets.firebaseAppId
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const getCollection = () => Promise.resolve(collection(db, secrets.firebaseCollectionId));
const getDoc = (name: string) => getCollection()
  .then(getDocs)
  .then(({docs}) => docs)
  .then(docs => docs.filter(d => d.data().name === name))
  .then(docs => docs.length > 0
    ? Option.some(docs[0])
    : Option.none,
  );

export const FirebaseStore: CryptedExternalStore = encryptStore({
  getEntries: () => getCollection()
    .then(getDocs)
    .then(({docs}) => docs)
    .then(docs => docs.map(d => d.get('name'))),

  create: (name) => getCollection()
    .then(collection => addDoc(collection, { name, value: ''}))
    .then(constVoid),

  delete: (name) => getDoc(name)
    .then(Option.fold(
      constVoid,
      (doc) => deleteDoc(doc.ref),
    )),

  read: (name) => getDoc(name)
    .then(Option.map(doc => doc.get('value')))
    .then(Option.getOrElse(constant(''))),

  update: (name, state: string) => getDoc(name)
    .then(Option.fold(
      constVoid,
      (doc) => setDoc(doc.ref, { name, value: state}),
    )),
});