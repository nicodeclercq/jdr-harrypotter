import React from 'react';
import { pipe } from 'fp-ts/function';
import { Card } from '../../components/Card';
import { Layout } from '../../components/Layout';
import { fromRemoteData } from '../../helpers/remoteData';
import { MySkills } from './MySkills';
import { MyTraits } from './MyTraits';
import { useSkill } from './useSkill';
import { Identity } from '../home/Identity';

export function SkillsPage() {
  const { getSkills } = useSkill();

  return pipe(
    getSkills(),
    fromRemoteData((skills) => (
      <Layout>
        <div className="w-full h-full m-3 space-y-2">
          <Identity />
          <MyTraits />
          <Card title={(
            <div className="flex space-x-2">
              <span className="flex-grow">Compétences</span>
            </div>)}
          >
            <MySkills showInColumns skills={skills} />
          </Card>
        </div>
      </Layout>
    ))
  );
}