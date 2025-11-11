import { View, StyleSheet } from "react-native";

export default function Card({ children }: { children: React.ReactNode }) {
  return (
    <View style={styles.container} >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    borderRadius: 20,
    margin: 10,
  }
});
