import React, { CSSProperties, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { pipe } from 'fp-ts/function';
import * as RX from 'rxjs/operators';
import { fromEvent, race } from 'rxjs';
import { withinBounds } from '../helpers/number';

const mouseMove = fromEvent<MouseEvent>(document, 'mousemove');
const mouseUp = fromEvent<MouseEvent>(document, 'mouseup');
const mouseLeave = fromEvent<MouseEvent>(document, 'mouseleave');

export type Position = {
  x: number;
  y: number;
};
type Props = {
  children?: React.ReactNode;
  position: Position;
  onDragStart?: (position: Position) => void;
  onDragMove?: (position: Position) => void;
  onDragStop?: (position: Position) => void;
} & Omit<HTMLAttributes<HTMLDivElement>, 'style'> & { style?: Omit<CSSProperties, 'position' | 'top' | 'left' | 'right' | 'bottom'> };

const withinScreenBounds = (position: Position) => {
  const bound = withinBounds({min: 0, max: 100});
  return {
    x: bound(position.x),
    y: bound(position.y),
  };
} 

const getPositionInPx = ({x, y}: Position) => ({
  y: y / 100 * document.documentElement.offsetHeight,
  x: x / 100 * document.documentElement.offsetWidth,
});

const getPositionInPercent = ({x, y}: Position) => ({
  y: y / document.documentElement.offsetHeight * 100,
  x: x / document.documentElement.offsetWidth * 100,
});

const toScreenPositionInPercent = (mouseEvent: MouseEvent) => pipe(
  {
    x: mouseEvent.pageX,
    y: mouseEvent.pageY,
  },
  getPositionInPercent,
  withinScreenBounds,
);

export function Draggable({children, position: initialPosition, onDragMove, onDragStart, onDragStop, style, ...otherProps}:Props){
  const [position, setPosition] = useState(initialPosition);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ref.current) {
      const mouseDown = fromEvent<MouseEvent>(ref.current, 'mousedown');
      const mouseDrag = mouseDown.pipe(
        RX.tap(mouseEvent => {
          const initialDragPosition = toScreenPositionInPercent(mouseEvent);

          if(onDragStart){
            onDragStart(initialDragPosition);
          }
        }),
        RX.switchMap(
          () => mouseMove.pipe(
            RX.tap(moveEvent => moveEvent.preventDefault()),
            RX.map(toScreenPositionInPercent),
            RX.tap(moveEvent => {
              if(onDragMove){
                onDragMove(moveEvent);
              }
            }),
            RX.takeUntil(
              race([mouseUp, mouseLeave]).pipe(
                RX.tap(mouseEvent => {
                  const position = toScreenPositionInPercent(mouseEvent);

                  if(onDragStop){
                    onDragStop(position);
                  }
                }),
              )
            ),
          )
        )
      );
      const subscription = mouseDrag.subscribe(setPosition);
      return () => subscription.unsubscribe();
    }
  }, [onDragMove, onDragStart, onDragStop]);

  const relativePosition = pipe(
    position,
    getPositionInPx,
    currentPosition => ({
      y: currentPosition.y - (ref.current?.offsetHeight || 0) / 2,
      x: currentPosition.x - (ref.current?.offsetWidth || 0) / 2,
    }),
  );

  return (
    <div 
      {...otherProps}
      ref={ref}
      style={{
        ...style,
        position: 'fixed',
        top: relativePosition.y,
        left: relativePosition.x,
      }}
    >
      {children}
    </div>
  )
}