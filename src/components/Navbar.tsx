import { Image, StyleSheet, Text, View } from 'react-native'
import Logout from '../app/(auth)/logout'
import colors from '../assets/theme/colors'

export default function Navbar({ children }: { children?: React.ReactNode }) {

  return (
    <View
      style={styles.container}
    >
      {children}
      <Text>Hoops I</Text>
      <Image
        style={{ width: 70, height: 70, marginLeft: 15, marginRight: 15 }}
        source={require('../assets/images/carpiquetlogo.png')}
      />
      <Text>did it again</Text>
      <View style={styles.logout}>
        <Logout />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: colors.white,
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10,
    paddingTop: 50,
  },
  logout: {
    position: 'absolute',
    right: '5%',
    bottom: '45%',
  },
})
