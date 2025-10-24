import { Link } from "expo-router";
import { Text, View, StyleSheet } from "react-native";
import { Image } from 'expo-image';

export default function Navbar() {
  return (
    <View
      style={styles.container}>
      <Image
        style={{ width: 80, height: 80 }}
        source={require("@/assets/images/carpiquetlogo.png")}
        alt="Logo"
      />
      <View>
        <Link href="/authentication/login">
          <Text style={styles.button}>Se connecter</Text>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
    padding: 10,
  },

  button: {
    fontSize: 10,
    color: '#000000',
  },
});
