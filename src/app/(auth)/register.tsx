import colors from "@/src/assets/theme/colors";
import { Button, Image, StyleSheet, View } from "react-native";

export default function Register() {

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={require('@/src/assets/images/carpiquetlogo.png')}
      />
      <View style={styles.button}>
        <form>
          <label>
            Nom :
            <input type="text" name="name" />
          </label>
          <input type="submit" value="Envoyer" />
        </form>
        <Button title="Se connecter" onPress={() => { 'register' }} />
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
