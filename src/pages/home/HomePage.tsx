import React from 'react';
import {useTitle} from 'react-use'; 
import { pipe } from 'fp-ts/lib/function';

import { Layout } from '../../components/Layout';
import { fromRemoteData, sequence } from '../../helpers/remoteData';
import { State } from '../../store/State';
import { Identity } from './Identity';
import { useRole } from '../../hooks/useRole';
import { OppositionRollTable } from './OppositionRollTable';
import { useLife } from './useLife';
import { useUser } from './useUser';
import { UsersBestSkills } from './UsersBestSkills';
import { Timer } from '../../components/Timer';
import { MoneyConverter } from '../../components/MoneyConverter';
import { PNJ } from '../../components/pnj/pnj';

function Home ({isMJ, user, life}: { isMJ: boolean, user: State['user']['name'], life: State['life']}) {
  useTitle(`${user} - ${life.current} / ${life.max} ♥`);

  return (
      <Layout>
        <div className="h-full grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="w-full space-y-4">
            {isMJ && <Timer />}
            {isMJ && <MoneyConverter showEuro />}
            {isMJ && <OppositionRollTable />}
            <div style={{position: 'absolute', bottom: '4rem', left: '6rem'}}>
              <Identity />
            </div>
          </div>
          <div className="w-full space-y-4">
            {isMJ && <PNJ />}
            {isMJ && <UsersBestSkills />}
          </div>
        </div>
      </Layout>
  );
}

export function HomePage(){
  useTitle('Loading...');
  const { isMJ } = useRole();
  const {name} = useUser();
  const {life} = useLife();

  return pipe(
    sequence({
      isMJ,
      name,
      life,
    }),
    fromRemoteData(({isMJ, name, life}) => <Home isMJ={isMJ} user={name} life={life} />)
  );
}