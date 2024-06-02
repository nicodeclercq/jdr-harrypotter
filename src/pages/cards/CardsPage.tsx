import { pipe } from "fp-ts/lib/function";
import { Layout } from "../../components/Layout";
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
  incrementCardsNumber: () => void;
  decrementCardsNumber: () => void;
};

function Page({
  isMJ,
  hand,
  table,
  pick,
  playACard,
  clearTable,
  incrementCardsNumber,
  decrementCardsNumber,
}: Props) {
  return (
    <div className="w-full grid gap-4">
      <div className="w-full grid gap-8">
        <div className="flex flex-row gap-4 place-content-between">
          {/* DECK */}
          <div>
            <div
              className="flex flex-col items-center gap-2 h-full"
              style={{ alignContent: "stretch" }}
            >
              <button
                type="button"
                style={{
                  color: "white",
                  width: "2rem",
                  border: "2px dashed rgba(255, 255, 255, 0.25)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "1rem",
                  height: "2rem",
                  background: "transparent",
                }}
                onClick={incrementCardsNumber}
              >
                +
              </button>
              <FightCard
                card={{
                  id: "deck",
                  condition: "",
                  category: "Analyse",
                  consequences: "",
                  relatedSkill: "",
                  score: 0,
                  title: "",
                }}
                zIndex={1}
                onClick={pick}
              />
              <button
                type="button"
                style={{
                  width: "2rem",
                  color: "white",
                  border: "2px dashed rgba(255, 255, 255, 0.25)",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: "1rem",
                  background: "transparent",
                  height: "2rem",
                }}
                onClick={decrementCardsNumber}
              >
                -
              </button>
            </div>
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
  const {
    hand,
    pick,
    playACard,
    clearTable,
    table,
    incrementCardsNumber,
    decrementCardsNumber,
  } = useFightDeck();
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
            incrementCardsNumber={incrementCardsNumber}
            decrementCardsNumber={decrementCardsNumber}
          />
        )}
      />
    </Layout>
  ));
}
