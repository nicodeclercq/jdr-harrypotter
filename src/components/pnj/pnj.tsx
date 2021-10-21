import React, { useState } from 'react';
import { random } from '../../helpers/number';
import { Button } from '../Button';
import { Card } from '../Card';
import { BodyText } from '../font/BodyText';
import { Title } from '../font/Title';
import { Icon } from '../icons/Icon';
import { characters, getRandomAge, sexes, colors, firstnames, lastnames, magics } from './character';

type PNJType = {
  name: string;
  character: string[];
  age: number;
  sex: string;
  color: {name: string, color: string},
  magics: string;
}


const makeCharacter = () => {
  const sex = sexes[random(0, sexes.length -1)];

  return {
    character: [
      characters[random(0, characters.length -1)],
      characters[random(0, characters.length -1)]
    ],
    sex,
    age: getRandomAge(),
    color: colors[random(0, colors.length -1)],
    name: `${firstnames[sex][random(0, firstnames[sex].length)]} ${lastnames[random(0, lastnames.length)]}`,
    magics: magics[random(0, magics.length - 1)],
  }
}

export function PNJ(){
  const [current, setCurrent] = useState<PNJType>(makeCharacter());

  return (
    <Card title={
      <div className="flex justify-between">
        <Title>{current.name} <Icon name={current.sex === 'Homme' ? 'MALE' : 'FEMALE'} /></Title>
        <Button type="secondary" onClick={() => setCurrent(makeCharacter())} title="reset">
          <Icon name="DICE" />
        </Button>
      </div>
    } useDividers>
      <div className="px-2 py-1"><BodyText>{current.character.join(' | ')}</BodyText></div>
      <div className="px-2 py-1"><BodyText>{current.age} ans</BodyText></div>
      <div className="px-2 py-1"><BodyText>{current.magics}</BodyText></div>
      <div className="flex items-center px-2 py-1 flex-rows space-x-2">
        <div className="w-8 h-8 border border-white rounded-full shadow" style={{background: `#${current.color.color}`}}></div>
        <BodyText>{current.color.name}</BodyText>
      </div>
    </Card>
  )
}