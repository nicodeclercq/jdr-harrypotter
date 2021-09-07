import React from 'react';
import { Button } from '../../components/Button';

type Props = {callback: () => void};

export function Welcome ({callback}: Props) {
  return (
    <div className="flex flex-col p-2 space-y-4">
      <p>
        C'est parti.
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