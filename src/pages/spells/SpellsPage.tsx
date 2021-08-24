import React from 'react';
import { useTitle } from 'react-use';

import { Layout } from '../../components/Layout';
import { MySpells } from './MySpells';
import { SpellsLibrary } from './SpellsLibrary';

export function SpellsPage() {
  useTitle('Sorts');

  return (
    <Layout>
      <div className="w-1/2 h-full m-3">
        <SpellsLibrary />
      </div>
      <div className="w-1/2 h-full m-3">
        <MySpells />
      </div>
    </Layout>
  );
}