import { useState } from "react";
import { random } from "../../helpers/number";
import { usePersistantState } from "../../hooks/usePersistantState";
import { usePNJ } from "../../hooks/usePNJ";
// import { Avatar } from '../Avatar';
import { Button } from "../Button";
import { Card } from "../Card";
import { BodyText } from "../font/BodyText";
import { Title } from "../font/Title";
import { Icon } from "../icons/Icon";
import {
  speechSpecificity,
  psychologic,
  getRandomAge,
  genders,
  colors,
  firstnames,
  lastnames,
  magics,
} from "./character";
import { PnjModal } from "./PnjModal";
// import { useGeneratedPhoto } from './useGeneratedPhoto';
import { PNJ as PNJType } from "./pnj.entity";

const makeCharacter = () => {
  const gender = genders[random(0, genders.length - 1)];

  return {
    character: [
      psychologic[random(0, psychologic.length - 1)],
      speechSpecificity[random(0, speechSpecificity.length - 1)],
    ],
    gender,
    age: getRandomAge(),
    color: colors[random(0, colors.length - 1)],
    name: `${firstnames[gender][random(0, firstnames[gender].length)]} ${
      lastnames[random(0, lastnames.length)]
    }`,
    magics: magics[random(0, magics.length - 1)],
  };
};

type Props = {
  pnj?: PNJType;
};

export function PNJ({ pnj }: Props) {
  const [showEditModal, setShowEditModal] = useState(false);
  const { add, remove, update } = usePNJ();
  const [current, setCurrent] = usePersistantState<PNJType>(
    "RANDOM_PNJ",
    makeCharacter()
  );

  return (
    <>
      <Card
        title={
          <div className="flex items-center justify-between">
            <Title>
              <div className="flex items-center flex-rows space-x-2">
                <span>{pnj ? pnj.name : current.name}</span>
                &nbsp;
                {(pnj ? pnj.gender : current.gender) === "Homme" ? "♂︎" : "♀︎"}
              </div>
            </Title>
            {pnj == null && (
              <div className="flex items-center space-x-2">
                <Button
                  type="secondary"
                  onClick={() => {
                    add(current.name, current);
                  }}
                  title="reset"
                >
                  <Icon name="CHECK" />
                </Button>
                <Button
                  type="secondary"
                  onClick={() => {
                    const character = makeCharacter();
                    setCurrent(character);
                    // regeneratePicture({age: character.age, genre: character.sex});
                  }}
                  title="reset"
                >
                  <Icon name="DICE" />
                </Button>
              </div>
            )}
            {pnj != null && (
              <div className="space-x-2">
                <Button
                  type="secondary"
                  onClick={() => {
                    setShowEditModal(true);
                  }}
                  title="edit"
                >
                  <Icon name="CHARACTER" />
                </Button>
                <Button
                  type="secondary"
                  onClick={() => {
                    remove(pnj.name);
                  }}
                  title="reset"
                >
                  <Icon name="CROSS" />
                </Button>
              </div>
            )}
          </div>
        }
        useDividers
      >
        {pnj?.description && (
          <div className="px-2 py-1">
            <BodyText>
              <Icon name="NOTEBOOK" />
              &nbsp;{pnj.description}
            </BodyText>
          </div>
        )}
        <div className="px-2 py-1">
          <BodyText>
            {(pnj ? pnj.character : current.character).join(" | ")}
          </BodyText>
        </div>
        <div className="flex items-center px-2 py-1 flex-rows space-x-2">
          <BodyText>{pnj ? pnj.age : current.age} ans</BodyText>
        </div>
        <div className="px-2 py-1">
          <BodyText>{pnj ? pnj.magics : current.magics}</BodyText>
        </div>
        <div className="flex items-center px-2 py-1 flex-rows space-x-2">
          <div
            className="w-8 h-8 border border-white rounded-full shadow"
            style={{
              background: `#${(pnj ? pnj.color : current.color).color}`,
            }}
          ></div>
          <BodyText>{(pnj ? pnj.color : current.color).name}</BodyText>
        </div>
      </Card>
      {showEditModal && (
        <PnjModal
          pnj={pnj}
          onCancel={() => setShowEditModal(false)}
          onSubmit={(newPnj) => {
            if (pnj && pnj.name !== newPnj.name) {
              remove(pnj.name);
              add(newPnj.name, newPnj);
            } else {
              update(newPnj.name, newPnj);
            }
            setShowEditModal(false);
          }}
        />
      )}
    </>
  );
}
