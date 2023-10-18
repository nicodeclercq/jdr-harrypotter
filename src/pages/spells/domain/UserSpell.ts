import { spells } from "./../spells";
import { entries } from "../../../helpers/object";
import { State } from "../../../store/State";

export type UserSpells = State["userSpells"];

export const getNextLevelSpells = (userSpells: UserSpells) => {
  return entries(userSpells.knownSpells)
    .filter(([, spell]) => Math.floor(spell.currentLevel / 10) <= spell.uses)
    .map(([name]) => ({
      name,
      spell: spells.find((spell) => spell.name === name)
    }));

};