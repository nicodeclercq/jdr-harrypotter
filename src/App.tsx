import React from 'react';
import './App.css';
import { Router } from './Router';
import { NotificationStack } from './components/Notification';

function App() {
  return (
    <div className="App">
      <Router />
      <NotificationStack />
    </div>
  );
}

export default App;
