import React, { ReactElement } from "react";
import { pipe } from "fp-ts/function";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Icon, IconName } from "./components/icons/Icon";
import { keys } from "./helpers/object";
import { fromRemoteData, sequence } from "./helpers/remoteData";
import { ArithmancyPage } from "./pages/arithmancy/arithmancyPage";
import { CartomancyPage } from "./pages/cartomancy/CartomancyPage";
import { HomePage } from "./pages/home/HomePage";
import { useUser } from "./pages/home/useUser";
import { NotesPage } from "./pages/notes/notesPage";
import { ObjectsPage } from "./pages/objects/ObjectsPage";
import { PotionsPage } from "./pages/potions/potionsPage";
import { RunesPage } from "./pages/runes/RunesPage";
import { SkillsPage } from "./pages/skills/SkillsPage";
import { SpellsPage } from "./pages/spells/SpellsPage";
import { SocketMessageHandler } from "./SocketMessageHandler";
import { State } from "./store/State";
import { useLockKey } from "./hooks/useLockKey";
import { Avatar } from "./components/Avatar";
import { useStoreLoadState } from "./hooks/useStore";
import { Loader } from "./components/Loader";
import { useSocket } from "./hooks/useSocket";
import { useRole } from "./hooks/useRole";
import { AmbiancePage } from "./pages/ambiance/AmbiancePage";
import { ShopPage } from "./pages/shop/ShopPage";
import { TreasurePage } from "./pages/treasure/treasurePage";
import { CombatPage } from "./pages/combat/CombatPage";
import { PnjsPage } from "./pages/pnjs/PnjsPage";
import { BattleMapPage } from "./pages/battleMap/battleMapPage";
import { CardsPage } from "./pages/cards/CardsPage";
import { LOCK } from "./lock";

export type RouteDefinition = {
  label: ((state: State) => string) | string;
  icon: IconName | ((state: State) => React.ReactElement);
  Component: () => React.ReactElement;
  lockKey?:
    | string
    | ((lockKeys: State["lockKeys"], role: State["role"]) => boolean);
};

export const ROUTES: Record<string, RouteDefinition> = {
  "/": {
    icon: (state: State) => {
      if (state.user.imageUrl) {
        return (
          <Avatar
            game={state.game}
            url={state.user.imageUrl}
            text={state.user.name}
          />
        );
      }

      return (
        {
          HP: <Icon name="SORCERER" />,
          FANTASY: <Icon name="HELMET" />,
        } as const
      )[state.game] as ReactElement;
    },
    label: (state: State) => state.user.name,
    Component: HomePage,
  },
  "/screens": {
    icon: "CLAPPER_BOARD",
    label: "Ambiance",
    Component: AmbiancePage,
    lockKey: (_lockKeys: State["lockKeys"], role: State["role"]) =>
      role === "MJ",
  },
  "/skills": {
    icon: "SKILLS",
    label: "Compétences",
    Component: SkillsPage,
  },
  "/spells": {
    icon: "BOOK",
    label: "Sorts",
    Component: SpellsPage,
    lockKey: LOCK.SPELL,
  },
  "/runes": {
    icon: "RUNE",
    label: "Runes",
    Component: RunesPage,
    lockKey: LOCK.RUNE,
  },
  "/cartomancy": {
    icon: "CARD",
    label: "Cartomancie",
    Component: CartomancyPage,
    lockKey: LOCK.CARTOMANCY,
  },
  "/arithmancy": {
    icon: "ABACUS",
    label: "Arithmancy",
    Component: ArithmancyPage,
    lockKey: LOCK.ARITHMENCY,
  },
  "/objects": {
    icon: "BACKPACK",
    label: "Objets",
    Component: ObjectsPage,
  },
  "/notes": {
    icon: "NOTEBOOK",
    label: "Notes",
    Component: NotesPage,
  },
  "/potions": {
    icon: "CAULDRON",
    label: "Potions",
    Component: PotionsPage,
    lockKey: LOCK.POTION,
  },
  "/shop": {
    icon: "SHOP",
    label: "Boutiques",
    Component: ShopPage,
    lockKey: (_lockKeys: State["lockKeys"], role: State["role"]) =>
      role === "MJ",
  },
  "/treasure": {
    icon: "CHEST",
    label: "Trésors",
    Component: TreasurePage,
    lockKey: (_lockKeys: State["lockKeys"], role: State["role"]) =>
      role === "MJ",
  },
  "/combat": {
    icon: "SWORD",
    label: "Combat",
    Component: CombatPage,
    lockKey: (_lockKeys: State["lockKeys"], role: State["role"]) =>
      role === "MJ",
  },
  "/pnjs": {
    icon: "TEAM",
    label: "PNJs",
    Component: PnjsPage,
    lockKey: (_lockKeys: State["lockKeys"], role: State["role"]) =>
      role === "MJ",
  },
  "/battlemap": {
    icon: "PATH",
    label: "Battle Map",
    Component: BattleMapPage,
    lockKey: (_lockKeys: State["lockKeys"], role: State["role"]) =>
      role === "MJ",
  },
  "/deck": {
    icon: "CARD_RANDOM",
    label: "Cartes",
    Component: CardsPage,
    lockKey: LOCK.CARD_GAME,
  },
} as const;

const routesDefOrder: Array<keyof typeof ROUTES> = [
  "/",
  "/deck",
  "/screens",
  "/pnjs",
  "/combat",
  "/battlemap",
  "/treasure",
  "/shop",
  "/skills",
  "/spells",
  "/runes",
  "/cartomancy",
  "/arithmancy",
  "/potions",
  "/objects",
  "/notes",
];

export const ROUTE_NAMES = keys(ROUTES);

export const getAvailableRoutes = (
  lockKeys: State["lockKeys"],
  isMJ: State["role"]
) =>
  routesDefOrder.filter((path) => {
    const lock = ROUTES[path].lockKey;
    if (lock == null) {
      return true;
    }
    if (typeof lock === "string") {
      return lockKeys.includes(ROUTES[path].lockKey as string);
    }
    if (typeof lock === "function") {
      return lock(lockKeys, isMJ);
    }
    return false;
  });

function SocketMessageHandlerRenderer() {
  const { name } = useUser();
  const { stream, emit } = useSocket();

  return pipe(
    name,
    fromRemoteData((name) => (
      <SocketMessageHandler
        stream={stream}
        emit={emit}
        currentUserName={name}
      />
    ))
  );
}

function RouterRenderer() {
  const { lockKeys } = useLockKey();
  const { role } = useRole();

  return pipe(
    sequence({
      lockKeys,
      role,
    }),
    fromRemoteData(({ lockKeys, role }) => (
      <>
        <BrowserRouter>
          <Switch>
            {getAvailableRoutes(lockKeys, role)
              .reverse()
              .map((path) => {
                const { Component } = ROUTES[path];
                return (
                  <Route key={path} path={path}>
                    <Component />
                  </Route>
                );
              })}
          </Switch>
        </BrowserRouter>
      </>
    ))
  );
}

export function Router() {
  const { loadState } = useStoreLoadState();
  return loadState === "success" ? (
    <>
      <SocketMessageHandlerRenderer />
      <RouterRenderer />
    </>
  ) : (
    <Loader />
  );
}
