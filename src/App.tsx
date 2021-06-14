import React from 'react';
import { Router } from './Router';
import { NotificationStack } from './components/Notification';
import { WindowShortcuts } from './WindowShortcuts';

function App() {
  return (
    <WindowShortcuts>
      <Router />
      <NotificationStack />
    </WindowShortcuts>
  );
}

export default App;
