import React from 'react';

import { Layout } from '../../components/Layout';
import { MySpells } from './MySpells';
import { SpellsLibrary } from './SpellsLibrary';


export function SpellsPage() {
  return (
    <Layout>
      <div className="m-3 w-1/2 h-full">
        <SpellsLibrary />
      </div>
      <div className="m-3 w-1/2 h-full">
        <MySpells />
      </div>
    </Layout>
  );
}