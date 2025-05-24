/**
 * Authentication boilerplate for React Native
 *
 * @format
 */

import React, { useEffect } from 'react';
import { Navigation } from './src/navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useAuthStore } from './src/stores/auth.store';

const App = () => {
  const initialize = useAuthStore((state) => state.initialize);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
