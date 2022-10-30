import React from "react";
import { useWindowDimensions } from "react-native";
import Animated, {
  SharedValue,
  useAnimatedStyle,
  useDerivedValue
} from "react-native-reanimated";
import styled from "styled-components/native";

interface Props {
  scale: SharedValue<number>;
  magnitude: SharedValue<number>;
  altitudeFactor: number;
  thrust: SharedValue<{
    percentage: number;
    amount: number;
  }>;
  gravity: Readonly<
    Animated.SharedValue<{
      percentage: number;
      amount: number;
    }>
  >;
  altitude: Animated.SharedValue<number>;
}

const Aircraft: React.FC<Props> = ({
  scale,
  magnitude,
  altitudeFactor,
  thrust,
  gravity,
  altitude,
}) => {
  const { width } = useWindowDimensions();
  const maxLength = 20;

  useDerivedValue(() => {
    scale.value = Math.min(60 / altitude.value, 1);
    if (scale.value >= 0.25) magnitude.value = 20;
    else magnitude.value = 100;
  }, []);

  const Circle = styled(Animated.View)`
    width: 50px;
    height: 50px;
    border-radius: 25px;
    border-width: 1px;
    border-color: black;
    left: ${width / 2 - 50 / 2}px;
    position: absolute;
    bottom: 0px;
  `;

  const VectorUp = styled(Animated.View)`
    width: 1px;
    background-color: black;
    left: ${50 / 2 - 2}px;
    position: absolute;
  `;

  const VectorDown = styled(Animated.View)`
    width: 1px;
    background-color: black;
    top: ${50 - 1}px;
    left: ${50 / 2 - 2}px;
    position: absolute;
  `;

  const VectorBack = styled(Animated.View)`
    width: ${0}px;
    height: 1px;
    background-color: black;
    top: ${50 / 2 - 1}px;
    left: ${-0}px;
    position: absolute;
  `;

  const VectorForward = styled(Animated.View)`
    width: ${0}px;
    height: 1px;
    background-color: black;
    top: ${50 / 2 - 1}px;
    left: ${50 - 1}px;
    position: absolute;
  `;

  const aniatedVectorUp = useAnimatedStyle(() => {
    return {
      height: maxLength * thrust.value.percentage,
      top: -maxLength * thrust.value.percentage,
    };
  }, []);

  const aniatedVectorDown = useAnimatedStyle(() => {
    return {
      height: maxLength * gravity.value.percentage,
    };
  }, []);

  const aniatedCircle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateY: -altitude.value * altitudeFactor * scale.value },
      ],
    };
  }, []);

  return (
    <Circle style={aniatedCircle}>
      <VectorUp style={aniatedVectorUp} />
      <VectorDown style={aniatedVectorDown} />
      <VectorBack />
      <VectorForward />
    </Circle>
  );
};

export default Aircraft;
