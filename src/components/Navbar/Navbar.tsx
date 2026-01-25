import { Image, StyleSheet, Text, View } from 'react-native'
import colors from '../../assets/theme/colors'

export default function Navbar() {
  return (
    <View
      style={styles.container}
    >
      <Text>Hoops I</Text>
      <Image
        style={{ width: 70, height: 70, marginLeft: 15, marginRight: 15 }}
        source={require('../../assets/images/carpiquetlogo.png')}
      />
      <Text>did it again</Text>
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
})
