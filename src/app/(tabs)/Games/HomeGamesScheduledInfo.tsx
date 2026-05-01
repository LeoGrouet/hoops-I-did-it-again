import { type OfficialType } from '@/src/@types/OfficialType'
import { getHomeGameOfficial } from '@/src/api/HomeGame/getHomeGameOfficial'
import colors from '@/src/assets/theme/colors'
import { AntDesign } from '@expo/vector-icons'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

export default function HomeGamesScheduledInfo() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  const [OfficialReferee, setOfficialReferee] = useState<OfficialType[]>()
  const [OfficialOtm, setOfficialOtm] = useState<OfficialType[]>()
  const [OfficialRoom, setOfficialRoom] = useState<OfficialType[]>()

  useEffect(() => {
    const fetchOfficials = async () => {
      const data = await getHomeGameOfficial(Number(id))

      setOfficialReferee(
        data.filter(official => official.OfficialRole === 'Referee'),
      )

      setOfficialOtm(
        data.filter(official => official.OfficialRole === 'TableOfficer'),
      )

      setOfficialRoom(
        data.filter(official => official.OfficialRole === 'RoomOfficier'),
      )
    }

    fetchOfficials()
  }, [id])

  const isPresented = router.canGoBack()

  return (
    <View style={styles.page}>
      {isPresented && <Link href="../"><AntDesign name="line" size={24} color="black" /></Link>}
      <Text style={styles.title}>Arbitres:</Text>
      {
        OfficialReferee && OfficialReferee.length > 0 ?
          (OfficialReferee?.map((official, index) => (
            <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
              {official?.User?.Firstname} {official.User?.Lastname} {official.User?.LicenceNb}
            </Text>
          )))
          : <Text style={styles.official}>Aucun arbitre assigné</Text>
      }

      <Text style={styles.title}>Table de marque:</Text>
      {
        OfficialOtm && OfficialOtm.length > 0 ?
          (OfficialOtm?.map((official, index) => (
            <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
              {official.User?.Firstname} {official.User?.Lastname} {official.User?.LicenceNb}
            </Text>
          )))
          : <Text style={styles.official}>Aucun officiel de table assigné</Text>
      }

      <Text style={styles.title}>Surveillant de salle:</Text>
      {
        OfficialRoom && OfficialRoom.length > 0 ?
          (OfficialRoom?.map((official, index) => (
            <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
              {official.User?.Firstname} {official.User?.Lastname} {official.User?.LicenceNb}
            </Text>
          )))
          : <Text style={styles.official}>Aucun officiel de table assigné</Text>
      }
    </View >
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    margin: 15,
    alignItems: 'center',
  },
  title: {
    alignSelf: 'flex-start',
    fontSize: 16,
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 10,
  },
  official: {
    alignSelf: 'flex-start',
    fontSize: 14,
    marginLeft: 20,
    marginBottom: 5,
  },
})
