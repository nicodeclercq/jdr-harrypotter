import * as IO from 'io-ts';
import { prompt } from '../helpers/io';
import { Button } from '../components/Button';

export type Target = 'Animal' | 'Object' | 'Person' | 'Plant';
export type Element = 'Feu' | 'Air' | 'Eau' | 'Terre' | 'Âme' | 'Corps';

export type Spell = {
  name: string;
  incantation: string;
  description: string;
  targets: {
    [key in Target]: boolean;
  };
  level: number;
  primaryElement: Element;
  secondaryElement: Element;
};

export type State = {
  userSpells: Spell[],
  uses: Record<string, number>,
};
export const defaultState: State = {
  userSpells: [],
  uses: {},
};

export const elementDecoder = IO.union([
  IO.literal('Air'),
  IO.literal('Eau'),
  IO.literal('Terre'),
  IO.literal('Feu'),
  IO.literal('Âme'),
  IO.literal('Corps'),
]);
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
export const stateDecoder = IO.strict({
  userSpells: IO.array(spellDecoder),
  uses: IO.record(IO.string, IO.number),
});

const Welcome = ({callback}: {callback: () => void}) => (
  <div className="flex flex-col space-y-4 p-2">
    <p>
      Avant de commencer sache que tout ce que tu inscris ici est <strong>sauvegardé en cache sur ton navigateur.
      </strong> Ainsi si tu changes de navigateur, d'ordinateur ou qu'il se passe quoi que ce soit d'imprévue
      (les bugs ici n'existant évidemment pas) tu pourras dire avec nous cette magnifique phrases dont la véracité n'a d'égale
      que sa douce simplicité « C’est balot! ».
    </p>
    <div>
      <div className="flex flex-row space-x-4 p-2">
        <input id="🙈" type="checkbox"/><label htmlFor="🙈">J'accepte l'inacceptable *</label>
      </div>
    </div>
    <Button onClick={callback} type="primary">En avant!</Button>
    <small>* Cette case à cocher ne sert à rien mais c'est devenue à la mode du coup j'en met une aussi, ça fait tout de suite plus pro vous ne trouvez pas?</small>
  </div>
);

function update(_currentState: unknown): Promise<State> {
  return Promise.resolve()
    .then(
      () => prompt<void>(
        (callback: () => void) => <Welcome callback={callback} />,
        <>Bienvenue sur ta fiche de personnage</>
      )
    )
    .then(() => defaultState)
}

export function retrieve(currentState: unknown): Promise<State> {
  return stateDecoder.is(currentState)
    ? Promise.resolve(currentState)
    : update(currentState);
}