import { type UserType } from "@/src/@types/UserType"
import { getUserProfile } from "@/src/api/Profile/getUserProfile"
import Navbar from "@/src/components/Navbar"
import { useAuth } from "@/src/providers/AuthProvider"
import { useEffect, useState } from "react"
import { StyleSheet, Text, View } from "react-native"

export default function Profile() {

  const currentUserUid = useAuth().session?.user?.id

  const [profile, setProfile] = useState<UserType | null>(null)

  useEffect(() => {
    if (!currentUserUid) {
      setProfile(null)
      return
    }
    getUserProfile(currentUserUid)
      .then((profile) => {
        setProfile(profile)
      })
      .catch(error => {
        console.error('Error fetching user profile:', error)
      })
  }, [currentUserUid])
  return (
    <View style={styles.container}>
      <Navbar />
      <View>
        <Text>Bonjour {profile?.Firstname}</Text>
        <Text>Email : {profile?.email}</Text>
        <Text>Numéro de licence : {profile?.LicenceNb}</Text>
        <Text>Role: {profile?.role}</Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
  },
})
