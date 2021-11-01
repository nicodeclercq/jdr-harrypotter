import React from 'react';
import { pipe } from 'fp-ts/function';
import * as RemoteData from '@devexperts/remote-data-ts';

import { Layout } from '../../components/Layout';
import { PlayingCard } from '../../components/PlayingCard/PlayingCard';
import { fromRemoteData, sequence } from '../../helpers/remoteData';
import { eventCards } from './eventCards';
import { useCard } from './useCard';
import { getNRandomIndexFromFilteredArray } from '../../helpers/array';
import { values } from '../../helpers/object';
import { Button } from '../../components/Button';
import { Info } from '../../components/Info';

export function CartomancyPage() {
  const { getCardsNumber, getVisibleCards, getUsedCards, shuffleDeck, revealCard, playCard } = useCard();

  return pipe(
    sequence({
      cardsNumber: getCardsNumber(),
      visibleCards: getVisibleCards(),
      usedCards: getUsedCards(),
    }),
    RemoteData.map(({cardsNumber, visibleCards, usedCards}) => {
      const forbidenIndexes = [...values(visibleCards).filter(c => c != null), ...usedCards];
      const randomValues = getNRandomIndexFromFilteredArray(cardsNumber, (_, index) => !forbidenIndexes.includes(index), eventCards);

      return visibleCards
        .map((card, i) =>
          card != null
            ? {isVisible: true, index: card}
            : {
                isVisible: false,
                index: randomValues[i],
              }  
        );
    }),
    fromRemoteData((cards) => (
      <Layout>
        <div className="max-h-full overflow-y-auto space-y-4">
        <Info icon="CARD">
          Le cartomancien est un maître en divination,
          il peut entre-apercevoir des éléments à venir grâce à la magie des cartes.
          <br />
          Avant de tirer les cartes le cartomancien se retire dans un lieu calme où il pourra ouvrir son troisième oeil
          sans risque d'être dérangé. Une prediction lui prend une dizaine de minutes.
        </Info>
          <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {
              cards.map(({isVisible, index}, key) => index != null
                  ? <PlayingCard
                      key={`${key}_${index}`}
                      isRevealed={isVisible}
                      onClick={() => isVisible ? playCard(key, index) : revealCard(key, index)}
                      title={eventCards[index].title}
                      description={eventCards[index].description}
                      image={eventCards[index].image}
                    />
                  : <div className="flex flex-col p-2 border-2 border-gray-400 border-dashed space-y-4 rounded-2xl" style={{width: '16rem', minHeight: '24rem'}}>
                    </div>
              )
            }
          </div>
          <div  className={`${cards.every(({index}) => index == null) ? 'visible' : 'invisible'} flex flex-col items-center justify-center text-white space-y-2`}>
            <span>Tu as utilisé toutes tes cartes</span>
            <Button type="primary" onClick={shuffleDeck}>Mélanger le paquet</Button>
          </div>
        </div>
      </Layout>
    ))
  )
}