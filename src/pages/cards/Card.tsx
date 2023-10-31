import { ReactNode, useMemo } from "react";
import { pipe, flow, constant, identity } from "fp-ts/function";
import * as Either from "fp-ts/Either";
import * as ArrayFP from "fp-ts/Array";
import * as IOT from "io-ts-types";
import { types, numbers, elements, means } from "../../store/v12/deck";
import { createArray } from "../../helpers/array";
import { Icon } from "../../components/icons/Icon";
import { Queen } from "../../components/illustration/queen";
import { Jack } from "../../components/illustration/jack";
import { King } from "../../components/illustration/king";

type CardValue = (typeof numbers)[number];

const areas = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

const CardValueRenderer = {
  A: { fontSize: "5rem", template: "'a'" },
  2: { fontSize: "1.5rem", template: "'a' 'b'" },
  3: { fontSize: "1.5rem", template: "'a' 'b' 'c'" },
  4: { fontSize: "1.5rem", template: "'a b' 'c d'" },
  5: { fontSize: "1.5rem", template: "'a . b' '. c .' 'd . e'" },
  6: { fontSize: "1.5rem", template: "'a b' 'c d' 'e f'" },
  7: {
    fontSize: "1.5rem",
    template: "'a . b' '. c .' 'd . e' '. . .' 'f . g'",
  },
  8: { fontSize: "1.5rem", template: "'a b' 'c d' 'e f' 'g h'" },
  9: {
    fontSize: "1.5rem",
    template: "'a . b' '. c .' 'd . e' 'f . g' '. . .' 'h . i'",
  },
  10: {
    fontSize: "1.5rem",
    template: "'a . b' '. c .' 'd . e' 'f . g' '. h .' 'i . j'",
  },
  J: {
    value: "J",
    fontSize: "9rem",
    template: "'a'",
    renderer: () => <Jack />,
  },
  Q: {
    value: "Q",
    fontSize: "9rem",
    template: "'a'",
    renderer: () => <Queen />,
  },
  K: {
    value: "K",
    fontSize: "9rem",
    template: "'a'",
    renderer: () => <King />,
  },
} as const;

type Element = (typeof elements)[number];
type Type = (typeof types)[number];
type Mean = (typeof means)[number];

const elementsRenderer = {
  Pique: "♠︎",
  Trefle: "♣︎",
  Coeur: "♥︎",
  Carreau: "♦︎",
} as const;

const typesRenderer = {
  Attaque: <Icon name="SWORD" />,
  Défense: <Icon name="SHIELD" />,
} as const;

const colorByElement = {
  Coeur: "red",
  Carreau: "red",
  Pique: "black",
  Trefle: "black",
} as const;

const meansRenderer = {
  "Objet personnel": <Icon name="LIGHT_BACKPACK" />,
  Environnement: <Icon name="BOX_TRAP" />,
} as const;

type Props = {
  number: CardValue;
  isVisible?: boolean;
  onClick?: () => void;
};

function CardValue({
  area,
  number,
  symbol,
}: Props & { area: string; symbol: ReactNode }) {
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
  element,
  number,
  type,
  mean,
  zIndex,
  isVisible,
  onClick,
}: Props & { type: Type; mean: Mean; element: Element; zIndex?: number }) {
  const elements = useMemo(
    () =>
      pipe(
        number,
        Either.fromPredicate(
          (number) => "renderer" in CardValueRenderer[number],
          identity
        ),
        Either.map((number) =>
          (
            CardValueRenderer[number] as { renderer: () => ReactNode }
          ).renderer()
        ),
        Either.mapLeft(
          flow(
            IOT.IntFromString.decode,
            Either.getOrElse(constant(1)),
            (n) => createArray(n, element),
            ArrayFP.mapWithIndex((index, s: Element) => (
              <span key={index} style={{ gridArea: areas[index] }}>
                {elementsRenderer[s]}
              </span>
            )),
            (a) => (<>{a}</>) as ReactNode
          )
        ),
        Either.fold(identity, identity)
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
            color: colorByElement[element],
            display: "inline-grid",
            gridTemplateAreas: "'a c b' '. c .' 'd c e'",
            alignItems: "stretch",
            justifyContent: "space-between",
            padding: "0.25rem 0.5rem",
            background: "white",
            borderRadius: "0.5rem",
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
