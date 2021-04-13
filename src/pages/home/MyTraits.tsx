import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { RollModal } from '../../components/RollModal';
import { entries } from '../../helpers/object';
import { fromRemoteData } from '../../helpers/remoteData';
import { Trait } from '../../useStore';
import { useTraits } from './useTraits';

type Props = {
  userTraits: Record<Trait, number>;
};

type Caracteristics = 'Idée' | 'Chance';
function UserTraits({userTraits}: Props) {
  const [rollModalCaracteristic, setRollModalCaracteristic] = useState<Caracteristics | undefined>(undefined);
  const [rollModalTrait, setRollModalTrait] = useState<{key: Trait, multiplier: number} | undefined>(undefined);

  const caracteristics = {
    Idée: userTraits.Intelligence * 5,
    Chance: userTraits.Pouvoir * 5,
  };

  return (
    <>
      <Card useDividers title={(
        <div className="flex space-x-2">
          <span className="flex-grow">Caractéristiques</span>
        </div>)}>
        {
          entries(userTraits)
          .map(([key, value]) => (
            <div key={`traits_${key}`} className="flex items-center justify-evenly space-x-2 p-2">
              <div className="flex-grow text-sm">
                {key} ({value})
              </div>
              <div className="flex items-center justify-evenly space-x-2">
                <span>🎲</span>
                <Button onClick={() => setRollModalTrait({key, multiplier: 5})} type="secondary">Très facile</Button>
                <Button onClick={() => setRollModalTrait({key, multiplier: 4})} type="secondary">Facile</Button>
                <Button onClick={() => setRollModalTrait({key, multiplier: 3})} type="secondary">Normal</Button>
                <Button onClick={() => setRollModalTrait({key, multiplier: 2})} type="secondary">Difficile</Button>
                <Button onClick={() => setRollModalTrait({key, multiplier: 1})} type="secondary">Très Difficile</Button>
              </div>
            </div>
          ))
        }
        {
          entries(caracteristics)
            .map(([key, value]) => (
              <div key={`caracteristics_${key}`} className="flex space-x-2 p-2">
                <div className="flex-grow">{key}</div>
                <div>{value}%</div>
                <div>
                  <Button onClick={() => setRollModalCaracteristic(key)} type="secondary">🎲</Button>
                </div>
              </div>
            ))
        }
      </Card>
      {
        rollModalCaracteristic != null && <RollModal
          successPercentage={caracteristics[rollModalCaracteristic]}
          title={
            <span className="space-x-2">
              {rollModalCaracteristic}
            </span>
          }
          onRollEnd={() => { setRollModalCaracteristic(undefined)}}
        />
      }
      {
        rollModalTrait != null && <RollModal
          successPercentage={userTraits[rollModalTrait.key] * rollModalTrait.multiplier }
          title={
            <span className="space-x-2">
              {rollModalCaracteristic}
            </span>
          }
          onRollEnd={() => { setRollModalTrait(undefined)}}
        />
      }
    </>
  );
}


export function MyTraits() {
  const { getUserTraits } = useTraits();

  const userTraits = getUserTraits();

  return fromRemoteData(
    userTraits,
    (userTraits) => <UserTraits userTraits={userTraits} />
  );
}