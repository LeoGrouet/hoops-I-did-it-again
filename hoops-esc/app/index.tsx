import Navbar from "@/components/Navbar";
import { Text, View } from "react-native";

export default function Index() {
  return (
    <View>
      <Navbar />
      <View style={{ padding: 20 }}>
        <Text>Bienvenue sur l&apos;application de Carpiquet Basket</Text>
        <Text>Cette application vous permet de suivre les actualités et les événements de votre club de basket préférée.</Text>
      </View>
    </View>
  );
}
