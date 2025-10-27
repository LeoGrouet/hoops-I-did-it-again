import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Image } from 'expo-image';

export default function Navbar() {
  return (
    <View
      style={styles.container}>
      <Image
        style={{ width: 70, height: 70 }}
        source={require("@/assets/images/carpiquetlogo.png")}
        alt="Logo"
      />
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
