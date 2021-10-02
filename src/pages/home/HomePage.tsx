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

function Home ({isMJ, user, life}: { isMJ: boolean, user: State['user']['name'], life: State['life']}) {
  useTitle(`${user} - ${life.current} / ${life.max} ♥`);

  return (
      <Layout>
        <div className="w-1/2 h-full m-3 space-y-4">
        <div style={{position: 'absolute', bottom: '4rem', left: '6rem'}}><Identity /></div>
          {isMJ && <OppositionRollTable />}
        </div>
        <div className="w-1/2 h-full m-3 space-y-4">
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