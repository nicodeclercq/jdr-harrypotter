import React from 'react';
import {useTitle} from 'react-use'; 
import { pipe } from 'fp-ts/lib/function';

import { Layout } from '../../components/Layout';
import { useRouter } from '../../hooks/useRouter';
import { MySpells } from '../spells/MySpells';
import { BestSkills } from '../skills/BestSkills';
import { MyTraits } from '../skills/MyTraits';
import { fromRemoteData, sequence } from '../../helpers/remoteData';
import { State } from '../../store/State';
import { useStore } from '../../hooks/useStore';
import { Identity } from './Identity';
import { useLockKey } from '../../hooks/useLockKey';
import { ObjectsForm } from '../objects/ObjectsForm';
import { MoneyForm } from '../objects/MoneyForm';
import { identity } from 'io-ts';

const stateLens = [
  identity,
  (state: State, newState: State) => newState,
] as [(state: State) => State, (state: State, newState: State) => State];

function Home ({state, hasSpells}: { state: State, hasSpells: boolean}) {
  const { goTo } = useRouter();
  useTitle(`${state.user.name} - ${state.life.current}/${state.life.max} ♥`);

  return (
      <Layout>
        <div className="w-1/2 h-full m-3 space-y-4">
          <Identity />
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

  const [state] = useStore(stateLens);
  const { isUnlocked } = useLockKey();

  return pipe(
    sequence({
      state,
      hasSpells: isUnlocked('alohomora'),
    }),
    fromRemoteData(({state, hasSpells}) => <Home state={state} hasSpells={hasSpells} />)
  );
}