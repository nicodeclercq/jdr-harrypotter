import React from 'react';
import { useTitle } from 'react-use';
import { Card } from '../../components/Card';
import { Layout } from '../../components/Layout';
import { fromRemoteData } from '../../helpers/remoteData';
import { useStore } from '../../store/useStore';
import { MySkills } from './MySkills';

export function SkillsPage() {
  useTitle('Compétences');
  const { getState } = useStore();

  return fromRemoteData(
    getState(),
    ({ skills }) => (
      <Layout>
        <div className="w-full h-full m-3">
          <Card title={(
            <div className="flex space-x-2">
              <span className="flex-grow">Mes Compétences</span>
            </div>)}
          >
            <MySkills showInColumns skills={skills} />
          </Card>
        </div>
      </Layout>
    )
  );
}