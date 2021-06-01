import * as RemoteData from '@devexperts/remote-data-ts';
import { v4 as uuid } from 'uuid';

import { useStore } from '../../store/useStore';
import { pipe } from 'fp-ts/lib/function';


export const useNote = () => {
  const { getState, setState } = useStore();

  const getNotes = () => {
    return pipe(
      getState(),
      RemoteData.map(state => state.notes),
    );
  }

  const setNote = (newNote: {id: string, title: string, description: string}) => {
    return pipe(
      getState(),
      RemoteData.map(state => ({
        ...state,
        notes: state.notes.map((note) =>
          note.id === newNote.id
            ? newNote
            : note
        )
      })),
      setState,
    );
  }

  const removeNote = (id: string) => {
    return pipe(
      getState(),
      RemoteData.map(state => ({
        ...state,
        notes: state.notes.filter(({id: currentId}) => currentId !== id)
      })),
      setState,
    );
  }

  const addNote = () => {
    const id = uuid();

    return pipe(
      getState(),
      RemoteData.map(state => ({
        ...state,
        notes: [...state.notes, {id, title: '', description: ''}],
      })),
      setState,
    );
  }

  return {
    getNotes,
    setNote,
    addNote,
    removeNote,
  }
}