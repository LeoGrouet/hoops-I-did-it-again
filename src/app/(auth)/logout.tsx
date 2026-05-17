import { supabase } from "@/src/api/supabase";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { ActivityIndicator, Alert, Pressable, StyleSheet } from "react-native";

export default function Logout() {
  const [loading, setLoading] = React.useState(false);

  const handleLogout = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signOut();
    if (error) Alert.alert('Error', error.message);
    setLoading(false);
  };

  return (
    <Pressable onPress={handleLogout} disabled={loading} style={styles.hit}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <AntDesign name="logout" size={24} color="black" />
      )}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  hit: {
    padding: 8,
  },
})
