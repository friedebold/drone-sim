import { HOVER_THRUST, thrust_differential } from "../constants";
import { adjust_for_horizontal, round } from "./common";

export const spin = (
	tilting: boolean,
	mode: string,
	pitch: {
		acceleration: number;
		velocity: number;
		distance: number;
		angle: number;
	},
	thrust: {
		front: number;
		back: number;
	},
	logger: string
) => {
	//	logger = pitch.acceleration + " " + pitch.velocity + " " + pitch.angle;

	const cutoff_point = 0;
	//TILT CUTTOFF
	if (tilting) {
		if (pitch.angle <= cutoff_point) {
			tilting = false;
		}
	}

	//SWITCH TO TILT TO LAND 2
	if (
		pitch.angle < cutoff_point &&
		pitch.velocity == 0 &&
		pitch.acceleration == 0
	) {
		logger = "switch........";
		mode = "reverse_cruise";
		tilting = true;
	}

	// Pitch Speed Correction
	else if (pitch.velocity > 0 && pitch.acceleration == 0) {
		logger = logger + "correct...";

		const correction_thrust = round(pitch.velocity * 100);

		thrust.front =
			adjust_for_horizontal(HOVER_THRUST, pitch.angle) +
			correction_thrust / 2;
		thrust.back =
			adjust_for_horizontal(HOVER_THRUST, pitch.angle) -
			correction_thrust / 2;
	}

	// Idle
	else if (pitch.angle <= -cutoff_point && pitch.velocity >= 0) {
		thrust.front = adjust_for_horizontal(HOVER_THRUST, pitch.angle);
		thrust.back = adjust_for_horizontal(HOVER_THRUST, pitch.angle);
	}

	// Reverse Thrust
	else if (!tilting && pitch.angle <= cutoff_point) {
		thrust.front = adjust_for_horizontal(
			HOVER_THRUST - thrust_differential,
			pitch.angle
		);
		thrust.back = adjust_for_horizontal(
			HOVER_THRUST + thrust_differential,
			pitch.angle
		);
	}

	// Thrust
	else {
		thrust.front = adjust_for_horizontal(
			HOVER_THRUST + thrust_differential,
			pitch.angle
		);
		thrust.back = adjust_for_horizontal(
			HOVER_THRUST - thrust_differential,
			pitch.angle
		);
	}

	return {
		logger,
		tilting,
		mode,
		pitch,
		thrust,
	};
};
