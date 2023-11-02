import { Avatar } from "./Avatar";
import { Draggable } from "./Draggable";

type Props = {
  x: number;
  y: number;
  game: string;
  name: string;
  image?: string;
  onDragStop?: (newPosition: { x: number; y: number }) => void;
};

export function AvatarToken({ x, y, game, name, image, onDragStop }: Props) {
  return (
    <Draggable
      position={{ y, x }}
      onDragStop={onDragStop}
      dragDisabled={onDragStop == null}
    >
      <Avatar game={game} text={name} url={image} />
    </Draggable>
  );
}
