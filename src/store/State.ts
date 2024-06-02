import { KeyOf, ValueOf, createLens } from "../helpers/object";
import {
  State as CurrentState,
  stateDecoder as CurrentStateDecoder,
  retrieve as currentRetrieve,
} from "./v14/v14";

export const stateLens = createLens<State>();

export const retrieve = currentRetrieve;
export const StateDecoder = CurrentStateDecoder;
export type State = CurrentState;
export type Skills = CurrentState["skills"];
export type UserSpell = ValueOf<CurrentState["userSpells"]>;
export type Trait = KeyOf<CurrentState["traits"]>;
export type User = State["user"];
