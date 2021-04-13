import React from 'react';
import { Layout } from '../../components/Layout';
import { useRouter } from '../../useRouter';
import { MySpells } from '../spells/MySpells';
import { MyTraits } from './MyTraits';

export function HomePage(){
  const { goTo } = useRouter();
  return (
    <Layout>
      <div className="m-3 w-1/2 h-full">
        <MyTraits />
      </div>
      <div className="m-3 w-1/2 h-full">
        <MySpells goTo={() => goTo('/spells')} />
      </div>
    </Layout>
  );
}