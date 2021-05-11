import React from 'react';
import { createPortal } from 'react-dom';
import { Card } from './Card';
import { Header } from './Header';


type Props = {
  header?: React.ReactNode;
  children: React.ReactNode;
}

export function Modal({ header, children }: Props){
  return createPortal(
    (
      <div className="fixed top-0 left-0 flex items-center justify-center w-full h-full p-4 bg-gray-500 bg-opacity-80">
        <div className="w-1/2 max-w-full">
          <Card>
            {
              header &&
                <Header>
                  {header}
                </Header>
            }
            <div className="flex flex-col p-2">
              {children}
            </div>
          </Card>
        </div>
      </div>
    ),
    document.body
  );
}