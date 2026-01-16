import { useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import colors from '@/hoops-esc/theme/colors'
import { type OfficialType } from '@/src/@types/OfficialType'
import { getHomeGameOfficial } from '@/src/api/HomeGame/getHomeGameOfficial'
import Navbar from '@/src/components/Navbar'

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

  return (
    <View style={styles.page}>
      <Navbar />
      <Text style={styles.title}>Arbitres:</Text>
      {OfficialReferee && OfficialReferee.length > 0 ?
          (OfficialReferee?.map((official, index) => (
            <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
              {official?.Users?.Firstname} {official.Users?.Lastname} {official.Users?.LicenceNb}
            </Text>
          )))
        : <Text style={styles.official}>Aucun arbitre assigné</Text>
      }

      <Text style={styles.title}>Table de marque:</Text>
      {OfficialOtm && OfficialOtm.length > 0 ?
          (OfficialOtm?.map((official, index) => (
            <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
              {official.Users?.Firstname} {official.Users?.Lastname} {official.Users?.LicenceNb}
            </Text>
          )))
        : <Text style={styles.official}>Aucun officiel de table assigné</Text>
      }

      <Text style={styles.title}>Surveillant de salle:</Text>
      {OfficialRoom && OfficialRoom.length > 0 ?
          (OfficialRoom?.map((official, index) => (
            <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
              {official.Users?.Firstname} {official.Users?.Lastname} {official.Users?.LicenceNb}
            </Text>
          )))
        : <Text style={styles.official}>Aucun officiel de table assigné</Text>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
  title: {
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 10,
  },
  official: {
    marginLeft: 20,
    marginBottom: 5,
  },
})
