import * as IO from "io-ts";
import { constVoid, constant } from "fp-ts/function";
import * as Option from "fp-ts/Option";
import { initializeApp } from "firebase/app";
import { set, ref, getDatabase, onValue } from "firebase/database";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  setDoc,
} from "firebase/firestore/lite";

import { secrets } from "../../../secrets";
import { encryptStore } from "../encryptStore";
import { CryptedExternalStore } from "../ExternalStore";

const app = initializeApp({
  apiKey: secrets.firebaseApiKey,
  authDomain: secrets.firebaseAuthDomain,
  projectId: secrets.firebaseProjectId,
  storageBucket: secrets.firebaseStorageBucket,
  messagingSenderId: secrets.firebaseMessagingSenderId,
  appId: secrets.firebaseAppId,
  databaseURL: secrets.databaseUrl,
});
const db = getFirestore(app);

export const io = () => {
  const db = getDatabase();
  const messagesRef = ref(db, "messages");

  const emit = (type: string, message: string) => {
    set(messagesRef, { type, payload: message });
  };

  const on = (type: string, callback: (data: string) => void) => {
    onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (IO.type({ type: IO.literal(type), payload: IO.string }).is(data)) {
        callback(data.payload);
      }
    });
  };

  return { emit, on };
};

const getCollection = () =>
  Promise.resolve(collection(db, secrets.firebaseCollectionId));
const getDoc = (name: string) =>
  getCollection()
    .then(getDocs)
    .then(({ docs }) => docs)
    .then((docs) => docs.filter((d) => d.data().name === name))
    .then((docs) => (docs.length > 0 ? Option.some(docs[0]) : Option.none));

export const FirebaseStore: CryptedExternalStore = encryptStore({
  getEntries: () =>
    getCollection()
      .then(getDocs)
      .then(({ docs }) => docs)
      .then((docs) => docs.map((d) => d.get("name"))),

  create: (name) =>
    getCollection()
      .then((collection) =>
        addDoc(collection, {
          name,
          value: "",
          updatedAt: new Date().toISOString(),
        })
      )
      .then(constVoid),

  delete: (name) =>
    getDoc(name).then(Option.fold(constVoid, (doc) => deleteDoc(doc.ref))),

  read: (name) =>
    getDoc(name)
      .then(Option.map((doc) => doc.get("value")))
      .then(Option.getOrElse(constant(""))),

  update: (name, state: string) =>
    getDoc(name).then(
      Option.fold(constVoid, (doc) =>
        setDoc(doc.ref, {
          name,
          value: state,
          updatedAt: new Date().toISOString(),
        })
      )
    ),
});
