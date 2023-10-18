import React from "react";
import { Layout } from "../../components/Layout";
import { Initiative } from "../../components/Initiative";
import { FumblesList } from "./FumblesList";
import { RandomSpells } from "./RandomSpells";

export function CombatPage() {
  return (
    <Layout>
      <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="w-full space-y-4">
          <FumblesList />
        </div>
        <div className="w-full space-y-4">
          <Initiative />
          <RandomSpells />
        </div>
      </div>
    </Layout>
  );
}
