import 'dayjs/locale/fr'

import dayjs from 'dayjs'
import { router } from 'expo-router'
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

import { type GamesType } from '@/src/@types/GamesType'

export default function GamesInfo(item: GamesType) {
  const formatted = dayjs(item.date).locale('fr').format('D MMMM YYYY')

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push(`/(tabs)/Games/HomeGamesScheduledInfo?id=${item.id}`)}>
      <View style={styles.versus}>
        <Image
          style={{ width: 50, height: 50 }}
          source={require('../assets/images/carpiquetlogo.png')}
          alt="Logo"
        />
        <Text>VS {item.opponent}</Text>
      </View>
      <View style={styles.info}>
        <Text>{formatted}</Text>
        <Text>{item.hour}Heure</Text>
        <Text>{item.Teams?.name || 'Unknown Team'}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: 90,
    paddingLeft: 20,
    gap: 50,
    width: '100%',
  },
  versus: {
    alignItems: 'center',
    minWidth: 130,
    gap: 10,
  },
  info: {
    alignItems: 'center',
    gap: 5,
  },
})
