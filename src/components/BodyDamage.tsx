import { useDamages } from "../pages/home/useDamages";
import { RemoteDataFold } from "./RemoteDataFold";
import * as Record from "fp-ts/Record";
import { Card } from "./Card";
import {
  DAMAGE_LEVEL,
  DAMAGE_LOCATION,
  DamageLevel,
} from "../store/v13/damages";
import styles from "./BodyDamage.module.css";

const DAMAGE_COLOR_BY_LEVEL = {
  healthy: "#9AD08D",
  softlyInconvenient: "#D3D72A",
  painful: "#D87A0C",
  veryPainful: "#C51005",
  unusable: "#240000",
} satisfies { [key in DamageLevel]: string };

export function BodyDamage() {
  const { damages, toggleDamage } = useDamages();

  return (
    <RemoteDataFold
      data={damages}
      onSuccess={(damages) => (
        <div className="flex">
          <Card title="Dégats permanents">
            <div className="flex flex-col items-center">
              <svg
                className={styles.bodyDamage}
                width="8em"
                viewBox="0 0 169 533"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M66.576 39c0-15.5 5-26 18-26s18 10.5 18 26c0 16.5-6 30.5-18 31-12-.5-18-14.5-18-31z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["head"]]}
                  stroke="#000"
                  onClick={toggleDamage("head")}
                />
                <path
                  d="M72.5 65.5c0 7.6-5 14.833-7.5 17.5.667.833 1.3 3.9.5 5.5C69 86 78.236 83 84.576 83s15.575 3 19.075 5.5c-.8-1.6-.167-4.667.5-5.5-2.5-2.667-7.5-9.9-7.5-17.5-3 5.5-8 6.5-12.075 6.5C80.5 72 75.5 71 72.5 65.5z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["neck"]]}
                  stroke="#000"
                  onClick={toggleDamage("neck")}
                />
                <path
                  d="M63.076 84.719c-11.5 5.5-29.5 10-32.5 12.5s-9 17.5-4.5 42.5c8 2.4 13 2.333 14.5 2 .333-5.667 5.124-16.019 5.924-19.219 1-4 .758-15.5 5.576-21.281 7.5-9 11-11.5 11-16.5z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["shoulder right"]]}
                  stroke="#000"
                  onClick={toggleDamage("shoulder right")}
                />
                <path
                  d="M84.576 149.219c-9 0-11.5 13.5-14.5 17s-10 16-18-20 8.5-60.5 32.5-60.5 41 24.5 33 60.5-15.5 23.5-18.5 20-5.5-17-14.5-17z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["torax"]]}
                  stroke="#000"
                  onClick={toggleDamage("torax")}
                />
                <path
                  d="M54.575 163.219v23.5c4.834 5.333 17.6 19.5 30 19.5 12.4 0 25.167-14.167 30.001-19.5v-23.5c-1.667 3.333-3.001 10-9.001 10-11.5 0-14.5-22-21-22s-9.5 22-21 22c-6 0-7.333-6.667-9-10z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["belly"]]}
                  stroke="#000"
                  onClick={toggleDamage("belly")}
                />
                <path
                  d="M25.576 142.719c4.4 3.2 11.833 3 15 2.5-1 9-3.2 27.5-4 29.5 1.5 7.5-4.5 53-5.5 60.5-1.167 1.333-4.8 3.6-10 2-1-17.5-2.2-55.3 1-66.5.5-7.5 1.9-23.6 3.5-28z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["arm right"]]}
                  stroke="#000"
                  onClick={toggleDamage("arm right")}
                />
                <path
                  d="M54.575 191.219c-3.666 6.667-11.2 21.127-12 31.527-1 13 37.5 33.5 42 33.5s43.001-20.5 42.001-33.5c-.8-10.4-8.334-24.86-12-31.527 0 0-14 17.5-30 17.5s-30-17.5-30-17.5z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["pelvis"]]}
                  stroke="#000"
                  onClick={toggleDamage("pelvis")}
                />
                <path
                  d="M143.5 142.719c-4.4 3.2-11.834 3-15 2.5 1 9 3.2 27.5 4 29.5-1.5 7.5 4.5 53 5.5 60.5 1.166 1.333 4.8 3.6 10 2 1-17.5 2.2-55.3-1-66.5-.5-7.5-1.9-23.6-3.5-28z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["arm left"]]}
                  stroke="#000"
                  onClick={toggleDamage("arm left")}
                />
                <path
                  d="M106 84.719c11.5 5.5 29.5 10 32.5 12.5s9 17.5 4.5 42.5c-8 2.4-13 2.333-14.5 2-.334-5.667-5.124-16.019-5.924-19.219-1-4-.758-15.5-5.576-21.281-7.5-9-11-11.5-11-16.5z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["shoulder left"]]}
                  stroke="#000"
                  onClick={toggleDamage("shoulder left")}
                />
                <path
                  d="M21.076 240.719c2.4 2.4 7.666 1 10 0 .666 3.667 2 12.2 2 17 0 6 2.5 15 2 16.5-.4 1.2-2.834.5-4 0 2 4.167 5.6 12.9 4 14.5-1.6 1.6-9-7-12.5-11.5-.834-5.667-2.5-17.4-2.5-19 0-1.6.666-12.333 1-17.5z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["hand right"]]}
                  stroke="#000"
                  onClick={toggleDamage("hand right")}
                />
                <path
                  d="M148 240.719c-2.4 2.4-7.667 1-10 0-.667 3.667-2 12.2-2 17 0 6-2.5 15-2 16.5.4 1.2 2.833.5 4 0-2 4.167-5.6 12.9-4 14.5 1.6 1.6 9-7 12.5-11.5.833-5.667 2.5-17.4 2.5-19 0-1.6-.667-12.333-1-17.5z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["hand left"]]}
                  stroke="#000"
                  onClick={toggleDamage("hand left")}
                />
                <path
                  d="M42.576 235.219c5.2 13.6 26.833 23.667 37 27-2.081 23.186-6.335 69.035-8.367 85.781.744-6.5-23.274-14-24.377-2 .402-5.886.487-12.031-.256-19.281-2-19.5-5.959-71-4-91.5z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["thigh right"]]}
                  stroke="#000"
                  onClick={toggleDamage("thigh right")}
                />
                <path
                  d="M126.576 235.219c-5.2 13.6-26.834 23.667-37 27 2.08 23.186 6.335 69.035 8.366 85.781-.744-6.5 23.274-14 24.377-2-.401-5.886-.487-12.031.257-19.281 2-19.5 5.958-71 4-91.5z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["thigh left"]]}
                  stroke="#000"
                  onClick={toggleDamage("thigh left")}
                />
                <path
                  d="M46.576 349.3C49.5 346 48.5 342 58.5 344s12.536 5.438 12.076 8.719c-.412 2.575-.994 7.505-1.658 13.781-3.082 15.5-25.418 7.5-23.785-2 .428-5.346 1.015-10.237 1.443-15.2z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["knee right"]]}
                  stroke="#000"
                  onClick={toggleDamage("knee right")}
                />
                <path
                  d="M122.576 349.3c-2.925-3.3-1.925-7.3-11.925-5.3s-12.535 5.438-12.075 8.719c.412 2.575.993 7.505 1.657 13.781 3.082 15.5 25.418 7.5 23.785-2-.427-5.346-1.014-10.237-1.442-15.2z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["knee left"]]}
                  stroke="#000"
                  onClick={toggleDamage("knee left")}
                />
                <path
                  d="M44.576 377.719c0 20 2.5 54 4 68 .35 3.263.319 7.939.066 13.281 1.858 4 14.055 5 14.042 1-.016-9.03-.108-16.351-.108-18.781 0-5.817 3.172-43.359 5.673-68.219-2.839 11.024-22.978 5.249-23.54-1.607-.085 2.02-.133 4.121-.133 6.326z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["calf right"]]}
                  stroke="#000"
                  onClick={toggleDamage("calf right")}
                />
                <path
                  d="M124.576 377.719c0 20-2.5 54-4 68-.35 3.263-.319 7.939-.067 13.281-1.858 4-14.054 5-14.042 1 .016-9.03.109-16.351.109-18.781 0-5.817-3.173-43.359-5.673-68.219 2.838 11.024 22.978 5.249 23.54-1.607.084 2.02.133 4.121.133 6.326z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["calf left"]]}
                  stroke="#000"
                  onClick={toggleDamage("calf left")}
                />
                <path
                  d="M59.576 510.719c-4 .5-15 3-15-4 0-5.112 2.932-27.82 3.93-45.151-.285 5.945 14.188 7.654 14.18 1.932-.011 20.38-.479 46.89-3.11 47.219z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["foot right"]]}
                  stroke="#000"
                  onClick={toggleDamage("foot right")}
                />
                <path
                  d="M109.576 510.719c4 .5 15 3 15-4 0-5.112-2.933-27.82-3.931-45.151.286 5.945-14.188 7.654-14.18 1.932.012 20.38.479 46.89 3.111 47.219z"
                  fill={DAMAGE_COLOR_BY_LEVEL[damages["foot left"]]}
                  stroke="#000"
                  onClick={toggleDamage("foot left")}
                />
                <text x="22" y="40">
                  Droite
                </text>
                <text x="110" y="40">
                  Gauche
                </text>
                <text x="81" y="40">
                  1
                </text>
                <text x="81" y="82">
                  2
                </text>
                <text x="35" y="110">
                  3
                </text>
                <text x="127" y="110">
                  4
                </text>
                <text x="81" y="130">
                  5
                </text>
                <text x="25" y="185">
                  6
                </text>
                <text x="80" y="185">
                  7
                </text>
                <text x="135" y="185">
                  8
                </text>
                <text x="80" y="230">
                  9
                </text>
                <text x="20" y="260">
                  10
                </text>
                <text x="136" y="260">
                  11
                </text>
                <text x="52" y="290">
                  12
                </text>
                <text x="103" y="290">
                  13
                </text>
                <text x="50" y="365">
                  14
                </text>
                <text x="105" y="365">
                  15
                </text>
                <text x="48" y="420">
                  16
                </text>
                <text x="108" y="420">
                  17
                </text>
                <text x="48" y="485">
                  18
                </text>
                <text x="108" y="485">
                  19
                </text>
              </svg>
              <div className="p-2 w-[210px]">
                {Record.toEntries(damages)
                  .map(([location, level]) =>
                    level === "healthy"
                      ? ""
                      : `${DAMAGE_LOCATION[location]} ${DAMAGE_LEVEL[level]}`
                  )
                  .filter((a) => a !== "")
                  .join(", ")}
              </div>
            </div>
          </Card>
        </div>
      )}
    />
  );
}
