<<<<<<< HEAD
import { FlatList, StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { HomeGameOfficialType, getHomeGameOfficial } from "@/utils/fetchs/HomeGame/getHomeGameOfficial";
import { translateRole } from "@/utils/translateRole";
=======
import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { OfficialType, getHomeGameOfficial } from "@/utils/HomeGame/getHomeGameOfficial";
>>>>>>> a900ca1 (feat: display officials done)

export default function GameDetail() {
  const { id } = useLocalSearchParams<{ id?: string }>()

<<<<<<< HEAD
  const [homeGamesOfficial, setHomeGamesOfficial] = useState<HomeGameOfficialType[]>();
=======
  const homeGameId = id ? Number(id) : null

  const [OfficialReferee, setOfficialReferee] = useState<OfficialType[]>();
  const [OfficialOtm, setOfficialOtm] = useState<OfficialType[]>();
  const [OfficialRoom, setOfficialRoom] = useState<OfficialType[]>();
>>>>>>> a900ca1 (feat: display officials done)

  useEffect(() => {
    const fetchOfficials = async () => {
      const data = await getHomeGameOfficial(Number(id));
<<<<<<< HEAD
      setHomeGamesOfficial(data);
    };

    fetchOfficials();
    console.log(fetchOfficials())
  }, [id]);
=======

      setOfficialReferee(
        data.filter(official => official.OfficialRole === "Referee")
      );

      setOfficialOtm(
        data.filter(official => official.OfficialRole === "TableOfficer")
      );

      setOfficialRoom(
        data.filter(official => official.OfficialRole === "RoomOfficier")
      );
    };

    fetchOfficials();
  }, [homeGameId]);
>>>>>>> a900ca1 (feat: display officials done)

  if (!OfficialReferee && !OfficialOtm) {
    return <Text>Loading...</Text>;
  }

  return (
<<<<<<< HEAD
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
=======
    <View>
      <Text style={styles.title}>Arbitres:</Text>
      {OfficialReferee?.map((official, index) => (
        <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
          {official?.Users?.Firstname} {official.Users?.Lastname} {official.Users?.LicenceNb}
        </Text>
      ))}


      <Text style={styles.title}>Table de marque:</Text>
      {OfficialOtm?.map((official, index) => (
        <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
          {official.Users?.Firstname} {official.Users?.Lastname} {official.Users?.LicenceNb}
        </Text>
      ))}


      <Text style={styles.title}>Surveillant de salle:</Text>
      {OfficialRoom?.map((official, index) => (
        <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
          {official.Users?.Firstname} {official.Users?.Lastname} {official.Users?.LicenceNb}
        </Text>
      ))}
    </View >
>>>>>>> a900ca1 (feat: display officials done)
  );
}

const styles = StyleSheet.create({
<<<<<<< HEAD
  container: {
    display: 'flex',
    flexDirection: 'row',
  },

  button: {
    fontSize: 10,
    color: '#000000',
  },
});

=======
  title: {
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 10,
  },
  official: {
    marginLeft: 20,
    marginBottom: 5,
  },
});
>>>>>>> a900ca1 (feat: display officials done)
