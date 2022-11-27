import { FlightOptions } from "../../App";
import { MAX_THRUST_PER_SIDE } from "../constants";
import { round } from "./common";

export const runTakeoff = (
	options: FlightOptions,
	vertical: {
		acceleration: number;
		velocity: number;
		distance: number;
	},
	thrust: {
		front: number;
		back: number;
	},
	logger: string,
	mode: string,
	defaultAltitude: number
) => {
	"worklet";

	// CALCULATE ALTITUDE ON CUTTOFF
	const potAcceleration = -9.81;
	let potVelocity = vertical.velocity;
	let potAltitude = vertical.distance;
	let max_altitude = -100000000;
	for (let i = 0; i <= 2000; i++) {
		potVelocity = potVelocity + potAcceleration / 100;
		potAltitude = potAltitude + potVelocity / 100;
		if (potAltitude > max_altitude) max_altitude = round(potAltitude);
	}
	defaultAltitude = max_altitude;
	/* 
	// Switch to Cruise
	if (
		vertical.distance >= options.targetAltitude * 0.5 &&
		vertical.velocity == 0 &&
		vertical.acceleration == 0
	) {
		mode = "tilt_to_cruise";
	}

	// Speed Correction
	if (vertical.velocity < 0 && vertical.acceleration == 0) {
		const correction_thrust = round(
			(-vertical.velocity / 2) * 100 + 9.81 / 2
		);

		thrust.front = Math.min(correction_thrust, MAX_THRUST_PER_SIDE);
		thrust.back = Math.min(correction_thrust, MAX_THRUST_PER_SIDE);
		console.log("speed correct", correction_thrust);
	}

	//  Thrust
	else if (defaultAltitude <= options.targetAltitude * 0.8) {
		thrust.front = MAX_THRUST_PER_SIDE;
		thrust.back = MAX_THRUST_PER_SIDE;
	}

	// Hover
	else if (defaultAltitude <= options.targetAltitude) {
		thrust.front = HOVER_THRUST;
		thrust.back = HOVER_THRUST;
	}

	// Free Fall
	else {
		thrust.front = 0;
		thrust.back = 0;
	}
 */
	if (vertical.velocity <= 0 && vertical.distance >= options.targetAltitude) {
		mode = "tilt_to_cruise";
	} else if (defaultAltitude >= options.targetAltitude) {
		thrust.front = 0;
		thrust.back = 0;
	} else {
		thrust.front = MAX_THRUST_PER_SIDE;
		thrust.back = MAX_THRUST_PER_SIDE;
	}
	logger = defaultAltitude + "";

	return {
		thrust,
		logger,
		mode,
		vertical,
		defaultAltitude,
	};
};
