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
        <div className="w-full flex gap-2">
          <RemoteDataFold
            data={hand}
            onSuccess={(hand) =>
              hand.map(({ number, element, type, mean }) => (
                <div key={`${number}_${element}_${type}_${mean}`}>
                  <Card
                    number={number}
                    element={element}
                    type={type}
                    mean={mean}
                    isVisible
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
