import React, { useState } from 'react';
import { useDelay } from '../hooks/useDelay';
import { useInterval } from '../hooks/useInteval';

const LoaderContent = () => {
  const [index, setIndex] = useState(0);

  const renderers = [
    () => <span className="font-mono">&nbsp;&nbsp;&nbsp;</span>,
    () => <span className="font-mono">.&nbsp;&nbsp;</span>,
    () => <span className="font-mono">..&nbsp;</span>,
    () => <span className="font-mono">...</span>,
  ];

  useInterval(() => {
    if(index < renderers.length - 1){
      setIndex(index + 1);
    } else {
      setIndex(0);
    }
  }, 500);

  return (
    <div className="flex items-center justify-center w-full h-full p-4 text-xl">
      Loading{renderers[index]()}
    </div>
  );
}

export function Loader() {
  const [show, setShow] = useState(false);

  useDelay(500, () => {
    setShow(true);
  });

  return show
    ? (<LoaderContent />)
    : (<></>);
}