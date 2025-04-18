import { Text, View } from "react-native";
import MathExp from "./math-expression/MathExp";

export default function Solutions({ solutions }: any) {
  if (!solutions?.length) {
    return null;
  }

  return (
    <View style={{ gap: 8 }}>
      <Text style={{ fontWeight: 600, fontSize: 16 }}>Solution</Text>
      {solutions.map((sol: string, index: number) => {
        return (
          <View key={index}>
            {index ? (
              <Text style={{ fontWeight: 600 }}>Alternate Solution</Text>
            ) : null}
            <MathExp exp={sol} />
          </View>
        );
      })}
    </View>
  );
}
