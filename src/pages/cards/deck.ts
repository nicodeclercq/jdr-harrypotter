import { comprehension } from "fp-ts/Array";
import { tuple } from "fp-ts/function";
import { fromReadOnly } from "../../helpers/array";
import { elements, means, numbers } from "../../store/v12/deck";

const typeByElement = {
  Pique: "Défense",
  Trefle: "Défense",
  Coeur: "Attaque",
  Carreau: "Attaque",
} as const;

export const deck = comprehension(
  [fromReadOnly(numbers), fromReadOnly(elements), fromReadOnly(means)],
  tuple
).map(([number, element, mean]) => ({
  number,
  element,
  type: typeByElement[element],
  mean,
}));
