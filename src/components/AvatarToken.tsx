import { Avatar } from "./Avatar";
import { Draggable } from "./Draggable";

type Props = {
  x: number;
  y: number;
  name: string;
  image?: string;
  onDragStop?: (newPosition: { x: number; y: number }) => void;
};

export function AvatarToken({ x, y, name, image, onDragStop }: Props) {
  return (
    <Draggable
      position={{ y, x }}
      onDragStop={onDragStop}
      dragDisabled={onDragStop == null}
    >
      <Avatar text={name} url={image} />
    </Draggable>
  );
}
