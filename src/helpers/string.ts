export const prepareStringForSearch = (text: string) => {
  const diacritics = [
    { character: "A", regexp: /[\300-\306]/g },
    { character: "a", regexp: /[\340-\346]/g },
    { character: "E", regexp: /[\310-\313]/g },
    { character: "e", regexp: /[\350-\353]/g },
    { character: "I", regexp: /[\314-\317]/g },
    { character: "i", regexp: /[\354-\357]/g },
    { character: "O", regexp: /[\322-\330]/g },
    { character: "o", regexp: /[\362-\370]/g },
    { character: "U", regexp: /[\331-\334]/g },
    { character: "u", regexp: /[\371-\374]/g },
    { character: "N", regexp: /[\321]/g },
    { character: "n", regexp: /[\361]/g },
    { character: "C", regexp: /[\307]/g },
    { character: "c", regexp: /[\347]/g },
    { character: " ", regexp: /-/g },
    { character: " ", regexp: /  +/g },
  ];
  return diacritics
    .reduce(
      (result, { character, regexp }) => result.replace(regexp, character),
      text,
    )
    .toLowerCase()
    .trim();
};