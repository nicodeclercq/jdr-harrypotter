import React, { useState } from "react";
import { pipe } from "fp-ts/function";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Icon } from "../../components/icons/Icon";
import { RollModal } from "../../components/RollModal";
import { entries } from "../../helpers/object";
import { fromRemoteData } from "../../helpers/remoteData";
import { Trait } from "../../store/State";
import { useTraits } from "../home/useTraits";

type Props = {
  userTraits: Record<Trait, number>;
};

type Caracteristics = "Instinct" | "Chance";
function UserTraits({userTraits}: Props) {
  const [rollModalCaracteristic, setRollModalCaracteristic] = useState<Caracteristics | undefined>(undefined);
  const [rollModalTrait, setRollModalTrait] = useState<Trait | undefined>(undefined);

  const caracteristics = {
    Instinct: userTraits.Intelligence * 5,
    Chance: userTraits.Pouvoir * 5,
  };

  return (
    <>
      <Card title={(
        <div className="flex space-x-2">
          <span className="flex-grow">Caractéristiques</span>
        </div>)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 divide-y divide-solid">
          {
            entries(userTraits)
              .map(([key, value]) => (
                <div key={`traits_${key}`} className="flex items-center p-2 justify-evenly space-x-2">
                  <div className="flex items-center justify-evenly space-x-2">
                    <Button onClick={() => setRollModalTrait(key)} type="secondary">
                      <Icon name="DICE" />
                    </Button>
                  </div>
                  <div className="flex-grow text-sm">
                    {key} ({value * 5}%)
                  </div>
                </div>
              ))
          }
          <div></div>
          {
            entries(caracteristics)
              .map(([key, value]) => (
                <div key={`caracteristics_${key}`} className="flex p-2 space-x-2">
                  <div>
                    <Button onClick={() => setRollModalCaracteristic(key)} type="secondary">
                      <Icon name="DICE" />
                    </Button>
                  </div>
                  <div className="flex-grow">{key}</div>
                  <div>{value}%</div>
                </div>
              ))
          }
        </div>
      </Card>
      {
        rollModalCaracteristic != null && <RollModal
          successPercentage={caracteristics[rollModalCaracteristic]}
          title={rollModalCaracteristic}
          isCancellable={false}
          onRollEnd={() => { setRollModalCaracteristic(undefined);}}
        />
      }
      {
        rollModalTrait != null && <RollModal
          successPercentage={userTraits[rollModalTrait] * 5}
          title={rollModalTrait}
          isCancellable={false}
          onRollEnd={() => { setRollModalTrait(undefined);}}
        />
      }
    </>
  );
}


export function MyTraits() {
  const { traits } = useTraits();

  return pipe(
    traits,
    fromRemoteData((traits) => <UserTraits userTraits={traits} />)
  );
}