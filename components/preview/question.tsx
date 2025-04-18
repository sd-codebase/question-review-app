import { Text, View } from "react-native";
import MathExp from "./math-expression/MathExp";

export default function Question({ srNo, pyo, question }: any) {
  return (
    <View style={{ flexDirection: "column", gap: 4 }}>
      <Text style={{ fontWeight: 600, fontSize: 20 }}>{srNo}.</Text>
      <MathExp exp={question} />
      {pyo !== "NA" ? (
        <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
          <Text
            style={{
              fontSize: 12,
              borderRadius: 16,
              backgroundColor: "skyblue",
              paddingStart: 8,
              paddingEnd: 8,
              padding: 4,
            }}
          >
            {pyo}
          </Text>
        </View>
      ) : null}
    </View>
  );
}
