import React from 'react';
import './App.css';
import { Router } from './Router';
import { NotificationStack } from './components/Notification';
import { Socket } from './Socket';
import { WindowShortcuts } from './WindowShortcuts';

function App() {
  return (
    <div className="App">
      <WindowShortcuts>
        <Socket>
          <Router />
          <NotificationStack />
        </Socket>
      </WindowShortcuts>
    </div>
  );
}

export default App;
