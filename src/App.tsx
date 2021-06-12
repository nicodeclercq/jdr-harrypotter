import React from 'react';
import { Router } from './Router';
import { NotificationStack } from './components/Notification';
import { SocketMessageHandler } from './SocketMessageHandler';
import { WindowShortcuts } from './WindowShortcuts';

function App() {
  return (
    <SocketMessageHandler>
      <WindowShortcuts>
          <Router />
          <NotificationStack />
      </WindowShortcuts>
    </SocketMessageHandler>
  );
}

export default App;
