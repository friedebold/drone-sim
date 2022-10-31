import { StatusBar } from "expo-status-bar";
import React, { useState } from "react";
import { SafeAreaView } from "react-native";
import styled from "styled-components/native";
import Flight from "./src/Flight";
import Planner from "./src/Planner";

export interface FlightData {
	mode: string;
	frontThrustComponents: ThrustComponents;
	backThrustComponents: ThrustComponents;
	vertical: {
		acceleration: number;
		velocity: number;
		distance: number;
	};
	horizontal: {
		acceleration: number;
		velocity: number;
		distance: number;
	};
	pitch: {
		acceleration: number;
		velocity: number;
		distance: number;
		degree: number;
		rad: number;
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
