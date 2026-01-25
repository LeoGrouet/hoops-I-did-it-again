import colors from "@/src/assets/theme/colors";
import { Redirect } from "expo-router";
import { Button, Image, StyleSheet, View } from "react-native";
import { useAuth } from "./AuthContext";

export default function Login() {
  const { user, signIn } = useAuth();

  if (user) {
    return <Redirect href="/" />;
  }

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('@/src/assets/images/carpiquetlogo.png')}
      />
      <View style={styles.button}>
        <Button title="Se connecter" onPress={signIn} />
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    display: 'flex',
    backgroundColor: colors.white,
  },
  image: {
    width: '40%',
    height: '40%',
    alignSelf: 'center',
  },
  button: {
    borderStyle: 'solid',
    borderWidth: 1,
    alignSelf: 'center',
    marginTop: 20,
    borderColor: 'black',
  },
})
