import React, { useState } from "react";
import { Accordion } from "../../components/Accordion";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Title } from "../../components/font/Title";
import { Icon } from "../../components/icons/Icon";
import { Layout } from "../../components/Layout";
import { Money } from "../../components/MoneyConverter";
import { getNRandomFromArray } from "../../helpers/array";
import { random, addRandomPercent } from "../../helpers/number";
import { foodAndDrinks, magicalObjects, normalObjects } from "./objects";
import { ingredients, Ingredient } from "../potions/potions";
import { Caption } from "../../components/font/Caption";

export const commonMagical = magicalObjects.filter(({cost, knowledge}) => cost < 100 || knowledge > 60 || knowledge <= 30);
export const usualMagical = magicalObjects.filter(({cost, knowledge}) => (cost >= 100 && cost < 1000) || (knowledge > 30 && knowledge <=60));
export const rareMagical = magicalObjects.filter(({cost, knowledge}) => cost >= 1000 || (knowledge > 30 && knowledge <= 60));

export const common = normalObjects.filter(({cost}) => cost < 50);
export const usual = normalObjects.filter(({cost}) => cost >= 50 && cost < 80);
export const rare = normalObjects.filter(({cost}) => cost >= 80);

type ItemProps = {
  id: string,
  initialCost: number,
  cost: number,
  knowledge: number,
  name: string,
  description: string,
  side: string,
};

const Item = ({id, initialCost, cost, knowledge, name, description, side}: ItemProps) => (
  <Accordion>
    {{
      header: (<>
        <div className="text-gray-400"><Caption>#{id}</Caption></div>
        <div className="flex justify-between space-x-1">
          <div className="flex space-x-1">
            {
              side === '-'
                ? <div className="text-red-400"> <Icon name="EVIL" /></div>
                : <div className="text-gray-400"> <Icon name="SORCERER" /></div>
            }
            <div>{name}</div>
          </div>
          {knowledge !== 100 && <div>({knowledge}%)</div>}
        </div>
      </>),
      content: (
      <div>
        <div>{description}</div>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex p-1 border border-green-400 rounded space-x-2"><Money value={cost} /></div>
          <div className="p-1 bg-gray-200 rounded space-x-2">
            {initialCost !== cost && <div className="flex"><Money value={initialCost}/></div>}
            <div className="flex p-1 bg-gray-300 rounded transform scale-75"><Money value={Math.round(initialCost / 2)}/></div>
          </div>
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
          <div className="flex justify-between space-x-2">
            <div className="flex p-1 border border-green-400 rounded space-x-2">
              <Money value={addRandomPercent(percent,cost)} />
            </div>
            <div className="flex p-1 bg-gray-200 rounded space-x-2">
              (<Money value={cost}/>)
            </div>
          </div>
        ),
      }}
    </Accordion>
  )
}

const getPoorItems = () => [
  ...getNRandomFromArray(2, commonMagical),
  ...getNRandomFromArray(1, usualMagical),
  ...getNRandomFromArray(2, common),
  ...getNRandomFromArray(1, usual)
].sort(() => random(0,2) - 1);
const getNormalItems = () => [
  ...getNRandomFromArray(2, commonMagical),
  ...getNRandomFromArray(2, usualMagical),
  ...getNRandomFromArray(2, common),
  ...getNRandomFromArray(2, usual)
].sort(() => random(0,2) - 1);
const getRichItems = () => [
  ...getNRandomFromArray(3, usualMagical),
  ...getNRandomFromArray(1, rareMagical),
  ...getNRandomFromArray(3, usual),
  ...getNRandomFromArray(1, rare)
].sort(() => random(0,2) - 1);

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
      <div className="flex w-full h-full gap-2">
        <div className="w-1/3">
        <Card title="Objets magiques" useDividers>
          {
            magicalObjects.sort((a, b) => a.cost > b.cost ? 1 : -1).map(({id, cost, name, description, knowledge, side}) => (
              <Item key={name} id={id} initialCost={cost} cost={cost} description={description} knowledge={knowledge} name={name} side={side}/>
            ))
          }
        </Card>
        </div>
        <div className="w-1/3">
        <Card title="Objets normaux" useDividers>
          {
            normalObjects.sort((a, b) => a.cost > b.cost ? 1 : -1).map(({id, cost, name, description, knowledge, side}) => (
              <Item key={name} id={id} initialCost={cost} cost={cost} description={description} knowledge={knowledge} name={name} side={side}/>
            ))
          }
        </Card>
        </div>
        <div className="flex flex-col flex-grow gap-2">
          <Card title={(
            <div className="flex items-center gap-2">
              <Icon name="BEER" />
              <Title>Pub</Title>
            </div>
            )}
            useDividers
          >
            {
              foodAndDrinks.drinks.map(({name, cost}) => (
                <div className="flex justify-between px-6 py-2">
                  <div>{name}</div>
                  <div className="flex gap-1"><Money value={random(cost - cost * 5 / 100, cost + cost * 5 / 100)} /></div>
                </div>
              ))
            }
            <hr className="border border-6"/>
            {
              foodAndDrinks.food.map(({name, cost}) => (
                <div className="flex justify-between px-6 py-2">
                  <div>{name}</div>
                  <div className="flex gap-1"><Money value={random(cost - cost * 5 / 100, cost + cost * 5 / 100)} /></div>
                </div>
              ))
            }
          </Card>
          <Card title={
            <div className="flex justify-between">
              <Title>Boutique Pauvre</Title>
              <Button type="secondary" onClick={() => {setPoor(getPoorItems()); setPoorIngredients(getPoorIngredients()) }}>
                <Icon name="DICE" />
              </Button>
              </div>
            }
            useDividers
          >
            {
              poor.map(({id, cost, name, description, knowledge, side}) => (
                <Item key={name} id={id} initialCost={cost} cost={addRandomPercent(5,cost)} description={description} knowledge={knowledge} name={name} side={side}/>
              ))
            }
            {
              poorIngredients.map(({name, scarcity}) => <IngredientItem key={name} percent={5} name={name} scarcity={scarcity} />)
            }
          </Card>
          <Card title={
            <div className="flex justify-between">
              <Title>Boutique Normal</Title>
              <Button type="secondary" onClick={() => {setNormal(getNormalItems()); setNormalIngredients(getNormalIngredients()) } }>
                <Icon name="DICE" />
              </Button>
              </div>
            }
            useDividers
          >
            {
              normal.map(({id, cost, name, description, knowledge, side}) => <Item key={name} id={id} initialCost={cost} cost={addRandomPercent(10,cost)} description={description} knowledge={knowledge} name={name} side={side}/>)
            }
            {
              normalIngredients.map(({name, scarcity}) => <IngredientItem key={name} percent={10} name={name} scarcity={scarcity} />)
            }
          </Card>
          <Card title={
            <div className="flex justify-between">
              <Title>Boutique Riche</Title>
              <Button type="secondary" onClick={() => { setRich(getRichItems()); setRichIngredients(getRichIngredients()) } }>
                <Icon name="DICE" />
              </Button>
              </div>
            }
            useDividers
          >
            {
              rich.map(({id, cost, name, description, knowledge, side}) => (<>
              <Item key={name} id={id} initialCost={cost} cost={addRandomPercent(20,cost)} description={description} knowledge={knowledge} name={name} side={side}/>
              </>))
            }
            {
              richIngredients.map(({name, scarcity}) => <IngredientItem key={name} percent={20} name={name} scarcity={scarcity} />)
            }
          </Card>
        </div>
      </div>
    </Layout>
  );
}