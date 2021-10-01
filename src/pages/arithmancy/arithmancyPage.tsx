import React, { useState } from 'react';
import { pipe } from 'fp-ts/function';
import { Layout } from '../../components/Layout';
import { RollModal, Interpretation } from '../../components/RollModal';
import { useArithmancy } from './useArithmancy';
import { fromRemoteData } from '../../helpers/remoteData';
import { State } from '../../store/State';
import { Calculator } from './calculator';
import { NumbersDefinition } from './numbersDefinition';
import { Info } from '../../components/Info';

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
        <div className="flex-grow space-y-2">
          <Info icon="ABACUS">
            L'arythmancie est un art entre le sort et la rune.
            L'arythmancien invoque dans sa tête des chiffres de pouvoirs qu'il forme ensuite dans l'air dans la direction souhaité.
            <strong>Pour cela ses mains doivent être libres</strong>.
            <br />
            La formule généré à partir des chiffres invoqués doit se composer d'au minimum un "Nom" et un "Verbe".
            L'arythmancien doit préalablement lier chaque chiffre qu'il souhaite invoquer à une définition.
            Une fois la définition inscrite le chiffre ne pourra plus être modifié.
            <br />
            La force de la formule correpsond à la somme des chiffres invoqués (un chiffre utilisé en tant qu'inverse prendra une valeur négative).
          </Info>
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