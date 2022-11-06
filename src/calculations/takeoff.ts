import { FlightOptions } from "../../App";
import { hover_thrust, MAX_THRUST_PER_SIDE } from "../constants";
import { round } from "./common";

export const runTakeoff = (
	options: FlightOptions,
	vAcceleration: number,
	vVelocity: number,
	vDistance: number,
	back_thrust: number,
	front_thrust: number,
	logger: string,
	mode: string,
	vMaxDistance: number
) => {
	"worklet";

	// CALCULATE ALTITUDE ON CUTTOFF
	const potAcceleration = -9.81;
	let potVelocity = vVelocity;
	let potAltitude = vDistance;
	let max_altitude = -100000000;
	for (let i = 0; i <= 2000; i++) {
		potVelocity = potVelocity + potAcceleration / 100;
		potAltitude = potAltitude + potVelocity / 100;
		if (potAltitude > max_altitude) max_altitude = round(potAltitude);
	}
	vMaxDistance = max_altitude;
	logger = vMaxDistance + "";

	// Switch to Cruise
	if (
		vDistance >= options.targetAltitude * 0.5 &&
		vVelocity == 0 &&
		vAcceleration == 0
	) {
		mode = "tilt_to_cruise";
	}

	// Speed Correction
	if (vVelocity < 0 && vAcceleration == 0) {
		const correction_thrust = round((-vVelocity / 2) * 100 + 9.81 / 2);

		front_thrust = Math.min(correction_thrust, MAX_THRUST_PER_SIDE);
		back_thrust = Math.min(correction_thrust, MAX_THRUST_PER_SIDE);
		console.log("speed correct", correction_thrust);
	}

	//  Thrust
	else if (vMaxDistance <= options.targetAltitude * 0.8) {
		front_thrust = MAX_THRUST_PER_SIDE;
		back_thrust = MAX_THRUST_PER_SIDE;
	}

	// Hover
	else if (vMaxDistance <= options.targetAltitude) {
		front_thrust = hover_thrust;
		back_thrust = hover_thrust;
	}

	// Free Fall
	else {
		front_thrust = 0;
		back_thrust = 0;
	}

	return {
		front_thrust,
		back_thrust,
		logger,
		mode,
		vAcceleration,
		vVelocity,
		vDistance,
		vMaxDistance,
	};
};
