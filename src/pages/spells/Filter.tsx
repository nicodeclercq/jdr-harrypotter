import React from 'react';
import { Checkbox } from '../../components/Checkbox';
import { Select } from '../../components/Select';

type Props = {
  onChange: (orderCategory: Category, orderDirection: Direction, showKnown: boolean) => void;
  initialOrderCategory: Category;
  initialOrderDirection: Direction;
  initialShowKnown: boolean;
};

export type Category = 'Level' | 'Name' | 'Incantation' | 'PrimaryElement' | 'SecondaryElement';
export type Direction = 'Asc' | 'Desc';

export function Filter({ onChange, initialOrderCategory, initialOrderDirection, initialShowKnown }: Props) {

  return (
    <div className="space-x-1">
              <Select
                onChange={(value) => {onChange(value, initialOrderDirection, initialShowKnown)}}
                options={
                  [
                    {label: 'Niveau', value: 'Level'},
                    {label: 'Incantation', value: 'Incantation'},
                    {label: 'Nom', value: 'Name'},
                    /*
                    {label: 'Élément primaire', value: 'PrimaryElement'},
                    {label: 'Élément secondaire', value: 'SecondaryElement'},
                    */
                  ]
                }
              />
              <Select
                onChange={(value) => {onChange(initialOrderCategory, value, initialShowKnown)}}
                options={
                  [
                    {label: 'Croissant', value: 'Asc'},
                    {label: 'Décroissant', value: 'Desc'}
                  ]
                }
              />
              <Checkbox label="Afficher les sorts connus" theme="base" type="checkbox" value={`${initialShowKnown}`} onChange={(value) => onChange(initialOrderCategory, initialOrderDirection, value)} />
            </div>
  );
}