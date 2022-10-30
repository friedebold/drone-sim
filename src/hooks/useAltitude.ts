import Animated, { useAnimatedReaction } from "react-native-reanimated";

export const useAltitude = (
	altitude: Animated.SharedValue<number>,
	clock: Animated.SharedValue<number>, // s
	velocity: Animated.SharedValue<number> // m / s
) => {
	"worklet";
	useAnimatedReaction(
		() => clock.value,
		(clock) => (altitude.value = altitude.value + velocity.value / 100)
	);

	return true;
};
