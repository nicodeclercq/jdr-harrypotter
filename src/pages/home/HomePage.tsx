import React from 'react';
import { Layout } from '../../components/Layout';
import { useRouter } from '../../useRouter';
import { MySpells } from '../spells/MySpells';
import { BestSkills } from '../skills/BestSkills';
import { MyTraits } from './MyTraits';
import {useTitle} from 'react-use';

export function HomePage(){
  useTitle('Accueil');
  const { goTo } = useRouter();
  return (
    <Layout>
      <div className="w-1/2 h-full m-3 space-y-4">
        <MyTraits />
        <BestSkills />
      </div>
      <div className="w-1/2 h-full m-3 space-y-4">
        <MySpells goTo={() => goTo('/spells')} />
      </div>
    </Layout>
  );
}