import * as IO from 'io-ts';
import { pipe } from 'fp-ts/function';

import { prompt } from '../../helpers/io';
import { retrieveFromVersion } from '../helper';
import { Welcome } from './Welcome';
import { NameForm } from './NameForm';
import { ExternalStore } from '../ExternalStore';
import { NotificationService } from '../../NotificationService';

const version = 'V1';

export const targetDecoder = IO.union([
  IO.literal('Animal'),
  IO.literal('Object'),
  IO.literal('Person'),
  IO.literal('Plant'),
]);

export type Target = IO.TypeOf<typeof targetDecoder>;

export const elementDecoder = IO.union([
  IO.literal('Air'),
  IO.literal('Eau'),
  IO.literal('Terre'),
  IO.literal('Feu'),
  IO.literal('Âme'),
  IO.literal('Corps'),
]);

export type Element = IO.TypeOf<typeof elementDecoder>;

export const spellDecoder = IO.strict({
  name: IO.string,
  incantation: IO.string,
  description: IO.string,
  targets: IO.strict({
    Animal: IO.boolean,
    Object: IO.boolean, 
    Person: IO.boolean,
    Plant: IO.boolean,
  }),
  level: IO.number,
  primaryElement: elementDecoder,
  secondaryElement: elementDecoder,
});

export type Spell = IO.TypeOf<typeof spellDecoder>;

export const userDecoder = IO.type({
  name: IO.string,
  imageUrl: IO.union([
    IO.null,
    IO.undefined,
    IO.string,
  ]),
});

export type User = IO.TypeOf<typeof userDecoder>;

export const stateDecoder = IO.type({
  user: userDecoder,
  userSpells: IO.array(spellDecoder),
  uses: IO.record(IO.string, IO.number),
});

export type State = IO.TypeOf<typeof stateDecoder>;

export const defaultState: State = {
  user: {name: '', imageUrl: undefined},
  userSpells: [],
  uses: {},
};

function update(_currentState: unknown, name: string | undefined): Promise<State> {
  return Promise.resolve()
    .then(
      () => prompt<void>(
        (callback: () => void) => <Welcome callback={callback} />,
        <>Bienvenue sur ta fiche de personnage</>
      )
    )
    .then(() => {
      console.log('name', name)
    })
    .then(() => 
      name
        ? name
        : prompt<string>(
          (callback: (result: string) => void) => <NameForm defaultValue={defaultState.user.name} callback={callback} />,
          <>Qui est ton personnage ?</>
        )
    )
    .then((name) => ({
      ...defaultState,
      user: {
        name
      }
    }) as State);
}

export function retrieve(currentState: unknown, name: string | undefined): Promise<State> {
  return retrieveFromVersion(
    version,
    currentState,
    stateDecoder,
    () => pipe(
      currentState,
      s => update(s, name)
        .then((s) => {
          ExternalStore.create(s.user.name)
            .catch((error) => {
              console.error('Unable to create user remotely', error);
              NotificationService.add({
                id: 'ExternalStore',
                message: 'Sauvegarde externe impossible',
                type: 'failure',
                action: {
                  label: 'Réessayer',
                  run: () => ExternalStore.create(s.user.name),
                }
              })
            });
          return s;
        }),
    )
  );
}