import React from "react";
import { Text, View } from "react-native";
import Animated, { useDerivedValue } from "react-native-reanimated";
import { AnimatedText } from "react-native-wagmi-charts";
import { margin } from "../constants";
import { round } from "./calculations/common";

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
}

const DataPanel: React.FC<Props> = ({ clock, vertical, horizontal, pitch }) => {
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
	return (
		<View
			style={{
				flexDirection: "row",
				alignItems: "stretch",
				margin: margin,
			}}
		>
			<View
				style={{
					alignItems: "center",
					justifyContent: "center",
					flexDirection: "row",
				}}
			>
				<AnimatedText
					style={{
						//textAlign: "right",
						fontSize: 24,
						width: 65,
					}}
					text={tClock}
				/>
				<Text style={{ fontSize: 24 }}>s</Text>
				<View style={{ width: margin * 2 }} />
			</View>
			<View>
				<Text style={{ fontSize: 24 }}>{"Vertical"}</Text>
				<Text>{"Acceleration"}</Text>
				<Text>{"Velocity"}</Text>
				<Text>{"Distance"}</Text>
			</View>
			<View style={{ width: margin / 2 }} />
			<View style={{}}>
				<Text style={{ fontSize: 24 }}>{"-"}</Text>
				<AnimatedText text={vAccel} />
				<AnimatedText text={vVelo} />
				<AnimatedText text={vDist} />
			</View>

			<View style={{}}>
				<Text style={{ fontSize: 24 }}>{"Horizontal"}</Text>
				<Text>{"Acceleration"}</Text>
				<Text>{"Velocity"}</Text>
				<Text>{"Distance"}</Text>
			</View>
			<View style={{ width: margin / 2 }} />
			<View style={{}}>
				<Text style={{ fontSize: 24 }}>{"-"}</Text>
				<AnimatedText text={hAccel} />
				<AnimatedText text={hVelo} />
				<AnimatedText text={hDist} />
			</View>

			<View style={{}}>
				<Text style={{ fontSize: 24 }}>{"Pitch"}</Text>
				<Text>{"Acceleration"}</Text>
				<Text>{"Velocity"}</Text>
				<Text>{"Angle"}</Text>
			</View>
			<View style={{ width: margin / 2 }} />
			<View style={{}}>
				<Text style={{ fontSize: 24 }}>{"-"}</Text>
				<AnimatedText text={pAccel} />
				<AnimatedText text={pVelo} />
				<AnimatedText text={pDeg} />
			</View>
		</View>
	);
};

export default DataPanel;
