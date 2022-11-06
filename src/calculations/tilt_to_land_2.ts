import { FlightOptions } from "../../App";
import { hover_thrust, thrust_differential } from "../constants";
import { adjust_for_horizontal, round } from "./common";

export const runTiltToLand_2 = (
	options: FlightOptions,
	tilting: boolean,
	mode: string,
	pitch_angle: number,
	pitchAcceleration: number,
	pitchVelocity: number,
	pitchDistance: number,
	front_thrust: number,
	back_thrust: number,
	logger: string,
	hVelocity: number
) => {
	//TILT CUTTOFF
	if (tilting) {
		if (pitch_angle >= -options.maxPitch / 2) {
			tilting = false;
		}
	}

	//SWITCH TO LANDING
	if (
		pitch_angle > -options.maxPitch / 2 &&
		pitchVelocity == 0 &&
		pitchAcceleration == 0
	) {
		mode = "landing";
	}

	// SPEED CORRECTION
	else if (pitchVelocity < 0 && pitchAcceleration == 0) {
		logger = logger + "correct...";

		const correction_thrust = round(pitchVelocity * 100);

		front_thrust =
			adjust_for_horizontal(hover_thrust, pitch_angle) +
			correction_thrust / 2;
		back_thrust =
			adjust_for_horizontal(hover_thrust, pitch_angle) -
			correction_thrust / 2;
	}

	//IDLE
	else if (!tilting && pitchVelocity <= 0) {
		if (options.disableHorizontal) {
			front_thrust = hover_thrust;
			back_thrust = hover_thrust;
		} else {
			front_thrust = adjust_for_horizontal(hover_thrust, pitch_angle);
			back_thrust = adjust_for_horizontal(hover_thrust, pitch_angle);
		}

		//Reverse Thrust
	} else if (!tilting) {
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
	} else if (hVelocity <= 0) {
		// Thrust
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

	return {
		tilting,
		mode,
		pitch_angle,
		pitchAcceleration,
		pitchVelocity,
		pitchDistance,
		back_thrust,
		front_thrust,
		logger,
		hVelocity,
	};
};
