import { lens } from "./../helpers/object";
import { useSocket } from "./useSocket";
import { pipe } from "fp-ts/function";
import { onSuccess } from "../helpers/remoteData";
import { State } from "./../store/State";
import { useSound } from "./useSound";
import { useStore } from "./useStore";

const benniesLens = lens<State, "bennies">("bennies");

export function useBenny(){
  const { play } = useSound();
  const { emit } = useSocket();
  const [bennies, setBennies] = useStore(benniesLens);

  const addBenny = () => pipe(
    bennies,
    onSuccess(b => {
      play("success");
      setBennies([...b, {x: 50, y: 50}]);
    }),
  );

  const moveBenny = (newPosition: {x: number; y: number}, index: number) => pipe(
    bennies,
    onSuccess(bs => setBennies(
      bs.map((b, i) => i === index
        ? newPosition
        : b
      ))),
  );
  
  const removeBenny = (index: number) => pipe(
    bennies,
    onSuccess((b) => {
      play("success");
      emit({type: "useBenny"});
      setBennies(
        b.filter((_b, i) => i !== index)
      );
    }),
  );

  return {
    bennies,
    addBenny,
    moveBenny,
    removeBenny,
  };
}