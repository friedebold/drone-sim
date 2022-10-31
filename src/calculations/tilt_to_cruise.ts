import { FlightOptions } from "../../App";

export const adjust_for_horizontal = (
	thrust_total: number,
	pitch_angle: number
) => {
	return thrust_total / Math.cos((pitch_angle * Math.PI) / 180);
};

export const runTiltToCruise = (
	options: FlightOptions,
	tilting: boolean,
	pitch_angle: number,
	pitchVelocity: number,
	pitchAcceleration: number,
	mode: string,
	front_thrust: number,
	back_thrust: number,
	logger: string
) => {
	const hover_thrust = 9.81 / 2;
	const thrust_differential = 4; // Math.min(MAX_THRUST_PER_SIDE, 9.81 / 2);
	logger = pitch_angle.toString();

	//TILT CUTTOFF
	if (tilting) {
		if (pitch_angle >= options.maxPitch / 2) {
			tilting = false;
		}
	}

	// Idle
	if (pitch_angle > options.maxPitch * 0.5 && pitchVelocity <= 0) {
		if (options.disableHorizontal) {
			front_thrust = hover_thrust;
			back_thrust = hover_thrust;
		} else {
			front_thrust = adjust_for_horizontal(hover_thrust, pitch_angle);
			back_thrust = adjust_for_horizontal(hover_thrust, pitch_angle);
		}

		// mode = "cruise";
	}

	/* // Speed Correction
	else if (pitchVelocity < 0 && pitchAcceleration == 0) {
		const correction_thrust = round((-pitchVelocity / 2) * 100);

		front_thrust = hover_thrust + correction_thrust / 2;
		back_thrust = hover_thrust - correction_thrust / 2;
		console.log("speed correct", correction_thrust);
	} */

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
	};
};
