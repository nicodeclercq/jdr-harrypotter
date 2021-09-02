import React from 'react';

type Props = {
  children: {
    header: React.ReactNode,
    content: React.ReactNode,
    actions?: React.ReactNode,
    toggle?: React.ReactNode,
  }
}

const style = (uid: number) => `
  .toggle{
    transition: transform ease-in 200ms;
  }
  .accordion_${uid}[open] .toggle{
    transform: rotate(180deg)
  }
`;
let uid = 0;

export function Accordion({children: {header, content, actions, toggle}}: Props) {
  const id = uid++;
  return (
    <>
      <style>{style(id)}</style>
      <details className={`accordion_${id} flex flex-col`}>
        <summary className="flex items-center px-6 py-2 space-x-2">
          {
            toggle
              ? (<>
                  <div className="flex-grow">{header}</div>
                  <div className="toggle">{toggle}</div>
                </>)
              : (<div className="flex-grow">{header}</div>)
          }
          {actions}
        </summary>
        <div className={`py-2 px-6 text-left`}>
          {content}
        </div>
      </details>
    </>
  )
}