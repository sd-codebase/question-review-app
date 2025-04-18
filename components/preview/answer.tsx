import { View, Text } from "react-native";

export default function Answer({ answer, show }: any) {
  if (!show) {
    return null;
  }

  return (
    <View style={{ flex: 1 }}>
      <Text style={{ fontWeight: 600, fontSize: 16 }}>Answer: {answer}</Text>
    </View>
  );
}
