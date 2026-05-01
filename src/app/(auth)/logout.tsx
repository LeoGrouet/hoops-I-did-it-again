import { supabase } from "@/src/api/supabase";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Alert, View } from "react-native";

export default function Logout() {
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert('Error', error.message);
    setLoading(false);
  };

  return (
    <View onTouchStart={handleLogout}>
      <AntDesign name="logout" size={24} color="black" />
    </View>
  )
}
