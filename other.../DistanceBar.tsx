import React from "react";
import { Text, View } from "react-native";

interface Props {}

const DistanceBar: React.FC<Props> = () => {
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
      <Text>{"Distance (m)"}</Text>
      <Text>0</Text>
      <Text>100</Text>
      <Text>200</Text>
    </View>
  );
};

export default DistanceBar;
