import React from "react";
import { Button, Text, View } from "react-native";
import { FlightData, FlightOptions } from "../App";
import { margin } from "../constants";
import { round, runTakeoff } from "./flightCalculations";
import FlightOptionInputs from "./FlightOptionInputs";

interface Props {
	flightOptions: FlightOptions;
	setFlightOptions: React.Dispatch<React.SetStateAction<FlightOptions>>;
	setFlightData: React.Dispatch<React.SetStateAction<FlightData[]>>;
	plannerMode: boolean;
	setPlannerMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Planner: React.FC<Props> = ({
	flightOptions,
	setFlightOptions,
	setFlightData,
	setPlannerMode,
}) => {
	const target_pitch_angle = 45;
	const calculateAltitudeData = () => {
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

		let radialAcceleration = 0;
		let radialVelocity = 0;
		let radialDistance = 0;
		let pitch_angle = 0;

		let logger = "";

		for (let i = 0; i <= 2000; i++) {
			//TAKEOFF
			if (mode == "takeoff") {
				const results = runTakeoff(
					engines_running,
					flightOptions,
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

			//CRUISE
			if (mode == "tilt_to_cruise") {
				//TILT CUTTOFF
				if (tilting) {
					if (pitch_angle >= target_pitch_angle / 2) {
						logger = "2";
						tilting = false;
					}
				}
				// Idle
				if (
					pitch_angle > target_pitch_angle * 0.5 &&
					radialVelocity <= 0
				) {
					mode = "cruise";
				}

				// Thrust
				else if (tilting) {
					front_thrust = round(9.81 / 2 - 1);
					back_thrust = round(9.81 / 2 + 1);
					logger = "1";
				}

				// Reverse Thrust
				else {
					front_thrust = round(9.81 / 2 + 1);
					back_thrust = round(9.81 / 2 - 1);
					logger = "3";
				}
			}

			if (mode == "cruise") {
				// Reverse Thrust
				if (hDistance >= 20) {
					mode = "tilt_to_land";
					tilting = true;
				}
				// Idle
				else {
					front_thrust = round(9.81 / 2);
					back_thrust = round(9.81 / 2);
				}
			}
			if (mode == "tilt_to_land") {
				//TILT CUTTOFF
				if (tilting) {
					if (pitch_angle <= target_pitch_angle / 2) {
						tilting = false;
					}
				}
				// Idle
				if (
					pitch_angle < target_pitch_angle / 2 &&
					radialVelocity <= 0
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
			}

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
			radialAcceleration = round(back_thrust - front_thrust);
			radialVelocity = round(
				radialVelocity + round(radialAcceleration / 100)
			);
			radialDistance = round(
				radialDistance + round(radialVelocity / 100)
			);
			pitch_angle = round((radialDistance * 180) / Math.PI);

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
			vAcceleration = round(front_vertical + back_vertical - 9.81);
			vVelocity = round(vVelocity + round(vAcceleration / 100));
			vDistance = round(vDistance + round(vVelocity / 100));

			// Horizontal Movement
			hAcceleration = round(front_horizontal + back_horizontal);
			console.log(hAcceleration);
			hVelocity = round(hVelocity + round(hAcceleration / 100));
			hDistance = round(hDistance + round(hVelocity / 100));

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
				pitchAngle: pitch_angle,
				logger: logger,
			};

			flightData.push(flightMoment);
		}

		return flightData;
	};

	const initiateFlight = () => {
		const flightData = calculateAltitudeData();
		setFlightData(flightData);
		setPlannerMode(false);
	};

	return (
		<View style={{ margin: margin }}>
			<Text>Flight Planner</Text>
			<View style={{ height: margin / 2 }} />
			<FlightOptionInputs
				{...{ flightOptions }}
				{...{ setFlightOptions }}
			/>
			<View style={{ height: margin / 2 }} />
			<Button
				title="Go"
				onPress={() => {
					initiateFlight();
				}}
			/>
		</View>
	);
};

export default Planner;
