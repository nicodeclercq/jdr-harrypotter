import { encode, decode } from './helper';
import { api } from "./api";
import { State } from "./State";

const ROOT = `https://getpantry.cloud/apiv1/pantry/${api.key}`;

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
      .then((values: {baskets: string[]}) => {
        console.log(values.baskets.map((v) => decode(v)));
        return values.baskets.map((v) => decode(v));
      });
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
      .then(response => response.json());
  },
  update: (name: string, state: State) => {
    const requestOptions = {
      method: 'PUT',
      headers,
      body: JSON.stringify(state),
    };

    return fetch(`${ROOT}/basket/${encode(name)}`, requestOptions)
      .then(response => response.json());
  },
  delete: (name: string) => {
    const requestOptions = {
      method: 'DELETE',
      headers,
    };

    return fetch(`${ROOT}/basket/${encode(name)}`, requestOptions)
      .then(response => response.json());
  }
}
