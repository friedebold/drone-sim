import React, { useEffect } from "react";
import { Text, View } from "react-native";
import { FlightData, FlightOptions } from "../App";
import { margin } from "../constants";
import { calculateFlight } from "./calculations/main";
import FlightOptionInputs from "./FlightOptionInputs";

interface Props {
	options: FlightOptions;
	setOptions: React.Dispatch<React.SetStateAction<FlightOptions>>;
	setData: React.Dispatch<React.SetStateAction<FlightData[]>>;
	setNavigation: React.Dispatch<React.SetStateAction<string>>;
	navigation: string;
}

const Planner: React.FC<Props> = ({
	options,
	setOptions,
	setData,
	setNavigation,
	navigation,
}) => {
	useEffect(() => {
		if (navigation == "input" && options.aircraftType !== "")
			setOptions({
				aircraftType: "",
				targetAltitude: 0,
				targetDistance: 0,
				disableHorizontal: true,
				maxPitch: 0,
			});
	}, [options, navigation]);

	useEffect(() => {
		if (options.aircraftType !== "") {
			const flightData = calculateFlight(options);
			setData(flightData);
			setNavigation("flight");
		}
	}, [options]);

	return (
		<View style={{ margin: margin }}>
			<Text>Flight Planner</Text>
			<FlightOptionInputs {...{ setOptions }} />
		</View>
	);
};

export default Planner;
