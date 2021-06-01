import React, { useState } from 'react';
import { pipe } from 'fp-ts/function';

import { Button } from '../../components/Button';
import { Icon } from '../../components/icons/Icon';
import { RollModal } from '../../components/RollModal';
import { entries } from '../../helpers/object';
import { State } from '../../store/State';
import { useSkill, MIN_USE_FOR_UPGRADE } from './useSkill';
import * as Interaction from '../../helpers/interaction';
import { noop } from '../../helpers/function';
import { useNotification } from '../../components/Notification';
import { UpgradeRollModal } from '../../components/UpgradeRollModal';

type Props = {
  skills: State['skills'];
  showInColumns: boolean;
};

const getNextLevelSkills = (skills: State['skills']) => {
  return entries(skills)
    .filter(([, {uses}]) => uses >= MIN_USE_FOR_UPGRADE)
    .map(([key]) => key);
}

export function MySkills({ skills, showInColumns }: Props) {
  const [rollModalSkill, setRollModalSkill] = useState<{skill: string, currentLevel: number} | undefined>(undefined);
  const [nextLevelSkill, setNextLevelSkill] = useState<string | undefined>(undefined);
  const { use, upgrade} = useSkill();
  const { add } = useNotification();

  const onRollEnd = (skill: string) => (result: Interaction.Interaction<never, number>) => {
    pipe(
      result,
      Interaction.fold({
        success: (value: number) => use(skill, value <= 5),
        failure: () => use(skill, false),
        canceled: noop,
      }),
      () => setRollModalSkill(undefined),
      () => getNextLevelSkills(skills),
      nextLevelSkills => {
        if(nextLevelSkills.length) {
          add({
            id: `skillUpdate_${nextLevelSkills[0]}`,
            type: 'success',
            message: `${nextLevelSkills.length} compétence peut être améliorée`,
            action:{
              run: () => {
                setNextLevelSkill(nextLevelSkills[0]);
              },
              label: 'Choisir',
            },
          });
        }
      }
    );
  }

  const onUpgradeEnd = (skill: string) => (result: Interaction.Interaction<never, number>) => {
    upgrade(skill, result);
    setNextLevelSkill(undefined);
  }

  return (
      <>
        <div className={`${showInColumns ? 'grid grid-cols-3 gap-x-10': ''} divide-y divide-solid`}>
        {
          entries(skills).map(([skill, {currentLevel}]) => (
            <div key={`skills_${skill}`} className="flex items-center p-2 justify-evenly space-x-2">
            <div className="flex items-center justify-evenly space-x-2">
              <Button onClick={() => setRollModalSkill({skill, currentLevel})} type="secondary">
                <Icon name="DICE" />
              </Button>
            </div>
            <div className="flex-grow text-sm">
              {skill} ({currentLevel}%)
            </div>
          </div>
          ))
        }
        </div>
        {
          rollModalSkill != null && <RollModal
            successPercentage={rollModalSkill.currentLevel}
            title={
              <span className="space-x-2">
                {rollModalSkill.skill}
              </span>
            }
            isCancellable={false}
            onRollEnd={onRollEnd(rollModalSkill.skill)}
          />
        }
        {
          nextLevelSkill != null && <UpgradeRollModal
            successPercentage={skills[nextLevelSkill].currentLevel}
            title={nextLevelSkill}
            onRollEnd={onUpgradeEnd(nextLevelSkill)}
          />
        }
      </>
    );
}