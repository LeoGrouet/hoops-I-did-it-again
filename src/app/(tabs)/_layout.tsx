import { useAuth } from '@/src/providers/AuthProvider';
import { Entypo, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';

export default function tabsLayout() {
  const { session } = useAuth()

  if (!session) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarActiveTintColor: '#e91e63',
          tabBarIcon: () => <Entypo name="home" size={24} color="black" />,
        }}
      />

      <Tabs.Screen
        name="Games"
        options={{
          title: 'Games',
          headerShown: false,
          tabBarActiveTintColor: '#e91e63',
          tabBarIcon: () => <FontAwesome6 name="basketball" size={24} color="black" />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          headerShown: false,
          tabBarActiveTintColor: '#e91e63',
          tabBarIcon: () => <FontAwesome name="user" size={24} color="black" />,
        }}
      />
    </Tabs>
  );
}
