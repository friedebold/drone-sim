import { FlightOptions } from "../../App";
import { hover_thrust, thrust_differential } from "../constants";
import { adjust_for_horizontal, round } from "./common";

export const runTiltToLand_1 = (
	options: FlightOptions,
	tilting: boolean,
	mode: string,
	pitch_angle: number,
	pitchAcceleration: number,
	pitchVelocity: number,
	pitchDistance: number,
	front_thrust: number,
	back_thrust: number,
	logger: string
) => {
	logger = pitchAcceleration + " " + pitchVelocity + " " + pitch_angle;

	const cutoff_point = 0;
	//TILT CUTTOFF
	if (tilting) {
		if (pitch_angle <= cutoff_point) {
			tilting = false;
		}
	}

	//SWITCH TO TILT TO LAND 2
	if (
		pitch_angle < cutoff_point &&
		pitchVelocity == 0 &&
		pitchAcceleration == 0
	) {
		mode = "tilt_to_land_2";
		tilting = true;
	}

	// Pitch Speed Correction
	else if (pitchVelocity > 0 && pitchAcceleration == 0) {
		logger = logger + "correct...";

		const correction_thrust = round(pitchVelocity * 100);

		front_thrust =
			adjust_for_horizontal(hover_thrust, pitch_angle) +
			correction_thrust / 2;
		back_thrust =
			adjust_for_horizontal(hover_thrust, pitch_angle) -
			correction_thrust / 2;
	}

	// Idle
	else if (pitch_angle <= -cutoff_point && pitchVelocity >= 0) {
		if (options.disableHorizontal) {
			front_thrust = hover_thrust;
			back_thrust = hover_thrust;
		} else {
			front_thrust = adjust_for_horizontal(hover_thrust, pitch_angle);
			back_thrust = adjust_for_horizontal(hover_thrust, pitch_angle);
		}
	}

	// Reverse Thrust
	else if (!tilting && pitch_angle <= cutoff_point) {
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

	// Thrust
	else if (options.disableHorizontal) {
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

	return {
		logger,
		tilting,
		mode,
		pitchAcceleration,
		pitchVelocity,
		pitchDistance,
		back_thrust,
		front_thrust,
	};
};
