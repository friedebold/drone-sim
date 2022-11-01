import Animated, {
	Easing,
	useAnimatedReaction,
	useDerivedValue,
	useSharedValue,
	withTiming
} from "react-native-reanimated";

export const useClock = (
	clock: Animated.SharedValue<number>,
	clock_running: Animated.SharedValue<boolean>
) => {
	const runClock = () => {
		"worklet";
		const NR_OF_SEC = 20;
		clock.value = withTiming(
			NR_OF_SEC,
			{
				duration: NR_OF_SEC * 1000 - clock.value,
				easing: Easing.linear,
			},
			(finished) => {
				if (finished === true) {
					clock.value = 0;
					clock_running.value = false
				}
			}
		);
	};

	useAnimatedReaction(
		() => clock_running.value,
		(clock_running) => {
			if (clock_running) {
				runClock();
			}
		}
	);

	const formatedClock = useDerivedValue(() => {
		return Number((Math.round(clock.value * 100) / 100).toFixed(2));
	});

	const resultClock = useSharedValue(0);
	useAnimatedReaction(
		() => formatedClock.value > resultClock.value,
		(isNew) => {
			if (isNew) resultClock.value = formatedClock.value;
		}
	);
	return resultClock;
};
