import { useCallback, useEffect, useState } from "react";
import { getDivisions, CurrencyDivisions } from "../helpers/moneyHelper";
import { withNDecimals } from "../helpers/number";
import { Card } from "./Card";
import { Caption } from "./font/Caption";
import { Comment } from "./font/Comment";
import { Title } from "./font/Title";
import { Icon } from "./icons/Icon";
import { Input } from "./Input";

const EURO_TO_NOISE_FACTOR = 50;

const currency = `
  1G=${CurrencyDivisions.gallion / EURO_TO_NOISE_FACTOR}€,
  1M=${CurrencyDivisions.mornille / EURO_TO_NOISE_FACTOR}€,
  1N=${CurrencyDivisions.noise / EURO_TO_NOISE_FACTOR}€
`;

const simplifiedCurrency = `1G = +/- ${Math.round(
  CurrencyDivisions.gallion / EURO_TO_NOISE_FACTOR
)}€`;

const divisions = `
  1G=${CurrencyDivisions.gallion / CurrencyDivisions.mornille}M,
  1G=${CurrencyDivisions.gallion / CurrencyDivisions.noise}N,
  1M=${CurrencyDivisions.mornille / CurrencyDivisions.noise}N
`;

const toEuro = (
  galion: number | undefined,
  mornille: number | undefined,
  noise: number | undefined
) => {
  return (
    ((galion ? galion : 0) * CurrencyDivisions.gallion) / EURO_TO_NOISE_FACTOR +
    ((mornille ? mornille : 0) * CurrencyDivisions.mornille) /
      EURO_TO_NOISE_FACTOR +
    ((noise ? noise : 0) * CurrencyDivisions.noise) / EURO_TO_NOISE_FACTOR
  );
};

const toNoise = (
  galion: number | undefined,
  mornille: number | undefined,
  noise: number | undefined
) => {
  return (
    (galion ? galion : 0) * CurrencyDivisions.gallion +
    (mornille ? mornille : 0) * CurrencyDivisions.mornille +
    (noise ? noise : 0) * CurrencyDivisions.noise
  );
};

