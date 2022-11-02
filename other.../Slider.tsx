import React from "react";
import { Text, View } from "react-native";
import { PanGestureHandler } from "react-native-gesture-handler";
import Animated, {
    SharedValue,
    useAnimatedGestureHandler,
    useAnimatedReaction,
    useAnimatedStyle,
    useSharedValue,
    withSpring
} from "react-native-reanimated";
import styled from "styled-components/native";
import { margin, maxForce } from "../src/constants";

interface Props {
  thrust: SharedValue<{
    percentage: number;
    amount: number;
  }>;
  clock: Animated.SharedValue<number>;
}

const Slider: React.FC<Props> = ({ thrust, clock }) => {
  const sliderHeight = 100;
  const y = useSharedValue(sliderHeight + 10);

  useAnimatedReaction(
    () => {
      return clock.value;
    },
    (result, previous) => {
      const thrustPercentage = (100 - (y.value - 10)) / 100;
      thrust.value = {
        percentage: thrustPercentage,
        amount: thrustPercentage * maxForce,
      };
    },
    []
  );

  const gestureHandler = useAnimatedGestureHandler({
    onActive: (event, ctx) => {
      y.value = Math.max(10, Math.min(event.y, sliderHeight + 10));
    },
    onEnd: (_) => {
      y.value = withSpring(sliderHeight + 10, { overshootClamping: true });
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: y.value,
    };
  });

  const Background = styled(Animated.View)`
    justify-content: center;
    align-items: center;
    padding: ${margin / 2}px;
  `;

  const Bar = styled(View)`
    background-color: white;
    border-radius: 50px;
    width: 10px;
    height: ${sliderHeight}px;
  `;

  const Knob = styled(Animated.View)`
    position: absolute;
    height: 20px;
    width: 20px;
    background-color: black;
    top: 0px;
    border-radius: 10px;
  `;

  const Seperator = styled.View`
    height: ${margin / 2}px;
  `;

  return (
    <PanGestureHandler onGestureEvent={gestureHandler} minDist={0}>
      <Background>
        <Bar />
        <Knob style={animatedStyle} />
        <Seperator />
        <Text>{"Thrust"}</Text>
        <Text>{"(kg * m2 / s2)"}</Text>
      </Background>
    </PanGestureHandler>
  );
};

export default Slider;
