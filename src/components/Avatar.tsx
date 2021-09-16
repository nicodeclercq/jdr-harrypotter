import React from 'react';
import { Icon } from './icons/Icon';

type Props = {
  text: string;
  url: string | undefined | null;
  onClick?: () => void;
}

const randomColor = (str: string) => {
  const value = str
    .split('')
    .map(char => char.charCodeAt(0))
    .reduce((acc, cur) => acc + cur, 0);
  const hue = value % 360;
  return `hsl(${hue}, 25%, 50%)`;
}

export function Avatar({text, url, onClick}: Props) {
  return (
    <div title={text} onClick={onClick} className="flex items-center justify-center flex-none w-12 h-12 border-2 border-white rounded-full shadow" style={{ flex: 'none', backgroundColor: randomColor(text), backgroundImage: `url("${url}")`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
      {url ? '' : <Icon name="SORCERER" />}
    </div>
  );
}