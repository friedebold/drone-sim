import React from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import styled from "styled-components/native";
import { margin } from "../constants";

interface Props {
	clock: Animated.SharedValue<number>;
	clock_running: Animated.SharedValue<boolean>;
}

const sliderWidth = 400;
const Slider: React.FC<Props> = ({ clock, clock_running }) => {
	

	const animatedKnob = useAnimatedStyle(() => {
		return {
			transform: [{ translateX: clock.value * 10 }],
		};
	});

	return (
		<Background>
			{/* <GestureDetector gesture={panGesture}> */}
				<Knob style={animatedKnob} />
		{/* 	</GestureDetector> */}
		</Background>
	);
};

const Background = styled.View`
	background-color: black;
	height: 5;
	width: ${sliderWidth}px;
	margin: ${margin}px;
`;

const Knob = styled(Animated.View)`
	background-color: red;
	width: 20px;
	height: 20px;
	border-radius: 5px;
	left: -10px;
	top: -7px;
`;

export default Slider;
