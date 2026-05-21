import { type OfficialType } from '@/src/@types/OfficialType'
import { getHomeGameOfficial } from '@/src/api/HomeGame/getHomeGameOfficial'
import { addOfficial } from '@/src/api/Official/addOfficial'
import { OfficialRoleSection } from '@/src/components/OfficialRoleSection'
import { useAuth } from '@/src/providers/AuthProvider'
import { AntDesign } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Link, router, useLocalSearchParams } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'

enum OfficialRole {
  Referee = 'Referee',
  TableOfficer = 'TableOfficer',
  RoomOfficer = 'RoomOfficier',
}

const ROLE_LIMITS: Record<OfficialRole, number> = {
  [OfficialRole.Referee]: 2,
  [OfficialRole.TableOfficer]: 2,
  [OfficialRole.RoomOfficer]: 1,
}

function getOfficialsByRole(officials: OfficialType[]): Record<OfficialRole, OfficialType[]> {
  const roles = Object.values(OfficialRole)

  return roles.reduce((acc, role) => {
    acc[role] = officials.filter(official => official.OfficialRole === role)
    return acc
  }, {
    [OfficialRole.Referee]: [],
    [OfficialRole.TableOfficer]: [],
    [OfficialRole.RoomOfficer]: [],
  } as Record<OfficialRole, OfficialType[]>)
}

export default function HomeGamesScheduledInfo() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  const [officialsByRole, setOfficialsByRole] = useState<Record<OfficialRole, OfficialType[]>>({
    [OfficialRole.Referee]: [],
    [OfficialRole.TableOfficer]: [],
    [OfficialRole.RoomOfficer]: [],
  })

  const isRoleFull = (role: OfficialRole) => {
    return officialsByRole[role].length >= ROLE_LIMITS[role]
  }

  const fetchOfficials = async () => {
    if (!id) {
      return
    }

    const data = await getHomeGameOfficial(Number(id))
    setOfficialsByRole(getOfficialsByRole(data))
  }

  useEffect(() => {
    fetchOfficials()
  }, [id])

  const currentUserUid = useAuth().session?.user?.id

  const handleRegister = async (role: OfficialRole) => {
    if (!id || !currentUserUid) {
      return
    }

    if (isRoleFull(role)) {
      return
    }

    const insertedOfficial = await addOfficial(
      Number(id),
      currentUserUid,
      role)

    if (insertedOfficial) {
      await fetchOfficials()
    }
  }

  const isPresented = router.canGoBack()

  return (
    <View style={styles.page}>
      <LinearGradient
        colors={['rgba(228, 13, 25, 1) 0%', 'rgba(114, 7, 13, 1) 30%', 'rgba(37, 90, 3, 1) 100%']}
        style={styles.background}
      >
        {isPresented && <Link href="../"><AntDesign name="line" size={24} color="black" /></Link>}
        <OfficialRoleSection
          title="Arbitres:"
          isFull={isRoleFull(OfficialRole.Referee)}
          officials={officialsByRole[OfficialRole.Referee]}
          emptyLabel="Aucun arbitre assigne"
          iconName="whistle"
          onRegister={() => handleRegister(OfficialRole.Referee)}
        />

        <OfficialRoleSection
          title="Table de marque:"
          isFull={isRoleFull(OfficialRole.TableOfficer)}
          officials={officialsByRole[OfficialRole.TableOfficer]}
          emptyLabel="Aucun officiel de table assigne"
          iconName="scoreboard"
          onRegister={() => handleRegister(OfficialRole.TableOfficer)}
        />

        <OfficialRoleSection
          title="Surveillant de salle:"
          isFull={isRoleFull(OfficialRole.RoomOfficer)}
          officials={officialsByRole[OfficialRole.RoomOfficer]}
          emptyLabel="Aucun surveillant de salle assigne"
          iconName="account-tie"
          onRegister={() => handleRegister(OfficialRole.RoomOfficer)}
        />
      </LinearGradient>
    </View >
  )
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    height: '100%',
  },
})
