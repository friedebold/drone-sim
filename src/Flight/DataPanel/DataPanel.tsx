import React from "react";
import { Text } from "react-native";
import Animated, {
	useAnimatedStyle,
	useDerivedValue
} from "react-native-reanimated";
import { AnimatedText } from "react-native-wagmi-charts";
import styled from "styled-components/native";
import { round } from "../../calculations/common";
import { margin } from "../../constants";
import { DimensionData, PitchProps, ThrustProps } from "../FlightWrapper";
import Databox from "./Databox";

export interface DataboxProps {
	header: string;
	titles: string[];
	values: Readonly<Animated.SharedValue<string>>[];
}

interface Props {
	clock: Animated.SharedValue<number>;
	front_thrust_components: Animated.SharedValue<ThrustProps>;
	back_thrust_components: Animated.SharedValue<ThrustProps>;
	vertical: Animated.SharedValue<DimensionData>;
	horizontal: Animated.SharedValue<DimensionData>;
	pitch: Animated.SharedValue<PitchProps>;
	/* 	prediction: Animated.SharedValue<{
		altitude: number;
		distance: number;
	}>; */

	mode: Animated.SharedValue<string>;
}

const DataPanel: React.FC<Props> = ({
	clock,
	front_thrust_components,
	back_thrust_components,
	vertical,
	horizontal,
	pitch,
	/* prediction, */
	mode,
}) => {
	const tClock = useDerivedValue(() => round(clock.value, 2).toString());

	const fThrust = useDerivedValue(() =>
		front_thrust_components.value.total.toString()
	);
	const bThrust = useDerivedValue(() =>
		back_thrust_components.value.total.toString()
	);
	const totalThrust = useDerivedValue(() =>
		(
			back_thrust_components.value.total +
			front_thrust_components.value.total
		).toString()
	);

	const verticalThrust = useDerivedValue(() =>
		(
			front_thrust_components.value.vertical +
			back_thrust_components.value.vertical
		).toString()
	);
	const horizontalThrust = useDerivedValue(() =>
		(
			front_thrust_components.value.horizontal +
			back_thrust_components.value.horizontal
		).toString()
	);

	const vAccel = useDerivedValue(() =>
		vertical.value.acceleration.toString()
	);
	const vVelo = useDerivedValue(() => vertical.value.velocity.toString());
	const vDist = useDerivedValue(() => vertical.value.distance.toString());

	const hAccel = useDerivedValue(() =>
		horizontal.value.acceleration.toString()
	);
	const hVelo = useDerivedValue(() => horizontal.value.velocity.toString());
	const hDist = useDerivedValue(() => horizontal.value.distance.toString());

	const pAccel = useDerivedValue(() => pitch.value.acceleration.toString());
	const pVelo = useDerivedValue(() => pitch.value.velocity.toString());
	const pDeg = useDerivedValue(() => pitch.value.angle.toString());

	/* 	const defaultAltitude = useDerivedValue(() =>
		prediction.value.altitude.toString()
	);
	const defaultDistance = useDerivedValue(() =>
		prediction.value.distance.toString()
	); */

	const getBoxStyle = (mode_val: string) => {
		const landingStyle = useAnimatedStyle(() => {
			return {
				backgroundColor:
					mode.value == mode_val ? "white" : "transparent",
				opacity: mode.value == mode_val ? 1 : 0.2,
			};
		});
		return landingStyle;
	};

	const data: DataboxProps[] = [
		{
			header: "Thrust",
			titles: ["Front Thrust", "Back Thrust", "Total Thrust"],
			values: [fThrust, bThrust, totalThrust],
		},
		{
			header: "Dimensions",
			titles: ["Vertical", "Horizontal", "Total"],
			values: [verticalThrust, horizontalThrust, totalThrust],
		},
		/* {
			header: "Prediction",
			titles: ["Altitude", "Distance"],
			values: [defaultAltitude, defaultDistance],
		}, */
		{
			header: "Vertical",
			titles: ["Acceleration", "Velocity", "Distance"],
			values: [vAccel, vVelo, vDist],
		},
		{
			header: "Horizontal",
			titles: ["Acceleration", "Velocity", "Distance"],
			values: [hAccel, hVelo, hDist],
		},
		{
			header: "Pitch",
			titles: ["Acceleration", "Velocity", "Angle"],
			values: [pAccel, pVelo, pDeg],
		},
	];
	return (
		<Background>
			<Row>
				<Databox data={data[0]} />
				<Spacer />
				<Databox data={data[1]} />
				<Spacer />
				<Databox data={data[2]} />
			</Row>
			<Spacer />
			<Row>
				<ClockBox>
					<Clock text={tClock} />
					<Text style={{ fontSize: 24 }}>s</Text>
				</ClockBox>

				<Spacer />
				<Databox data={data[3]} />
				<Spacer />
				<Databox data={data[4]} />
				{/* 	<Spacer />
				<Databox data={data[5]} /> */}
			</Row>
			<Spacer />
			<Row>
				<FlightMode style={getBoxStyle("takeoff")}>
					<Text>Takeoff</Text>
				</FlightMode>
				<FlightMode style={getBoxStyle("tilt_to_cruise")}>
					<Text>Tilt to Cruise</Text>
				</FlightMode>
				<FlightMode style={getBoxStyle("cruise")}>
					<Text>Cruise</Text>
				</FlightMode>
				<FlightMode style={getBoxStyle("spin")}>
					<Text>Spin</Text>
				</FlightMode>
				<FlightMode style={getBoxStyle("reverse_cruise")}>
					<Text>Reverse Cruise</Text>
				</FlightMode>
				<FlightMode style={getBoxStyle("tilt_to_land")}>
					<Text>Tilt to Land</Text>
				</FlightMode>
				<FlightMode style={getBoxStyle("landing")}>
					<Text>Landing</Text>
				</FlightMode>
			</Row>
		</Background>
	);
};

const Background = styled.View`
	padding: ${margin / 2}px;
`;

const Row = styled.View`
	flex-direction: row;
	align-items: flex-end;
`;

const FlightMode = styled(Animated.View)`
	border-color: black;
	border-width: 1px;
	padding: ${margin / 2}px;
	flex: 1;
`;

const ClockBox = styled.View`
	align-items: center;
	justify-content: center;
	flex-direction: row;
	padding: ${margin}px;
`;

const Clock = styled(AnimatedText)`
	font-size: 24px;
	width: 65px;
`;

const Spacer = styled.View`
	width: ${margin / 2}px;
	height: ${margin / 2}px;
`;

export default DataPanel;
