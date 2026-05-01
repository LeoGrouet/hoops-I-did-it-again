import { useAuth } from '@/src/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';

export default function tabsLayout() {
  const { session } = useAuth()

  if (!session) {
    return <Redirect href="/sign-in" />
  }

  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: 'Home',
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="HomeGamesScheduledInfo"
        options={{
          title: 'HomeGamesScheduledInfo',
          presentation: 'modal',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
