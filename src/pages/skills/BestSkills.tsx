import { pipe, flow } from "fp-ts/function";
import * as Record from "fp-ts/Record";

import { fromRemoteData } from "../../helpers/remoteData";
import { Skills, stateLens } from "../../store/State";
import { useStore } from "../../hooks/useStore";
import { MySkills } from "./MySkills";
import { Card } from "../../components/Card";
import { Button } from "../../components/Button";
import { useRouter } from "../../hooks/useRouter";

const skillsLens = stateLens.fromProperty("skills");

export function BestSkills() {
  const { goTo } = useRouter();
  const [skills] = useStore(skillsLens);

  return pipe(
    skills,
    fromRemoteData(
      flow(
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
