import Navbar from "@/components/Navbar";
import { Link } from "expo-router";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";

type GamesType = {
  id: Number,
  date: Date,
  category: string,
  referee: Array<String>,
  table_official: Array<String>,
  room_official: String
}

const gamesData: Array<GamesType> =
  [
    {
      'id': 1,
      'date': new Date(),
      'category': 'U9',
      'referee': ["Léo", "Zoé"],
      'table_official': ["Juyien", "Elie"],
      'room_official': "Jean-Michel"
    },
    {
      'id': 2,
      'date': new Date(),
      'category': 'U15',
      'referee': ["Léo", "Zoé"],
      'table_official': ["Juyien", "Elie"],
      'room_official': "Jean-Michel"
    },
    {
      'id': 3,
      'date': new Date(),
      'category': 'SH',
      'referee': ["Léo", "Zoé"],
      'table_official': ["Juyien", "Elie"],
      'room_official': "Jean-Michel"
    },
    {
      'id': 4,
      'date': new Date(),
      'category': 'SF',
      'referee': ["Léo", "Zoé"],
      'table_official': ["Juyien", "Elie"],
      'room_official': "Jean-Michel"
    },
  ]

export default function Index() {
  return (
    <View style={styles.page}>
      <Navbar />
      <View
        style={styles.header}>
        <Text style={styles.title}>Matchs du week-end</Text>
      </View>
      <FlatList
        data={gamesData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.list}>
            <Text>{item.category}</Text>
            <Text>Date : {item.date.toLocaleDateString()}</Text>
            <Text>Arbitres : {item.referee.join(", ")}</Text>
            <Text>Table : {item.table_official.join(", ")}</Text>
            <Text>Salle : {item.room_official}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  page: {
    display: 'flex',
    justifyContent: 'center'
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
    flexDirection: 'column',
  }
});
