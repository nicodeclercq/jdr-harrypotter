import { pipe } from 'fp-ts/function';
import { v4 as uuid } from 'uuid';

import { lens } from '../../helpers/object';
import { onSuccess } from '../../helpers/remoteData';
import { useStore } from '../../hooks/useStore';
import { State } from '../../store/State';

const notesLens = lens<State, 'notes'>('notes');

export const useNote = () => {
  const [notes, setNotes ] = useStore(notesLens);

  const setNote = (newNote: {id: string, title: string, description: string}) => {
    return pipe(
      notes,
      onSuccess(notes => setNotes(notes.map((note) =>
          note.id === newNote.id
            ? newNote
            : note
        )
      ))
    );
  }

  const removeNote = (id: string) => {
    return pipe(
      notes,
      onSuccess(notes => setNotes(
        notes.filter(({id: currentId}) => currentId !== id))
      ),
    );
  }

  const addNote = () => {
    const id = uuid();

    return pipe(
      notes,
      onSuccess(notes => setNotes([...notes, {id, title: '', description: ''}])),
    );
  }

  return {
    notes,
    setNote,
    addNote,
    removeNote,
  }
}