import { StyleSheet, Text, View } from 'react-native'

import Navbar from '@/src/components/Navbar/Navbar'

export default function Index() {
  return (
    <View>
      <Navbar />
      <View
        style={styles.container}
      >
        <Text>Bienvenue sur l&apos;application de Carpiquet Basket</Text>
        <Text>Cette application vous permet de suivre les actualités et les événements de votre club de basket préférée.</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
  },
})
