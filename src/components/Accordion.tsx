import React from 'react';

type Props = {
  children: {
    header: React.ReactNode,
    content: React.ReactNode,
    actions?: React.ReactNode,
    toggle?: React.ReactNode,
  }
}

export function Accordion({children: {header, content, actions, toggle}}: Props) {
  return (
    <details className="flex flex-col">
      <summary className="flex px-6 py-2">
        {
          toggle
            ? (<>
                <div className="flex-grow">{header}</div>
                {toggle}
              </>)
            : (<div className="flex-grow">{header}</div>)
        }
        {actions}
      </summary>
      <div className={`py-2 px-6 text-left`}>
        {content}
      </div>
    </details>
  )
}