import { Stack } from "expo-router";

export default function RootLayout() {
  return <Stack>
    <Stack.Screen
      name="HomeGames/index"
      options={{
        headerShown: false,
        title: "Games",
      }}
    />
    <Stack.Screen
      name="HomeGames/HomeGamesScheduledInfo"
      options={{
        headerShown: false,
        title: "Info"
      }}
    />
  </Stack >
}
