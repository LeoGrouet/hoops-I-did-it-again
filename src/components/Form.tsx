import { Text, View } from "react-native";

export default function Form({ formName, children }: { formName: string, children: React.ReactNode }) {
  return (
    <View style={{ marginBottom: 16, width: "80%" }}>
      <Text>{formName}</Text>
      {children}
    </View>
  );
}
