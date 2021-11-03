import React, { useState } from "react";
import { Accordion } from "../../components/Accordion";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Title } from "../../components/font/Title";
import { Icon } from "../../components/icons/Icon";
import { Layout } from "../../components/Layout";
import { Money } from "../../components/MoneyConverter";
import { getNRandomFromArray } from "../../helpers/array";
import { random } from "../../helpers/number";
import { magicalObjects } from "./objects";
import { ingredients, Ingredient } from "../potions/potions";

export const common = magicalObjects.filter(({cost, knowledge}) => cost < 100 || knowledge > 60 || knowledge <= 30);
export const usual = magicalObjects.filter(({cost, knowledge}) => (cost >= 100 && cost < 1000) || (knowledge > 30 && knowledge <=60));
export const rare = magicalObjects.filter(({cost, knowledge}) => cost >= 1000 || (knowledge > 30 && knowledge <= 60));

type ItemProps = {
  initialCost: number,
  cost: number,
  knowledge: number,
  name: string,
  description: string,
  side: string,
};

const Item = ({initialCost, cost, knowledge, name, description, side}: ItemProps) => (
  <Accordion>
    {{
      header: (
        <div className="flex justify-between space-x-1">
          <div className="flex space-x-1">
            {
              side === '-'
                ? <div className="text-red-400"> <Icon name="EVIL" /></div>
                : <div className="text-gray-400"> <Icon name="SORCERER" /></div>
            }
            <div>{name}</div>
          </div>
          <div>({knowledge}%)</div>
        </div>
      ),
      content: (
      <div>
        <div>{description}</div>
        <div className="flex justify-between space-x-2">
          <div className="flex p-1 border border-green-400 rounded space-x-2"><Money value={cost} /></div>
          <div className="flex p-1 bg-gray-200 rounded space-x-2">(<Money value={initialCost}/>)</div>
        </div>
      </div>
      ),
    }}
  </Accordion>
)

const INGREDIENT_COST = {
  'Commun': 5,
  'Usuel': 50,
  'Insolite': 100,
  'Très rare': 1000,
} as const;

const IngredientItem = ({percent, name, scarcity}: {percent: number, name: string, scarcity: Ingredient['scarcity']}) => {
  const cost = INGREDIENT_COST[scarcity];
  return (
    <Accordion>
      {{
        header: (
          <div className="flex justify-between space-x-1">
            <div className="flex space-x-1">
              <div className="text-green-400">
                <Icon name="PLANT" />
              </div>
              <div>{name}</div>
            </div>
          </div>
        ),
        content: (
        <div>
          <div>{scarcity}</div>
          <div className="flex justify-between space-x-2">
            <div className="flex p-1 border border-green-400 rounded space-x-2">
              <Money value={random(cost, cost + cost * percent)} />
            </div>
            <div className="flex p-1 bg-gray-200 rounded space-x-2">
              (<Money value={cost}/>)
            </div>
          </div>
        </div>
        ),
      }}
    </Accordion>
  )
}

const getPoorItems = () => [...getNRandomFromArray(2, common), ...getNRandomFromArray(1, usual)];
const getNormalItems = () => [...getNRandomFromArray(2, common), ...getNRandomFromArray(2, usual)];
const getRichItems = () => [...getNRandomFromArray(3, usual), ...getNRandomFromArray(2, rare)];

const getPoorIngredients = () => getNRandomFromArray(5, ingredients.filter(({scarcity}) => scarcity === 'Commun'));
const getNormalIngredients = () => getNRandomFromArray(4, ingredients.filter(({scarcity}) => scarcity === 'Commun' || scarcity === 'Usuel'));
const getRichIngredients = () => getNRandomFromArray(3, ingredients.filter(({scarcity}) => scarcity === 'Insolite' || scarcity === 'Très rare'));

export function ShopPage(){
  const [poor, setPoor] = useState(getPoorItems());
  const [normal, setNormal] = useState(getNormalItems());
  const [rich, setRich] = useState(getRichItems());
  const [poorIngredients, setPoorIngredients] = useState(getPoorIngredients());
  const [normalIngredients, setNormalIngredients] = useState(getNormalIngredients());
  const [richIngredients, setRichIngredients] = useState(getRichIngredients());

  return (
    <Layout>
      <div className="w-full grid lg:grid-cols-4 gap-2 md:grid-cols-2 sm:grid-cols-1">
        <Card title="Objets magiques">
          {
            magicalObjects.sort((a, b) => a.cost > b.cost ? 1 : -1).map(({cost, name, description, knowledge, side}) => (
              <Item key={name} initialCost={cost} cost={random(cost - cost * 5 / 100, cost + cost * 5 / 100)} description={description} knowledge={knowledge} name={name} side={side}/>
            ))
          }
        </Card>
        <Card title={<div className="flex justify-between"><Title>Boutique Pauvre</Title><Button type="secondary" onClick={() => {setPoor(getPoorItems()); setPoorIngredients(getPoorIngredients()) }}><Icon name="DICE" /></Button></div>} useDividers>
          {
            poor.map(({cost, name, description, knowledge, side}) => (
              <Item key={name} initialCost={cost} cost={random(cost - cost * 5 / 100, cost + cost * 5 / 100)} description={description} knowledge={knowledge} name={name} side={side}/>
            ))
          }
          {
            poorIngredients.map(({name, scarcity}) => <IngredientItem key={name} percent={5} name={name} scarcity={scarcity} />)
          }
        </Card>
        <Card title={<div className="flex justify-between"><Title>Boutique Normal</Title><Button type="secondary" onClick={() => {setNormal(getNormalItems()); setNormalIngredients(getNormalIngredients()) } }><Icon name="DICE" /></Button></div>} useDividers>
          {
            normal.map(({cost, name, description, knowledge, side}) => <Item key={name} initialCost={cost} cost={random(cost, cost + cost * 10 / 100)} description={description} knowledge={knowledge} name={name} side={side}/>)
          }
          {
            normalIngredients.map(({name, scarcity}) => <IngredientItem key={name} percent={10} name={name} scarcity={scarcity} />)
          }
        </Card>
        <Card title={<div className="flex justify-between"><Title>Boutique Riche</Title><Button type="secondary" onClick={() => { setRich(getRichItems()); setRichIngredients(getRichIngredients()) } }><Icon name="DICE" /></Button></div>} useDividers>
          {
            rich.map(({cost, name, description, knowledge, side}) => (<>
            <Item key={name} initialCost={cost} cost={random(cost, cost + cost * 20 / 100)} description={description} knowledge={knowledge} name={name} side={side}/>
            </>))
          }
          {
            richIngredients.map(({name, scarcity}) => <IngredientItem key={name} percent={20} name={name} scarcity={scarcity} />)
          }
        </Card>
      </div>
    </Layout>
  );
}