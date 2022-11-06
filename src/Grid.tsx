import React from "react";
import { useWindowDimensions } from "react-native";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import styled from "styled-components/native";
import { LAT_DISTANCE, LON_DISTANCE } from "./constants";

interface Props {
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
}

const Grid: React.FC<Props> = ({ grid_move, vertical, horizontal }) => {
	const { height, width } = useWindowDimensions();

	const getLatitudeStyle = (e: number) => {
		"worklet";
		const style = useAnimatedStyle(() => {
			return {
				top: 0.5 * height - e * LAT_DISTANCE,
				height: 1,
				width: width / 2,
				backgroundColor: "black",
				opacity: 0.3,
			};
		});
		return style;
	};

	const getLatitudeTextStyle = (e: number) => {
		"worklet";
		const style = useAnimatedStyle(() => {
			return {
				top: 0.5 * height - 8 - e * LAT_DISTANCE,
				left: -80,
				width: width / 2,
				fontSize: 20,
				position: "absolute",
			};
		});
		return style;
	};

	const getLongitudeStyle = (e: number) => {
		const style = useAnimatedStyle(() => {
			return {
				left: e * LON_DISTANCE,
				height: height / 2,
				width: 1,
				backgroundColor: "black",
				opacity: 0.3,
				position: "absolute",
			};
		});
		return style;
	};

	const getLongitudeTextStyle = (e: number) => {
		const style = useAnimatedStyle(() => {
			return {
				top: height / 2 + 30,
				left: -8 + e * LON_DISTANCE,
				height: height / 2,
				fontSize: 20,
				position: "absolute",
			};
		});
		return style;
	};

	const animatedLatitudeStyle = useAnimatedStyle(() => {
		return {
			top: grid_move ? (vertical.value.distance / 10) * LON_DISTANCE : 0,
		};
	});

	const animatedLongitudeStyle = useAnimatedStyle(() => {
		return {
			left: grid_move
				? -(horizontal.value.distance / 10) * LAT_DISTANCE
				: 0,
		};
	});

	const animatedLongitudeTextStyle = useAnimatedStyle(() => {
		return {
			left: grid_move
				? width / 2 - (horizontal.value.distance / 10) * LAT_DISTANCE
				: width / 2,
		};
	});

	const AbsoluteBackground = styled(Animated.View)`
		position: absolute;
		height: ${height / 2 + 1}px;
		width: ${width / 2}px;
		left: ${width / 2 - 1}px;
		overflow: hidden;
	`;

	const Longitudes = styled(Animated.View)`
		position: absolute;
		height: ${height / 2}px;
		width: ${width / 2}px;
	`;

	const Latitudes = styled(Animated.View)`
		position: absolute;
		top: 0;
		height: ${height / 2}px;
		width: ${width / 2}px;
	`;

	return (
		<>
			<AbsoluteBackground>
				{/* <View
					style={{
						position: "absolute",
						width: 1,
						height: height / 2,
						backgroundColor: "black",
					}}
				/> */}

				<Latitudes style={animatedLatitudeStyle}>
					{[...Array(100).keys()].map((index) => {
						return (
							<Animated.View
								style={getLatitudeStyle(index)}
								key={index}
							/>
						);
					})}
				</Latitudes>
				<Longitudes style={animatedLongitudeStyle}>
					{[...Array(100).keys()].map((index) => {
						return (
							<Animated.View
								style={getLongitudeStyle(index)}
								key={index}
							/>
						);
					})}
				</Longitudes>
			</AbsoluteBackground>
			<Latitudes style={[animatedLatitudeStyle, { left: width / 2 }]}>
				{[...Array(100).keys()].map((index) => {
					return (
						<Animated.Text
							style={getLatitudeTextStyle(index)}
							key={index}
						>
							{index * 10}
						</Animated.Text>
					);
				})}
			</Latitudes>
			<Longitudes style={animatedLongitudeTextStyle}>
				{[...Array(100).keys()].map((index) => {
					return (
						<Animated.Text
							style={getLongitudeTextStyle(index)}
							key={index}
						>
							{index * 10}
						</Animated.Text>
					);
				})}
			</Longitudes>
		</>
	);
};

export default Grid;
