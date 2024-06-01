import { Icon } from "../../components/icons/Icon";
import { Card } from "../../store/v14/fightCards";

const typesRenderer = {
  Attaque: <Icon name="SWORD" />,
  Défense: <Icon name="SHIELD" />,
  Déplacement: <Icon name="WALK" />,
  Parler: <Icon name="HELP" />,
  Soin: <Icon name="POTION" />,
  Création: <Icon name="JIGSAW_BOX" />,
  Analyse: <Icon name="LAMP" />,
} as const;

const colorByElement = {
  Attaque: "red",
  Défense: "green",
  Déplacement: "blue",
  Parler: "purple",
  Soin: "rose",
  Création: "orange",
  Analyse: "maroon",
} as const;

type Props = {
  card: Card;
  zIndex: number;
  isVisible?: boolean;
  onClick?: () => void;
};

export function FightCard({ card, zIndex, isVisible, onClick }: Props) {
  return (
    <div
      style={{
        perspective: "1000px",
      }}
    >
      <div
        style={{
          cursor: onClick ? "pointer" : "default",
          width: "10rem",
          height: "15rem",
          position: "relative",
          transition: "transform 0.8s",
          transformStyle: "preserve-3d",
          transform: isVisible ? "rotateY(0deg)" : "rotateY(180deg)",
          zIndex: zIndex ?? "0",
        }}
        onClick={onClick}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: `linear-gradient(45deg,#0000 calc(25%/3), #04087c 0 calc(50%/3),
              #0000 0 calc(250%/3), #04087c 0 calc(275%/3),
              #0000 0),linear-gradient( 45deg,#04087c calc(25%/3), #0000 0 calc(50%/3),
              #04087c 0 25%, #0000 0 75%,
              #04087c 0 calc(250%/3), #0000 0 calc(275%/3),
              #04087c 0),
              linear-gradient(-45deg,#0000 calc(25%/3), #04087c 0 calc(50%/3),
              #0000 0 calc(250%/3), #04087c 0 calc(275%/3),
              #0000 0),linear-gradient(-45deg,#04087c calc(25%/3), #0000 0 calc(50%/3),
              #04087c 0 25%, #0000 0 75%,
              #04087c 0 calc(250%/3), #0000 0 calc(275%/3),
              #04087c 0)
              #ac8415`,
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px  10px",
            borderRadius: "0.5rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            border: "0.5rem solid white",
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "rotateY(0deg)",
            backfaceVisibility: "hidden",
            color: colorByElement[card.category],
            display: "inline-grid",
            gridTemplateAreas: "'a . g' '. b .' '. c .' '. d .' 'h d f'",
            gridTemplateRows:
              "fit-content(100%) auto fit-content(100%) fit-content(100%) fit-content(100%)",
            alignItems: "stretch",
            justifyContent: "space-between",
            padding: "0.25rem 0.5rem",
            background: "white",
            borderRadius: "0.5rem",
          }}
        >
          <div style={{ gridArea: "a" }}>{typesRenderer[card.category]}</div>
          <div style={{ gridArea: "g" }}>{card.score}</div>
          <div style={{ gridArea: "h" }}>{card.score}</div>
          <div style={{ gridArea: "f" }}>{typesRenderer[card.category]}</div>
          <div
            style={{
              gridArea: "b",
              justifyContent: "center",
              alignContent: "center",
              textAlign: "center",
              fontSize: "1em",
              fontWeight: "bold",
            }}
          >
            {card.relatedSkill}
          </div>
          <div
            style={{
              gridArea: "d",
              fontSize: "0.6em",
              paddingBlock: "0.5em",
              textAlign: "center",
            }}
          >
            {card.condition}
          </div>
          <div style={{ gridArea: "c", fontSize: "0.75em" }}>
            <strong>Exemple</strong>
            <br />
            {card.title}
          </div>
        </div>
      </div>
    </div>
  );
}
