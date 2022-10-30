import React from "react";
import { Text, useWindowDimensions, View, ViewStyle } from "react-native";
import styled from "styled-components/native";
import { LAT_DISTANCE, LON_DISTANCE } from "../constants";

interface Props {}

const Grid: React.FC<Props> = () => {
	const { height, width } = useWindowDimensions();

	const AbsoluteBackground = styled.View`
		position: absolute;
		height: ${height}px;
		width: ${width}px;
		overflow: hidden;
	`;

	const getLatitudeStyle = (e: number) => {
		const style: ViewStyle = {
			top: 0.5 * height - e * LAT_DISTANCE,
			left: width / 2,
			height: 1,
			width: width / 2,
			backgroundColor: "black",
			opacity: 0.3,
			position: "absolute",
		};
		return style;
	};

	const getLatitudeTextStyle = (e: number) => {
		const style: ViewStyle = {
			top: 0.5 * height - 8 - e * LAT_DISTANCE,
			left: 10,
			height: 1,
			width: width / 2,
			position: "absolute",
		};
		return style;
	};

	const getLongitudeStyle = (e: number) => {
		const style: ViewStyle = {
			left: 0.5 * width + e * LON_DISTANCE,
			height: height / 2,
			width: 1,
			backgroundColor: "black",
			opacity: 0.3,
			position: "absolute",
		};
		return style;
	};

	const getLongitudeTextStyle = (e: number) => {
		const style: ViewStyle = {
			top: height / 2 + 8,
			left: 0.5 * width - 8 + e * LON_DISTANCE,
			height: height / 2,
			position: "absolute",
		};
		return style;
	};

	return (
		<AbsoluteBackground>
			{[...Array(10).keys()].map((index) => {
				return <View style={getLatitudeStyle(index)} key={index} />;
			})}

			{[...Array(10).keys()].map((index) => {
				return (
					<Text style={getLatitudeTextStyle(index)} key={index}>
						{index * 10}
					</Text>
				);
			})}

			{[...Array(10).keys()].map((index) => {
				return <View style={getLongitudeStyle(index)} key={index} />;
			})}

			{[...Array(10).keys()].map((index) => {
				return (
					<Text style={getLongitudeTextStyle(index)} key={index}>
						{index * 10}
					</Text>
				);
			})}
		</AbsoluteBackground>
	);
};

export default Grid;
