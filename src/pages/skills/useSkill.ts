import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/function';

import { useStore } from '../../store/useStore';
import * as Objects from '../../helpers/object';
import * as Interaction from '../../helpers/interaction';

export const MIN_USE_FOR_UPGRADE = 5;
const MAX_SKILL_LEVEL = 95;

export const useSkill = () => {
  const { getState, setState } = useStore();

  const add = (name: string, currentLevel: number) => pipe(
    getState(),
    RemoteData.map(state => ({
      ...state,
      skills: {
        ...state.skills,
        [name]: {
          currentLevel,
          uses: 0,
        }
      }
    })),
    setState,
  );

  const remove = (name: string) => pipe(
    getState(),
    RemoteData.map(state => ({
      ...state,
      skills: Objects.remove(name, state.skills),
    })),
    setState,
  );

  const use = (skill: string, isCritical: boolean) => {
    pipe(
      getState(),
      RemoteData.map(state => {
        return {
          ...state,
          skills: Objects.map(
            ({currentLevel, uses}, key) =>
              key === skill && uses < MIN_USE_FOR_UPGRADE
                ? {
                  currentLevel,
                  uses: uses + (isCritical ? 2 : 1)
                }
                : {
                  currentLevel,
                  uses
                },
            state.skills
          ),
        };
      }),
      setState,
    );
  }

  const upgrade = (skill: string, result: Interaction.Interaction<never, number>) => {
    pipe(
      getState(),
      RemoteData.map(state => {
        const currentLevel = state.skills[skill].currentLevel;
        const nextLevel = pipe(
          result,
          Interaction.fold({
            success: (points) => state.skills[skill].currentLevel + points < MAX_SKILL_LEVEL
              ? currentLevel + points
              : MAX_SKILL_LEVEL,
            failure: () => state.skills[skill].currentLevel,
            canceled: () => state.skills[skill].currentLevel,
          })
        );

        return {
          ...state,
          skills: {
            ...state.skills,
            [skill]: {
              uses: Interaction.isCanceled(result) ? state.skills[skill].uses : 0,
              currentLevel: nextLevel,
            },
          },
        };
      }),
      setState,
    );
  }

  return {
    use,
    upgrade,
    add,
    remove,
  }
}