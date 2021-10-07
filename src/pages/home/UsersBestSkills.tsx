import React, { useEffect, useState } from 'react';
import * as RemoteData from '@devexperts/remote-data-ts';
import { pipe, flow } from 'fp-ts/function';
import * as Record from 'fp-ts/Record';

import { Avatar } from '../../components/Avatar';
import { Card } from '../../components/Card';
import { Title } from '../../components/font/Title';
import { useConnectedUsers } from '../../hooks/useConnectedUsers';
import { retrieveUserState } from '../../store/store';
import { State } from '../../store/State';
import { fromRemoteData } from '../../helpers/remoteData';
import { MySkills } from '../skills/MySkills';

function UserBestSkills({name}: {name: string}) {
  const [state, setState] = useState<RemoteData.RemoteData<Error, State>>(RemoteData.initial);

  useEffect(() => {
    retrieveUserState(name)
      .then((state) => setState(RemoteData.success(state)))
      .catch(error => setState(RemoteData.failure(error)));
  }, [name]);

  return pipe(
    state,
    fromRemoteData(flow(
        ({skills}: State) => skills,
        Record.toArray,
        (skills) => skills.sort(([,a], [,b]) => a.currentLevel < b.currentLevel ? 1 : -1),
        (skills) => skills.filter((a, index) => index < 6),
        (skills) => skills.reduce(
          (acc, [name, value]) => ({
            ...acc,
            [name]: value
          }),
          {} as State['skills']
        ),
      (skills) => (
        <div className="mb-2 space-y-2">
          <MySkills showInColumns={true} skills={skills} />
        </div>
      )
    ))
  )
}

export function UsersBestSkills() {
  const { connectedUsers } = useConnectedUsers();
  return (
    <>{
      Object.entries(connectedUsers)
        .map(([name, avatar]) => 
          <Card
            key={name}
            title={
              <div className="flex flex-row items-center space-x-2">
                <Avatar url={avatar} text={name} size="small" />
                <Title>{name}</Title>
              </div>
            }
          >
            <UserBestSkills name={name} />
          </Card>
        )
    }</>
  )
}