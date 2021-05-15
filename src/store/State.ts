import { State as CurrentState, Trait as CurrentTrait, UserSpell as CurrentUserSpell } from './v4/v4';

export type State = CurrentState;
export type UserSpell = CurrentUserSpell;
export type Trait = CurrentTrait;
export type User = State['user'];