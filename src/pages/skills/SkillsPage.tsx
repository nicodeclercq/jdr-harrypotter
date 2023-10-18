import React, { useState } from "react";
import { pipe } from "fp-ts/function";
import { Card } from "../../components/Card";
import { Layout } from "../../components/Layout";
import { fromRemoteData } from "../../helpers/remoteData";
import { MySkills } from "./MySkills";
import { MyTraits } from "./MyTraits";
import { useSkill } from "./useSkill";
import { Identity } from "../home/Identity";
import { Button } from "../../components/Button";
import { Icon } from "../../components/icons/Icon";
import { AddSkillModal } from "./AddSkillModal";

export function SkillsPage() {
  const { getSkills, add } = useSkill();
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);

  return pipe(
    getSkills(),
    fromRemoteData((skills) => (
      <Layout>
        <div className="w-full h-full m-3 space-y-2">
          <Identity />
          <MyTraits />
          <Card title={(
            <div className="flex items-center space-x-2">
              <span className="flex-grow">Compétences</span>
              <Button type='secondary' onClick={() => setShowAddSkillModal(true)}>
                <Icon name="INCREASE" />
              </Button>
            </div>)}
          >
            <MySkills showInColumns skills={skills} />
          </Card>
        </div>
        {
          showAddSkillModal && (
            <AddSkillModal
              onCancel={() => setShowAddSkillModal(false)}
              onSubmit={({name, currentLevel}) => {
                add(name, currentLevel);
                setShowAddSkillModal(false);
              }}
            />
          )
        }
      </Layout>
    ))
  );
}