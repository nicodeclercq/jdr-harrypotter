import { useStore } from './../../useStore';
import { Spell } from './domain/Spell';
import * as Objects from '../../helpers/object';


export const useSpell = () => {
  const { getState, setState } = useStore();

  const add = (spell: Spell) => {
    const state = getState();
      setState({
      ...state,
      userSpells: [...state.userSpells, spell],
      uses: {
        ...state.uses,
        [spell.name]: 0,
      }
    });
  }

  const remove = (spell: Spell) => {
    const state = getState();

    setState({
      ...state,
      userSpells: state.userSpells.filter(s => s.name !== spell.name),
      uses: Objects.remove(spell.name, state.uses),
    });
  }

  const use = (spell: Spell, isCritical: boolean) => {
    const state = getState();
      setState({
      ...state,
      uses: {
        ...state.uses,
        [spell.name]: (state.uses[spell.name] ?? 0) + (isCritical ? 2 : 1),
      },
    });
  }

  const getUserSpells = () => {
    const state = getState();
    return state.userSpells;
  }

  const getUsages = () => {
    const state = getState();
    return state.uses;
  }

  return {
    add,
    remove,
    getUserSpells,
    use,
    getUsages,
  }
}