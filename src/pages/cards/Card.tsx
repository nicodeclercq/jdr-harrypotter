import { ReactNode, useMemo, useState } from "react";
import { pipe, constant } from "fp-ts/function";
import * as Either from "fp-ts/Either";
import * as ArrayFP from "fp-ts/Array";
import * as IOT from "io-ts-types";
import { types, numbers, elements, means } from "../../store/v12/deck";
import { createArray } from "../../helpers/array";
import { Icon } from "../../components/icons/Icon";

type CardValue = (typeof numbers)[number];

const areas = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

const CardValueRenderer = {
  A: { fontSize: "5rem", template: "'a'" },
  2: { fontSize: "1rem", template: "'a' 'b'" },
  3: { fontSize: "1rem", template: "'a' 'b' 'c'" },
  4: { fontSize: "1rem", template: "'a b' 'c d'" },
  5: { fontSize: "1rem", template: "'a . b' '. c .' 'd . e'" },
  6: { fontSize: "1rem", template: "'a b' 'c d' 'e f'" },
  7: { fontSize: "1rem", template: "'a . b' '. c .' 'd . e' '. . .' 'f . g'" },
  8: { fontSize: "1rem", template: "'a b' 'c d' 'e f' 'g h'" },
  9: {
    fontSize: "1rem",
    template: "'a . b' '. c .' 'd . e' 'f . g' '. . .' 'h . i'",
  },
  10: {
    fontSize: "1rem",
    template: "'a . b' '. c .' 'd . e' 'f . g' '. h .' 'i . j'",
  },
  J: { value: "J", fontSize: "5rem", template: "'a'" },
  Q: { value: "Q", fontSize: "5rem", template: "'a'" },
  K: { value: "K", fontSize: "5rem", template: "'a'" },
} as const;

type Element = (typeof elements)[number];
type Type = (typeof types)[number];
type Mean = (typeof means)[number];

const elementsRenderer = {
  Air: <Icon name="AIR" />,
  Eau: <Icon name="EAU" />,
  Feu: <Icon name="FEU" />,
  Terre: <Icon name="TERRE" />,
} as const;

const typesRenderer = {
  Attaque: <Icon name="SWORD" />,
  Défense: <Icon name="SHIELD" />,
} as const;

const colorByType = {
  Attaque: "red",
  Défense: "black",
} as const;

const meansRenderer = {
  "Objet personnel": <Icon name="LIGHT_BACKPACK" />,
  Environnement: <Icon name="BOX_TRAP" />,
} as const;

type Props = {
  symbol: ReactNode;
  number: CardValue;
};

function CardValue({ area, symbol, number }: Props & { area: string }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        lineHeight: 1,
        gridArea: area,
        fontSize: "1em",
        transform: ["d", "e"].includes(area) ? "rotate(180deg)" : undefined,
      }}
    >
      <div style={{ fontSize: "0.75em" }}>{number}</div>
      <div style={{ fontSize: "1.25em" }}>{symbol}</div>
    </div>
  );
}

export function Card({
  symbol,
  number,
  type,
  mean,
  zIndex,
}: Props & { type: Type; mean: Mean; zIndex?: number }) {
  const [isVisible, setIsVisible] = useState(false);
  const elements = useMemo(
    () =>
      pipe(
        number,
        IOT.IntFromString.decode,
        Either.getOrElse(constant(1)),
        (n) => createArray(n, symbol),
        ArrayFP.mapWithIndex((index, s: Element) => (
          <span key={index} style={{ gridArea: areas[index] }}>
            {elementsRenderer[s]}
          </span>
        ))
      ),
    [number]
  );

  return (
    <div
      style={{
        perspective: "1000px",
      }}
    >
      <div
        style={{
          width: "10rem",
          height: "15rem",
          position: "relative",
          transition: "transform 0.8s",
          transformStyle: "preserve-3d",
          transform: isVisible ? "rotateY(0deg)" : "rotateY(180deg)",
          zIndex: zIndex ?? "0",
        }}
        onClick={() => setIsVisible((a) => !a)}
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
            /*boxShadow:
              "1px 1px 2px rgba(0,0,0,0.2), 0 0 4px 2px rgba(0,0,0,0.2)",*/
          }}
        />
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            transform: "rotateY(0deg)",
            backfaceVisibility: "hidden",
            color: colorByType[type],
            display: "inline-grid",
            gridTemplateAreas: "'a c b' '. c .' 'd c e'",
            alignItems: "stretch",
            justifyContent: "space-between",
            padding: "0.25rem 0.5rem",
            background: "white",
            borderRadius: "0.5rem",
            /*boxShadow:
              "1px 1px 2px rgba(0,0,0,0.2), 0 0 4px 2px rgba(0,0,0,0.2)",*/
          }}
        >
          <CardValue area="a" number={number} symbol={typesRenderer[type]} />
          <CardValue area="b" number={number} symbol={meansRenderer[mean]} />

          <div
            style={{
              display: "grid",
              gridArea: "c",
              borderRadius: "0.5rem",
              alignItems: "center",
              justifyContent: "space-evenly",
              padding: "0.25rem 0.5rem",
              fontSize: CardValueRenderer[number].fontSize ?? "1.5em",
              lineHeight: 1,
              gridTemplateAreas: CardValueRenderer[number].template,
            }}
          >
            {elements}
          </div>

          <CardValue area="d" number={number} symbol={meansRenderer[mean]} />
          <CardValue area="e" number={number} symbol={typesRenderer[type]} />
        </div>
      </div>
    </div>
  );
}
