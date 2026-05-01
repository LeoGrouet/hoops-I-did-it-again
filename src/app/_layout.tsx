import { Entypo, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import { SplashScreen, Tabs } from 'expo-router';
import { useEffect } from 'react';
import AuthProvider from '../providers/AuthProvider';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();


export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <AuthProvider>
      <Tabs>
        <Tabs.Screen name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarActiveTintColor: '#e91e63',
            tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
          }}
        />
        <Tabs.Screen name="homeGames"
          options={{
            title: 'Games',
            headerShown: false,
            tabBarActiveTintColor: '#e91e63',
            tabBarIcon: () => <FontAwesome6 name="basketball" size={24} color="black" />,
          }}
        />
        <Tabs.Screen
          name="(auth)"
          options={{ headerShown: false }}
        />

      </Tabs>
    </AuthProvider>
  )
}
