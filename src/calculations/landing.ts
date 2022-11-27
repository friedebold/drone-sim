import { HOVER_THRUST, MAX_THRUST, MAX_THRUST_PER_SIDE } from "../constants";
import { adjust_for_horizontal, round } from "./common";

export const runLanding = (
	engines_running: boolean,
	vertical: {
		acceleration: number;
		velocity: number;
		distance: number;
	},
	thrust: {
		front: number;
		back: number;
	},
	pitch: {
		acceleration: number;
		velocity: number;
		distance: number;
		angle: number;
	},
	/* front_thrust: number,
	back_thrust: number,
	pitch_angle: number, */
	logger: string
) => {
	//START ENGINES
	if (!engines_running) {
		const potAcceleration = MAX_THRUST - 9.81;
		let potVelocity = vertical.velocity;
		let potAltitude = vertical.distance;
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
	if (vertical.velocity > 0 && vertical.acceleration == 0) {
		const correction_thrust = round(
			(-vertical.velocity / 2) * 100 + 9.81 / 2
		);

		thrust.front = Math.min(correction_thrust, MAX_THRUST_PER_SIDE);
		thrust.back = Math.min(correction_thrust, MAX_THRUST_PER_SIDE);
		console.log("speed correct", correction_thrust);
	}

	//IDLE
	else if (engines_running && vertical.velocity >= 0) {
		thrust.front = adjust_for_horizontal(HOVER_THRUST, pitch.angle);
		thrust.back = adjust_for_horizontal(HOVER_THRUST, pitch.angle);
	}

	//BREAK
	else if (engines_running) {
		logger = "yessss";
		thrust.front = adjust_for_horizontal(MAX_THRUST_PER_SIDE, pitch.angle);
		thrust.back = adjust_for_horizontal(MAX_THRUST_PER_SIDE, pitch.angle);
	}

	//FREE FALL
	else {
		thrust.front = 0;
		thrust.back = 0;
	}

	return {
		engines_running,
		vertical,
		thrust,
		pitch,
		logger,
	};
};
