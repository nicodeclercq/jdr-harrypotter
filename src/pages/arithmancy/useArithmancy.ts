import { TypeofItems } from './../../helpers/array';
import { TypeofDefined } from './../../helpers/nullable';
import * as RemoteData from '@devexperts/remote-data-ts';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';
import { State } from '../../store/State';


type NumberType = TypeofDefined<TypeofItems<State['arithmancy']['numbers']>>;

export const useArithmancy = () => {
  const { getState, setState } = useStore();

  const getNumbers = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.arithmancy.numbers),
    );
  }

  const setNumber = (index: number, newNumber: NumberType) => {
    return pipe(
      getState(),
      RemoteData.map(state => ({
        ...state,
        arithmancy: {
          ...state.arithmancy,
          numbers: state.arithmancy.numbers.map((value, i) => index === i
            ? newNumber
            : value
          )
        },
      })),
      setState,
    );
  }

  return {
    getNumbers,
    setNumber,
  }
}