import { FlightOptions } from "../../App";
import { HOVER_THRUST, thrust_differential } from "../constants";
import { DimensionData, PitchProps } from "../Flight/FlightWrapper";
import { adjust_for_horizontal, round } from "./common";

export const runTiltToCruise = (
	options: FlightOptions,
	tilting: boolean,
	pitch: PitchProps,
	vertical: DimensionData,
	mode: string,
	thrust: {
		front: number;
		back: number;
	},
	logger: string
) => {
	//TILT CUTTOFF
	if (tilting) {
		const potPitchAcceleration = adjust_for_horizontal(
			-thrust_differential * 2,
			pitch.angle
		);
		logger = potPitchAcceleration + "";
		let potPitchVelocity = pitch.velocity;
		let potPitchDistance = pitch.distance;
		for (let j = 0; j <= 2000; j++) {
			potPitchVelocity = potPitchVelocity + potPitchAcceleration / 100;
			potPitchDistance = potPitchDistance + potPitchVelocity / 100;
			const potPitchAngle = round((potPitchDistance * 180) / Math.PI);
			if (potPitchAngle >= options.maxPitch) {
				tilting = false;
			}
		}
	}

	//SWITCH TO CRUISE
	if (
		pitch.angle > options.maxPitch * 0.5 &&
		pitch.velocity == 0 &&
		pitch.acceleration == 0
	) {
		mode = "cruise";
		/* if (vertical.velocity <= 0) {		
		} else {
		} */
	} else if (pitch.velocity < 0 && pitch.acceleration == 0) {
		const correction_thrust = round((-pitch.velocity / 2) * 100);

		thrust.front = adjust_for_horizontal(
			9.81 / 2 - correction_thrust / 2,
			pitch.angle
		);
		thrust.back = adjust_for_horizontal(
			9.81 / 2 + correction_thrust / 2,
			pitch.angle
		);
	}

	// Idle
	else if (pitch.angle > options.maxPitch * 0.5 && pitch.velocity <= 0) {
		thrust.front = adjust_for_horizontal(HOVER_THRUST, pitch.angle);
		thrust.back = adjust_for_horizontal(HOVER_THRUST, pitch.angle);
	}

	// Thrust
	else if (tilting) {
		thrust.front = adjust_for_horizontal(
			HOVER_THRUST - thrust_differential,
			pitch.angle
		);
		thrust.back = adjust_for_horizontal(
			HOVER_THRUST + thrust_differential,
			pitch.angle
		);
	}

	// Reverse Thrust
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
		tilting,
		pitch,
		vertical,
		mode,
		thrust,
		logger,
	};
};
