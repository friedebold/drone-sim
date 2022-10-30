import Animated, {
	useAnimatedReaction,
	useSharedValue
} from "react-native-reanimated";

export const useAcceleration = (
	clock: Animated.SharedValue<number>, // s
	thrust: Animated.SharedValue<number>, // kg * m / s2
	gravity: Animated.SharedValue<number> // kg * m / s2
) => {
	"worklet";
	const PLANE_MASS = 1;

	const acceleration = useSharedValue(0);

	useAnimatedReaction(
		() => clock.value,
		(clock) => {
			acceleration.value = (thrust.value - gravity.value) / PLANE_MASS; // m / s2
		}
	);

	return acceleration;
};
