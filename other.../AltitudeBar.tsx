import React from "react";
import { View } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import AltitudeLabel from "./AltitudeLabel";

interface Props {
  scale: Animated.SharedValue<number>;
  magnitude: Animated.SharedValue<number>;
  altitudeFactor: number;
}

const AltitudeBar: React.FC<Props> = ({ scale, magnitude, altitudeFactor }) => {
  const getAnimatedStyle = (index: number) => {
    "worklet";
    const result = useAnimatedStyle(() => {
      return {
        position: "absolute",
        bottom: 20 * altitudeFactor * index * scale.value,
      };
    });
    return result;
  };

  return (
    <View
      style={{
        backgroundColor: "red",
        justifyContent: "space-between",
      }}
    >
      {Array.from(Array(100).keys()).map((index) => {
        return (
          <Animated.View style={getAnimatedStyle(index)} key={index}>
            <AltitudeLabel {...{ index }} {...{ magnitude }} />
          </Animated.View>
        );
      })}
    </View>
  );
};

export default AltitudeBar;
