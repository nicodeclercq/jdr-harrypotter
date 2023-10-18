import { CardType, EventCard } from "../../pages/cartomancy/eventCards";
import { BodyText } from "../font/BodyText";
import { Title } from "../font/Title";

import { Icon as Combat } from "./icons/swords-emblem";
import { Icon as Other } from "./icons/card-joker";
import { Icon as Social } from "./icons/top-hat";
import { Icon as Knowledge } from "./icons/book-cover";
import { Icon as Future } from "./icons/crystal-ball";
import { getColor } from "../../theme";
import { Backface } from "./backface";

const foldIcon = (cardType?: CardType) => {
  if (cardType === "combat") {
    return (
      <span className={"text-5xl text-red-800"}>
        <Combat />
      </span>
    );
  } else if (cardType === "social") {
    return (
      <span className={"text-5xl text-green-700"}>
        <Social />
      </span>
    );
  } else if (cardType === "knowledge") {
    return (
      <span className={"text-5xl text-yellow-600"}>
        <Knowledge />
      </span>
    );
  } else if (cardType === "future") {
    return (
      <span className={"text-5xl text-blue-400"}>
        <Future />
      </span>
    );
  }
  return (
    <span className={"text-5xl text-blue-600"}>
      <Other />
    </span>
  );
};

type Props = EventCard & {
  isRevealed?: boolean;
  onClick: () => void;
};

export function PlayingCard({
  title,
  description,
  image,
  onClick,
  isRevealed = true,
}: Props) {
  return isRevealed ? (
    <button
      onClick={onClick}
      className={"p-1 bg-white shadow-xl rounded-2xl"}
      style={{ width: "16rem", minHeight: "24rem" }}
    >
      <div
        className={`relative flex flex-col items-center h-full p-2 border-2 ${getColor(
          "primary",
          800,
          "border"
        )} rounded-xl space-y-2`}
      >
        {foldIcon(image)}
        <div className={getColor("primary", 800, "foreground")}>
          <Title>{title}</Title>
          <span className={getColor("primary", 600, "foreground")}>❦</span>
        </div>
        <BodyText>{description}</BodyText>
      </div>
    </button>
  ) : (
    <button
      onClick={onClick}
      className={`relative overflow-hidden rounded-2xl shadow border-4 ${getColor(
        "secondary",
        500
      )}`}
      style={{
        width: "16rem",
        minHeight: "24rem",
        backgroundColor: "#382224",
        borderColor: "#a3866a",
        filter: "hue-rotate(10deg) saturate(200%)",
      }}
    >
      <Backface />
    </button>
  );
}
