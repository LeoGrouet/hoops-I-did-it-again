import { useAuth } from '@/src/providers/AuthProvider';
import { Redirect, Stack } from 'expo-router';

export default function homeGamesLayout() {
  const { session } = useAuth();

  if (!session) {
    return <Redirect href={'/sign-in'} />;
  } else {
    return (
      <Stack>
        <Stack.Screen
          name="index"
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HomeGamesScheduledInfo"
          options={{
            headerShown: false,
          }}
        />
      </Stack >
    )
  }
}
