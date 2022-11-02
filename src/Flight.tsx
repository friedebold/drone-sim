import React from "react";
import {
	Text,
	TouchableWithoutFeedback,
	useWindowDimensions,
	View
} from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	cancelAnimation,
	runOnJS,
	useAnimatedReaction,
	useAnimatedStyle,
	useSharedValue,
	withDecay
} from "react-native-reanimated";
import styled from "styled-components/native";
import { FlightData, FlightOptions } from "../App";
import Aircraft from "./Aircraft";
import { margin } from "./constants";
import DataPanel from "./DataPanel";
import Grid from "./Grid";
import { useClock } from "./hooks/useClock";

interface Props {
	options: FlightOptions;
	data: FlightData[];
	setNavigation: React.Dispatch<React.SetStateAction<string>>;
}

const Flight: React.FC<Props> = ({ setNavigation, options, data }) => {
	const { width } = useWindowDimensions();
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
	const pitch = useSharedValue({
		acceleration: 0,
		velocity: 0,
		distance: 0,
		degree: 0,
		rad: 0,
	});

	const clock_running = useSharedValue(true);
	const clock = useSharedValue(0);
	const _ = useClock(clock, clock_running);

	useAnimatedReaction(
		() => clock.value,
		(clock) => {
			if (clock < 20) {
				const rounded_clock = Math.round(clock * 100);

				mode.value = data[rounded_clock].mode;
				front_thrust_components.value =
					data[rounded_clock].frontThrustComponents;
				back_thrust_components.value =
					data[rounded_clock].backThrustComponents;
				vertical.value = data[rounded_clock].vertical;
				horizontal.value = data[rounded_clock].horizontal;
				pitch.value = data[rounded_clock].pitch;

				console.log(rounded_clock / 100, data[rounded_clock].logger);

				/* console.log(
					rounded_clock,
					back_thrust_components.value.total,
					front_thrust_components.value.total,
					pitch.value.acceleration,
					pitch.value.velocity,
					data[rounded_clock].logger
					//logger[rounded_clock]
				); */

				/* text.value = {
					vertical: {
						acceleration: vertical.value.acceleration.toString(),
						velocity: vertical.value.velocity.toString(),
						distance: vertical.value.distance.toFixed(4),
					},
				}; */
			}
		}
	);

	const clockBarStyle = useAnimatedStyle(() => {
		return {
			width: (clock.value / 20) * width,
		};
	});

	const start_clock = useSharedValue(0);
	const active = useSharedValue(false);
	const panGesture = Gesture.Pan()
		.onBegin((e) => {
			start_clock.value = clock.value;
			if (clock_running.value) {
				clock_running.value = false;
				cancelAnimation(clock);
			}
		})
		.onChange((e) => {
			active.value = true;
			let drag_clock = start_clock.value + e.translationX * (20 / width);
			let clamped_drag_clock = Math.max(0, Math.min(drag_clock, 2000));
			clock.value = clamped_drag_clock;
		})
		.onFinalize(() => {
			/* if (!active.value) {
				if (clock_running.value) {
					console.log("stop clock!!");
					clock_running.value = false;
					cancelAnimation(clock);
				} else {
					console.log("start clock!!");
					clock_running.value = true;
				}
			} */
			/* clock_running.value = true; */
			active.value = false;
			//	clock_running.value = false;
		})
		.onEnd((e) => {
			clock.value = withDecay({
				velocity: e.velocityX / 80,
				clamp: [0, 20], // optionally define boundaries for the animation
			});
		});

	const animatedBackgroundStyle = useAnimatedStyle(() => {
		console.log(clock_running.value);
		return {
			backgroundColor: clock_running.value ? "white" : "#e2e2e5",
		};
	});

	const toggle_clock_running = () => {
		"worklet";
		if (clock_running.value) {
			clock_running.value = false;
			cancelAnimation(clock);
		} else clock_running.value = !clock_running.value;
	};

	return (
		<GestureDetector gesture={panGesture}>
			<TouchableWithoutFeedback
				onPress={() => {
					runOnJS(toggle_clock_running)();
				}}
			>
				<Animated.View
					style={[
						animatedBackgroundStyle,
						{
							justifyContent: "space-between",
							flex: 1,
						},
					]}
				>
					<Grid />
					<Aircraft
						{...{ vertical }}
						{...{ horizontal }}
						{...{ pitch }}
						{...{ back_thrust_components }}
						{...{ front_thrust_components }}
					/>

					<BackButton onPress={() => setNavigation("input")}>
						<Text>x</Text>
					</BackButton>
					<View>
						<DataPanel
							{...{ clock }}
							{...{ pitch }}
							{...{ vertical }}
							{...{ horizontal }}
							{...{ mode }}
						/>
						<Animated.View
							style={[
								clockBarStyle,
								{
									height: 2,
									backgroundColor: "black",
								},
							]}
						></Animated.View>
					</View>
				</Animated.View>
			</TouchableWithoutFeedback>
		</GestureDetector>
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

export default Flight;
