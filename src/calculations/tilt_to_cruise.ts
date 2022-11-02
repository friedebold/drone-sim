import { FlightOptions } from "../../App";
import {
	hover_thrust,
	MAX_THRUST_PER_SIDE,
	thrust_differential
} from "../constants";
import { round } from "./common";

export const adjust_for_horizontal = (
	thrust_total: number,
	pitch_angle: number
) => {
	return Math.min(
		thrust_total / Math.cos((pitch_angle * Math.PI) / 180),
		MAX_THRUST_PER_SIDE
	);
};

export const runTiltToCruise = (
	options: FlightOptions,
	tilting: boolean,
	vVelocity: number,
	vAcceleration: number,
	pitch_angle: number,
	pitchVelocity: number,
	pitchAcceleration: number,
	mode: string,
	front_thrust: number,
	back_thrust: number,
	logger: string
) => {
	//TILT CUTTOFF
	if (tilting) {
		if (pitch_angle >= options.maxPitch / 2) {
			tilting = false;
		}
	}

	//SWITCH TO CRUISE
	if (
		pitch_angle > options.maxPitch * 0.5 &&
		pitchVelocity == 0 &&
		pitchAcceleration == 0
	) {
		logger = "speed correct: " + vVelocity;
		mode = "cruise";
	}

	// Pitch Speed Correction
	else if (pitchVelocity < 0 && pitchAcceleration == 0) {
		const correction_thrust = round((-pitchVelocity / 2) * 100);

		front_thrust = adjust_for_horizontal(
			9.81 / 2 - correction_thrust / 2,
			pitch_angle
		);
		back_thrust = adjust_for_horizontal(
			9.81 / 2 + correction_thrust / 2,
			pitch_angle
		);
	}

	// Idle
	else if (pitch_angle > options.maxPitch * 0.5 && pitchVelocity <= 0) {
		if (options.disableHorizontal) {
			front_thrust = hover_thrust;
			back_thrust = hover_thrust;
		} else {
			front_thrust = adjust_for_horizontal(hover_thrust, pitch_angle);
			back_thrust = adjust_for_horizontal(hover_thrust, pitch_angle);
		}
	}

	// Thrust
	else if (tilting) {
		if (options.disableHorizontal) {
			front_thrust = hover_thrust - thrust_differential;
			back_thrust = hover_thrust + thrust_differential;
		} else {
			front_thrust = adjust_for_horizontal(
				hover_thrust - thrust_differential,
				pitch_angle
			);
			back_thrust = adjust_for_horizontal(
				hover_thrust + thrust_differential,
				pitch_angle
			);
		}
	}

	// Reverse Thrust
	else {
		if (options.disableHorizontal) {
			front_thrust = hover_thrust + thrust_differential;
			back_thrust = hover_thrust - thrust_differential;
		} else {
			front_thrust = adjust_for_horizontal(
				hover_thrust + thrust_differential,
				pitch_angle
			);
			back_thrust = adjust_for_horizontal(
				hover_thrust - thrust_differential,
				pitch_angle
			);
		}
	}

	return {
		logger,
		tilting,
		mode,
		back_thrust,
		front_thrust,
		vVelocity,
	};
};
