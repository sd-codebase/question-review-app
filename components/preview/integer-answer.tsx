import { TextInput, View, Text } from "react-native";

export default function IntegerAnswer({ show }: any) {
  if (!show) {
    return null;
  }

  return (
    <View style={{ padding: 8, gap: 8 }}>
      <Text style={{ fontWeight: 600 }}>Enter answer</Text>
      <TextInput
        style={{ borderWidth: 2, borderColor: "#bbb", borderRadius: 10 }}
      />
    </View>
  );
}
