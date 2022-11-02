import React from "react";
import { Text, View } from "react-native";
import Animated, {
	useAnimatedStyle,
	useDerivedValue
} from "react-native-reanimated";
import { AnimatedText } from "react-native-wagmi-charts";
import styled from "styled-components/native";
import { round } from "./calculations/common";
import { margin } from "./constants";

interface Props {
	clock: Animated.SharedValue<number>;
	vertical: Animated.SharedValue<{
		acceleration: number;
		velocity: number;
		distance: number;
	}>;
	horizontal: Animated.SharedValue<{
		acceleration: number;
		velocity: number;
		distance: number;
	}>;
	pitch: Animated.SharedValue<{
		acceleration: number;
		velocity: number;
		distance: number;
		degree: number;
		rad: number;
	}>;
	mode: Animated.SharedValue<string>;
}

const DataPanel: React.FC<Props> = ({
	clock,
	vertical,
	horizontal,
	pitch,
	mode,
}) => {
	const tClock = useDerivedValue(() => round(clock.value, 2).toString());
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
	const pDeg = useDerivedValue(() => pitch.value.degree.toString());

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

	return (
		<>
			<Row>
				<ClockBox>
					<Clock text={tClock} />
					<Text style={{ fontSize: 24 }}>s</Text>
				</ClockBox>
				<DimensionData>
					<TitlesCol>
						<Header>{"Vertical"}</Header>
						<Text>{"Acceleration"}</Text>
						<Text>{"Velocity"}</Text>
						<Text>{"Distance"}</Text>
					</TitlesCol>
					<View style={{ width: margin / 2 }} />
					<DataCol>
						<Header>{"-"}</Header>
						<AnimatedText text={vAccel} />
						<AnimatedText text={vVelo} />
						<AnimatedText text={vDist} />
					</DataCol>
				</DimensionData>
				<View style={{ width: margin / 2 }} />
				<DimensionData>
					<TitlesCol>
						<Header>{"Horizontal"}</Header>
						<Text>{"Acceleration"}</Text>
						<Text>{"Velocity"}</Text>
						<Text>{"Distance"}</Text>
					</TitlesCol>
					<View style={{ width: margin / 2 }} />
					<DataCol>
						<Header>{"-"}</Header>
						<AnimatedText text={hAccel} />
						<AnimatedText text={hVelo} />
						<AnimatedText text={hDist} />
					</DataCol>
				</DimensionData>
				<View style={{ width: margin / 2 }} />
				<DimensionData>
					<TitlesCol>
						<Header>{"Pitch"}</Header>
						<Text>{"Acceleration"}</Text>
						<Text>{"Velocity"}</Text>
						<Text>{"Angle"}</Text>
					</TitlesCol>
					<View style={{ width: margin / 2 }} />
					<DataCol>
						<Header>{"-"}</Header>
						<AnimatedText text={pAccel} />
						<AnimatedText text={pVelo} />
						<AnimatedText text={pDeg} />
					</DataCol>
				</DimensionData>
				<ClockBox></ClockBox>
			</Row>
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
				<FlightMode style={getBoxStyle("tilt_to_land")}>
					<Text>Tilt to Land</Text>
				</FlightMode>
				<FlightMode style={getBoxStyle("landing")}>
					<Text>Landing</Text>
				</FlightMode>
			</Row>
		</>
	);
};

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

const DimensionData = styled.View`
	flex-direction: row;
	padding: ${margin}px;
	border-width: 1px;
	border-color: #00000013;
	border-radius: 25px;
`;

const Header = styled.Text`
	font-size: 24px;
`;

const TitlesCol = styled.View``;

const DataCol = styled.View`
	width: 50px;
`;

export default DataPanel;
