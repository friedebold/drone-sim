export const round = (num: number, digits: number = 4) => {
	"worklet";
	if (digits == 4) {
		return Math.round(num * 10000) / 10000;
	} else return Math.round(num * 100) / 100;
};
