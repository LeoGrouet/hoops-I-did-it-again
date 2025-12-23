import { StyleSheet, View } from 'react-native'
import colors from '@/theme/colors'

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    borderRadius: 20,
    margin: 10,
  },
})
