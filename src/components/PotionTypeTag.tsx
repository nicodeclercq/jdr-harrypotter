import { PotionType } from "../pages/potions/potions";
import { Icon, IconName } from "./icons/Icon";
import { Color, Tag } from "./Tag";

const types: Record<PotionType, IconName> = {
  Amélioration: "UPGRADE",
  Attaque: "SWORD",
  Charme: "HEART_BOTTLE",
  Divers: "JIGSAW_BOX",
  Résistance: "SHIELD",
  Soin: "HEART",
};

const colors: Record<PotionType, Color> = {
  Amélioration: "yellow",
  Attaque: "indigo",
  Charme: "blue",
  Divers: "green",
  Résistance: "purple",
  Soin: "pink",
};

export function PotionCategoryTag({ type }: { type: PotionType }) {
  return (
    <Tag title={type} color={colors[type]}>
      <div className="flex items-center space-x-1">
        <Icon name={types[type]} />
        <span>{type}</span>
      </div>
    </Tag>
  );
}
