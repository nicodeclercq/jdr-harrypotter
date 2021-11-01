import React from 'react';

import { Layout } from '../../components/Layout';
import { MySpells } from './MySpells';
import { SpellsLibrary } from './SpellsLibrary';

export function SpellsPage() {
  return (
    <Layout>
      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2">
        <div className="order-2 m-3 md:order-1">
          <SpellsLibrary />
        </div>
        <div className="order-1 m-3 md:order-2">
          <MySpells />
        </div>
      </div>
    </Layout>
  );
}