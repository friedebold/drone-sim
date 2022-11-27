import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView, useWindowDimensions } from "react-native";
import styled from "styled-components/native";
import Flight, { DimensionData, PitchProps } from "./src/Flight/FlightWrapper";
import Planner from "./src/Preflight/Planner";

export interface FlightData {
	mode: string;
	frontThrustComponents: ThrustComponents;
	backThrustComponents: ThrustComponents;
	vertical: DimensionData;
	horizontal: DimensionData;
	pitch: PitchProps;
	prediction: {
		altitude: number;
		distance: number;
	};
	logger: string;
}

export interface ThrustComponents {
	total: number;
	vertical: number;
	horizontal: number;
}

export interface FlightOptions {
	targetAltitude: number;
	targetDistance: number;
	aircraftType: string;
	disableHorizontal: boolean;
	maxPitch: number;
}

const App: React.FC<{}> = ({}) => {
	const { width } = useWindowDimensions();
	const [data, setData] = useState<FlightData[]>([]);
	const [options, setOptions] = useState<FlightOptions>({
		targetAltitude: 0,
		targetDistance: 0,
		aircraftType: "",
		disableHorizontal: false,
		maxPitch: 0,
	});
	const [navigation, setNavigation] = useState<string>("input");

	const Background = styled.View`
		flex: 1;
		width: ${width}px;
		overflow: hidden;
		background-color: #e2e2e5;
	`;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Background>
				<StatusBar style="dark" />
				{navigation == "input" || navigation == "planner" ? (
					<Planner
						{...{ options }}
						{...{ setOptions }}
						{...{ setData }}
						{...{ navigation }}
						{...{ setNavigation }}
					/>
				) : (
					<Flight
						{...{ setNavigation }}
						{...{ options }}
						{...{ data }}
					/>
				)}
			</Background>
		</SafeAreaView>
	);
};

export default App;
