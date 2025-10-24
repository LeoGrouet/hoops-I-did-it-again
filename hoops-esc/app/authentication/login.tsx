import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Connexion</Text>
      <Link href="/authentication/signin">
        <Text>Je n&apos;ai pas de compte</Text>
      </Link>
    </View>
  );
}
