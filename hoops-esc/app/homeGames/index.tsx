import Card from "@/components/Card";
import GamesInfo, { GamesType } from "@/components/GamesInfo";
import Navbar from "@/components/Navbar";
import { getHomeGames } from "@/utils/fetchs/HomeGame/getHomeGames";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

export default function IndexHomeGames() {
  const [homeGames, setHomeGames] = useState<GamesType[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      const data = await getHomeGames();
      if (!data) {
        throw new Error("No home games found");
      }
      setHomeGames(data);
    };

    fetchGames();
  }, []);

  return (
    <View style={styles.page}>
      <Navbar />
      <View
        style={styles.header}>
        <Text style={styles.title}>Matchs du week-end</Text>
      </View>
      {!homeGames ? (<Text>Loading...</Text>) :
        <FlatList
          style={styles.list}
          data={homeGames}
          keyExtractor={(game) => game.id.toString()}
          renderItem={({ item: game }) => (
            <Card>
              <GamesInfo
                id={game.id}
                category={game.HomeGames_category_fkey?.Name || game.category}
                date={game.date}
                hour={game.hour}
                opponent={game.opponent}
                referee={game.referee}
                table_official={game.table_official}
                room_official={game.room_official}
              />
            </Card>
          )}
        />
      }
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 20
  },
  list: {
    display: 'flex',
  }
});
