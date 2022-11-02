import React, { useState } from "react";
import { Keyboard, Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Animated, { runOnUI } from "react-native-reanimated";
import { margin } from "../src/constants";

interface Props {
  target_altitude: Animated.SharedValue<number>;
}

const AltitudeInput: React.FC<Props> = ({ target_altitude }) => {
  const [input, setInput] = useState(0);
  const updateAltitude = () => {
    "worklet";
    target_altitude.value = input;
  };

  return (
    <View
      style={{
        marginTop: margin / 2,
        flexDirection: "row",
        height: 37,
      }}
    >
      <TextInput
        style={{ borderWidth: 1, borderColor: "black", width: 200, height: 37 }}
        onChangeText={(e) => setInput(Number(e))}
        value={input.toString()}
        placeholder="useless placeholder"
        keyboardType="numeric"
      />
      <TouchableOpacity
        onPress={() => {
          Keyboard.dismiss();
          runOnUI(updateAltitude)();
        }}
        style={{ backgroundColor: "green", padding: 10 }}
      >
        <Text>Go</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AltitudeInput;
