import Animated, { useAnimatedReaction } from "react-native-reanimated";

export const useVelocity = (
	velocity: Animated.SharedValue<number>,
	clock: Animated.SharedValue<number>,
	acceleration: Animated.SharedValue<number>,
	thrust: Animated.SharedValue<number>
) => {
	"worklet";
	useAnimatedReaction(
		() => clock.value,
		(clock) => {
			velocity.value = velocity.value + acceleration.value / 100;
			// if (velocity.value == 0) {
			// 	thrust.value == 0;
			// }
		}
	);

	return true;
};
