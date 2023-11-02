import { constVoid } from "fp-ts/function";
import { Avatar } from "./Avatar";
import { Icon, IconName } from "./icons/Icon";

const size = {
  small: "w-6",
  medium: "w-12",
} as const;

const margin = {
  small: "-1rem",
  medium: "-1rem",
} as const;

type Clickable = {
  onClick?: () => void;
  icon: IconName;
};
type BaseProps = {
  game: string;
  avatars: {
    text: string;
    url: string | undefined | null;
  }[];
  size?: keyof typeof size;
};

type Props = BaseProps & (Record<string, never> | Clickable);

const isClickable = (props: Props): props is BaseProps & Clickable =>
  "onClick" in props;

export function AvatarList(props: Props) {
  return (
    <div
      onClick={isClickable(props) ? props.onClick : constVoid}
      className={`relative flex items-center justify-center flex-none ${
        size[!isClickable(props) ? props.size ?? "medium" : "medium"]
      } border-2 border-white rounded-full shadow`}
    >
      {props.avatars.map((avatar, index) => (
        <div
          key={avatar.url}
          style={{ marginLeft: index > 0 ? margin[props.size || "medium"] : 0 }}
        >
          <Avatar game={props.game} size={props.size} {...avatar} />
        </div>
      ))}
      {isClickable(props) && (
        <button
          className="absolute flex items-center justify-center w-6 h-6 p-0 text-gray-700 bg-white border border-gray-500 rounded-full shadow"
          style={{ bottom: "-0.75rem", right: "0.675rem", fontSize: "1rem" }}
        >
          <Icon name={props.icon} />
        </button>
      )}
    </div>
  );
}
