import React, { useState } from 'react';

type Props = {
  children: {
    header: React.ReactNode,
    content: React.ReactNode,
    actions?: React.ReactNode,
    toggle?: React.ReactNode,
  }
}

export function Accordion({children: {header, content, actions, toggle}}: Props) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <details className="flex flex-col">
      <summary className="flex px-6 py-2">
        {
          toggle
            ? (<>
                <div className="flex-grow">{header}</div>
                <button className={isCollapsed ? '' : 'transform rotate-180'} onClick={() => setIsCollapsed(!isCollapsed)}>{toggle}</button>
              </>)
            : (<>
              <div className="flex-grow" onClick={() => setIsCollapsed(!isCollapsed)}>{header}</div>
              </>)
        }
        {actions}
      </summary>
      <div className={`py-2 px-6 text-left ${isCollapsed ? 'hidden' : 'block'}`}>
        {content}
      </div>
    </details>
  )
}