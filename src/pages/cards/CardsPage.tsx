import { pipe } from "fp-ts/lib/function";
import { Layout } from "../../components/Layout";
import { Card } from "./Card";
import { useDeck } from "./useDeck";
import { RemoteDataFold } from "../../components/RemoteDataFold";
import { Card as CardT } from "../../store/State";
import { useSkill } from "../skills/useSkill";
import { onSuccess, sequence } from "../../helpers/remoteData";
import { useRole } from "../../hooks/useRole";
import { Button } from "../../components/Button";
import { createArrayOfIndex } from "../../helpers/array";
import { useEffect } from "react";

type Props = {
  isMJ: boolean;
  maxCardNb: number;
  deck: CardT[];
  hand: CardT[];
  table: CardT[];
};

const getCardNumber = (level?: number) => Math.floor((level ?? 10) / 10);

function Page({ deck, hand, table, isMJ, maxCardNb }: Props) {
  const {
    deck: cards,
    reset,
    drawACard,
    playACard,
    clearCardTable,
  } = useDeck();
  useEffect(() => {
    if (isMJ && deck.length === 0) {
      reset();
    }
  }, [isMJ, deck]);

  console.log("table", table);
  useEffect(() => {
    pipe(
      cards,
      onSuccess((cards) => {
        console.log("next deck card", cards[0]);
      })
    );
  }, [deck]);

  return (
    <div className="w-full grid gap-4">
      <div className="w-full grid gap-8">
        <div className="flex flex-row gap-4 place-content-between">
          {/* DECK */}
          <div
            className={
              hand.length < maxCardNb ? "cursor-pointer" : "cursor-not-allowed"
            }
          >
            <Card
              element="Pique"
              mean="Environnement"
              number="10"
              type="Attaque"
              onClick={() => {
                if (hand.length < maxCardNb) {
                  drawACard();
                }
              }}
            />
          </div>
          {/* TABLE */}
          <div className="flex flex-row gap-4 items-center justify-center overflow-auto max-w-full py-4">
            {table.map(({ number, element, type, mean }) => (
              <div key={`${number}_${element}_${type}_${mean}`}>
                <Card
                  number={number}
                  element={element}
                  type={type}
                  mean={mean}
                  isVisible
                />
              </div>
            ))}
            {isMJ && (
              <div className="flex flex-col gap-2">
                <Button type="secondary" onClick={clearCardTable}>
                  Clear
                </Button>
                <Button type="tertiary" onClick={reset}>
                  RESET
                </Button>
              </div>
            )}
          </div>
        </div>
        {/* HAND */}
        <div className="flex flex-row gap-4 items-center justify-center overflow-auto max-w-full py-4">
          {createArrayOfIndex(maxCardNb).map((index) => (
            <div key={index}>
              {hand[index] ? (
                <Card
                  number={hand[index].number}
                  element={hand[index].element}
                  type={hand[index].type}
                  mean={hand[index].mean}
                  isVisible
                  onClick={() => playACard(hand[index])}
                />
              ) : (
                <div
                  className="border border-dashed"
                  style={{ width: "10rem", height: "15rem" }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function CardsPage() {
  const { isMJ } = useRole();
  const { deck, hand, table } = useDeck();
  const { getSkills } = useSkill();

  return pipe(
    sequence({ deck, hand, table, isMJ, skills: getSkills() }),
    (data) => (
      <Layout>
        <RemoteDataFold
          data={data}
          onSuccess={({ isMJ, deck, hand, table, skills }) => (
            <Page
              isMJ={isMJ}
              deck={deck}
              hand={hand}
              maxCardNb={getCardNumber(skills["Combat"]?.currentLevel)}
              table={table}
            />
          )}
        />
      </Layout>
    )
  );
}
