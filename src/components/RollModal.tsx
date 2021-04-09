import React, { useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';
import { Roll } from './Roll';
import * as Interaction from '../helpers/interaction';

type Props = {
  successPercentage: number,
  title: React.ReactNode,
  onRollEnd: (result: Interaction.Interaction<never, number>) => void;
}

export function RollModal ({successPercentage, title, onRollEnd}: Props){
  const [value, setValue] = useState(NaN);

  return (
    <Modal
      header={title}
    >
      <span className="text-m text-center">
        Niveau actuel: {successPercentage}%
      </span>
      <div className="flex justify-center">
        <Roll dices={['d100', 'd10']} concat={([tens, units]: number[]) => tens + units || 100} onRollEnd={(val) => setValue(val)}/>
      </div>
      <div className="flex flex-col space-y-4 items-center justify-center mb-2">
      {
          !isNaN(value) && (
            <>
              <span className="text-4xl">
                {value}
              </span>
              <div className="flex flex-col space-y-1 items-center justify-center">
                {
                    value <= 5                ? <><span className="text-m">👑</span><span>🎉 Réussite critique 🎉</span></>
                  : value >= 95               ? <><span className="text-m">😈</span><span>Échec critique</span></>
                  : value < successPercentage ? <><span className="text-m">😀</span><span>Succés</span></>
                  :                             <><span className="text-m">🙁</span><span>Échec</span></>
                }
              </div>
            </>
          )
        }
      </div>
      <div className="flex justify-end space-x-4">
        <Button
          type="secondary"
          title="Ce jet de dés ne sera pas comptabilisé"
          onClick={() => onRollEnd(Interaction.canceled())}
        >
          Annuler
        </Button>
        <Button
          disabled={isNaN(value)}
          type="primary"
          title="En validant tes jets de dés tu enregistres une utilisation qui te permet d'améliorer tes sorts ou compétences petit à petit"
          onClick={() => {
            value < successPercentage
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
