import React, { useState } from 'react';
import { Accordion } from '../../components/Accordion';
import { Button } from '../../components/Button';
import { Card } from '../../components/Card';
import { Title } from '../../components/font/Title';
import { Icon } from '../../components/icons/Icon';
import { Layout } from '../../components/Layout';
import { Money } from '../../components/MoneyConverter';
import { getNRandomFromArray } from '../../helpers/array';
import { random } from '../../helpers/number';
import { ingredients } from '../potions/potions';
import { common, rare, usual } from '../shop/ShopPage';

const getPoorItems = () => getNRandomFromArray(random(0, 1), [...common]);;
const getNormalItems = () => getNRandomFromArray(random(0, 1), [...usual, ...common]);
const getRichItems = () => getNRandomFromArray(random(1, 2), [...usual, ...rare]);

const getPoorIngredients = () => getNRandomFromArray(random(0, 3), ingredients.filter(({scarcity}) => scarcity === 'Commun'));
const getNormalIngredients = () => getNRandomFromArray(random(0, 3), ingredients.filter(({scarcity}) => scarcity === 'Commun' || scarcity === 'Usuel'));
const getRichIngredients = () => getNRandomFromArray(random(0, 3), ingredients.filter(({scarcity}) => scarcity === 'Insolite' || scarcity === 'Très rare'));

export function TreasurePage(){
  const [poor, setPoor] = useState(getPoorItems());
  const [normal, setNormal] = useState(getNormalItems());
  const [rich, setRich] = useState(getRichItems());
  const [poorIngredients, setPoorIngredients] = useState(getPoorIngredients());
  const [normalIngredients, setNormalIngredients] = useState(getNormalIngredients());
  const [richIngredients, setRichIngredients] = useState(getRichIngredients());

  return (
    <Layout>
      <div className="w-full grid lg:grid-cols-3 gap-2 md:grid-cols-2 sm:grid-cols-1">
        <Card title={<div className="flex justify-between"><Title>Pauvre</Title><Button type="secondary" onClick={() => {setPoor(getPoorItems()); setPoorIngredients(getPoorIngredients()) }}><Icon name="DICE" /></Button></div>} useDividers>
          {poor.map(p =>
            <Accordion>
              {{
                header: <div className="flex justify-between"><div>{p.name}</div><div>({p.knowledge}%)</div></div>,
                content: p.description
              }}
            </Accordion>
          )}
          {poorIngredients.map(p => <div className=" px-4 py-2">{p.name}</div>)}
          <div className="flex px-4 py-2 space-x-2">
            <Money value={random(0, 30)} />
          </div>
        </Card>
        <Card title={<div className="flex justify-between"><Title>Normal</Title><Button type="secondary" onClick={() => {setNormal(getNormalItems()); setNormalIngredients(getNormalIngredients()) }}><Icon name="DICE" /></Button></div>} useDividers>
          {
          normal.map(p =>
            <Accordion>
              {{
                header: <div className="flex justify-between"><div>{p.name}</div><div>({p.knowledge}%)</div></div>,
                content: p.description
              }}
            </Accordion>
          )}
          {normalIngredients.map(p => <div className=" px-4 py-2">{p.name}</div>)}
          <div className="flex px-4 py-2 space-x-2">
            <Money value={random(10, 60)} />
          </div>
        </Card>
        <Card title={<div className="flex justify-between"><Title>Riche</Title><Button type="secondary" onClick={() => {setRich(getRichItems()); setRichIngredients(getRichIngredients()) }}><Icon name="DICE" /></Button></div>} useDividers>
          {rich.map(p =>
            <Accordion>
              {{
                header: <div className="flex justify-between"><div>{p.name}</div><div>({p.knowledge}%)</div></div>,
                content: p.description
              }}
            </Accordion>
          )}
          {richIngredients.map(p => <div className=" px-4 py-2">{p.name}</div>)}
          <div className="flex px-4 py-2 space-x-2">
            <Money value={random(20, 100)} />
          </div>
        </Card>
      </div>
    </Layout>
  )
}