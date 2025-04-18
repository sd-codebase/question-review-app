import { StyleSheet, Text, View } from "react-native";

import { debounce } from "lodash";
import React from "react";
import { WebView } from "react-native-webview";

const BACKGROUND_COLOR = "#F7F7F7";

export default function MathExp({ exp }: { exp: string }) {
  const [containerHeight, setContainerHeight] = React.useState(24);

  const handleOnMessage = (data: Record<string, any>) => {
    // console.log(data);
    if (data.type === "CONTAINER_HEIGHT") {
      setContainerHeight(data.data.height);
    }
  };
  const debouncedOnMessage = debounce(handleOnMessage, 500);

  const onWebViewMessage = (event: any) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      debouncedOnMessage(data);
    } catch (error) {
      console.error("Error parsing webview message:", error);
    }
  };

  if (!exp) return null;

  return (
    <View
      pointerEvents="none"
      style={{
        backgroundColor: BACKGROUND_COLOR,
        borderRadius: 10,
        padding: 10,
      }}
    >
      {exp.includes("\\") || exp.includes("$") ? (
        <WebView
          javaScriptEnabled={true}
          style={{ ...styles.webViewContainer, height: containerHeight }}
          source={{
            uri: "https://mcq-hub.co.in/mathexp-in-web/",
          }}
          injectedJavaScriptObject={{
            mathExp: exp,
            backgroundColor: BACKGROUND_COLOR,
          }}
          onMessage={onWebViewMessage}
        />
      ) : (
        <Text>{exp}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  webViewContainer: {
    width: "100%",
    flex: 1,
  },
});
