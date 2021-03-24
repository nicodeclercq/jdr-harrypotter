import React from 'react';
import { Select } from '../../components/Select';

type Props = {
  onChange: (orderCategory: Category, orderDirection: Direction) => void;
  initialOrderCategory: Category;
  initialOrderDirection: Direction;
};

export type Category = 'Level' | 'Name' | 'Incantation' | 'PrimaryElement' | 'SecondaryElement';
export type Direction = 'Asc' | 'Desc';

export function Filter({ onChange, initialOrderCategory, initialOrderDirection }: Props) {

  return (
    <div className="space-x-1">
              <Select
                onChange={(value) => {onChange(value, initialOrderDirection)}}
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
                onChange={(value) => {onChange(initialOrderCategory, value)}}
                options={
                  [
                    {label: 'Croissant', value: 'Asc'},
                    {label: 'Décroissant', value: 'Desc'}
                  ]
                }
              />
            </div>
  );
}