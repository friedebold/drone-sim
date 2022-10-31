import React, { useState } from "react";
import { Button, Text, TextInput, TouchableOpacity, View } from "react-native";
import styled from "styled-components/native";
import { FlightOptions } from "../App";
import { margin } from "../constants";

interface Props {
	setOptions: React.Dispatch<React.SetStateAction<FlightOptions>>;
}

const FlightOptionInputs: React.FC<Props> = ({ setOptions }) => {
	const [targetAltitude, setTargetAltitude] = useState(40);
	const [targetDistance, setTargetDistance] = useState(40);
	const [maxPitch, setMaxPitch] = useState(45);
	const [aircraftType, setAircraftType] = useState("quad");
	const [disableHorizontal, setDisableHorizontal] = useState<boolean>(false);

	const save_input = () => {
		setOptions({
			targetAltitude: targetAltitude,
			targetDistance: targetDistance,
			aircraftType: aircraftType,
			disableHorizontal: disableHorizontal,
			maxPitch: maxPitch,
		});
	};

	return (
		<>
			<View style={{ height: margin / 2 }} />
			<Text>{"Altitude (m):"}</Text>
			<Input
				value={targetAltitude.toString()}
				onChangeText={(e: string) => {
					const number = Number(e);
					if (!isNaN(number)) {
						setTargetAltitude(number);
					}
				}}
			/>
			<View style={{ height: margin / 2 }} />
			<Text>{"Distance (m):"}</Text>
			<Input
				value={targetDistance.toString()}
				onChangeText={(e: string) => {
					const number = Number(e);
					if (!isNaN(number)) {
						setTargetDistance(number);
					}
				}}
			/>
			<View style={{ height: margin / 2 }} />
			<Text>{"Tilt Angle:"}</Text>
			<Input
				value={maxPitch.toString()}
				onChangeText={(e: string) => {
					const number = Number(e);
					if (!isNaN(number)) {
						setMaxPitch(number);
					}
				}}
			/>
			<View style={{ height: margin / 2 }} />
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity onPress={() => setAircraftType("quad")}>
					<Toggle
						style={{
							backgroundColor:
								aircraftType == "quad" ? "white" : "lightgrey",
						}}
					>
						<Text>Quad</Text>
					</Toggle>
				</TouchableOpacity>
				<TouchableOpacity
					onPress={() => setAircraftType("tail_sitter")}
				>
					<Toggle
						style={{
							backgroundColor:
								aircraftType == "tail_sitter"
									? "white"
									: "lightgrey",
						}}
					>
						<Text>Tail Sitter</Text>
					</Toggle>
				</TouchableOpacity>
			</View>

			<View style={{ height: margin / 2 }} />
			<View style={{ flexDirection: "row" }}>
				<TouchableOpacity
					onPress={() => {
						setDisableHorizontal((curr: boolean) => !curr);
					}}
				>
					<Toggle
						style={{
							backgroundColor: disableHorizontal
								? "white"
								: "lightgrey",
						}}
					>
						<Text>Disable Horizontal Modement</Text>
					</Toggle>
				</TouchableOpacity>
				<View style={{ height: margin / 2 }} />
			</View>
			<View style={{ height: margin / 2 }} />
			<Button
				title="Go"
				onPress={() => {
					save_input();
				}}
			/>
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
