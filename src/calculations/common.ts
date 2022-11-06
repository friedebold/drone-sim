export const round = (num: number, digits: number = 4) => {
	"worklet";
	if (digits == 4) {
		return Math.round(num * 10000) / 10000;
	} else return Math.round(num * 100) / 100;
};

export const adjust_for_horizontal = (
	thrust_total: number,
	pitch_angle: number
) => {
	"worklet";
	return round(thrust_total / Math.cos((pitch_angle * Math.PI) / 180));
};
