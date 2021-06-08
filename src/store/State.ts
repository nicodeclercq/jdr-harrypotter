import { State as CurrentState, Trait as CurrentTrait, UserSpell as CurrentUserSpell } from './v7/v7';

export type State = CurrentState;
export type Skills = CurrentState['skills'];
export type UserSpell = CurrentUserSpell;
export type Trait = CurrentTrait;
export type User = State['user'];