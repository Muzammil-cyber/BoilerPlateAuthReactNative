/**
 * Authentication boilerplate for React Native
 *
 * @format
 */

import React from 'react';
import { AuthProvider } from './src/context/AuthContext';
import { Navigation } from './src/navigation/Navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const App = () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <Navigation />
      </AuthProvider>
    </SafeAreaProvider>
  );
};

export default App;
