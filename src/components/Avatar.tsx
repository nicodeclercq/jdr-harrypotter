import { constVoid } from 'fp-ts/lib/function';
import React from 'react';
import { Icon, IconName } from './icons/Icon';

const size = {
  'small': 'w-6 h-6',
  'medium': 'w-12 h-12',
} as const;

type Clickable = {
  onClick?: () => void;
  icon: IconName;
};
type BaseProps = {
  text: string;
  url: string | undefined | null;
  size?: keyof typeof size;
};

type Props = BaseProps & ({} | Clickable);

const randomColor = (str: string) => {
  const value = str
    .split('')
    .map(char => char.charCodeAt(0))
    .reduce((acc, cur) => acc + cur, 0);
  const hue = value % 360;
  return `hsl(${hue}, 25%, 50%)`;
}

const isClickable = (props: Props): props is BaseProps & Clickable => 'onClick' in props;

export function Avatar(props: Props) {
  return (
    <div title={props.text} onClick={isClickable(props) ? props.onClick : constVoid} className={`relative flex items-center justify-center flex-none ${size[!isClickable(props) ? (props.size ?? 'medium') : 'medium']} border-2 border-white rounded-full shadow`} style={{ flex: 'none', backgroundColor: randomColor(props.text), backgroundImage: `url("${props.url}")`, backgroundPosition: 'center', backgroundSize: 'cover'}}>
      {props.url ? '' : <Icon name="SORCERER" />}
      {
        isClickable(props) && (<button className="absolute flex items-center justify-center w-6 h-6 p-0 text-gray-700 bg-white border border-gray-500 rounded-full shadow" style={{bottom: '-0.5rem', right: '-0.5rem', fontSize: '1rem'}}>
          <Icon name={props.icon} />
        </button>)
      }
    </div>
  );
}
