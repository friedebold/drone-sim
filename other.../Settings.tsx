import React from "react";
import { Text, useWindowDimensions, View } from "react-native";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { ReText } from "react-native-redash";
import { aircraft_mass, margin } from "../src/constants";

interface Props {
  clock: Animated.SharedValue<number>;
  prevClock: Animated.SharedValue<number>;
  total_vertical_force: Animated.SharedValue<number>;
  acceleration: Animated.SharedValue<number>;
  velocity: Animated.SharedValue<number>;
  altitude: Animated.SharedValue<number>;
}

const Settings: React.FC<Props> = ({
  clock,
  prevClock,
  total_vertical_force,
  acceleration,
  velocity,
  altitude,
}) => {
  const { width, height } = useWindowDimensions();

  const clock_string = useDerivedValue(() => {
    return (clock.value - prevClock.value).toFixed(4);
  }, []);

  const total_vertical_force_string = useDerivedValue(() => {
    return total_vertical_force.value.toFixed(4);
  }, []);

  const acceleration_string = useDerivedValue(() => {
    return acceleration.value.toFixed(4);
  }, []);

  const velocity_string = useDerivedValue(() => {
    return velocity.value.toFixed(4);
  }, []);

  const altitude_string = useDerivedValue(() => {
    return altitude.value.toFixed(4);
  }, []);
  return (
    <View
      style={{
        position: "absolute",
        width: width - margin,
        left: margin / 2,
        borderColor: "black",
        borderWidth: 1,
        height: 100,
      }}
    >
      <View style={{ flex: 1, flexDirection: "row" }}>
        <View style={{ marginRight: margin / 2 }}>
          <Text>Aircraft Mass</Text>
          <Text> </Text>
          <Text>Total Force</Text>
          <Text>Acceleration</Text>
          <Text>Velocity</Text>
          <Text>Altitude</Text>
        </View>
        <View>
          <Text>{aircraft_mass} kg</Text>
          <Text />
          <ReText text={total_vertical_force_string} />
          <ReText text={acceleration_string} />
          <ReText text={velocity_string} />
          <ReText text={altitude_string} />
        </View>
      </View>
    </View>
  );
};

export default Settings;
