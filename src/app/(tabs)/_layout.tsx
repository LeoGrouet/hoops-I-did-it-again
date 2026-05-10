import colors from '@/src/assets/theme/colors';
import { useAuth } from '@/src/providers/AuthProvider';
import { Entypo, FontAwesome, FontAwesome6 } from '@expo/vector-icons';
import { Redirect, Tabs } from 'expo-router';

export default function tabsLayout() {
  const { session } = useAuth()

  if (!session) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Tabs screenOptions={{
      tabBarStyle: {
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
      },
    }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ color, size }) => <Entypo name="home" size={size} color={color} />,
        }}
      />

      <Tabs.Screen
        name="Games"
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ color, size }) => <FontAwesome6 name="basketball" size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarIcon: ({ color, size }) => <FontAwesome name="user" size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}
