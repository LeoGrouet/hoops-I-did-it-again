import { Image } from "expo-image";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import dayjs from "dayjs";
import 'dayjs/locale/fr';
import { router } from "expo-router";

export type GamesType = {
  id: number
  date: Date
  hour: string
  opponent: string
  category: string
  HomeGames_category_fkey?: {
    Name: string
  } | null
  referee: string[]
  table_official: string[]
  room_official: string
}

export default function GamesInfo(item: GamesType) {
  const formatted = dayjs(item.date).locale("fr").format('D MMMM YYYY');

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push(`/homeGames/HomeGamesScheduledInfo?id=${item.id}`)}>
      <View style={styles.versus}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require("@/assets/images/carpiquetlogo.png")}
          alt="Logo"
        />
        <Text>VS {item.opponent}</Text>
      </View>
      <View style={styles.info}>
        <Text>{formatted}</Text>
        <Text>{item.hour}H</Text>
        <Text>{item.category}</Text>
      </View>
    </TouchableOpacity >
  );
}

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    // flexDirection: 'row',
    gridTemplateRows: '1fr 1fr',
    alignItems: 'center',
    height: 90,
    paddingLeft: 20,
    gap: 50,
  },
  versus: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
  }
});
