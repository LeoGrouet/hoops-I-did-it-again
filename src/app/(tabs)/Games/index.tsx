import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, ImageBackground, Pressable, StyleSheet, Text, View } from 'react-native';

import { type GamesType } from '@/src/@types/GamesType';
import { type UserType } from '@/src/@types/UserType';
import { getHomeGames } from '@/src/api/HomeGame/getHomeGames';
import { getUserProfile } from '@/src/api/Profile/getUserProfile';
import colors from '@/src/assets/theme/colors';
import CalendarScrollBar from '@/src/components/CalendarScrollBar';
import Card from '@/src/components/Card';
import GamesInfo from '@/src/components/GamesInfo';
import Navbar from '@/src/components/Navbar';
import { useAuth } from '@/src/providers/AuthProvider';
import { isSameCalendarDay, toDateKey } from '@/src/utils/dates';
import { consumeGamesScreenIntent } from '@/src/utils/gamesScreenIntent';
import { router } from 'expo-router';

export default function IndexHomeGames() {
  const user = useAuth().session?.user
  const [homeGames, setHomeGames] = useState<GamesType[]>([])
  const [userInfo, setUserInfo] = useState<UserType | null>(null)
  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const didAutoSelectDate = useRef(false)

  const loadGames = useCallback(async () => {
    const data = await getHomeGames()
    setHomeGames(data)
  }, [])

  useFocusEffect(
    useCallback(() => {
      const intent = consumeGamesScreenIntent()

      if (intent?.createdGame) {
        setHomeGames(previous => {
          if (previous.some(game => game.id === intent.createdGame!.id)) {
            return previous
          }
          return [...previous, intent.createdGame!].sort(
            (a, b) =>
              dayjs(a.date).valueOf() - dayjs(b.date).valueOf()
              || a.hour.localeCompare(b.hour),
          )
        })
      }

      if (intent?.selectDateKey) {
        setSelectedDate(dayjs(intent.selectDateKey).toDate())
        didAutoSelectDate.current = true
      }

      loadGames()
    }, [loadGames]),
  )

  useEffect(() => {
    if (didAutoSelectDate.current || homeGames.length === 0) return

    const todayHasGames = homeGames.some(game =>
      isSameCalendarDay(game.date, new Date()),
    )
    if (todayHasGames) {
      didAutoSelectDate.current = true
      return
    }

    const nextGame = [...homeGames]
      .sort((a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf())
      .find(game => !dayjs(game.date).isBefore(dayjs(), 'day'))

    if (nextGame) {
      setSelectedDate(dayjs(nextGame.date).toDate())
    }
    didAutoSelectDate.current = true
  }, [homeGames])

  const markedDateKeys = useMemo(
    () => [...new Set(homeGames.map(game => toDateKey(game.date)))],
    [homeGames],
  )

  const gamesForSelectedDate = useMemo(
    () => homeGames.filter(game => isSameCalendarDay(game.date, selectedDate)),
    [homeGames, selectedDate],
  )

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!user?.id) {
        setUserInfo(null)
        return
      }
      try {
        const data = await getUserProfile(user.id)
        setUserInfo(data)
      } catch (error) {
        console.error('Error fetching user profile:', error)
      }
    }
    fetchUserInfo()
  }, [user?.id])


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
        <CalendarScrollBar
          selectedDate={selectedDate}
          onSelectDate={setSelectedDate}
          markedDateKeys={markedDateKeys}
        />
        <View style={styles.header}>
          <Text style={styles.title}>Matchs du week-end</Text>
          {userInfo?.role === 'Admin' && (
            <Pressable onPress={addGamesModal}>
              <Ionicons name="add-circle-outline" size={24} color={colors.primary} />
            </Pressable>
          )}
        </View>

        <FlatList
          style={styles.list}
          data={gamesForSelectedDate}
          keyExtractor={game => game.id.toString()}
          ListEmptyComponent={
            <Text style={styles.empty}>Aucun match pour cette date.</Text>
          }
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
      </View>
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
  empty: {
    textAlign: 'center',
    marginTop: 24,
    paddingHorizontal: 20,
    color: '#666',
  },
})
