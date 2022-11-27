import { FlightOptions } from "../../App";
import { HOVER_THRUST, thrust_differential } from "../constants";
import { adjust_for_horizontal, round } from "./common";

export const tilt_to_land = (
	options: FlightOptions,
	tilting: boolean,
	mode: string,
	pitch: {
		acceleration: number;
		velocity: number;
		distance: number;
		angle: number;
	},
	logger: string,
	thrust: {
		front: number;
		back: number;
	},
	horizontal: {
		acceleration: number;
		velocity: number;
		distance: number;
	}
) => {
	//TILT CUTTOFF
	if (tilting) {
		if (pitch.angle >= -options.maxPitch / 2) {
			tilting = false;
		}
	}

	if (!tilting && pitch.velocity == 0 && pitch.acceleration == 0) {
		mode = "landing";
	}
	// SPEED CORRECTION
	else if (pitch.velocity < 0 && pitch.acceleration == 0) {
		logger = logger + "correct...";

		const correction_thrust = round(pitch.velocity * 100);

		thrust.front =
			adjust_for_horizontal(HOVER_THRUST, pitch.angle) +
			correction_thrust / 2;
		thrust.back =
			adjust_for_horizontal(HOVER_THRUST, pitch.angle) -
			correction_thrust / 2;
	}

	// IDLE
	else if (!tilting && pitch.velocity <= 0) {
		thrust.front = adjust_for_horizontal(HOVER_THRUST, pitch.angle);
		thrust.back = adjust_for_horizontal(HOVER_THRUST, pitch.angle);
	}

	// REVERSE
	else if (!tilting) {
		thrust.front = adjust_for_horizontal(
			HOVER_THRUST + thrust_differential,
			pitch.angle
		);
		thrust.back = adjust_for_horizontal(
			HOVER_THRUST - thrust_differential,
			pitch.angle
		);
	}

	// THRUST
	else {
		thrust.front = adjust_for_horizontal(
			HOVER_THRUST - thrust_differential,
			pitch.angle
		);
		thrust.back = adjust_for_horizontal(
			HOVER_THRUST + thrust_differential,
			pitch.angle
		);
	}

	/* 
	//SWITCH TO LANDING
	if (
		pitch.angle > -options.maxPitch / 2 &&
		pitch.velocity == 0 &&
		pitch.acceleration == 0
	) {
		mode = "landing";
	}

	// SPEED CORRECTION
	else if (pitch.velocity < 0 && pitch.acceleration == 0) {
		logger = logger + "correct...";

		const correction_thrust = round(pitch.velocity * 100);

		thrust.front =
			adjust_for_horizontal(hover_thrust, pitch.angle) +
			correction_thrust / 2;
		thrust.back =
			adjust_for_horizontal(hover_thrust, pitch.angle) -
			correction_thrust / 2;
	}

	//IDLE
	else if (!tilting && pitch.velocity <= 0) {
		if (options.disableHorizontal) {
			thrust.front = hover_thrust;
			thrust.back = hover_thrust;
		} else {
			thrust.front = adjust_for_horizontal(hover_thrust, pitch.angle);
			thrust.back = adjust_for_horizontal(hover_thrust, pitch.angle);
		}

		//Reverse Thrust
	} else if (!tilting) {
		if (options.disableHorizontal) {
			thrust.front = hover_thrust + thrust_differential;
			thrust.back = hover_thrust - thrust_differential;
		} else {
			thrust.front = adjust_for_horizontal(
				hover_thrust + thrust_differential,
				pitch.angle
			);
			thrust.back = adjust_for_horizontal(
				hover_thrust - thrust_differential,
				pitch.angle
			);
		}
	} else if (horizontal.velocity <= 0) {
		// Thrust
		if (options.disableHorizontal) {
			thrust.front = hover_thrust - thrust_differential;
			thrust.back = hover_thrust + thrust_differential;
		} else {
			thrust.front = adjust_for_horizontal(
				hover_thrust - thrust_differential,
				pitch.angle
			);
			thrust.back = adjust_for_horizontal(
				hover_thrust + thrust_differential,
				pitch.angle
			);
		}
	} */

	return {
		tilting,
		mode,
		pitch,
		thrust,
		logger,
		horizontal,
	};
};
