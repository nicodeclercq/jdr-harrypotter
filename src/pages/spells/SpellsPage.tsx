import React from 'react';
import { useTitle } from 'react-use';

import { Layout } from '../../components/Layout';
import { fromRemoteData } from '../../helpers/remoteData';
import { useStore } from '../../useStore';
import { MySpells } from './MySpells';
import { SpellsLibrary } from './SpellsLibrary';


export function SpellsPage() {
  useTitle('Sorts');
  const { getState } = useStore();

  return fromRemoteData(
    getState(),
    () => (
      <Layout>
        <div className="m-3 w-1/2 h-full">
          <SpellsLibrary />
        </div>
        <div className="m-3 w-1/2 h-full">
          <MySpells />
        </div>
      </Layout>
    )
  );
}