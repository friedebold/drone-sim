import React from "react";
import { useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import styled from "styled-components/native";

interface Props {
	clock: Animated.SharedValue<number>;
}

const Slider: React.FC<Props> = ({ clock }) => {
	const { width } = useWindowDimensions();

	const clockBarStyle = useAnimatedStyle(() => {
		return {
			width: (clock.value / 20) * width,
		};
	});

	return <Background style={clockBarStyle}></Background>;
};

const Background = styled(Animated.View)`
	height: 2px;
	background-color: black;
`;

export default Slider;
