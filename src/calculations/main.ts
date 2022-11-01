import { FlightData, FlightOptions } from "../../App";
import { round } from "./common";
import { runTakeoff } from "./takeoff";
import { runTiltToCruise } from "./tilt_to_cruise";

export const calculateFlight = (options: FlightOptions) => {
	const flightData: FlightData[] = [];

	let engines_running = true;
	let tilting = true;

	let mode = "takeoff";
	let vAcceleration = 0;
	let vVelocity = 0;
	let vDistance = 0;
	let hAcceleration = 0;
	let hVelocity = 0;
	let hDistance = 0;
	let front_thrust = 0;
	let back_thrust = 0;

	let pitchAcceleration = 0;
	let pitchVelocity = 0;
	let pitchDistance = 0;
	let pitch_angle = 0;

	let logger = "";

	for (let i = 0; i <= 2000; i++) {
		//TAKEOFF
		if (mode == "takeoff") {
			const results = runTakeoff(
				engines_running,
				options,
				vAcceleration,
				vVelocity,
				vDistance,
				back_thrust,
				front_thrust,
				logger,
				mode
			);
			engines_running = results.engines_running;
			vAcceleration = results.vAcceleration;
			vVelocity = results.vVelocity;
			vDistance = results.vDistance;
			back_thrust = results.back_thrust;
			front_thrust = results.front_thrust;
			logger = results.logger;
			mode = results.mode;
		}

		//CRUISE4
		if (mode == "tilt_to_cruise") {
			const results = runTiltToCruise(
				options,
				tilting,
				vAcceleration,
				vVelocity,
				pitch_angle,
				pitchVelocity,
				pitchAcceleration,
				mode,
				front_thrust,
				back_thrust,
				logger
			);

			logger = results.logger;
			tilting = results.tilting;
			mode = results.mode;
			back_thrust = results.back_thrust;
			front_thrust = results.front_thrust;
		}
		if (mode == "cruise") {
			// Reverse Thrust
		}
		/* 	if (mode == "tilt_to_land") {
				//TILT CUTTOFF
				if (tilting) {
					if (pitch_angle <= target_pitch_angle / 2) {
						tilting = false;
					}
				}
				// Idle
				if (
					pitch_angle < target_pitch_angle / 2 &&
					radialVelocity >= 0
				) {
					front_thrust = round(9.81 / 2);
					back_thrust = round(9.81 / 2);
					//	mode = "cruise";
				}

				// Thrust
				else if (tilting) {
					front_thrust = round(9.81 / 2 + 1);
					back_thrust = round(9.81 / 2 - 1);
				}

				// Reverse Thrust
				else {
					front_thrust = round(9.81 / 2 - 1);
					back_thrust = round(9.81 / 2 + 1);
				}
				logger = tilting + "";
			} */

		/*
			//LANDING
			if (mode[i] == "landing") {
				// Calculate Engine Cutoff
				mode_state = "landing";
				if (!engines_start) {
					const potAcceleration = MAX_THRUST;
					let potVelocity = hVelocity[i];
					let potAltitude = vAltitude[i];
					for (let j = 0; j <= 2000; j++) {
						potVelocity = potVelocity + potAcceleration / 100;
						potAltitude = potAltitude + potVelocity / 100;
						if (potAltitude <= 0) {
							engines_start = true;
							break;
						}
					}
				}
				// Speed Correction
				if (hVelocity[i] < 0 && acceleration == 0) {
					console.log("speed correct", hVelocity[i]);
					acceleration =
						Math.min(-hVelocity[i] * 100, MAX_THRUST) + 9.81;
				}
				// Hover
				else if (
					vAltitude[i] <= targetAltitude * 0.5 &&
					hVelocity[i] >= 0
				) {
					acceleration = 0;
				}
				// Free Fall
				else if (!engines_start) {
					acceleration = -9.81;
				}
				// Max Thrust
				else acceleration = MAX_THRUST - 9.81;
			}

			*/

		// Pitch Angle
		pitchAcceleration = round(back_thrust - front_thrust);
		pitchVelocity = round(pitchVelocity + round(pitchAcceleration / 100));
		pitchDistance = round(pitchDistance + round(pitchVelocity / 100));
		pitch_angle = round((pitchDistance * 180) / Math.PI);

		// Thrust Components
		const front_vertical = round(
			Math.cos((pitch_angle * Math.PI) / 180) * front_thrust
		);
		const front_horizontal = round(
			Math.sin((pitch_angle * Math.PI) / 180) * front_thrust
		);
		const back_vertical = round(
			Math.cos((pitch_angle * Math.PI) / 180) * back_thrust
		);
		const back_horizontal = round(
			Math.sin((pitch_angle * Math.PI) / 180) * back_thrust
		);

		// Vertical Movement
		if (options.disableHorizontal) {
			vAcceleration = round(front_thrust + back_thrust - 9.81);
		} else vAcceleration = round(front_vertical + back_vertical - 9.81);
		vVelocity = round(vVelocity + round(vAcceleration / 100));
		vDistance = round(vDistance + round(vVelocity / 100));

		// Horizontal Movement
		if (!options.disableHorizontal) {
			hAcceleration = round(front_horizontal + back_horizontal);
			console.log(hAcceleration);
			hVelocity = round(hVelocity + round(hAcceleration / 100));
			hDistance = round(hDistance + round(hVelocity / 100));
		}

		const flightMoment: FlightData = {
			mode: mode,
			frontThrustComponents: {
				total: front_thrust,
				vertical: front_vertical,
				horizontal: front_horizontal,
			},
			backThrustComponents: {
				total: back_thrust,
				vertical: back_vertical,
				horizontal: back_horizontal,
			},
			vertical: {
				acceleration: vAcceleration,
				velocity: vVelocity,
				distance: vDistance,
			},
			horizontal: {
				acceleration: hAcceleration,
				velocity: hVelocity,
				distance: hDistance,
			},
			pitch: {
				acceleration: pitchAcceleration,
				velocity: pitchVelocity,
				distance: pitchDistance,
				degree: pitch_angle,
				rad: round((pitch_angle * Math.PI) / 180),
			},
			logger: logger,
		};

		flightData.push(flightMoment);
	}

	return flightData;
};
