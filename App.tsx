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
	pitchAngle: number;
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
}

const App: React.FC<{}> = ({}) => {
	const [flightOptions, setFlightOptions] = useState({
		targetAltitude: 40,
		targetDistance: 40,
		aircraftType: "quad",
	});
	const [plannerMode, setPlannerMode] = useState(true);
	const [flightData, setFlightData] = useState<FlightData[]>([]);

	const Background = styled.View`
		flex: 1;
	`;

	return (
		<SafeAreaView style={{ flex: 1 }}>
			<Background>
				<StatusBar style="dark" />
				{plannerMode ? (
					<Planner
						{...{ flightOptions }}
						{...{ setFlightOptions }}
						{...{ setFlightData }}
						{...{ plannerMode }}
						{...{ setPlannerMode }}
					/>
				) : (
					<Flight
						{...{ flightOptions }}
						{...{ flightData }}
						{...{ setPlannerMode }}
					/>
				)}
			</Background>
		</SafeAreaView>
	);
};

export default App;
