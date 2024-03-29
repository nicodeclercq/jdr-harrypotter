import { useState } from "react";
import { pipe } from "fp-ts/function";
import { Layout } from "../../components/Layout";
import { usePNJ } from "../../hooks/usePNJ";
import { HPPNJ } from "../../components/pnj/pnj";
import { Input } from "../../components/Input";
import { fromReloadable } from "../../helpers/Reloadable";
import { Loader } from "../../components/Loader";

export function PnjsPage() {
  const { data } = usePNJ();
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <Layout>
      <div className="w-full space-y-4">
        <div className="flex items-center justify-center w-full">
          <Input
            placeholder="🔎 Rechercher"
            type="search"
            theme="neutral"
            onChange={(value: string) =>
              setSearchQuery(value.trim().toLowerCase())
            }
            width="50%"
          />
        </div>
        {pipe(
          data,
          fromReloadable(
            (pnjs, isReloading) => (
              <>
                <div
                  className="w-full"
                  style={{ visibility: isReloading ? "visible" : "hidden" }}
                >
                  <Loader />
                </div>
                <div className="w-full grid grid-cols-3 grid-flow-row auto-rows-max gap-2">
                  {pnjs
                    .filter(
                      (pnj) =>
                        pnj.name.toLowerCase().includes(searchQuery) ||
                        (pnj.description ?? "")
                          .toLowerCase()
                          .includes(searchQuery)
                    )
                    .map((pnj) => (
                      <HPPNJ key={pnj.name} pnj={pnj} />
                    ))}
                </div>
              </>
            ),
            (error) => <div>Oups {error.message}</div>
          )
        )}
      </div>
    </Layout>
  );
}
