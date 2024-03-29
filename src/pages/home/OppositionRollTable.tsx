import { useState } from "react";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { Icon } from "../../components/icons/Icon";
import { RollModal } from "../../components/RollModal";
import { Table } from "../../components/Table";

const step = 5;
const numbers = new Array(100 / step).fill(0).map((_, index) => index * step);

const getDifficultyColor = (value: number) => {
  if (value >= 80) {
    return "limeGreen";
  }
  if (value >= 60) {
    return "greenYellow";
  }
  if (value >= 40) {
    return "yellow";
  }
  if (value >= 20) {
    return "orange";
  }
  return "red";
};

const formatCell = (value: number, index: number) => {
  if (index === 0) {
    return (
      <div
        className="p-1 font-bold text-white bg-gray-500"
        style={{ margin: "-0.25rem" }}
      >
        {value}
      </div>
    );
  }
  if (value <= 0) {
    return (
      <div
        style={{
          margin: "-0.25rem",
          color: "white",
          backgroundColor: "maroon",
          textAlign: "center",
        }}
      >
        &nbsp;
      </div>
    );
  }
  if (value >= 100) {
    return (
      <div
        style={{
          margin: "-0.25rem",
          color: "white",
          backgroundColor: "green",
          textAlign: "center",
        }}
      >
        &nbsp;
      </div>
    );
  }
  return (
    <div
      style={{ margin: "-0.25rem", backgroundColor: getDifficultyColor(value) }}
    >
      {value}
    </div>
  );
};

export function OppositionRollTable() {
  const [showRollModal, setShowRollModal] = useState(false);

  return (
    <>
      <Card
        title={
          <div className="flex items-center space-x-2">
            <span className="flex-grow">Table d&apos;opposition</span>
            <Button type="secondary" onClick={() => setShowRollModal(true)}>
              <Icon name="DICE" />
            </Button>
          </div>
        }
      >
        <div
          className="flex justify-center max-h-full p-1 overflow-y-auto"
          style={{
            fontSize: "0.75rem",
            display: "grid",
            gridTemplate: "min-content 1fr / min-content 1fr",
          }}
        >
          <div></div>
          <div style={{ marginLeft: "2rem" }}>Opposant</div>
          <div
            style={{
              transform: "rotate(-90deg)",
              transformOrigin: "top center",
              marginTop: "3rem",
            }}
          >
            Joueur
          </div>
          <Table
            headers={["", ...numbers]}
            values={numbers.map((rowNb) =>
              [rowNb, ...numbers.map((columnNb) => 50 - columnNb + rowNb)].map(
                formatCell
              )
            )}
          />
        </div>
      </Card>
      {showRollModal && (
        <RollModal
          title="Niveau de l'opposant"
          onRollEnd={() => {
            setShowRollModal(false);
          }}
        />
      )}
    </>
  );
}
