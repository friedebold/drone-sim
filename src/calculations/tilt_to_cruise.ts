import { FlightOptions } from "../../App";
import { hover_thrust, thrust_differential } from "../constants";
import { adjust_for_horizontal, round } from "./common";

export const runTiltToCruise = (
	options: FlightOptions,
	tilting: boolean,
	vAcceleration: number,
	vVelocity: number,
	pitch_angle: number,
	pitchAcceleration: number,
	pitchVelocity: number,
	pitchDistance: number,
	mode: string,
	front_thrust: number,
	back_thrust: number,
	logger: string
) => {
	//TILT CUTTOFF
	if (tilting) {
		const potPitchAcceleration = adjust_for_horizontal(
			-thrust_differential * 2,
			pitch_angle
		);
		logger = potPitchAcceleration + "";
		let potPitchVelocity = pitchVelocity;
		let potPitchDistance = pitchDistance;
		for (let j = 0; j <= 2000; j++) {
			potPitchVelocity = potPitchVelocity + potPitchAcceleration / 100;
			potPitchDistance = potPitchDistance + potPitchVelocity / 100;
			const potPitchAngle = round((potPitchDistance * 180) / Math.PI);
			if (potPitchAngle >= options.maxPitch) {
				tilting = false;
			}
		}

		/* if (pitch_angle >= options.maxPitch / 2) {
		
		} */

		/* 
		const potAcceleration = -9.81;
		let potVelocity = vVelocity;
		let potAltitude = vDistance;
		for (let j = 0; j <= 2000; j++) {
			potVelocity = potVelocity + potAcceleration / 100;
			potAltitude = potAltitude + potVelocity / 100;
			if (potAltitude >= options.targetAltitude) {
				engines_running = false;
				break;
			}
		} 
		*/
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
		tilting,
		vAcceleration,
		vVelocity,
		pitch_angle,
		pitchAcceleration,
		pitchVelocity,
		pitchDistance,
		mode,
		front_thrust,
		back_thrust,
		logger,
	};
};
