import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { HomeGameOfficialType, getHomeGameOfficial } from "@/utils/fetchs/HomeGame/getHomeGameOfficial";
import { translateRole } from "@/utils/translateRole";

export default function GameDetail() {
  const id = useLocalSearchParams().id;

  const [homeGamesOfficial, setHomeGamesOfficial] = useState<HomeGameOfficialType[]>();

  useEffect(() => {
    const fetchOfficials = async () => {
      const data = await getHomeGameOfficial(Number(id));
      setHomeGamesOfficial(data);
    };

    fetchOfficials();
    console.log(fetchOfficials())
  }, [id]);

  return (
    <>
      <FlatList
        data={homeGamesOfficial}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.container}>
            <Text>{translateRole(item.OfficialRole)}</Text>
            <Text>{item.HomeGamesOfficial_userId_fkey?.Firstname} {item.HomeGamesOfficial_userId_fkey?.Lastname}</Text>
          </View>
        )}
      />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
  },

  button: {
    fontSize: 10,
    color: '#000000',
  },
});

