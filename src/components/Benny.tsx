import { useSocket } from "../hooks/useSocket";
import { Draggable, Position } from "./Draggable";
import { Icon } from "./icons/Icon";

type Props = {
  position: Position;
  onDragStop: (position: Position) => void;
  onUse: () => void;
};

export function Benny({ position, onDragStop, onUse }: Props) {
  const { emit } = useSocket();

  const onDoubleClick = () => {
    emit({
      type: "useBenny",
    });
    onUse();
  };

  return (
    <Draggable
      position={position}
      className="flex items-center justify-center p-1 text-green-700 bg-white rounded-full"
      style={{
        width: "15vmin",
        height: "15vmin",
        border: "0.0625vmin solid white",
        fontSize: "10vmin",
        boxShadow:
          "rgb(219, 219, 219) 1px 1px, rgb(190, 190, 190) 2px 2px, rgba(0, 0, 0, 0.2) 0.25rem 0.25rem 0.25rem",
      }}
      onDragStop={onDragStop}
      onDoubleClick={onDoubleClick}
    >
      <div
        className="flex items-center justify-center w-full h-full p-1 rounded-full"
        style={{ border: "1.625vmin dashed" }}
      >
        <Icon name="DICE_TARGET" />
      </div>
    </Draggable>
  );
}
