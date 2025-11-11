import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Image } from 'expo-image';

export default function Navbar() {
  return (
    <View
      style={styles.container}>
      <Text>Hoops I</Text>
      <Image
        style={{ width: 70, height: 70, marginLeft: 15, marginRight: 15 }}
        source={require("@/assets/images/carpiquetlogo.png")}
        alt="Logo"
      />
      <Text>did it again</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    width: '100%',
    alignItems: 'center',
    paddingBottom: 10
  },

  button: {
    fontSize: 10,
    color: '#000000',
  },
});
