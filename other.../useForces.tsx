import {
    Easing,
    useDerivedValue,
    useSharedValue,
    withTiming
} from "react-native-reanimated";
import {
    aircraft_mass,
    earth_mass,
    earth_radius,
    gravitational_constant,
    maxForce
} from "../src/constants";

export const useForces = (mode: "altitude" | "thrust") => {
  const target_altitude = useSharedValue(0);
  const currentAltitude = useSharedValue(0);
  const altitude = useSharedValue(0);

  const prevClock = useSharedValue(0);
  const miliClock = useSharedValue(0);
  const secondClock = useSharedValue(0);

  const clock = useSharedValue(0);

  const gravity = useSharedValue({ amount: 0, percentage: 0 });

  const thrust = useSharedValue({ amount: 0, percentage: 0 });
  const total_vertical_force = useSharedValue(0);
  const acceleration = useSharedValue(0);
  const velocity = useSharedValue(0);
  const currentVelocity = useSharedValue(0);

  const getGravity = () => {
    "worklet";
    const gravityAmount =
      (gravitational_constant * earth_mass * aircraft_mass) /
      Math.pow(earth_radius + altitude.value, 2);

    gravity.value = {
      percentage: gravityAmount / maxForce,
      amount: gravityAmount,
    };
    return gravityAmount;
  };

  const getThrust = (gravity_val: number) => {
    "worklet";
    console.log(target_altitude.value / (maxForce / (gravity_val / 2)));

    if (
      velocity.value < 0 &&
      Math.abs(target_altitude.value - altitude.value) < 10
    ) {
      console.log(1);
      thrust.value = {
        percentage: gravity_val / maxForce,
        amount: gravity_val,
      };
    } else if (
      altitude.value >=
      target_altitude.value / (maxForce / (gravity.value.amount / 2))
      /*  altitude.value >=
      target_altitude.value / (maxForce / -(target_gravity.value / 2)) */
    ) {
      console.log(2);
      thrust.value = { percentage: 0, amount: 0 };
    } else {
      console.log(3);
      thrust.value = { percentage: 1, amount: maxForce };
    }
  };

  const getTotalForce = () => {
    "worklet";
    total_vertical_force.value = thrust.value.amount - gravity.value.amount;
  };

  const getAcceleration = () => {
    "worklet";
    if (altitude.value === 0 && total_vertical_force.value <= 0)
      acceleration.value = 0;
    else acceleration.value = total_vertical_force.value / aircraft_mass;
  };

  const getVelocity = () => {
    "worklet";
    const velo =
      currentVelocity.value +
      acceleration.value * (clock.value - prevClock.value);
    currentVelocity.value =
      acceleration.value === 0 && altitude.value === 0 ? 0 : velo;
    velocity.value =
      acceleration.value === 0 && altitude.value === 0 ? 0 : velo;
  };

  const getAltitude = () => {
    "worklet";
    const alt =
      currentAltitude.value + velocity.value * (clock.value - prevClock.value);
    altitude.value = alt > 0 ? alt : 0;
    currentAltitude.value = alt > 0 ? alt : 0;
  };

  const calculateForces = () => {
    "worklet";
    clock.value = secondClock.value + miliClock.value;
    if (mode === "thrust") {
      getGravity();
      getTotalForce();
      getAcceleration();
      getVelocity();
      getAltitude();
    } else if (mode === "altitude") {
      const gravity_val = getGravity();
      const thrust_val = getThrust(gravity_val);
      const totalForce_val = getTotalForce();
      const acceleration_val = getAcceleration();
      const velocity_val = getVelocity();
      const altitude_val = getAltitude();
    }
  };

  useDerivedValue(() => {
    prevClock.value = clock.value;

    miliClock.value = withTiming(
      1,
      { duration: 1000, easing: Easing.linear },
      (finished) => {
        if (finished === true) {
          miliClock.value = 0;
          secondClock.value = secondClock.value + 1;
        }
      }
    );
    calculateForces();
  }, []);

  return {
    clock,
    prevClock,
    total_vertical_force,
    acceleration,
    velocity,
    altitude,
    target_altitude,
    thrust,
    gravity,
  };
};
