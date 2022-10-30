import React from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { FlightOptions } from "../App";
import { margin } from "../constants";

interface Props {
	flightOptions: FlightOptions;
	setFlightOptions: React.Dispatch<React.SetStateAction<FlightOptions>>;
}

const FlightOptionInputs: React.FC<Props> = ({
	flightOptions,
	setFlightOptions,
}) => {
	const changeState = (e: string, property: string) => {
		if (!isNaN(Number(e))) {
			setFlightOptions((currState: FlightOptions) => ({
				...currState,
				[property]: Number(e),
			}));
		}
	};

	return (
		<>
			<Text>{"Altitude (m):"}</Text>
			<Input
				value={flightOptions.targetAltitude.toString()}
				onChangeText={(e: string) => {
					setFlightOptions;
					changeState(e, "targetAltitude");
				}}
			/>
			<View style={{ height: margin / 2 }} />
			<Text>{"Distance (m):"}</Text>
			<Input
				value={flightOptions.targetDistance.toString()}
				onChangeText={(e: string) => changeState(e, "targetDistance")}
			/>
			<View style={{ height: margin / 2 }} />
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					onPress={() => {
						setFlightOptions((currState: FlightOptions) => ({
							...currState,
							aircraftType: "quad",
						}));
					}}
				>
					<Toggle
						style={{
							backgroundColor:
								flightOptions.aircraftType == "quad"
									? "lightgrey"
									: "white",
						}}
					>
						<Text>Quad</Text>
					</Toggle>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => {
						setFlightOptions((currState: FlightOptions) => ({
							...currState,
							aircraftType: "tail_sitter",
						}));
					}}
				>
					<Toggle
						style={{
							backgroundColor:
								flightOptions.aircraftType == "tail_sitter"
									? "lightgrey"
									: "white",
						}}
					>
						<Text>Tail Sitter</Text>
					</Toggle>
				</TouchableOpacity>
			</View>
		</>
	);
};

const Input = styled(TextInput)`
	border-color: black;
	border-width: 1px;
	padding: ${margin / 2}px;
`;

const Toggle = styled.View`
	padding: ${margin / 2}px;
	border-width: 1px;
	border-color: black;
`;

export default FlightOptionInputs;
