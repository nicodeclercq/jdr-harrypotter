import { pipe } from "fp-ts/lib/function";
import { Layout } from "../../components/Layout";
import { Card } from "./Card";
import { useFightDeck } from "./useFightDeck";
import { RemoteDataFold } from "../../components/RemoteDataFold";
import { useSkill } from "../skills/useSkill";
import { sequence } from "../../helpers/remoteData";
import { useRole } from "../../hooks/useRole";
import { Button } from "../../components/Button";
import { FightCard } from "./FightCard";
import { Card as FightCardT } from "../../store/v14/fightCards";
import { Avatar } from "../../components/Avatar";

type Props = {
  isMJ: boolean;
  hand: FightCardT[];
  table: {
    card: FightCardT;
    user: { name: string; imageUrl: string | undefined | null };
  }[];
  pick: () => void;
  playACard: (c: FightCardT) => void;
  clearTable: () => void;
};

function Page({ isMJ, hand, table, pick, playACard, clearTable }: Props) {
  return (
    <div className="w-full grid gap-4">
      <div className="w-full grid gap-8">
        <div className="flex flex-row gap-4 place-content-between">
          {/* DECK */}
          <div>
            <Card
              element="Pique"
              mean="Environnement"
              number="10"
              type="Attaque"
              onClick={pick}
            />
          </div>
          {/* TABLE */}
          <div
            className="flex flex-row gap-2 align-center w-full py-4"
            style={{ height: "17rem" }}
          >
            <div className="flex flex-wrap flex-row gap-4 items-center justify-center overflow-auto w-full">
              {table.map(({ card, user }, index) => (
                <div
                  key={`${card.id}_${user.name}_${index}`}
                  style={{ position: "relative" }}
                >
                  <FightCard
                    key={card.id}
                    card={card}
                    zIndex={index}
                    isVisible
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 0,
                      left: "50%",
                      transform: "translateX(-50%) translateY(10%)",
                    }}
                  >
                    <Avatar game="cards" text={user.name} url={user.imageUrl} />
                  </div>
                </div>
              ))}
            </div>
            {/*FIXME: when sync is alive only MJ can reset */}
            {isMJ && (
              <div className="flex flex-col gap-2">
                <Button type="tertiary" onClick={clearTable}>
                  Vider
                </Button>
              </div>
            )}
          </div>
        </div>
        {/* HAND */}
        <div className="flex flex-row flex-wrap gap-4 items-center justify-center overflow-auto max-w-full py-4">
          {hand.map((card, index) => (
            <FightCard
              key={card.id}
              card={card}
              zIndex={index}
              isVisible
              onClick={() => playACard(card)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function CardsPage() {
  const { isMJ } = useRole();
  const { hand, pick, playACard, clearTable, table } = useFightDeck();
  const { getSkills } = useSkill();

  return pipe(sequence({ table, hand, isMJ, skills: getSkills() }), (data) => (
    <Layout>
      <RemoteDataFold
        data={data}
        onSuccess={({ isMJ, hand, table }) => (
          <Page
            isMJ={isMJ}
            hand={hand}
            pick={pick}
            playACard={playACard}
            clearTable={clearTable}
            table={table}
          />
        )}
      />
    </Layout>
  ));
}
