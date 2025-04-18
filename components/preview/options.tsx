import { Text, View } from "react-native";
import MathExp from "./math-expression/MathExp";

export default function Options({ options, show }: any) {
  if (!show) {
    return null;
  }

  return (
    <View style={{ flexDirection: "column", gap: 8, flex: 1 }}>
      <Text style={{ fontWeight: 600, fontSize: 16 }}>Options</Text>
      {Object.keys(options).map((key) => {
        return (
          <View
            key={key}
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              gap: 4,
              flex: 1,
            }}
          >
            <View>
              <Text style={{ fontWeight: 600 }}>{key}) </Text>
            </View>
            <View style={{ flex: 1 }}>
              <MathExp exp={options[key]} />
            </View>
          </View>
        );
      })}
    </View>
  );
}
