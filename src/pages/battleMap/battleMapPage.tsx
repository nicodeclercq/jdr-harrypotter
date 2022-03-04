import React from 'react';
import { Avatar } from '../../components/Avatar';
import { Draggable } from '../../components/Draggable';
import { Layout } from '../../components/Layout';
import { entries } from '../../helpers/object';
import { useTokens } from './useTokens';

export function Token ({x, y , name, image, onDragStop}: {
    x: number,
    y: number,
    name: string,
    image?: string,
    onDragStop: (newPosition: {x: number, y: number}) => void;
  }
) {
  return (
    <Draggable position={{y, x}} onDragStop={onDragStop}>
      <Avatar text={name} url={image} />
    </Draggable>
  )
}

export function BattleMapPage() {
  const { tokens } = useTokens();

  const onDragStop = (name: string) => (newPosition: {x: number, y: number}) => {
    console.log(name, newPosition);
  };

  return (
    <Layout>
      {
        entries(tokens).map(([name, {x, y, image}]) => (
          <Token key={name} name={name}  x={x} y={y} image={image} onDragStop={onDragStop(name)} />
        ))
      }
    </Layout>
  )
}