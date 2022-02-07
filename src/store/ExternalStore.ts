import { encode, decode, decrypt, encrypt } from '../helpers/crypto';
import { State } from "./State";
import { secrets } from '../secrets';

const ROOT = `https://getpantry.cloud/apiv1/pantry/${secrets.apiKey}`;

const headers = new Headers();
headers.append('Content-Type', 'application/json');
headers.append('Access-Control-Allow-Origin', '*');

export const ExternalStore = {
  getEntries: () => {
    const requestOptions = {
      method: 'GET',
      headers,
    };

    return fetch(ROOT, requestOptions)
      .then(response => response.json())
      .then((values: {baskets: {name: string}[]}) => values.baskets.map((v) => decode(v.name)));
  },
  create: (name: string) => {
    const requestOptions = {
      method: 'POST',
      headers,
      body: '{}',
    };

    return fetch(`${ROOT}/basket/${encode(name)}`, requestOptions)
      .then(() => {});
  },
  read: (name: string) => {
    const requestOptions = {
      method: 'GET',
      headers,
    };

    return fetch(`${ROOT}/basket/${encode(name)}`, requestOptions)
      .then(response => response.json())
      .then(({value}) => value)
      .then(decrypt(name));
  },
  update: (name: string, state: State) => {
    const requestOptions = {
      method: 'PUT',
      headers,
      body: JSON.stringify({
        value: encrypt(name)(state)
      }),
    };

    return fetch(`${ROOT}/basket/${encode(name)}`, requestOptions)
      .then(response => response.json()) 
      .then(({value}) => value)
      .then(decrypt(name));
  },
  delete: (name: string) => {
    const requestOptions = {
      method: 'DELETE',
      headers,
    };

    return fetch(`${ROOT}/basket/${encode(name)}`, requestOptions);
  }
}