function MoneySubstractor() {
  const [division, setDivision] = useState({
    gallion: 0,
    mornille: 0,
    noise: 0,
  });
  const [galion1, setGalion1] = useState<number>();
  const [mornille1, setMornille1] = useState<number>();
  const [noise1, setNoise1] = useState<number>();
  const [galion2, setGalion2] = useState<number>();
  const [mornille2, setMornille2] = useState<number>();
  const [noise2, setNoise2] = useState<number>();

  useEffect(() => {
    setDivision(
      getDivisions(
        toNoise(galion1, mornille1, noise1) -
          toNoise(galion2, mornille2, noise2)
      )
    );
  }, [galion1, galion2, mornille1, mornille2, noise1, noise2]);

  return (
    <div>
      <div className="flex flex-col justify-end px-2 py-1 space-x-2 space-y-2">
        <div className="flex justify-end space-x-2">
          <span>
            <Input
              theme="neutral"
              width="7ch"
              onChange={setGalion1}
              type="number"
            />
            &nbsp;
            <span style={{ color: "goldenrod" }}>
              <Icon name="COIN" />
            </span>
          </span>
          <span>
            <Input
              theme="neutral"
              width="7ch"
              onChange={setMornille1}
              type="number"
            />
            &nbsp;
            <span style={{ color: "silver" }}>
              <Icon name="COIN" />
            </span>
          </span>
          <span>
            <Input
              theme="neutral"
              width="7ch"
              onChange={setNoise1}
              type="number"
            />
            &nbsp;
            <span style={{ color: "#b87333" }}>
              <Icon name="COIN" />
            </span>
          </span>
        </div>
        <div className="flex justify-end space-x-2">
          <span>-</span>
          <span>
            <Input
              theme="neutral"
              width="7ch"
              onChange={setGalion2}
              type="number"
            />
            &nbsp;
            <span style={{ color: "goldenrod" }}>
              <Icon name="COIN" />
            </span>
          </span>
          <span>
            <Input
              theme="neutral"
              width="7ch"
              onChange={setMornille2}
              type="number"
            />
            &nbsp;
            <span style={{ color: "silver" }}>
              <Icon name="COIN" />
            </span>
          </span>
          <span>
            <Input
              theme="neutral"
              width="7ch"
              onChange={setNoise2}
              type="number"
            />
            &nbsp;
            <span style={{ color: "#b87333" }}>
              <Icon name="COIN" />
            </span>
          </span>
        </div>
      </div>
      <div className="flex justify-end px-2 space-x-2">
        <div className="flex items-end space-x-1" title="Gallion">
          <span>{division.gallion}</span>
          <span style={{ color: "goldenrod" }}>
            <Icon name="COIN" />
          </span>
        </div>
        <div className="flex items-center space-x-1" title="Mornille">
          <span>{division.mornille}</span>
          <span style={{ color: "silver" }}>
            <Icon name="COIN" />
          </span>
        </div>
        <div className="flex items-center space-x-1" title="Noise">
          <span>{division.noise}</span>
          <span style={{ color: "#b87333" }}>
            <Icon name="COIN" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function Money({ value }: { value: number }) {
  const division = getDivisions((value || 0) * EURO_TO_NOISE_FACTOR);

  return (
    <>
      <div className="flex items-end space-x-1" title="Gallion">
        <span>{division.gallion}</span>
        <span style={{ color: "goldenrod" }}>
          <Icon name="COIN" />
        </span>
      </div>
      <div className="flex items-center space-x-1" title="Mornille">
        <span>{division.mornille}</span>
        <span style={{ color: "silver" }}>
          <Icon name="COIN" />
        </span>
      </div>
      <div className="flex items-center space-x-1" title="Noise">
        <span>{division.noise}</span>
        <span style={{ color: "#b87333" }}>
          <Icon name="COIN" />
        </span>
      </div>
    </>
  );
}

export function MoneyConverter({ showEuro = false }: { showEuro?: boolean }) {
  const [value, setValue] = useState<number>();
  const [galion, setGalion] = useState<number>();
  const [mornille, setMornille] = useState<number>();
  const [noise, setNoise] = useState<number>();

  const getEuros = useCallback(() => {
    return withNDecimals(2, toEuro(galion, mornille, noise));
  }, [galion, mornille, noise]);

  return (
    <Card
      title={
        <div className="flex items-center justify-between space-x-1">
          <div className="flex items-center space-x-1">
            <Title>Calculatrice</Title>
            <Caption>({showEuro ? currency : simplifiedCurrency})</Caption>
          </div>
          <Comment>{divisions}</Comment>
        </div>
      }
      useDividers
    >
      {showEuro && (
        <>
          <div className="flex justify-between px-2 py-1 space-x-2">
            <span>
              <Input theme="neutral" onChange={setValue} type="number" />
              &nbsp;€
            </span>
            <div className="flex space-x-2">
              <Money value={value || 0} />
            </div>
          </div>
          <div className="flex justify-between px-2 py-1 space-x-2">
            <div className="flex justify-between space-x-2">
              <span>
                <Input
                  theme="neutral"
                  width="7ch"
                  onChange={setGalion}
                  type="number"
                />
                &nbsp;
                <span style={{ color: "goldenrod" }}>
                  <Icon name="COIN" />
                </span>
              </span>
              <span>
                <Input
                  theme="neutral"
                  width="7ch"
                  onChange={setMornille}
                  type="number"
                />
                &nbsp;
                <span style={{ color: "silver" }}>
                  <Icon name="COIN" />
                </span>
              </span>
              <span>
                <Input
                  theme="neutral"
                  width="7ch"
                  onChange={setNoise}
                  type="number"
                />
                &nbsp;
                <span style={{ color: "#b87333" }}>
                  <Icon name="COIN" />
                </span>
              </span>
            </div>
            <div className="flex space-x-2">{getEuros()}&nbsp;€</div>
          </div>
        </>
      )}
      <MoneySubstractor />
    </Card>
  );
}
