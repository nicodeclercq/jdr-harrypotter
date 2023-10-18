import { pipe, flow } from "fp-ts/function";
import * as Record from "fp-ts/Record";

import { fromRemoteData } from "../../helpers/remoteData";
import { Skills, State } from "../../store/State";
import { useStore } from "../../hooks/useStore";
import { MySkills } from "./MySkills";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { useRouter } from "../../hooks/useRouter";
import { identity } from "io-ts";

const stateLens = [identity, (_state: State, newState: State) => newState] as [
  (state: State) => State,
  (state: State, newState: State) => State
];

export function BestSkills() {
  const { goTo } = useRouter();
  const [state] = useStore(stateLens);

  return pipe(
    state,
    fromRemoteData(
      flow(
        ({ skills }: State) => skills,
        Record.toArray,
        (skills) =>
          skills.sort(([, a], [, b]) =>
            a.currentLevel < b.currentLevel ? 1 : -1
          ),
        (skills) => skills.filter((_a, index) => index < 5),
        (skills) =>
          skills.reduce(
            (acc, [name, value]) => ({
              ...acc,
              [name]: value,
            }),
            {} as Skills
          ),
        (skills) => (
          <Card
            title={
              <div className="flex space-x-2">
                <span className="flex-grow">Meilleures Compétences</span>
              </div>
            }
          >
            <div className="mb-2 space-y-2">
              <MySkills showInColumns={false} skills={skills} />
              <div className="flex justify-center">
                <Button type="secondary" onClick={() => goTo("/skills")}>
                  Voir toutes les compétences
                </Button>
              </div>
            </div>
          </Card>
        )
      )
    )
  );
}
