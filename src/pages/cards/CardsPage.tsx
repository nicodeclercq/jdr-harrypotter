import { useEffect } from "react";
import { Layout } from "../../components/Layout";
import { Card } from "./Card";
import { useDeck } from "./useDeck";
import { RemoteDataFold } from "../../components/RemoteDataFold";

export function CardsPage() {
  const { hand, reset } = useDeck();

  useEffect(() => {
    reset();
  }, []);

  return (
    <Layout>
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="w-full flex">
          <RemoteDataFold
            data={hand}
            onSuccess={(hand) =>
              hand.map(({ number, element, type, mean }, index) => (
                <div
                  key={`${number}_${element}_${type}_${mean}`}
                  style={{
                    transform: `translateY(${
                      (index * -2 + 4) * (index > hand.length / 2 ? -1 : 1)
                    }rem) rotate(${index * 5 - 10}deg)`,
                  }}
                >
                  <Card
                    number={number}
                    symbol={element}
                    type={type}
                    mean={mean}
                  />
                </div>
              ))
            }
          />
          {}
        </div>
      </div>
    </Layout>
  );
}
