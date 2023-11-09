import { KeyOf, ValueOf } from "../helpers/object";
import {
  State as CurrentState,
  stateDecoder as CurrentStateDecoder,
  retrieve as currentRetrieve,
} from "./v13/v13";

export const retrieve = currentRetrieve;
export const StateDecoder = CurrentStateDecoder;
export type State = CurrentState;
export type Skills = CurrentState["skills"];
export type UserSpell = ValueOf<CurrentState["userSpells"]>;
export type Trait = KeyOf<CurrentState["traits"]>;
export type User = State["user"];
export type Card = State["cards"]["deck"][number];
export type DamageLocation = State["damages"][number];
