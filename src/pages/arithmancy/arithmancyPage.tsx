import React, { useState } from 'react';
import { pipe } from 'fp-ts/function';
import { Layout } from '../../components/Layout';
import { RollModal, Interpretation } from '../../components/RollModal';
import { useArithmancy } from './useArithmancy';
import { fromRemoteData } from '../../helpers/remoteData';
import { State } from '../../store/State';
import { Calculator } from './calculator';
import { NumbersDefinition } from './numbersDefinition';

const resultInterpretation: Interpretation[] = [
  {
    predicate: (value:number, percentage: number) => value < percentage && value <= 5,
    result: {
      type: 'success',
      message: '🎉 Réussite critique 🎉, Puissance: désirée par le joueur',
    }
  }, {
    predicate: (value:number, percentage: number) => value < percentage && value <= 20,
    result: {
      type: 'success',
      message: 'Réussite, Puissance: Extrême',
    }
  }, {
    predicate: (value:number, percentage: number) => value < percentage && value <= 40,
    result: {
      type: 'success',
      message: 'Réussite, Puissance: Forte',
    }
  }, {
    predicate: (value:number, percentage: number) => value < percentage && value <= 60,
    result: {
      type: 'success',
      message: 'Réussite, Puissance: Moyenne',
    }
  }, {
    predicate: (value:number, percentage: number) => value < percentage,
    result: {
      type: 'success',
      message: 'Réussite, Puissance: Faible',
    }
  }, {
    predicate: (value:number, percentage: number) => value >= percentage && value >= 95,
    result: {
      type: 'failure',
      message: '😈 Échec Critique 😈, Puissance: Choisie par le MJ',
    }
  }, {
    predicate: (value:number, percentage: number) => value >= percentage,
    result: {
      type: 'failure',
      message: 'Échec',
    }
  },
]

function ArithmancyContent({numbers}: {numbers: State['arithmancy']['numbers']}) {
  const [rollModal, setRollModal] = useState<{title: string, percentage: number} | undefined>(undefined);

  return (
    <Layout>
      <div className="flex flex-row items-start w-full max-h-full overflow-y-auto space-x-4">
        <div className="flex-grow">
          <NumbersDefinition numbers={numbers} />
        </div>
        <Calculator numbers={numbers} roll={(title, percentage) => setRollModal({title, percentage})} />
        {
          rollModal != null && <RollModal
            resultsInterpretation={resultInterpretation}
            successPercentage={rollModal.percentage}
            title={rollModal.title}
            isCancellable={false}
            onRollEnd={() => setRollModal(undefined)}
          />
        }
      </div>
    </Layout>
  );
}

export function ArithmancyPage() {
  const { getNumbers } = useArithmancy();
  const numbers = getNumbers();

  return pipe(
    numbers,
    fromRemoteData(numbers => <ArithmancyContent numbers={numbers} />)
  );
}