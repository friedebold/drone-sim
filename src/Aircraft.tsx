import React from "react";
import { useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import styled from "styled-components/native";
import { ThrustComponents } from "../App";
import { LAT_DISTANCE, LON_DISTANCE } from "./constants";

interface Props {
	// flight_data: Animated.SharedValue<FlightData>;
	grid_move: boolean;
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
	back_thrust_components: Animated.SharedValue<ThrustComponents>;
	front_thrust_components: Animated.SharedValue<ThrustComponents>;
}

const Aircraft: React.FC<Props> = ({
	grid_move,
	vertical,
	horizontal,
	pitch,
	back_thrust_components,
	front_thrust_components,
}) => {
	const { width, height } = useWindowDimensions();
	const thrustScaler = 4;

	const animatedBackground = useAnimatedStyle(() => {
		return {
			top: grid_move
				? height / 2 - aircraft_width / 2
				: height / 2 -
				  aircraft_width / 2 -
				  (vertical.value.distance / 10) * LON_DISTANCE,
			left: grid_move
				? width / 2 - aircraft_width / 2
				: width / 2 -
				  aircraft_width / 2 +
				  (horizontal.value.distance / 10) * LAT_DISTANCE,
			transform: [{ rotate: pitch.value.degree + "deg" }],
		};
	});

	const animatedVectorBox = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: -pitch.value.degree + "deg" }],
			height: Math.abs(
				back_thrust_components.value.vertical * 2 * thrustScaler
			),
			width: Math.abs(
				back_thrust_components.value.horizontal * 2 * thrustScaler
			),
			left: -Math.abs(
				back_thrust_components.value.horizontal * thrustScaler
			), //-back_thrust.value * thrustScaler,
			top:
				aircraft_width / 2 -
				back_thrust_components.value.vertical * thrustScaler, //aircraft_width / 2 - back_thrust.value * thrustScaler,
		};
	});

	const animatedFrontVectorBox = useAnimatedStyle(() => {
		return {
			transform: [{ rotate: -pitch.value.degree + "deg" }],
			height: Math.abs(
				front_thrust_components.value.vertical * 2 * thrustScaler
			),
			width: Math.abs(
				front_thrust_components.value.horizontal * 2 * thrustScaler
			),
			left:
				aircraft_width -
				Math.abs(
					front_thrust_components.value.horizontal * thrustScaler
				),
			top:
				aircraft_width / 2 -
				front_thrust_components.value.vertical * thrustScaler,
		};
	});

	const getVectorComponentStyle = (side: string, direction: string) => {
		"worklet";
		let thrust_component =
			side == "front" ? front_thrust_components : back_thrust_components;
		const animatedVectorStyle = useAnimatedStyle(() => {
			/* const vertical_thrust =
				Math.cos((pitch_angle.value * Math.PI) / 180) * back_thrust.value; */
			return {
				height:
					direction == "vertical"
						? Math.abs(
								thrust_component.value.vertical * thrustScaler
						  )
						: 1,
				width:
					direction == "vertical"
						? 1
						: Math.abs(
								thrust_component.value.horizontal * thrustScaler
						  ),
				top: Math.abs(thrust_component.value.vertical * thrustScaler),
				left:
					direction == "vertical"
						? Math.abs(
								thrust_component.value.horizontal * thrustScaler
						  )
						: thrust_component.value.horizontal < 0
						? Math.abs(
								thrust_component.value.horizontal * thrustScaler
						  )
						: 0,
			};
		});
		return animatedVectorStyle;
	};

	const get_aircraft_style = (direction: string) => {
		"worklet";
		const aircraftStyle = useAnimatedStyle(() => {
			return {
				top: aircraft_width / 2 - stator_width / 2,
				left:
					direction == "back"
						? -stator_width / 2
						: aircraft_width - stator_width / 2,
			};
		});
		return aircraftStyle;
	};

	const get_force_vector_style = (direction: string) => {
		"worklet";
		const forceVectorStyle = useAnimatedStyle(() => {
			return {
				top: aircraft_width / 2,
				left: direction == "back" ? 0 : aircraft_width,
				height:
					direction == "front"
						? front_thrust_components.value.total * thrustScaler
						: back_thrust_components.value.total * thrustScaler,
			};
		});
		return forceVectorStyle;
	};

	return (
		<Background style={animatedBackground}>
			<Fulselage />
			<AircraftComp style={get_aircraft_style("back")} />
			<AircraftComp style={get_aircraft_style("front")} />
			<ForceBox style={animatedVectorBox}>
				<DirectionVector
					style={getVectorComponentStyle("back", "vertical")}
				/>
				<DirectionVector
					style={getVectorComponentStyle("back", "horizontal")}
				/>
			</ForceBox>
			<ForceBox style={animatedFrontVectorBox}>
				<DirectionVector
					style={getVectorComponentStyle("front", "vertical")}
				/>
				<DirectionVector
					style={getVectorComponentStyle("front", "horizontal")}
				/>
			</ForceBox>
			<ForceVector style={get_force_vector_style("back")} />
			<ForceVector style={get_force_vector_style("front")} />
		</Background>
	);
};

const stator_width = 11;
const aircraft_width = 40;

const Background = styled(Animated.View)`
	width: ${aircraft_width}px;
	height: ${aircraft_width}px;
	border-radius: ${aircraft_width / 2}px;
	position: absolute;
	flex-direction: row;
`;

const Fulselage = styled.View`
	position: absolute;
	top: ${aircraft_width / 2 - 2}px;
	width: ${aircraft_width}px;
	height: 4px;
	background-color: black;
`;

const AircraftComp = styled(Animated.View)`
	position: absolute;
	width: ${stator_width}px;
	height: ${stator_width}px;
	border-radius: ${stator_width / 2}px;
	border-width: 1px;
	border-color: black;
	background-color: white;
`;

const ForceBox = styled(Animated.View)`
	position: absolute;
	/* background-color: #ff000021; */
`;

const ForceVector = styled(Animated.View)`
	position: absolute;
	width: 1px;
	background-color: black;
`;

const DirectionVector = styled(Animated.View)`
	background-color: black;
	opacity: 0.3;
	position: absolute;
`;

export default Aircraft;
