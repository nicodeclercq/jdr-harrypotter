import React, { useState } from 'react';

export function Accordion({children: {header, content, actions}}: {children: {header: React.ReactNode, content: React.ReactNode, actions?: React.ReactNode}}) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="flex flex-col">
      <div className="flex py-2 px-6">
        <button className="flex-grow" onClick={() => setIsCollapsed(!isCollapsed)}>{header}</button>
        {actions}
      </div>
      <div className={`py-2 px-6 text-left ${isCollapsed ? 'hidden' : 'block'}`}>
        {content}
      </div>
    </div>
  )
}