import React, { useEffect } from 'react';
import './App.css';
import { Router } from './Router';
import { NotificationStack } from './components/Notification';
import { useRune } from './pages/runes/useRune';
import { useLocks } from './useLocks';

function App() {
  const { setKnownRunes } = useRune();
  const { setKeys } = useLocks();

  useEffect(() => {
    // @ts-ignore
    window.app = {
      setKeys,
      setKnownRunes,
    }
  }, [setKeys, setKnownRunes]);

  return (
    <div className="App">
      <Router />
      <NotificationStack />
    </div>
  );
}

export default App;
