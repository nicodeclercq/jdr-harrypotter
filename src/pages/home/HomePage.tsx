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
import { Icon } from '../../components/icons/Icon';

function Home ({state}: { state: State}) {
  const { goTo } = useRouter();
  const getLife = () => `${state.life.current} / ${state.life.max}`;
  useTitle(`${state.user.name} - ${state.life.current} ♥`);

  return (
    <Layout>
      <div className="w-1/2 h-full m-3 space-y-4">
        <MyTraits />
        <BestSkills />
      </div>
      <div className="w-1/2 h-full m-3 space-y-4">
        <MySpells goTo={() => goTo('/spells')} />
      </div>
      <div className="fixed text-red-500 text-xxl bottom-2 right-2">
        <span>
        {getLife()}
        </span>
        <Icon name="HEART" />
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