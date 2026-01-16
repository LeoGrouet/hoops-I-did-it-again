import { Tabs } from "expo-router";
import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

export default function RootLayout() {
  return <Tabs>
    <Tabs.Screen name="index"
      options={{
        title: "Home",
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarIcon: () => <Entypo name="home" size={24} color="black" />
      }}
    />
    <Tabs.Screen name="homeGames"
      options={{
        title: "Games",
        headerShown: false,
        tabBarActiveTintColor: '#e91e63',
        tabBarIcon: () => <FontAwesome6 name="basketball" size={24} color="black" />
      }}
    />
  </Tabs>
}
