import { FlightOptions } from "../../App";
import { MAX_THRUST_PER_SIDE } from "../../constants";
import { round } from "./common";

export const runTakeoff = (
	engines_running: boolean,
	options: FlightOptions,
	vAcceleration: number,
	vVelocity: number,
	vDistance: number,
	back_thrust: number,
	front_thrust: number,
	logger: string,
	mode: string
) => {
	"worklet";
	if (engines_running) {
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
	}

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

		front_thrust = correction_thrust;
		back_thrust = correction_thrust;
		console.log("speed correct", correction_thrust);
	}

	// Hover
	else if (vDistance >= options.targetAltitude * 0.5 && vVelocity <= 0) {
		front_thrust = 9.81 / 2;
		back_thrust = 9.81 / 2;
	}

	// Free Fall
	else if (!engines_running) {
		front_thrust = 0;
		back_thrust = 0;
	}

	//  Max Thrust
	else {
		front_thrust = MAX_THRUST_PER_SIDE;
		back_thrust = MAX_THRUST_PER_SIDE;
	}

	return {
		engines_running,
		front_thrust,
		back_thrust,
		logger,
		mode,
		vAcceleration,
		vVelocity,
		vDistance,
	};
};
