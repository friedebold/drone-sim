import { FlightData, FlightOptions } from "../../App";
import { DimensionData, PitchProps } from "../Flight/FlightWrapper";
import { adjust_for_horizontal, round } from "./common";
import { runLanding } from "./landing";
import { reverse_cruise } from "./reverse_cruise";
import { spin } from "./spin";
import { runTakeoff } from "./takeoff";
import { runTiltToCruise } from "./tilt_to_cruise";
import { tilt_to_land } from "./tilt_to_land";

export const calculateFlight = (options: FlightOptions) => {
	const flightData: FlightData[] = [];

	let engines_running = false;
	let tilting = true;

	let mode = "takeoff";

	let thrust = {
		front: 0,
		back: 0,
	};

	let vertical: DimensionData = {
		acceleration: 0,
		velocity: 0,
		distance: 0,
	};

	let horizontal: DimensionData = {
		acceleration: 0,
		velocity: 0,
		distance: 0,
	};

	let pitch: PitchProps = {
		acceleration: 0,
		velocity: 0,
		distance: 0,
		angle: 0,
	};

	let defaultAltitude = 0;
	let defaultDistance = 0;

	let logger = "";

	for (let i = 0; i <= 2000; i++) {
		logger = "";
		//TAKEOFF
		if (mode == "takeoff") {
			const results = runTakeoff(
				options,
				vertical,
				thrust,
				logger,
				mode,
				defaultAltitude
			);
			vertical = results.vertical;
			thrust = results.thrust;
			logger = results.logger;
			mode = results.mode;
			defaultAltitude = results.defaultAltitude;
		}
		if (mode == "tilt_to_cruise") {
			const results = runTiltToCruise(
				options,
				tilting,
				pitch,
				vertical,
				mode,
				thrust,
				logger
			);
			tilting = results.tilting;
			vertical = results.vertical;
			pitch = results.pitch;
			mode = results.mode;
			thrust = results.thrust;
			logger = results.logger;
		}
		if (mode == "cruise") {
			const correction_thrust = round(
				(-vertical.velocity / 2) * 100 + 9.81 / 2
			);

			thrust.front = adjust_for_horizontal(
				correction_thrust,
				pitch.angle
			);
			thrust.back = adjust_for_horizontal(correction_thrust, pitch.angle);
			if (horizontal.distance >= 20) {
				mode = "spin";
			}
			// Reverse Thrust
		}
		if (mode == "spin") {
			const results = spin(tilting, mode, pitch, thrust, logger);
			logger = results.logger;
			tilting = results.tilting;
			pitch = results.pitch;
			mode = results.mode;
			thrust = results.thrust;
		}
		if (mode == "reverse_cruise") {
			const results = reverse_cruise(
				thrust,
				vertical,
				horizontal,
				pitch,
				mode,
				logger
			);
			thrust = results.thrust;
			vertical = results.vertical;
			horizontal = results.horizontal;
			pitch = results.pitch;
			mode = results.mode;
			logger = results.logger;
		}
		if (mode == "tilt_to_land") {
			const results = tilt_to_land(
				options,
				tilting,
				mode,
				pitch,
				logger,
				thrust,
				horizontal
			);
			tilting = results.tilting;
			mode = results.mode;
			pitch = results.pitch;
			thrust = results.thrust;
			logger = results.logger;
			horizontal = results.horizontal;
		}

		if (mode == "landing") {
			const results = runLanding(
				engines_running,
				vertical,
				thrust,
				pitch,
				logger
			);
			engines_running = results.engines_running;
			vertical = results.vertical;
			thrust = results.thrust;
			pitch = results.pitch;
			logger = results.logger;
		}

		// Pitch Angle
		pitch.acceleration = round(thrust.back - thrust.front);
		pitch.velocity = round(
			pitch.velocity + round(pitch.acceleration / 100)
		);
		pitch.distance = round(pitch.distance + round(pitch.velocity / 100));
		pitch.angle = round((pitch.distance * 180) / Math.PI);

		// Thrust Components
		const front_vertical = round(
			Math.cos((pitch.angle * Math.PI) / 180) * thrust.front
		);
		const front_horizontal = round(
			Math.sin((pitch.angle * Math.PI) / 180) * thrust.front
		);
		const back_vertical = round(
			Math.cos((pitch.angle * Math.PI) / 180) * thrust.back
		);
		const back_horizontal = round(
			Math.sin((pitch.angle * Math.PI) / 180) * thrust.back
		);

		// Vertical Movement
		if (options.disableHorizontal) {
			vertical.acceleration = round(thrust.front + thrust.back - 9.81);
		} else
			vertical.acceleration = round(
				front_vertical + back_vertical - 9.81
			);
		vertical.velocity = round(
			vertical.velocity + round(vertical.acceleration / 100)
		);
		vertical.distance = round(
			vertical.distance + round(vertical.velocity / 100)
		);

		// Horizontal Movement
		if (!options.disableHorizontal) {
			horizontal.acceleration = round(front_horizontal + back_horizontal);
			console.log(horizontal.acceleration);
			horizontal.velocity = round(
				horizontal.velocity + round(horizontal.acceleration / 100)
			);
			horizontal.distance = round(
				horizontal.distance + round(horizontal.velocity / 100)
			);
		}

		const flightMoment: FlightData = {
			mode: mode,
			frontThrustComponents: {
				total: thrust.front,
				vertical: front_vertical,
				horizontal: front_horizontal,
			},
			backThrustComponents: {
				total: thrust.back,
				vertical: back_vertical,
				horizontal: back_horizontal,
			},
			vertical: {
				acceleration: vertical.acceleration,
				velocity: vertical.velocity,
				distance: vertical.distance,
			},
			horizontal: {
				acceleration: horizontal.acceleration,
				velocity: horizontal.velocity,
				distance: horizontal.distance,
			},
			pitch: {
				acceleration: pitch.acceleration,
				velocity: pitch.velocity,
				distance: pitch.distance,
				angle: pitch.angle,
			},
			prediction: {
				altitude: defaultAltitude,
				distance: defaultDistance,
			},
			logger: logger,
		};

		flightData.push(flightMoment);
	}

	return flightData;
};
