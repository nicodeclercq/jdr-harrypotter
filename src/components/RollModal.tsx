import React, { useState } from 'react';
import { Button } from './Button';
import { Modal } from './Modal';
import { Roll } from './Roll';
import * as Interaction from '../helpers/interaction';
import { Dice } from './dice/dice';


type SuccessPercentages = {
  veryEasy: number;
  easy: number;
  normal: number;
  hard: number;
  veryHard: number;
}
type Props = {
  successPercentage?: number | SuccessPercentages,
  title: React.ReactNode,
  onRollEnd: (result: Interaction.Interaction<never, number>) => void;
  isCancellable?: boolean;
  dices?: Dice[];
}

function DifficultySelection ({successPercentages, onSelection}: {successPercentages: SuccessPercentages, onSelection: (value: number) => void}) {
  return (
    <div className="flex flex-col space-y-2">
        <span className="text-l">Sélection de la difficulté:</span>
        <Button type="secondary" onClick={() => onSelection(successPercentages.veryEasy)}>Très facile</Button>
        <Button type="secondary" onClick={() => onSelection(successPercentages.easy)}>Facile</Button>
        <Button type="primary" onClick={() => onSelection(successPercentages.normal)}>Normal</Button>
        <Button type="secondary" onClick={() => onSelection(successPercentages.hard)}>Difficile</Button>
        <Button type="secondary" onClick={() => onSelection(successPercentages.veryHard)}>Très difficile</Button>
    </div>
  )
}


export function RollModal ({successPercentage, dices = ['d100', 'd10'], title, onRollEnd, isCancellable = true}: Props){
  const [value, setValue] = useState(NaN);
  const [percentage, setPercentage] = useState(typeof successPercentage === 'number' ? successPercentage : NaN);

  const isD100 = (dices: Dice[]): dices is ['d100', 'd10'] => {
    return dices.length === 2 && dices[0] === 'd100' && dices[1] === 'd10';
  }
  const concatD100 = ([tens, units]: number[]) => tens + units || 100;
  const concat = (values: number[]) => values.reduce((a, b) => a + b, 0);

  return (
    <Modal
      header={title}
    >
      {
        (isNaN(percentage) && successPercentage)
          ? <DifficultySelection successPercentages={successPercentage as SuccessPercentages}  onSelection={value => {setPercentage(value)}} />
          : (<>
            { !isNaN(percentage) &&
              <span className="text-m text-center">
                Niveau actuel: {percentage}%
              </span>
            }
            <div className="flex justify-center">
              <Roll dices={dices} concat={isD100(dices) ? concatD100 : concat} onRollEnd={(val) => setValue(val)}/>
            </div>
            <div className="flex flex-col space-y-4 items-center justify-center mb-2">
            {
                !isNaN(value) && (
                  <>
                    <span className="text-4xl">
                      {value}
                    </span>
                    {
                      !isNaN(percentage) && (
                        <div className="flex flex-col space-y-1 items-center justify-center">
                          {
                              value <= 5                        ? <><span className="text-m">👑</span><span>🎉 Réussite critique 🎉</span></>
                            : value >= 95                       ? <><span className="text-m">😈</span><span>Échec critique</span></>
                            : value < percentage                ? <><span className="text-m">😀</span><span>Succés</span></>
                            :                                     <><span className="text-m">🙁</span><span>Échec</span></>
                          }
                        </div>
                    )}
                  </>
                )
              }
            </div>
            <div className="flex justify-end space-x-4">
              {
                isCancellable && <Button
                  type="secondary"
                  title="Ce jet de dés ne sera pas comptabilisé"
                  onClick={() => onRollEnd(Interaction.canceled())}
                >
                  Annuler
                </Button>
              }
              <Button
                disabled={isNaN(value)}
                type="primary"
                title="En validant tes jets de dés tu enregistres une utilisation qui te permet d'améliorer tes sorts ou compétences petit à petit"
                onClick={() => {
                  if(!percentage) {
                    onRollEnd(Interaction.canceled())
                  }
                  value < percentage
                    ? onRollEnd(Interaction.success(value))
                    : onRollEnd(Interaction.emptyFailure())
                }}
              >
                Valider ce jet
              </Button>
            </div>
        </>
    )}
    </Modal>
  );
}
