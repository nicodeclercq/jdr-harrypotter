import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { pipe } from 'fp-ts/function';

import { Icon, IconName } from '../../components/icons/Icon';
import { fromRemoteData } from '../../helpers/remoteData';
import { useRole } from '../../hooks/useRole';
import { useSocket } from '../../hooks/useSocket';
import { Key, usePersistantState } from '../../hooks/usePersistantState';
import { useMeet } from '../../hooks/useMeet';

type Props = {
  icon: IconName;
  onClick: () => void;
  color: string;
  background: string;
}

function QuickButton ({onClick, icon, color, background}: Props) {
  const [isClicked, setIsClicked] = useState(false);
  const [isShown, setIsShown] = useState(true);

  useEffect(() => {
    if(isClicked){
      const timeout = setTimeout(() => {
        setIsShown(false);
        setIsClicked(false);
      }, 1000);

      return () => clearTimeout(timeout);
    }

  }, [isClicked]);

  useEffect(() => {
    if(!isShown){
      const timeout = setTimeout(() => {
        setIsShown(true);
      }, 1000);

      return () => clearTimeout(timeout);
    }

  }, [isShown]);
  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: '0',
          left: '50%',
          display: isShown ? 'block' : 'none',
          transition: 'all 1s ease-out',
          transform: isClicked ? 'scale(1)' : 'scale(800)',
          opacity: isClicked ? 1 : 0,
          pointerEvents: 'none'
        }}
        className={color}
      >
        <Icon name={icon} />
      </div>
      <button
        style={{borderColor: 'currentcolor', boxShadow: '0.0625rem 0.0625rem 1rem 0.0625rem rgba(0,0,0,0.5)'}}
        className={`transform duration-200 hover:-translate-y-2 hover:z-10 hover:scale-150 opacity-75 hover:opacity-100 flex justify-center items-center border-solid border-2 p-3 text-4xl rounded-full h-12 w-12 ${color} ${background}`}
        onClick={() => {
          setIsClicked(true);
          onClick();
        }}
      >
        <Icon name={icon} />
      </button>
    </>
  );
}

function ToggleButton ({onClick, icon, color, background, strikeBg, strikeBorder, stateName}: Props & {strikeBg: string, strikeBorder: string, stateName: Key}) {
  const [isActive, setIsActive] = usePersistantState(stateName, false);

  return (
    <>
      <button
        style={{overflow: 'hidden', borderColor: 'currentcolor', boxShadow: '0.0625rem 0.0625rem 1rem 0.0625rem rgba(0,0,0,0.5)'}}
        className={`relative transform duration-200 hover:-translate-y-2 hover:z-10 hover:scale-150 opacity-75 hover:opacity-100 flex justify-center items-center border-solid border-2 p-3 text-4xl rounded-full h-12 w-12 ${color} ${background}`}
        onClick={() => {
          setIsActive(!isActive);
          onClick();
        }}
      >
        {!isActive && <div className={`${strikeBg} ${strikeBorder}`} style={{boxSizing: 'content-box', transformOrigin: 'center', display: 'block', position: 'absolute', top: '0', left: '50%', width: '0.25rem', height: '100%', borderLeft: `0.125rem solid currentColor`, borderRight: `0.125rem solid currentColor`, transform: 'translateX(-50%) rotate(-45deg)'}}></div>}
        <Icon name={icon} />
      </button>
    </>
  );
}

export function QuickActions() {
  const { isMJ } = useRole();
  const { emit } = useSocket();
  useMeet();

  return createPortal(
    pipe(
      isMJ,
      fromRemoteData(isMJ => (
        <div style={{zIndex: 1, position: 'fixed', bottom: '1rem', right: '50%', transform: 'translateX(50%)'}} className="flex rounded-full flex-columns space-x-1">
          {
            isMJ && <>
              <QuickButton
                background="bg-yellow-400"
                color="text-yellow-700"
                icon="TIME"
                onClick={() => emit({
                  type: 'time',
                  payload: 60,
                })}
              />
              <QuickButton
                background="bg-orange-400"
                color="text-orange-900"
                icon="TIME"
                onClick={() => emit({
                  type: 'time',
                  payload: 10,
                })}
              />
            </>
          }
          {
            !isMJ && <QuickButton background="bg-orange-400" color="text-orange-900" icon="SLEEPY" onClick={() => emit({
              type: 'alert',
              payload: {
                type: 'playerIsAsleep' 
              }
            })}/>
          }
          <QuickButton background="bg-red-400" color="text-red-900" icon="HALT" onClick={() => emit({
            type: 'alert',
            payload: {
              type: 'playerNeedsPause' 
            }
          })}/>
          <ToggleButton
            strikeBg="bg-blue-700"
            strikeBorder="text-blue-400"
            background="bg-blue-400"
            color="text-blue-700"
            icon="MICROPHONE"
            onClick={() => {/* NOOP */}}
            stateName="IS_MICROPHONE_ACTIVE"
          />
          <ToggleButton
            strikeBg="bg-blue-700"
            strikeBorder="text-blue-400"
            background="bg-blue-400"
            color="text-blue-700"
            icon="VIDEO_CAMERA"
            onClick={() => {/* NOOP */}}
            stateName="IS_CAMERA_ACTIVE"
          />
        </div>
      ))
    ),
    document.body
  );
}