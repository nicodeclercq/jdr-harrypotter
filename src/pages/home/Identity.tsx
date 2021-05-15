import React from 'react';
import { State } from '../../store/State';
import { Icon } from '../../components/icons/Icon';
import { Card } from '../../components/Card';
import { Title } from '../../components/font/Title';

type Props = {
  state: State;
}

export function Identity({state}: Props){
  return (
    <Card>
      <div className="flex p-2 flex-column space-y-4">
        <div className="flex flex-row items-center w-full space-x-2">
          <span className="flex-grow">
            <Title>{state.user.name}</Title>
          </span>
          <span>
          {state.life.current} / {state.life.max}
          </span>
          <Icon name="HEART" />
        </div>
      </div>
    </Card>
  );
}