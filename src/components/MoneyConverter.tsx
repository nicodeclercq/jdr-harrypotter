import React, { useCallback, useState } from 'react';
import { getDivisions, CurrencyDivisions } from '../helpers/moneyHelper';
import { withNDecimals } from '../helpers/number';
import { Card } from './Card';
import { Caption } from './font/Caption';
import { Comment } from './font/Comment';
import { Title } from './font/Title';
import { Icon } from './icons/Icon';
import { Input } from './Input';

const EURO_TO_NOISE_FACTOR = 50;

const currency = `
  1G=${CurrencyDivisions.gallion / EURO_TO_NOISE_FACTOR}€,
  1M=${CurrencyDivisions.mornille / EURO_TO_NOISE_FACTOR}€,
  1N=${CurrencyDivisions.noise / EURO_TO_NOISE_FACTOR}€
`;
const divisions = `
  1G=${CurrencyDivisions.gallion /CurrencyDivisions.mornille}M,
  1G=${CurrencyDivisions.gallion /CurrencyDivisions.noise}N,
  1M=${CurrencyDivisions.mornille /CurrencyDivisions.noise}N
`;

export function Money({value}: {value: number}) {
  const division = getDivisions((value || 0) * EURO_TO_NOISE_FACTOR);

  return (<>
    <div className="flex items-end space-x-1" title="Gallion">
      <span>{division.gallion}</span>
      <span style={{color: 'goldenrod'}}><Icon name="COIN" /></span>
    </div>
    <div className="flex items-center space-x-1" title="Mornille">
      <span>{division.mornille}</span>
      <span style={{color: 'silver'}}><Icon name="COIN" /></span>
    </div>
    <div className="flex items-center space-x-1" title="Noise">
      <span>{division.noise}</span>
      <span style={{color: '#b87333'}}><Icon name="COIN" /></span>
    </div>
  </>);
}

export function MoneyConverter() {
  const [value, setValue] = useState<number>();
  const [galion, setGalion] = useState<number>();
  const [mornille, setMornille] = useState<number>();
  const [noise, setNoise] = useState<number>();

  const getEuros = useCallback(() => {
    console.log(galion, mornille, noise)
    return withNDecimals(
      2,
      (!!galion ? galion : 0) * CurrencyDivisions.gallion / EURO_TO_NOISE_FACTOR
        + (!!mornille ? mornille : 0) * CurrencyDivisions.mornille / EURO_TO_NOISE_FACTOR
        + (!!noise ? noise : 0) * CurrencyDivisions.noise / EURO_TO_NOISE_FACTOR
    );
  }, [galion, mornille, noise]);

  return (
    <Card
      title={
        <div className="flex justify-between space-x-1">
          <div className="flex items-center space-x-1">
            <Title>Calculatrice</Title><Caption>({currency})</Caption>
          </div>
          <Comment>{divisions}</Comment>
        </div>
      }
      useDividers
    >
      <div className="flex justify-between px-2 py-1 space-x-2">
        <span><Input theme="neutral" onChange={setValue} type="number" />&nbsp;€</span>
        <div className="flex space-x-2">
          <Money value={value || 0} />
        </div>
      </div>
      <div className="flex justify-between px-2 py-1 space-x-2">
        <div className="flex justify-between space-x-2">
          <span>
            <Input theme="neutral" width="7ch" onChange={setGalion} type="number" />&nbsp;
            <span style={{color: 'goldenrod'}}><Icon name="COIN" /></span>
          </span>
          <span>
            <Input theme="neutral" width="7ch" onChange={setMornille} type="number" />&nbsp;
            <span style={{color: 'silver'}}><Icon name="COIN" /></span>
          </span>
          <span>
            <Input theme="neutral" width="7ch" onChange={setNoise} type="number" />&nbsp;
            <span style={{color: '#b87333'}}><Icon name="COIN" /></span>
          </span>
        </div>
        <div className="flex space-x-2">
          {getEuros()}&nbsp;€
        </div>
      </div>
    </Card>
  )
}