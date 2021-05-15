import React from 'react';
import {useTitle} from 'react-use';

import { Layout } from '../../components/Layout';
import { useRouter } from '../../useRouter';
import { MySpells } from '../spells/MySpells';
import { BestSkills } from '../skills/BestSkills';
import { MyTraits } from './MyTraits';
import { fromRemoteData } from '../../helpers/remoteData';
import { State } from '../../store/State';
import { useStore } from '../../store/useStore';
import { Identity } from './Identity';

function Home ({state}: { state: State}) {
  const { goTo } = useRouter();
  useTitle(`${state.user.name} - ${state.life.current}/${state.life.max} ♥`);

  return (
    <Layout>
      <div className="w-1/2 h-full m-3 space-y-4">
        <Identity state={state} />
        <MyTraits />
        <BestSkills />
      </div>
      <div className="w-1/2 h-full m-3 space-y-4">
        <MySpells goTo={() => goTo('/spells')} />
      </div>
    </Layout>
  );
}

export function HomePage(){
  useTitle('Loading...');

  const { getState } = useStore();

  return fromRemoteData(
    getState(),
    (state) => <Home state={state} />
  );
}