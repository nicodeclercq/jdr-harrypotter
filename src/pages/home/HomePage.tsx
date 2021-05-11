import React from 'react';
import { Layout } from '../../components/Layout';
import { useRouter } from '../../useRouter';
import { MySpells } from '../spells/MySpells';
import { MyTraits } from './MyTraits';
import {useTitle} from 'react-use';

export function HomePage(){
  useTitle('Accueil');
  const { goTo } = useRouter();
  return (
    <Layout>
      <div className="w-1/2 h-full m-3">
        <MyTraits />
      </div>
      <div className="w-1/2 h-full m-3">
        <MySpells goTo={() => goTo('/spells')} />
      </div>
    </Layout>
  );
}