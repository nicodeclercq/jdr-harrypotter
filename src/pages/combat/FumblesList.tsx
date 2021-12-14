import React from 'react';
import { Accordion } from '../../components/Accordion';
import { Card } from '../../components/Card';
import { D100 } from '../../components/dice/D100';
import { D10 } from '../../components/dice/D10';
import { BodyText } from '../../components/font/BodyText';
import { Caption } from '../../components/font/Caption';
import { fumbles } from './fumbles';

export function FumblesList(){
  return (
    <Card title="Fumbles" useDividers>
      {
        fumbles.map(({name, effets, description}, index) => (
          <Accordion>
            {{
              header: (
                <div className="flex items-center space-x-1">
                  {
                    index * 2 + 1 >= 10
                      ? <D100 size={2} value={index * 2 + 1} />
                      : <D10 size={2} value={index * 2 + 1} />
                  }
                  {
                    index * 2 + 2 >= 10
                      ? <D100 size={2} value={index * 2 + 2 === 100 ? 0 : index * 2 + 2} />
                      : <D10 size={2} value={index * 2 + 2} />
                  }
                  <BodyText>{name}</BodyText>
                </div>
              ),
              content: (
                <>
                  <div className="py-2">
                    <BodyText>{description}</BodyText>
                  </div>
                  <hr />
                  <div className="py-2">
                    <Caption>{effets}</Caption>
                  </div>
                </>
              )
            }}
          </Accordion>
        ))
      }
    </Card>
  )
}