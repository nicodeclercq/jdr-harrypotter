import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe } from 'fp-ts/function';

import { useStore } from '../../hooks/useStore';
import * as Objects from '../../helpers/object';
import * as Interaction from '../../helpers/interaction';
import { State } from '../../store/State';
import { onSuccess } from '../../helpers/remoteData';

export const MIN_USE_FOR_UPGRADE = 5;
const MAX_SKILL_LEVEL = 95;

const skillsLens = Objects.lens<State, 'skills'>('skills');

export const useSkill = () => {
  const [skills, setSkills] = useStore(skillsLens);

  const getSkills = () => skills;

  const add = (name: string, currentLevel: number) => pipe(
    skills,
    RemoteData.map(skills => ({
      ...skills,
      [name.trim()]: {
        currentLevel,
        uses: 0,
      }
    })),
    onSuccess(setSkills),
  );

  const edit = (name: string, currentLevel: number) => pipe(
    skills,
    RemoteData.chain(skills => name in skills
      ? RemoteData.success(skills)
      : RemoteData.failure(new Error(`The skill '${name}' is not defined`))
    ),
    RemoteData.map(skills => ({
      ...skills,
      [name.trim()]: {
        currentLevel,
        uses: skills[name].uses,
      }
    })),
    onSuccess(setSkills),
  );

  const remove = (name: string) => pipe(
    skills,
    RemoteData.map(skills => 
      Objects.remove(name.trim(), skills)
    ),
    onSuccess(setSkills),
  );

  const use = (skill: string, isCritical: boolean) => {
    pipe(
      skills,
      RemoteData.map(skills => Objects.map(
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
            skills
          ),
      ),
      onSuccess(setSkills),
    );
  }

  const upgrade = (skill: string, result: Interaction.Interaction<never, number>) => {
    pipe(
      skills,
      RemoteData.map(skills => {
        const currentLevel = skills[skill].currentLevel;
        const nextLevel = pipe(
          result,
          Interaction.fold({
            success: (points) => skills[skill].currentLevel + points < MAX_SKILL_LEVEL
              ? currentLevel + points
              : MAX_SKILL_LEVEL,
            failure: () => skills[skill].currentLevel,
            canceled: () => skills[skill].currentLevel,
          })
        );

        return {
          ...skills,
          [skill]: {
            uses: Interaction.isCanceled(result) ? skills[skill].uses : 0,
            currentLevel: nextLevel,
          },
        };
      }),
      onSuccess(setSkills),
    );
  }

  return {
    getSkills,
    use,
    upgrade,
    add,
    remove,
    edit,
  }
}