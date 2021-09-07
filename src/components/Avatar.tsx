import React from 'react';
import { Icon } from './icons/Icon';

type Props = {
  text: string;
  url: string | undefined | null;
  onClick?: () => void;
}

export function Avatar({text, url, onClick}: Props) {
  return (
    <div title={text} onClick={onClick} className="flex items-center justify-center flex-none w-12 h-12 border-2 border-white rounded-full shadow" style={{ backgroundImage: `url("${url}")`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
      {url ? '' : <Icon name="SORCERER" />}
    </div>
  );
}