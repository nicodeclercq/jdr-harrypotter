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
import { Identity } from './Identity';
import { useLockKey } from '../../hooks/useLockKey';
import { ObjectsForm } from '../objects/ObjectsForm';
import { MoneyForm } from '../objects/MoneyForm';
import { useRole } from '../../hooks/useRole';
import { OppositionRollTable } from './OppositionRollTable';
import { useLife } from './useLife';
import { useObjects } from '../objects/useObjects';
import { useMoney } from '../objects/useMoney';
import { useUser } from './useUser';

function Home ({isMJ, user, life, money, objects, hasSpells}: { isMJ: boolean, money: State['money'],objects: State['objects'], user: State['user']['name'], life: State['life'], hasSpells: boolean}) {
  const { goTo } = useRouter();
  useTitle(`${user} - ${life.current}/${life.max} ♥`);

  return (
      <Layout>
        <div className="w-1/2 h-full m-3 space-y-4">
          <Identity />
          {isMJ && <OppositionRollTable />}
          <MyTraits />
          <BestSkills />
        </div>
        <div className="w-1/2 h-full m-3 space-y-4">
          {
            hasSpells && <MySpells goTo={() => goTo('/spells')} />
          }
          <MoneyForm money={money} />
          <ObjectsForm objects={objects} columns={2} maxDisplayed={6} />
        </div>
      </Layout>
  );
}

export function HomePage(){
  useTitle('Loading...');
  const { isMJ } = useRole();
  const {name} = useUser();
  const {life} = useLife();
  const {objects} = useObjects();
  const {money} = useMoney();
  const { isUnlocked } = useLockKey();

  return pipe(
    sequence({
      isMJ,
      name,
      life,
      objects,
      money,
      hasSpells: isUnlocked('alohomora'),
    }),
    fromRemoteData(({isMJ, name, objects, life, money, hasSpells}) => <Home isMJ={isMJ} user={name} money={money} objects={objects} life={life} hasSpells={hasSpells} />)
  );
}