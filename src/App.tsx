import React, { useEffect } from 'react';
import './App.css';
import { Router } from './Router';
import { NotificationStack } from './components/Notification';
import { useRune } from './pages/runes/useRune';
import { useLocks } from './useLocks';
import { ExternalStore } from './store/ExternalStore';

function App() {
  const { setKnownRunes } = useRune();
  const { setKeys } = useLocks();

  useEffect(() => {
    // @ts-ignore
    window.app = {
      setKeys,
      setKnownRunes,
      getUserList: ExternalStore.getEntries,
      deleteUser: ExternalStore.delete,
      clear: () => {
        window.localStorage.removeItem('state');
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      }
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
