import React from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
import styled from "styled-components/native";
import { margin } from "../constants";
import Aircraft from "./Aircraft";
import DataPanel from "./DataPanel/DataPanel";
import { DimensionData, PitchProps, ThrustProps } from "./FlightWrapper";
import Grid from "./Grid";
import Slider from "./Slider";

interface Props {
	setNavigation: React.Dispatch<React.SetStateAction<string>>;
	clock_running: Animated.SharedValue<boolean>;
	clock: Animated.SharedValue<number>;
	back_thrust_components: Animated.SharedValue<ThrustProps>;
	front_thrust_components: Animated.SharedValue<ThrustProps>;
	vertical: Animated.SharedValue<DimensionData>;
	horizontal: Animated.SharedValue<DimensionData>;
	pitch: Animated.SharedValue<PitchProps>;
	mode: Animated.SharedValue<string>;
}

const Flight: React.FC<Props> = ({
	setNavigation,
	clock_running,
	clock,
	back_thrust_components,
	front_thrust_components,
	vertical,
	horizontal,
	pitch,
	mode,
}) => {
	

	return (
	<>
			<Grid
				/*  {...{ grid_move }} */ {...{ vertical }}
				{...{ horizontal }}
			/>
			<Aircraft
				/* 	{...{ grid_move }} */
				{...{ vertical }}
				{...{ horizontal }}
				{...{ pitch }}
				{...{ back_thrust_components }}
				{...{ front_thrust_components }}
			/>

			<BackButton onPress={() => setNavigation("input")}>
				<Text>x</Text>
			</BackButton>
			<View>
				<DataPanel
					{...{ clock }}
					{...{ front_thrust_components }}
					{...{ back_thrust_components }}
					{...{ vertical }}
					{...{ horizontal }}
					/* {...{ prediction }} */
					{...{ pitch }}
					{...{ mode }}
				/>
				<Slider {...{ clock }} />
			</View>
			</>
	);
};



const BackButton = styled.TouchableOpacity`
	height: 50px;
	width: 50px;
	top: ${margin / 2}px;
	left: ${margin / 2}px;
	justify-content: center;
	align-items: center;
	background-color: white;
	border-width: 1px;
	border-color: black;
`;

export default Flight;
