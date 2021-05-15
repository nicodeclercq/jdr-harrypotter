import React from 'react';
import { Button } from '../../components/Button';

type Props = {callback: () => void};

export function Welcome ({callback}: Props) {
  return (
    <div className="flex flex-col p-2 space-y-4">
      <p>
        Avant de commencer sache que tout ce que tu inscris ici est <strong>sauvegardé en cache sur ton navigateur.
        </strong> Ainsi si tu changes de navigateur, d'ordinateur, que tu effaces ton historique de navigation ou qu'il se passe quoi que ce soit d'imprévue
        (les bugs ici n'existant évidemment pas) tu pourras dire avec nous cette magnifique phrases dont la véracité n'a d'égale
        que sa douce simplicité « C’est balot! ».
      </p>
      <div>
        <div className="flex flex-row p-2 space-x-4">
          <input id="🙈" type="checkbox"/><label htmlFor="🙈">J'accepte l'inacceptable *</label>
        </div>
      </div>
      <Button onClick={callback} type="primary">En avant!</Button>
      <small>* Cette case à cocher ne sert à rien mais c'est devenue à la mode du coup j'en met une aussi, ça fait tout de suite plus pro vous ne trouvez pas?</small>
    </div>
  );
}