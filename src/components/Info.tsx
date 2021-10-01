import React from 'react';
import { Card } from './Card';
import { Icon, IconName } from './icons/Icon';

type Props = {
  children: React.ReactNode;
  icon: IconName;
};

export function Info({ children, icon}: Props){
  return (
    <Card>
      <div className="flex flex-row items-center justify-center mx-2 space-x-2">
      <div className="flex items-center justify-center flex-grow-0 flex-shrink-0 w-12 h-12 p-2 mx-2 text-2xl border rounded-full"><Icon name={icon} /></div>
        <div className="flex-grow">{children}</div>
      </div>
    </Card>
  )
}