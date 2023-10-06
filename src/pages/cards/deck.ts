import { comprehension } from "fp-ts/Array";
import { tuple } from "fp-ts/function";
import { fromReadOnly } from "../../helpers/array";
import { elements, means, numbers, types } from "../../store/v12/deck";

export const deck = comprehension(
  [
    fromReadOnly(numbers),
    fromReadOnly(elements),
    fromReadOnly(types),
    fromReadOnly(means),
  ],
  tuple
).map(([number, element, type, mean]) => ({ number, element, type, mean }));
