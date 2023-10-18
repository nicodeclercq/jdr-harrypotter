import { useState } from "react";
import { Card } from "../../components/Card";
import { BodyText } from "../../components/font/BodyText";
import { Tag } from "../../components/Tag";
import { Button } from "../../components/Button";
import { State } from "../../store/State";
import { NumberDefinitionForm } from "./numberDefinitionForm";
import { Modal } from "../../components/Modal";
import { useArithmancy } from "./useArithmancy";
import { Caption } from "../../components/font/Caption";
import { Comment } from "../../components/font/Comment";

function NameNumber({ value }: { value: string }) {
  return (
    <>
      <Tag color="indigo" title="type 'Nom'">
        Nom
      </Tag>
      <BodyText>{value}</BodyText>
    </>
  );
}

function UndefinedNumber() {
  return (
    <>
      <Comment>-</Comment>
    </>
  );
}

function VerbNumber({ value, invert }: { value: string; invert: string }) {
  return (
    <>
      <Tag color="green" title="type 'Verbe'">
        Verbe
      </Tag>
      <BodyText>{value}</BodyText>
      <Caption>({invert})</Caption>
    </>
  );
}

function InverseNumber() {
  return (
    <>
      <Tag color="yellow" title="type 'Inverse'">
        Inverse
      </Tag>
    </>
  );
}

export function NumbersDefinition({
  numbers,
}: {
  numbers: State["arithmancy"]["numbers"];
}) {
  const { setNumber } = useArithmancy();
  const isDefined = (index: number) => numbers[index] != null;
  const [modalNumberIndex, setModalNumberIndex] = useState<number | undefined>(
    undefined
  );

  return (
    <>
      <Card fullWidth title="Chiffres" useDividers>
        {numbers.map((number, index) => (
          <div
            key={`${index}`}
            className="flex flex-row items-center p-2 space-x-2"
            style={{ minWidth: "15rem" }}
          >
            <div className="flex flex-row items-center flex-grow p-2 space-x-2">
              <span
                className="flex items-center justify-center border border-gray-300"
                style={{ width: "2rem", height: "2rem", fontSize: "1.25rem" }}
              >
                {index + 1}
              </span>
              {number == null ? (
                <UndefinedNumber />
              ) : number.type === "name" ? (
                <NameNumber value={number.value} />
              ) : number.type === "verb" ? (
                <VerbNumber value={number.value} invert={number.invert} />
              ) : number.type === "inverse" ? (
                <InverseNumber />
              ) : (
                <></>
              )}
            </div>
            {!isDefined(index) && (
              <Button
                type="secondary"
                onClick={() => {
                  setModalNumberIndex(index);
                }}
              >
                Définir
              </Button>
            )}
          </div>
        ))}
      </Card>
      {modalNumberIndex != null && (
        <Modal header={<>Inscription du chiffre {modalNumberIndex + 1}</>}>
          <NumberDefinitionForm
            onSubmit={(result) => {
              setNumber(modalNumberIndex, result);
              setModalNumberIndex(undefined);
            }}
          />
        </Modal>
      )}
    </>
  );
}
