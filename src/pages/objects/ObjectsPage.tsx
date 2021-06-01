import React from 'react';
import { useTitle } from 'react-use';
import { Layout } from '../../components/Layout';
import { fromRemoteData, sequence } from '../../helpers/remoteData';

import { MoneyForm } from './MoneyForm';
import { ObjectsForm } from './ObjectsForm';
import { useMoney } from './useMoney';
import { useObjects } from './useObjects';


export function ObjectsPage(){
  useTitle('Objets');
  const { getObjects } = useObjects();
  const { getMoney } = useMoney();

  return fromRemoteData(
    sequence({
      objects: getObjects(),
      money: getMoney(),
    }),
    ({objects, money}) => (<Layout>
    <div className="w-full h-full m-3 space-y-2">
      <MoneyForm money={money} />
      <ObjectsForm objects={objects} columns={2} />
    </div>
  </Layout>)
  );
}