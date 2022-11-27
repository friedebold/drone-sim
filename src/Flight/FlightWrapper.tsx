import React from "react";
import { TouchableWithoutFeedback, useWindowDimensions } from "react-native";
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
import { FlightData, FlightOptions } from "../../App";
import { useClock } from "../hooks/useClock";
import Flight from "./Flight";

export interface ThrustProps {
	total: number;
	vertical: number;
	horizontal: number;
}

export interface DimensionData {
	acceleration: number;
	velocity: number;
	distance: number;
}

export interface PitchProps {
	acceleration: number;
	velocity: number;
	distance: number;
	angle: number;
}

interface Props {
	options: FlightOptions;
	data: FlightData[];
	setNavigation: React.Dispatch<React.SetStateAction<string>>;
}

const FlightWrapper: React.FC<Props> = ({ setNavigation, options, data }) => {
	const { width } = useWindowDimensions();
	/* const grid_move = false; */

	const mode = useSharedValue("");

	const front_thrust_components = useSharedValue<ThrustProps>({
		total: 0,
		vertical: 0,
		horizontal: 0,
	});
	const back_thrust_components = useSharedValue<ThrustProps>({
		total: 0,
		vertical: 0,
		horizontal: 0,
	});
	const vertical = useSharedValue<DimensionData>({
		acceleration: 0,
		velocity: 0,
		distance: 0,
	});
	const horizontal = useSharedValue<DimensionData>({
		acceleration: 0,
		velocity: 0,
		distance: 0,
	});
	const pitch = useSharedValue<PitchProps>({
		acceleration: 0,
		velocity: 0,
		distance: 0,
		angle: 0,
	});

	const prediction = useSharedValue({
		altitude: 0,
		distance: 0,
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
				prediction.value = data[rounded_clock].prediction;

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

	const start_clock = useSharedValue(0);
	const active = useSharedValue(false);
	/* const panGesture = Gesture.Pan()
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
			active.value = false;
		})
		.onEnd((e) => {
			clock.value = withDecay({
				velocity: e.velocityX / 80,
				clamp: [0, 20],
			});
		}); */

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
			active.value = false;
		})
		.onEnd((e) => {
			clock.value = withDecay({
				velocity: e.velocityX / 80,
				clamp: [0, 20], // optionally define boundaries for the animation
			});
		});

	const toggle_clock_running = () => {
		"worklet";
		if (clock_running.value) {
			clock_running.value = false;
			cancelAnimation(clock);
		} else clock_running.value = !clock_running.value;
	};

	const animatedBackgroundStyle = useAnimatedStyle(() => {
		return {
			//	backgroundColor: clock_running.value == true ? "white" : "#e2e2e5",
		};
	}, [clock_running]);

	return (
		<GestureDetector gesture={panGesture}>
			<TouchableWithoutFeedback
				onPress={() => {
					runOnJS(toggle_clock_running)();
					console.log("click...");
				}}
				style={{
					backgroundColor: "red",
				}}
			>
				<Background style={animatedBackgroundStyle}>
					<Flight
						{...{ setNavigation }}
						{...{ clock_running }}
						{...{ clock }}
						{...{ vertical }}
						{...{ horizontal }}
						{...{ front_thrust_components }}
						{...{ back_thrust_components }}
						{...{ pitch }}
						{...{ mode }}
					/>
				</Background>
			</TouchableWithoutFeedback>
		</GestureDetector>
	);
};

const Background = styled(Animated.View)`
	justify-content: space-between;
	flex: 1;
`;

export default FlightWrapper;
