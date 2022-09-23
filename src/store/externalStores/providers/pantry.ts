import { constVoid } from 'fp-ts/lib/function';
import { encryptStore } from '../encryptStore';
import { CryptedExternalStore } from '../ExternalStore';
import { secrets } from '../../../secrets';

const ROOT = `https://getpantry.cloud/apiv1/pantry/${secrets.apiKey}`;

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');

export const PantryStore: CryptedExternalStore = encryptStore({
  getEntries: () => {
    const requestOptions = {
      method: 'GET',
      headers,
    };

    return fetch(ROOT, requestOptions)
      .then(response => response.json())
      .then((values: {baskets: {name: string}[]}) => values.baskets.map(({name}) => name));
  },
  create: (name: string) => {
    const requestOptions = {
      method: 'POST',
      headers,
      body: '{}',
    };

    return fetch(`${ROOT}/basket/${name}`, requestOptions)
      .then(() => {});
  },
  read: (name: string) => {
    const requestOptions = {
      method: 'GET',
      headers,
    };

    return fetch(`${ROOT}/basket/${name}`, requestOptions)
      .then(response => response.json())
      .then(({value}) => value);
  },
  update: (name: string, state: string) => {
    const requestOptions = {
      method: 'PUT',
      headers,
      body: JSON.stringify({ value: state }),
    };

    return fetch(`${ROOT}/basket/${name}`, requestOptions)
      .then(response => response.json()) 
      .then(({value}: {value: string}) => value);
  },
  delete: (name: string) => {
    const requestOptions = {
      method: 'DELETE',
      headers,
    };

    return fetch(`${ROOT}/basket/${name}`, requestOptions).then(constVoid);
  }
});
