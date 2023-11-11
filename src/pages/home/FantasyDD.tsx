import { Card } from "../../components/Card";
import { Table } from "../../components/Table";

export function FantasyDD() {
  return (
    <Card title="Degré de difficulté">
      <div className="py-2 px-4">
        <Table
          headers={["Niveau", "DD", "%"]}
          values={[
            ["Très facile	", "5", "+30"],
            ["Facile", "10", "+10"],
            ["Modérée", "15", "	0"],
            ["Difficile", "20", "-10"],
            ["Très difficile", "25", "-30"],
            ["Presque impossible", "30", "-50"],
          ]}
        />
      </div>
    </Card>
  );
}
