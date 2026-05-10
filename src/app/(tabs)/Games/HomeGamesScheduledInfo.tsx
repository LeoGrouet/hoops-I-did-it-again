import { type OfficialType } from '@/src/@types/OfficialType'
import { getHomeGameOfficial } from '@/src/api/HomeGame/getHomeGameOfficial'
import colors from '@/src/assets/theme/colors'
import OfficialTitle from '@/src/components/atoms/official/title'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'

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
      <LinearGradient
        colors={['rgba(228, 13, 25, 1) 0%', 'rgba(114, 7, 13, 1) 30%', 'rgba(37, 90, 3, 1) 100%']}
        style={styles.background}
      >
        {isPresented && <Link href="../"><AntDesign name="line" size={24} color="black" /></Link>}
        <OfficialTitle title="Arbitres:" />
        {
          OfficialReferee && OfficialReferee.length > 0 ?
            (OfficialReferee?.map((official, index) => (
              <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
                {official?.User?.Firstname} {official.User?.Lastname} {official.User?.LicenceNb}
              </Text>
            )))
            : <View style={styles.official}>
              <Text>Aucun arbitre assigné</Text>
              <Pressable onPress={() => console.log("Ajouter un arbitre")}>
                <Ionicons name="add-circle-outline" size={24} color={colors.white} />
              </Pressable>
            </View>
        }

        <OfficialTitle title="Table de marque:" />
        {
          OfficialOtm && OfficialOtm.length > 0 ?
            (OfficialOtm?.map((official, index) => (
              <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
                {official.User?.Firstname} {official.User?.Lastname} {official.User?.LicenceNb}
              </Text>
            )))
            : <Text style={styles.official}>Aucun officiel de table assigné</Text>
        }

        <OfficialTitle title="Surveillant de salle:" />
        {
          OfficialRoom && OfficialRoom.length > 0 ?
            (OfficialRoom?.map((official, index) => (
              <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
                {official.User?.Firstname} {official.User?.Lastname} {official.User?.LicenceNb}
              </Text>
            )))
            : <Text style={styles.official}>Aucun officiel de table assigné</Text>
        }
      </LinearGradient>
    </View >
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
  },
  official: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    fontSize: 14,
    marginLeft: 15,
    paddingBottom: 5,
    color: 'white',
  },
  background: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    height: '100%',
  },
})
