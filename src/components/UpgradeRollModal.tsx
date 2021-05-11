import { pipe } from 'fp-ts/lib/function';
import React, { useCallback, useState } from 'react';
import * as Interaction from '../helpers/interaction';
import { add } from '../helpers/number';
import { Button } from './Button';
import { Modal } from './Modal';
import { Roll } from './Roll';

type Props = {
  successPercentage: number,
  title: React.ReactNode,
  onRollEnd: (result: Interaction.Interaction<never, number>) => void;
}

function FirstRoll({successPercentage, title, onRollEnd}: Props) {
  const [value, setValue] = useState(NaN);

  const Dices = useCallback(() => <Roll dices={['d100', 'd10']} concat={([tens, units]: number[]) => tens + units || 100} onRollEnd={(val) => setValue(val)}/>, []);

  return (
    <Modal
      header={<>{title}<span>(Test de montée de compétence)</span></>}
    >
      <span className="text-center text-m">
        Score minimum: {successPercentage}
      </span>
      <div className="flex justify-center">
        <Dices />
      </div>
      <div className="flex flex-col items-center justify-center mb-2 space-y-4">
      {
          !isNaN(value) && (
            <>
              <span className="text-4xl">
                {value}
              </span>
              <div className="flex flex-col items-center justify-center space-y-1">
                {
                  value >= successPercentage ? <><span className="text-m">😀</span><span>Succés</span></>
                  :                           <><span className="text-m">🙁</span><span>Échec</span></>
                }
              </div>
            </>
          )
        }
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          disabled={isNaN(value)}
          type="primary"
          onClick={() => {
            value > successPercentage
              ? onRollEnd(Interaction.success(value))
              : onRollEnd(Interaction.emptyFailure())
          }}
        >
          Valider ce jet
        </Button>
      </div>
    </Modal>
  );
}


function SecondRoll({successPercentage, title, onRollEnd}: Props) {
  const [value, setValue] = useState(NaN);

  const Dices = useCallback(() => <Roll dices={['d6', 'd6']} concat={(values: number[]) => values.reduce(add, 0)} onRollEnd={(val) => setValue(val)}/>, []);

  const getUpgradeValue = () => {
    const upgrade = successPercentage + value;
    return upgrade < 90
      ? upgrade
      : value;
  }

  return (
    <Modal
      header={<>{title}<span>(Montée de compétence)</span></>}
    >
      <div className="flex justify-center">
        <Dices />
      </div>
      <div className="flex flex-col items-center justify-center mb-2 space-y-4">
      {
          !isNaN(value) && (
            <>
              <span className="text-4xl">
                +{value}%
              </span>
              <div className="flex flex-col items-center justify-center space-y-1">
                <span className="text-m">👑</span>
                <span className="text-m">Tu as maintenant {getUpgradeValue()}% de chances de réussir ce jet</span>
              </div>
            </>
          )
        }
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          disabled={isNaN(value)}
          type="primary"
          title="En validant tes jets de dés tu enregistres une utilisation qui te permet d'améliorer tes sorts ou compétences petit à petit"
          onClick={() => {
            value < successPercentage
              ? onRollEnd(Interaction.success(value))
              : onRollEnd(Interaction.canceled())
          }}
        >
          Valider ce jet
        </Button>
      </div>
    </Modal>
  );
}

export function UpgradeRollModal ({successPercentage, title, onRollEnd}: Props){
  const [rollIndex, setRollIndex] = useState(1);

  const onFirstRollEnd = (result: Interaction.Interaction<never, number>) => {
    pipe(
      result,
      Interaction.fold({
        success: setRollIndex,
        canceled: () => onRollEnd(result),
        failure: () => onRollEnd(result),
      })
    );
  }

  return (
    rollIndex === 1
      ? <FirstRoll successPercentage={successPercentage} title={title} onRollEnd={onFirstRollEnd} />
      : <SecondRoll successPercentage={successPercentage} title={title} onRollEnd={onRollEnd} />
  );
}
