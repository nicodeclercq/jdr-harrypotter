import { pipe } from "fp-ts/function";

import { Layout } from "../../components/Layout";
import { fromRemoteData, sequence } from "../../helpers/remoteData";
import { MoneyForm } from "./MoneyForm";
import { ObjectsForm } from "./ObjectsForm";
import { useMoney } from "./useMoney";
import { useObjects } from "./useObjects";
import { MoneyConverter } from "../../components/MoneyConverter";

export function ObjectsPage() {
  const { objects } = useObjects();
  const { money } = useMoney();

  return pipe(
    sequence({
      objects,
      money,
    }),
    fromRemoteData(({ objects, money }) => (
      <Layout>
        <div className="w-full h-full m-3 space-y-2">
          <div className="items-end grid grid-flow-col grid-cols-2 gap-4">
            <MoneyForm money={money} />
            <MoneyConverter />
          </div>
          <ObjectsForm objects={objects} columns={2} />
        </div>
      </Layout>
    ))
  );
}
