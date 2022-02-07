import { AES, SHA256, enc } from 'crypto-js';
import { secrets } from "../secrets";

export const encode = (str: string) => btoa(unescape(encodeURIComponent(str)));
export const decode = (str: string) => decodeURIComponent(escape(window.atob(str)));

const getLockKey = (str: string) => SHA256(`${str}${secrets.salt}`).toString(); 

export const encrypt = (key: string) => (json: unknown) => {
  const str = JSON.stringify(json);
  const lockKey = getLockKey(key);
  return AES.encrypt(str, lockKey).toString();
}

export const decrypt = (key: string) => (value: string )  => {
  const lockKey = getLockKey(key);
  const result = AES.decrypt(value, lockKey).toString(enc.Utf8)/*?*/;
  return JSON.parse(result/*?*/);
}
