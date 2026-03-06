import { Text, TextInput } from "react-native";

export default function Input(props: { value: string, label: string; placeholder: string }) {
  return (
    <>
      <Text>{props.label}</Text>
      <TextInput
        placeholder={props.placeholder}
        value={props.value}
        style={{ borderWidth: 1, borderColor: "gray", padding: 8, marginBottom: 16, width: "80%" }}
      />
    </>
  );
}
