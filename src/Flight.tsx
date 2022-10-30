import React from "react";
import { Text, View } from "react-native";
import Animated, {
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue
} from "react-native-reanimated";
import { AnimatedText } from "react-native-wagmi-charts";
import styled from "styled-components/native";
import { FlightData, FlightOptions } from "../App";
import { margin } from "../constants";
import Aircraft from "./Aircraft";
import Grid from "./Grid";
import { useClock } from "./hooks/useClock";

interface Props {
	flightOptions: FlightOptions;
	flightData: FlightData[];
	setPlannerMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Flight: React.FC<Props> = ({
	flightOptions,
	flightData,
	setPlannerMode,
}) => {
	const mode = useSharedValue("");
	const front_thrust_components = useSharedValue({
		total: 0,
		vertical: 0,
		horizontal: 0,
	});
	const back_thrust_components = useSharedValue({
		total: 0,
		vertical: 0,
		horizontal: 0,
	});
	const vertical = useSharedValue({
		acceleration: 0,
		velocity: 0,
		distance: 0,
	});
	const horizontal = useSharedValue({
		acceleration: 0,
		velocity: 0,
		distance: 0,
	});
	const pitch_angle = useSharedValue(0);
	/* const front_thrust_components = useSharedValue({
		total: 0,
		vertical: 0,
		horizontal: 0,
	});
	const back_thrust_components = useSharedValue({
		total: 0,
		vertical: 0,
		horizontal: 0,
	});
	const altitude = useSharedValue(0);
	const distance = useSharedValue(0);
	const pitch_angle = useSharedValue(0); */

	const clock = useClock();
	const altitudeText = useSharedValue("");

	useAnimatedReaction(
		() => clock.value,
		(clock) => {
			if (clock < 20) {
				const rounded_clock = Math.round(clock * 100);

				mode.value = flightData[rounded_clock].mode;
				front_thrust_components.value =
					flightData[rounded_clock].frontThrustComponents;
				back_thrust_components.value =
					flightData[rounded_clock].backThrustComponents;
				vertical.value = flightData[rounded_clock].vertical;
				horizontal.value = flightData[rounded_clock].horizontal;
				pitch_angle.value = flightData[rounded_clock].pitchAngle;

				console.log(
					rounded_clock,
					horizontal.value.acceleration,
					horizontal.value.velocity,
					horizontal.value.distance,
					pitch_angle.value,
					flightData[rounded_clock].logger
					//logger[rounded_clock]
				);

				altitudeText.value = vertical.value.distance.toFixed(4);
			}
			//			console.log(
			//				clock,
			//				acceleration.value,
			//				velocity.value,
			//				altitude.value
			//			);
			//	altitude_data.value = [...altitude_data.value, altitude.value];
		}
	);

	const takeoffStyle = useAnimatedStyle(() => {
		return {
			opacity: mode.value == "takeoff" ? 1 : 0.2,
		};
	});

	const cruiseStyle = useAnimatedStyle(() => {
		return {
			opacity: mode.value == "cruise" ? 1 : 0.2,
		};
	});

	const landingStyle = useAnimatedStyle(() => {
		return {
			opacity: mode.value == "landing" ? 1 : 0.2,
		};
	});

	return (
		<View
			style={{
				justifyContent: "space-between",
				flex: 1,
			}}
		>
			<Grid />
			<Aircraft
				{...{ vertical }}
				{...{ horizontal }}
				{...{ pitch_angle }}
				{...{ back_thrust_components }}
				{...{ front_thrust_components }}
			/>

			<BackButton onPress={() => setPlannerMode(true)}>
				<Text>x</Text>
			</BackButton>

			<View>
				<Text>{"Target Altitude (m):"}</Text>
				<Text>{flightOptions.targetAltitude}</Text>
				<AnimatedText text={altitudeText} />

				<Text>{"Target Distance (m):"}</Text>
				<Text>{flightOptions.targetDistance}</Text>

				<Overview>
					<Box style={takeoffStyle}>
						<Text>Takeoff</Text>
						<Text>Work:</Text>
					</Box>
					<Box style={cruiseStyle}>
						<Text>Cruise</Text>
					</Box>
					<Box style={landingStyle}>
						<Text>Landing</Text>
					</Box>
				</Overview>
			</View>
		</View>
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

const Overview = styled.View`
	flex-direction: row;
	justify-content: space-between;
	justify-self: flex-end;
`;

const Box = styled(Animated.View)`
	border-color: black;
	border-width: 1px;
	padding: ${margin / 2}px;
	flex: 1;
`;

export default Flight;
