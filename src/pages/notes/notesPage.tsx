import React from 'react';
import { Button } from '../../components/Button';
import { Layout } from '../../components/Layout';
import { fromRemoteData } from '../../helpers/remoteData';
import { Note } from './Note';
import { useNote } from './useNote';

export function NotesPage() {
  const { getNotes, addNote } = useNote();

  return fromRemoteData(
    getNotes(),
    (notes) => (
    <Layout>
      <div className="w-full h-full">
        <div className="w-full max-h-full py-2 overflow-y-auto bg-white rounded shadow-m">
          <div className="p-2 grid grid-cols-2 gap-2">
            {
              notes.map((note) => (
                <Note key={note.id} id={note.id} description={note.description} title={note.title} />
              ))
            }
          </div>
          <div className="pt-4">
            <Button type="primary" onClick={addNote}>Ajouter une note</Button>
          </div>
        </div>
      </div>
    </Layout>
  ))
}