import { entries } from '../../../helpers/object';
import { State } from '../../../store/State';

export type UserSpells = State['userSpells'];

export const getNextLevelSpells = (userSpells: UserSpells) => {
  return entries(userSpells)
    .filter(([, spell]) => Math.floor(spell.currentLevel / 10) <= spell.uses)
    .map(([, value]) => value);

}