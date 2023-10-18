import { useState } from "react";

export function useList<T>(init?: T[]) {
  const [list, setList] = useState<T[]>(init ?? []);

  const append = (value: T) => setList([...list, value]);
  const prepend = (value: T) => setList([value, ...list]);
  const remove = (index: number) => setList(list.filter((_, i) => i !== index));
  const update = (value: T, index: number) => setList(list.map((v, i) => i !== index ? v : value));

  return {
    list,
    append,
    prepend,
    remove,
    update,
  };
}