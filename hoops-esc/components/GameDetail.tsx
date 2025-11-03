import { Text } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { HomeGameOfficialType, getHomeGameOfficial } from "@/utils/HomeGame/getHomeGameOfficial";

export default function GameDetail() {
  const id = useLocalSearchParams().id;

  const [homeGamesOfficial, setHomeGamesOfficial] = useState<HomeGameOfficialType>();

  useEffect(() => {
    const fetchOfficials = async () => {
      const data = await getHomeGameOfficial(Number(id));
      setHomeGamesOfficial(data ? data[0] : undefined);
    };

    fetchOfficials();
  }, []);

  return (
    <>
      <Text>Arbitres : {homeGamesOfficial?.HomeGamesOfficial_users_fkey?.Firstname}</Text>
    </>
  );
}
