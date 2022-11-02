import Animated, {
    useAnimatedReaction,
    useSharedValue
} from "react-native-reanimated";
import { MAX_THRUST } from "../constants";

export const useThrust = (
	clock: Animated.SharedValue<number>, // s
	velocity: Animated.SharedValue<number>, // m/2
	thrustDuration: number,
	landingThrustAltitude: number,
	altitude: Animated.SharedValue<number>,
	targetAltitide: number,
	flightMode: Animated.SharedValue<string>
) => {
	"worklet";
	const thrust = useSharedValue(MAX_THRUST);

	useAnimatedReaction(
		() => clock.value,
		(clock) => {
			if (flightMode.value == "takeoff" || flightMode.value == "cruise") {
				// SPEED CORRECT
				if (velocity.value < 0 && thrust.value == 9.81) {
					console.log("speed correct", velocity.value);
					thrust.value =
						Math.min(-velocity.value * 100, MAX_THRUST) + 9.81;
				}

				// HOVER
				else if (clock >= thrustDuration && velocity.value <= 0) {
					thrust.value = 9.81;
					flightMode.value = "cruise";
				}

				// ENGINE CUTOFF
				else if (clock >= thrustDuration - 0.01) {
					thrust.value = 0.0;
				}
				// MAX
				else thrust.value = MAX_THRUST;
			}
			if (flightMode.value == "landing") {
				// SPEED CORRECT
				if (velocity.value > 0 && thrust.value == 9.81) {
					console.log("speed correct", velocity.value);
					thrust.value =
						Math.min(-velocity.value * 100, MAX_THRUST) + 9.81;
				}

				// HOVER
				else if (
					altitude.value <= landingThrustAltitude &&
					velocity.value >= 0
				) {
					thrust.value = 9.81;
				}

				// LANDING BURN
				else if (altitude.value <= landingThrustAltitude) {
					thrust.value = MAX_THRUST;
				}
				//HOVER
				else thrust.value = 0;
			}
		}
	);
	return thrust;
};
