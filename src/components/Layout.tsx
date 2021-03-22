import React from 'react';

export function Layout ({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-500 p-6 h-screen space-x-2">
    {children}
    </div>
  );
}