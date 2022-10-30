import { useSharedValue } from "react-native-reanimated";

export const useGravity = () => {
	const gravity = useSharedValue(9.81); // J (Energy)
	return gravity;
};
