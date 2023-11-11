import { useTitle } from "react-use";
import { pipe } from "fp-ts/lib/function";

import { Layout } from "../../components/Layout";
import { fromRemoteData, sequence } from "../../helpers/remoteData";
import { State } from "../../store/State";
import { Identity } from "./Identity";
import { useRole } from "../../hooks/useRole";
import { OppositionRollTable } from "./OppositionRollTable";
import { useLife } from "./useLife";
import { useUser } from "./useUser";
import { UsersBestSkills } from "./UsersBestSkills";
import { Timer } from "../../components/Timer";
import { MoneyConverter } from "../../components/MoneyConverter";
import { HPPNJ } from "../../components/pnj/pnj";
import { Benny } from "../../components/Benny";
import { useBenny } from "../../hooks/useBenny";
import { useGame } from "../../hooks/useGame";
import { RemoteDataFold } from "../../components/RemoteDataFold";
import { BodyDamage } from "../../components/BodyDamage";
import { useLockKey } from "../../hooks/useLockKey";
import { LOCK } from "../../lock";
import { FantasyDD } from "./FantasyDD";

function Home({
  isMJ,
  user,
  life,
}: {
  isMJ: boolean;
  user: State["user"]["name"];
  life: State["life"];
}) {
  useTitle(`${life.current}/${life.max}♥ - ${user}`);
  const { game } = useGame();
  const { isUnlocked } = useLockKey();
  const { bennies, moveBenny, removeBenny } = useBenny();

  return (
    <Layout>
      <RemoteDataFold
        data={sequence({
          areDamagesUnlocked: isUnlocked(LOCK.DAMAGES),
          bennies,
          game,
        })}
        onSuccess={({ areDamagesUnlocked, bennies, game }) => (
          <>
            <div className="w-full h-full grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="w-full space-y-4">
                {isMJ && <Timer />}
                <div className="flex gap-4">
                  {areDamagesUnlocked && <BodyDamage />}
                  {isMJ && <FantasyDD />}
                </div>
                {isMJ && game === "HP" && <MoneyConverter showEuro />}
                {isMJ && game === "HP" && <OppositionRollTable />}
                <div
                  style={{ position: "absolute", bottom: "4rem", left: "6rem" }}
                >
                  <Identity />
                </div>
              </div>
              <div className="w-full space-y-4">
                {isMJ && game === "HP" && <HPPNJ />}
                {isMJ && <UsersBestSkills />}
              </div>
            </div>
            {bennies.map((position, index) => (
              <Benny
                key={`benny_${index}`}
                position={position}
                onDragStop={(endPosition) => {
                  moveBenny(endPosition, index);
                }}
                onUse={() => {
                  removeBenny(index);
                }}
              />
            ))}
          </>
        )}
      />
    </Layout>
  );
}

export function HomePage() {
  useTitle("Loading...");
  const { isMJ } = useRole();
  const { name } = useUser();
  const { life } = useLife();

  return pipe(
    sequence({
      isMJ,
      name,
      life,
    }),
    fromRemoteData(({ isMJ, name, life }) => (
      <Home isMJ={isMJ} user={name} life={life} />
    ))
  );
}
