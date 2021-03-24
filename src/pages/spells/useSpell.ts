import { useStore } from './../../useStore';
import { Spell } from './domain/Spell';
import * as Objects from '../../helpers/object';


export const useSpell = () => {
  const { getState, setState } = useStore();

  const add = (spell: Spell) => {
    const state = getState();
      setState({
      ...state,
      userSpells: {...state.userSpells, [spell.id]: {
        id: spell.id,
        userPoints: {
          Air: 0,
          Corps: 0,
          Eau: 0,
          Feu: 0,
          Terre: 0,
          Âme: 0,
        },
      }},
    });
  }

  const remove = (spell: Spell) => {
    const state = getState();
    const userSpells = Objects.remove(`${spell.id}`, state.userSpells);

    setState({
      ...state,
      userSpells,
    });
  }

  const use = (spell: Spell, isCritical: boolean) => {
    const state = getState();
    const userPoints = state.userSpells[spell.id].userPoints;

    userPoints[spell.primaryElement] = userPoints[spell.primaryElement] + 2 * (isCritical ? 2 : 1);
    userPoints[spell.secondaryElement] = userPoints[spell.secondaryElement] + 1 * (isCritical ? 2 : 1);

    setState({
      ...state,
      userSpells: {
        ...state.userSpells,
        [spell.id]: {
          ...state.userSpells[spell.id],
          userPoints:{
            ...userPoints
          }
        },
      },
    });
  }

  const getUserSpells = () => {
    const state = getState();
    return state.userSpells;
  }

  return {
    add,
    remove,
    getUserSpells,
    use,
  }
}