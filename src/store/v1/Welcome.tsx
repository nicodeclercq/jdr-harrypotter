import React from "react";
import { Button } from "../../components/Button";

type Props = { callback: () => void };

export function Welcome({ callback }: Props) {
  return (
    <div className="flex flex-col p-2 space-y-4">
      <p>C&apos;est parti.</p>
      <div>
        <div className="flex flex-row p-2 space-x-4">
          <input id="🙈" type="checkbox" />
          <label htmlFor="🙈">J&apos;accepte l&apos;inacceptable *</label>
        </div>
      </div>
      <Button onClick={callback} type="primary">
        En avant!
      </Button>
      <small>
        * Cette case à cocher ne sert à rien mais c&apos;est devenue à la mode
        du coup j&apos;en met une aussi, ça fait tout de suite plus pro vous ne
        trouvez pas?
      </small>
    </div>
  );
}
