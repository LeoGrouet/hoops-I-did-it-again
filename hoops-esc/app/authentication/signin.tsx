import { Link } from "expo-router";
import { Text, View } from "react-native";

export default function Signin() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Inscription</Text>
      <Link href="/authentication/login">
        <Text>J&apos;ai déjà un compte</Text>
      </Link>
    </View>
  );
}
