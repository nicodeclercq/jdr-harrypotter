import React, { useState } from 'react';
import { useTitle } from 'react-use';
import { Button } from '../../components/Button';
import { Icon } from '../../components/icons/Icon';

import { RollModal } from '../../components/RollModal';
import { entries } from '../../helpers/object';
import { State } from '../../useStore';

type Props = {
  skills: State['skills'];
  showInColumns: boolean;
};

export function MySkills({ skills, showInColumns }: Props) {
  const [rollModalSkill, setRollModalSkill] = useState<{skill: string, currentLevel: number} | undefined>(undefined);
  useTitle('Compétences');

  return (
      <>
        <div className={`${showInColumns ? 'grid grid-cols-3 gap-x-10 ': ''} divide-y divide-solid`}>
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
            onRollEnd={() => { setRollModalSkill(undefined)}}
          />
        }
      </>
    );
}