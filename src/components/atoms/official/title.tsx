
import { StyleSheet, Text } from 'react-native';

export default function OfficialTitle({ title }: { title: string }) {
  return (
    <Text style={styles.title}>{title}</Text>
  )
}

const styles = StyleSheet.create({
  title: {
    alignSelf: 'flex-start',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 20,
    margin: 15,
    color: 'white',
  },
})
