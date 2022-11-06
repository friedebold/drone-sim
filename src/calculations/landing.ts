import { hover_thrust, MAX_THRUST, MAX_THRUST_PER_SIDE } from "../constants";
import { adjust_for_horizontal, round } from "./common";

export const runLanding = (
	engines_running: boolean,
	vAcceleration: number,
	vVelocity: number,
	vDistance: number,
	front_thrust: number,
	back_thrust: number,
	pitch_angle: number,
	logger: string
) => {
	//START ENGINES
	if (!engines_running) {
		const potAcceleration = MAX_THRUST - 9.81;
		let potVelocity = vVelocity;
		let potAltitude = vDistance;
		for (let j = 0; j <= 2000; j++) {
			potVelocity = potVelocity + potAcceleration / 100;
			potAltitude = potAltitude + potVelocity / 100;
			if (potAltitude <= 0) {
				engines_running = true;
				break;
			}
		}
	}

	// Speed Correction
	if (vVelocity > 0 && vAcceleration == 0) {
		const correction_thrust = round((-vVelocity / 2) * 100 + 9.81 / 2);

		front_thrust = Math.min(correction_thrust, MAX_THRUST_PER_SIDE);
		back_thrust = Math.min(correction_thrust, MAX_THRUST_PER_SIDE);
		console.log("speed correct", correction_thrust);
	}

	//IDLE
	else if (engines_running && vVelocity >= 0) {
		front_thrust = adjust_for_horizontal(hover_thrust, pitch_angle);
		back_thrust = adjust_for_horizontal(hover_thrust, pitch_angle);
	}

	//BREAK
	else if (engines_running) {
		logger = "yessss";
		front_thrust = adjust_for_horizontal(MAX_THRUST_PER_SIDE, pitch_angle);
		back_thrust = adjust_for_horizontal(MAX_THRUST_PER_SIDE, pitch_angle)
	}

	//FREE FALL
	else {
		front_thrust = 0;
		back_thrust = 0;
	}

	return {
		engines_running,
		vAcceleration,
		vVelocity,
		vDistance,
		front_thrust,
		back_thrust,
		pitch_angle,
		logger,
	};
};
