import Ionicons from '@expo/vector-icons/Ionicons';
import { Suspense, useEffect, useState } from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

import { type GamesType } from '@/src/@types/GamesType';
import { getHomeGames } from '@/src/api/HomeGame/getHomeGames';
import { getUserProfile } from '@/src/api/Profile/getUserProfile';
import colors from '@/src/assets/theme/colors';
import Card from '@/src/components/Card';
import GamesInfo from '@/src/components/GamesInfo';
import Navbar from '@/src/components/Navbar';
import { useAuth } from '@/src/providers/AuthProvider';
import { router } from 'expo-router';

export default function IndexHomeGames() {
  const user = useAuth().session?.user
  const [homeGames, setHomeGames] = useState<GamesType[]>([])
  const [userInfo, setUserInfo] = useState<any>(null)

  useEffect(() => {
    const fetchGames = async () => {
      const data = await getHomeGames()
      if (!data) {
        throw new Error('No home games found')
      }
      setHomeGames(data)
    }

    fetchGames()
  }, [homeGames])

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (user) {
        try {
          const data = await getUserProfile(user.id)
          setUserInfo(data)
        } catch (error) {
          console.error('Error fetching user profile:', error)
        }
      }
    }
    fetchUserInfo()
  }, [])


  const addGamesModal = () => {
    router.push("/(tabs)/Games/addGameModal")
  }

  return (
    <ImageBackground
      source={require('../../../assets/images/carpiquetlogo.png')}
      resizeMode="center"
    >
      <View style={styles.page}>
        <Navbar />
        <View
          style={styles.header}
        >
          <Text style={styles.title}>Matchs du week-end</Text>
          {userInfo?.role === 'Admin' && (
            <Pressable onPress={addGamesModal}>
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
            </Pressable>
          )}
        </View>

        <Suspense fallback={<Text>Loading...</Text>}>
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
        </Suspense>
      </View >
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: 130,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  list: {
    display: 'flex',
    marginBottom: 40,
  },
})
