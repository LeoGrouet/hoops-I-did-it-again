import { Stack } from "expo-router";

export default function TabsLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="HomeGamesScheduler"
        options={{
          title: "Game Scheduler",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="HomeGamesScheduledInfo"
        options={{
          title: "Détails du match",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
