import { StyleSheet, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { getHomeGameOfficial } from "@/api/HomeGame/getHomeGameOfficial";
import { OfficialType } from "@/@types/OfficialType";

export default function HomeGamesScheduledInfo() {
  const { id } = useLocalSearchParams<{ id?: string }>()

  const homeGameId = id ? Number(id) : null

  const [OfficialReferee, setOfficialReferee] = useState<OfficialType[]>();
  const [OfficialOtm, setOfficialOtm] = useState<OfficialType[]>();
  const [OfficialRoom, setOfficialRoom] = useState<OfficialType[]>();

  useEffect(() => {
    const fetchOfficials = async () => {
      const data = await getHomeGameOfficial(Number(id));

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

  return (
    <View>
      <Text style={styles.title}>Arbitres:</Text>
      {OfficialReferee && OfficialReferee.length > 0 ?
        (OfficialReferee?.map((official, index) => (
          <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
            {official?.Users?.Firstname} {official.Users?.Lastname} {official.Users?.LicenceNb}
          </Text>
        )))
        : <Text style={styles.official}>Aucun arbitre assigné</Text>
      }


      <Text style={styles.title}>Table de marque:</Text>
      {OfficialOtm && OfficialOtm.length > 0 ?
        (OfficialOtm?.map((official, index) => (
          <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
            {official.Users?.Firstname} {official.Users?.Lastname} {official.Users?.LicenceNb}
          </Text>
        )))
        : <Text style={styles.official}>Aucun officiel de table assigné</Text>
      }


      <Text style={styles.title}>Surveillant de salle:</Text>
      {OfficialRoom && OfficialRoom.length > 0 ?
        (OfficialRoom?.map((official, index) => (
          <Text style={styles.official} key={`${official.OfficialRole}-${index}`}>
            {official.Users?.Firstname} {official.Users?.Lastname} {official.Users?.LicenceNb}
          </Text>
        )))
        : <Text style={styles.official}>Aucun officiel de table assigné</Text>
      }
    </View >
  );
}

const styles = StyleSheet.create({
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
