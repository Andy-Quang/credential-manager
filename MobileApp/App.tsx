import './global.css';

import React, { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { auth } from './src/lib/firebase';
import LoginScreen from './src/screens/LoginScreen';
import DashboardScreen from './src/screens/DashboardScreen';
import { FirebaseAuthTypes } from '@react-native-firebase/auth';
import SplashScreen from 'react-native-splash-screen';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function onAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) {
      setInitializing(false);
      SplashScreen.hide();
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  return (
    <SafeAreaProvider>
      <SafeAreaView className="flex-1">
        {!user ? <LoginScreen /> : <DashboardScreen />}
        <Toast />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

export default App;
