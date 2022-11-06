import { FlightData, FlightOptions } from "../../App";
import { round } from "./common";
import { runLanding } from "./landing";
import { runTakeoff } from "./takeoff";
import { runTiltToCruise } from "./tilt_to_cruise";
import { runTiltToLand_1 } from "./tilt_to_land_1";
import { runTiltToLand_2 } from "./tilt_to_land_2";

export const calculateFlight = (options: FlightOptions) => {
	const flightData: FlightData[] = [];

	let engines_running = false;
	let tilting = true;

	let mode = "takeoff";

	let potMaxDistance = 0;
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
		logger = "";
		//TAKEOFF
		if (mode == "takeoff") {
			const results = runTakeoff(
				options,
				vAcceleration,
				vVelocity,
				vDistance,
				back_thrust,
				front_thrust,
				logger,
				mode,
				potMaxDistance
			);
			vAcceleration = results.vAcceleration;
			vVelocity = results.vVelocity;
			vDistance = results.vDistance;
			back_thrust = results.back_thrust;

			front_thrust = results.front_thrust;
			logger = results.logger;
			mode = results.mode;
			potMaxDistance = results.vMaxDistance;
		}

		//CRUISE4
		if (mode == "tilt_to_cruise") {
			const results = runTiltToCruise(
				options,
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
				logger
			);
			tilting = results.tilting;
			vAcceleration = results.vAcceleration;
			vVelocity = results.vVelocity;
			pitch_angle = results.pitch_angle;
			pitchAcceleration = results.pitchAcceleration;
			pitchVelocity = results.pitchVelocity;
			pitchDistance = results.pitchDistance;
			mode = results.mode;
			front_thrust = results.front_thrust;
			back_thrust = results.back_thrust;
			logger = results.logger;
		}
		if (mode == "cruise") {
			if (hDistance >= 30) {
				mode = "tilt_to_land_1";
			}
			// Reverse Thrust
		}
		if (mode == "tilt_to_land_1") {
			const results = runTiltToLand_1(
				options,
				tilting,
				mode,
				pitch_angle,
				pitchAcceleration,
				pitchVelocity,
				pitchDistance,
				front_thrust,
				back_thrust,
				logger
			);
			logger = results.logger;
			tilting = results.tilting;
			pitchVelocity = results.pitchVelocity;
			pitchAcceleration = results.pitchAcceleration;
			pitchDistance = results.pitchDistance;
			mode = results.mode;
			back_thrust = results.back_thrust;
			front_thrust = results.front_thrust;
		}
		if (mode == "tilt_to_land_2") {
			const results = runTiltToLand_2(
				options,
				tilting,
				mode,
				pitch_angle,
				pitchAcceleration,
				pitchVelocity,
				pitchDistance,
				front_thrust,
				back_thrust,
				logger,
				hVelocity
			);
			tilting = results.tilting;
			mode = results.mode;
			pitch_angle = results.pitch_angle;
			pitchAcceleration = results.pitchAcceleration;
			pitchVelocity = results.pitchVelocity;
			pitchDistance = results.pitchDistance;
			back_thrust = results.back_thrust;
			front_thrust = results.front_thrust;
			logger = results.logger;
			hVelocity = results.hVelocity;
		}

		if (mode == "landing") {
			const results = runLanding(
				engines_running,
				vAcceleration,
				vVelocity,
				vDistance,
				front_thrust,
				back_thrust,
				pitch_angle,
				logger
			);
			engines_running = results.engines_running;
			vAcceleration = results.vAcceleration;
			vVelocity = results.vVelocity;
			vDistance = results.vDistance;
			front_thrust = results.front_thrust;
			back_thrust = results.back_thrust;
			pitch_angle = results.pitch_angle;
			logger = results.logger;
		}

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
				potMaxDistance: potMaxDistance,
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
