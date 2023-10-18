import { useState } from "react";
import { pipe } from "fp-ts/function";
import { Layout } from "../../components/Layout";
import { RollModal, Interpretation } from "../../components/RollModal";
import { useArithmancy } from "./useArithmancy";
import { fromRemoteData } from "../../helpers/remoteData";
import { State } from "../../store/State";
import { Calculator } from "./calculator";
import { NumbersDefinition } from "./numbersDefinition";
import { Info } from "../../components/Info";

const resultInterpretation: Interpretation[] = [
  {
    predicate: (value: number, percentage: number) =>
      value < percentage && value <= 5,
    result: {
      type: "success",
      message: "🎉 Réussite critique 🎉, Puissance: désirée par le joueur",
    },
  },
  {
    predicate: (value: number, percentage: number) =>
      value < percentage && value <= 20,
    result: {
      type: "success",
      message: "Réussite, Puissance: Extrême",
    },
  },
  {
    predicate: (value: number, percentage: number) =>
      value < percentage && value <= 40,
    result: {
      type: "success",
      message: "Réussite, Puissance: Forte",
    },
  },
  {
    predicate: (value: number, percentage: number) =>
      value < percentage && value <= 60,
    result: {
      type: "success",
      message: "Réussite, Puissance: Moyenne",
    },
  },
  {
    predicate: (value: number, percentage: number) => value < percentage,
    result: {
      type: "success",
      message: "Réussite, Puissance: Faible",
    },
  },
  {
    predicate: (value: number, percentage: number) =>
      value >= percentage && value >= 95,
    result: {
      type: "failure",
      message: "😈 Échec Critique 😈, Puissance: Choisie par le MJ",
    },
  },
  {
    predicate: (value: number, percentage: number) => value >= percentage,
    result: {
      type: "failure",
      message: "Échec",
    },
  },
];

function ArithmancyContent({
  numbers,
}: {
  numbers: State["arithmancy"]["numbers"];
}) {
  const [rollModal, setRollModal] = useState<
    { title: string; percentage: number } | undefined
  >(undefined);

  return (
    <Layout>
      <div className="justify-center w-full max-h-full overflow-y-auto grid grid-cols-1 md:grid-cols-2 gap-x-4">
        <div className="order-2 md:order-1 space-y-2">
          <Info icon="ABACUS">
            Fin calculateur l&apos;arythmancien utilise le pouvoir des nombres
            pour accomplir sa magie puissante. Celui-ci invoque dans sa tête des
            chiffres de pouvoirs qu&apos;il forme ensuite dans l&apos;air dans
            la direction souhaité.
            <strong>Pour cela ses mains doivent être libres</strong>.
            <br />
            La formule généré à partir des chiffres invoqués doit se composer
            d&apos;au minimum un &quot;Nom&quot; et un &quot;Verbe&quot;.
            L&apos;arythmancien doit préalablement lier chaque chiffre
            qu&apos;il souhaite invoquer à une définition. Une fois la
            définition inscrite le chiffre ne pourra plus être modifié. Comme
            seuls 9 chiffres existent le cartomancien doit savoir réfréner ses
            envies afin de libérer un plus grand pouvoir. Un sorcier trop hâtif
            ne produira jamais qu&apos;une magie simple et peu puissante.
            <br />
            La force de la formule correpsond à la somme des chiffres invoqués
            (un chiffre utilisé en tant qu&apos;inverse prendra une valeur
            négative).
          </Info>
          <NumbersDefinition numbers={numbers} />
        </div>
        <div className="order-1 md:order-2">
          <Calculator
            numbers={numbers}
            roll={(title, percentage) => setRollModal({ title, percentage })}
          />
        </div>
        {rollModal != null && (
          <RollModal
            resultsInterpretation={resultInterpretation}
            successPercentage={rollModal.percentage}
            title={rollModal.title}
            isCancellable={false}
            onRollEnd={() => setRollModal(undefined)}
          />
        )}
      </div>
    </Layout>
  );
}

export function ArithmancyPage() {
  const { getNumbers } = useArithmancy();
  const numbers = getNumbers();

  return pipe(
    numbers,
    fromRemoteData((numbers) => <ArithmancyContent numbers={numbers} />)
  );
}
