import React from 'react';
import { useTitle } from 'react-use';

import { Layout } from '../../components/Layout';
import { fromRemoteData } from '../../helpers/remoteData';
import { useStore } from '../../store/useStore';
import { MySpells } from './MySpells';
import { SpellsLibrary } from './SpellsLibrary';


export function SpellsPage() {
  useTitle('Sorts');
  const { getState } = useStore();

  return fromRemoteData(
    getState(),
    () => (
      <Layout>
        <div className="w-1/2 h-full m-3">
          <SpellsLibrary />
        </div>
        <div className="w-1/2 h-full m-3">
          <MySpells />
        </div>
      </Layout>
    )
  );
}