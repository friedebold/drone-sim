import { DimensionData, PitchProps } from "../Flight/FlightWrapper";
import { adjust_for_horizontal, round } from "./common";

export const reverse_cruise = (
	thrust: { front: number; back: number },
	vertical: DimensionData,
	horizontal: DimensionData,
	pitch: PitchProps,
	mode: string,
	logger: string
) => {
	logger = horizontal.velocity + "";

	//tilt_to_land();

	if (horizontal.velocity <= 0) {
		mode = "tilt_to_land";
	}

	const correction_thrust = round((-vertical.velocity / 2) * 100 + 9.81 / 2);

	thrust.front = adjust_for_horizontal(correction_thrust, pitch.angle);
	thrust.back = adjust_for_horizontal(correction_thrust, pitch.angle);

	return { thrust, vertical, horizontal, pitch, mode, logger };
};
