import React from 'react';
import { random } from '../../helpers/number';
import { usePersistantState } from '../../hooks/usePersistantState';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Card } from '../Card';
import { BodyText } from '../font/BodyText';
import { Title } from '../font/Title';
import { Icon } from '../icons/Icon';
import { characters, getRandomAge, sexes, colors, firstnames, lastnames, magics } from './character';
import { useGeneratedPhoto } from './useGeneratedPhoto';

type PNJType = {
  name: string;
  character: string[];
  age: number;
  sex: 'Homme' | 'Femme';
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
  const [current, setCurrent] = usePersistantState<PNJType>('RANDOM_PNJ', makeCharacter());
  const [avatar, regeneratePicture] = useGeneratedPhoto({
    age: current.age,
    genre: current.sex,
  });


  return (
    <Card title={
      <div className="flex items-center justify-between">
        <Title>
          <div className="flex items-center flex-rows space-x-2">
            <Avatar url={avatar} text={current.name} />
            <span>{current.name}</span>
            <Icon name={current.sex === 'Homme' ? 'MALE' : 'FEMALE'} />
          </div>
        </Title>
        <Button type="secondary" onClick={() => {
          const character = makeCharacter();
          setCurrent(character);
          regeneratePicture({age: character.age, genre: character.sex});
        }} title="reset">
          <Icon name="DICE" />
        </Button>
      </div>
    } useDividers>
      <div className="px-2 py-1"><BodyText>{current.character.join(' | ')}</BodyText></div>
      <div className="flex items-center px-2 py-1 flex-rows space-x-2"><BodyText>{current.age} ans</BodyText></div>
      <div className="px-2 py-1"><BodyText>{current.magics}</BodyText></div>
      <div className="flex items-center px-2 py-1 flex-rows space-x-2">
        <div className="w-8 h-8 border border-white rounded-full shadow" style={{background: `#${current.color.color}`}}></div>
        <BodyText>{current.color.name}</BodyText>
      </div>
    </Card>
  )
}