import { useEffect } from "react";
import { Easing } from "react-native";
import {
	runOnUI,
	useAnimatedReaction,
	useDerivedValue,
	useSharedValue,
	withTiming
} from "react-native-reanimated";

export const useClock = () => {
	const clock = useSharedValue(0);

	const runClock = async () => {
		const NR_OF_SEC = 1000000;
		clock.value = withTiming(
			NR_OF_SEC,
			{
				duration: NR_OF_SEC * 1000,
				easing: Easing.linear,
			},
			(finished) => {
				if (finished === true) {
					clock.value = 0;
				}
			}
		);
	};

	useEffect(() => {
		runOnUI(runClock)();
	}, []);

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
