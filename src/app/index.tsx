import { StyleSheet, Text, View } from 'react-native';

import Navbar from '@/src/components/Navbar';
import { useAuth } from '../providers/AuthProvider';

export default function Index() {
  const { session } = useAuth();

  return (
    <View>
      <Navbar />
      <View
        style={styles.container}
      >
        <Text>Bienvenue sur l&apos;application de Carpiquet Basket</Text>
        <Text>Cette application vous permet de suivre les actualités et les événements de votre club de basket préférée.</Text>
      </View>
      <View style={styles.container}>
        {!session ? (
          <Text>Veuillez vous connecter pour accéder à toutes les fonctionnalités de l&apos;application.</Text>
        ) : (
          <Text>Vous êtes connecté en tant que {session.user.email}</Text>
        )}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    padding: 10,
  },
})
