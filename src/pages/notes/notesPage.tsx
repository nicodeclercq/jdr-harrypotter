import React, { useState, useEffect } from 'react';
import { pipe } from 'fp-ts/function';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Layout } from '../../components/Layout';
import { fromRemoteData } from '../../helpers/remoteData';
import { State } from '../../store/State';
import { Note } from './Note';
import { useNote } from './useNote';

function Notes({notes}: { notes: State['notes']}) {
  const { addNote } = useNote();
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedNotes, setDisplayedNotes] = useState(notes);

  useEffect(() => {
    setDisplayedNotes(notes.filter(note => note.title.includes(searchQuery) || note.description.includes(searchQuery)));
  }, [notes, searchQuery]);

  const search = (query: string) => {
    setSearchQuery(query);
  }

  return (<div className="space-y-4">
    <div className="flex items-center justify-center w-full">
      <Input placeholder="🔎 Rechercher" type="search" theme="neutral" onChange={search} width="50%" />
    </div>
    <div className="w-full max-h-full py-2 overflow-y-auto bg-white rounded shadow-m">
      <div className="p-2 grid grid-cols-2 gap-2">
        {
          displayedNotes.map((note) => (
            <Note key={note.id} id={note.id} description={note.description} title={note.title} />
          ))
        }
      </div>
      <div className="flex justify-center w-full pt-4">
        <Button type="primary" onClick={addNote}>Ajouter une note</Button>
      </div>
    </div>
  </div>)
}

export function NotesPage() {
  const { notes } = useNote();

  return pipe(
    notes,
    fromRemoteData((notes) => (
      <Layout>
        <div className="w-full h-full">
          <Notes notes={notes} />
        </div>
      </Layout>
    ))
  )
}