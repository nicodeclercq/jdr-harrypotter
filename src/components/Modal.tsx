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
      <div className="fixed top-0 left-0 p-4 w-full h-full flex justify-center items-center bg-opacity-80 bg-gray-500">
        <div className="w-1/2 max-w-full">
          <Card>
            {
              header &&
                <Header>
                  {header}
                </Header>
            }
            <div className="p-2 flex flex-col">
              {children}
            </div>
          </Card>
        </div>
      </div>
    ),
    document.body
  );
}