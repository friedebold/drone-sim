import React from "react";
import Animated, {
  useDerivedValue,
  useSharedValue
} from "react-native-reanimated";
import { ReText } from "react-native-redash";

interface Props {
  index: number;
  magnitude: Animated.SharedValue<number>;
}

const AltitudeLabel: React.FC<Props> = ({ index, magnitude }) => {
  const animatedText = useSharedValue("20");

  useDerivedValue(() => {
    if (magnitude.value == 100 && index % 5 !== 0) animatedText.value = "";
    else if (magnitude.value === 20)
      animatedText.value = (index * magnitude.value).toString();
    else animatedText.value = ((index / 5) * magnitude.value).toString();
  }, [index]);

  /* const precision = (index: number) => {
    "worklet";
    let result = 20;

    if (magnitude.value == 1) result = 20 * index;
    else result = 100 * index;
    console.log(magnitude.value);

    const resultString = useSharedValue<string>(result.value.toString());
    return resultString;
  };
 */
  /*   const precision = useDerivedValue(() => {
        return magnitude.value == 1 ? 20 : 100;
      }, []); */
  return <ReText text={animatedText} />;
};

export default AltitudeLabel;
