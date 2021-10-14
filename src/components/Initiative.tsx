import React, { useCallback, useEffect } from 'react';
import { ConnectedUsers, useConnectedUsers } from '../hooks/useConnectedUsers';
import { usePersistantState } from '../hooks/usePersistantState';
import { Avatar } from './Avatar';
import { Button } from './Button';
import { Card } from './Card';
import { BodyText } from './font/BodyText';
import { Title } from './font/Title';
import { Icon } from './icons/Icon';

function shuffle(connectedUsers: ConnectedUsers){
  const pj = Object.entries(connectedUsers).map(([name, avatar]) => ({name, avatar}));
  const pnj = {name: 'PNJ', avatar: ''};
  const ennemy = {name: 'Ennemie', avatar: ''};

  return [...pj, pnj, ennemy]
    .sort(() => Math.random() - 0.5);
}

type Initiative = {
  activeIndex: number | undefined;
  list: {name: string, avatar?: string | null}[]
}

export function Initiative(){
  const { connectedUsers } = useConnectedUsers();
  const [{activeIndex, list}, setInitiative] = usePersistantState<Initiative>('INITIATIVE', {activeIndex: undefined, list: shuffle(connectedUsers)});

  const reset = () => {
    setInitiative({
      activeIndex,
      list: shuffle(connectedUsers)
    });
  };

  const setActiveIndex = useCallback((index: number) => {
    activeIndex === index
      ? setInitiative({
        activeIndex: undefined,
        list,
      })
      : setInitiative({
        activeIndex: index,
        list,
      });
  }, [activeIndex, list, setInitiative]);

  useEffect(() => {
    reset();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectedUsers]);

  return (
    <Card title={
      <div className="flex justify-between">
        <Title>Initiative</Title>
        <Button type="secondary" onClick={reset} title="reset">
          <Icon name="DICE" />
        </Button>
      </div>
     } useDividers>
      {
        list.map(({avatar, name}, index) => (
          <div key={name} className="flex justify-between p-1 space-x-2" onClick={() => setActiveIndex(index)}>
            <div className="flex items-center space-x-2">
              <Avatar url={avatar} text={name} size="small" />
              <BodyText>{name}</BodyText>
            </div>
            {activeIndex === index && <Icon name="CHECK" />}
          </div>
        ))
      }
    </Card>
  )
}