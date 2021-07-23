import React from 'react';
import {useTitle} from 'react-use';

import { Layout } from '../../components/Layout';
import { useRouter } from '../../useRouter';
import { MySpells } from '../spells/MySpells';
import { BestSkills } from '../skills/BestSkills';
import { MyTraits } from '../skills/MyTraits';
import { fromRemoteData, sequence } from '../../helpers/remoteData';
import { State } from '../../store/State';
import { useStore } from '../../store/useStore';
import { Identity } from './Identity';
import { useLockKey } from './useLockKey';
import { ObjectsForm } from '../objects/ObjectsForm';
import { MoneyForm } from '../objects/MoneyForm';

function Home ({state, hasSpells}: { state: State, hasSpells: boolean}) {
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
        {
          hasSpells && <MySpells goTo={() => goTo('/spells')} />
        }
        <MoneyForm money={state.money} />
        <ObjectsForm objects={state.objects} columns={2} maxDisplayed={6} />
      </div>
    </Layout>
  );
}

export function HomePage(){
  useTitle('Loading...');

  const { getState } = useStore();
  const { isUnlocked } = useLockKey();

  return fromRemoteData(
    sequence({
      state: getState(),
      hasSpells: isUnlocked('alohomora'),
    }),
    ({state, hasSpells}) => <Home state={state} hasSpells={hasSpells} />
  );
}