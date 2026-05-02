import { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View } from 'react-native'

import { type GamesType } from '@/src/@types/GamesType'
import { getHomeGames } from '@/src/api/HomeGame/getHomeGames'
import Card from '@/src/components/Card'
import GamesInfo from '@/src/components/GamesInfo'
import Navbar from '@/src/components/Navbar'

export default function IndexHomeGames() {
  const [homeGames, setHomeGames] = useState<GamesType[]>([])

  useEffect(() => {
    const fetchGames = async () => {
      const data = await getHomeGames()
      if (!data) {
        throw new Error('No home games found')
      }
      setHomeGames(data)
    }

    fetchGames()
  }, [])

  return (
    <View style={styles.page}>
      <Navbar />
      <View
        style={styles.header}
      >
        <Text style={styles.title}>Matchs du week-end</Text>
      </View>
      {!homeGames ? (<Text>Loading...</Text>) : (
        <FlatList
          style={styles.list}
          data={homeGames}
          keyExtractor={game => game.id.toString()}
          renderItem={({ item: game }) => (
            <Card>
              <GamesInfo
                id={game.id}
                date={game.date}
                hour={game.hour}
                opponent={game.opponent}
                Teams={game.Teams || { name: 'Unknown Team' }}
              />
            </Card>
          )}
        />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 20,
  },
  list: {
    display: 'flex',
    marginBottom: 60,
  },
})
