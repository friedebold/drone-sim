import { Feather } from "@expo/vector-icons";
import { useState } from "react";
import { useWindowDimensions, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import styled from "styled-components/native";
import { colors, margin } from "../src/constants";
import Aircraft from "./Aircraft";
import AltitudeBar from "./AltitudeBar";
import AltitudeInput from "./AltitudeInput";
import DistanceBar from "./DistanceBar";
import Settings from "./Settings";
import Slider from "./Slider";
import { useForces } from "./useForces";

interface Props {}

const FlightPage: React.FC<Props> = ({}) => {
  const { width, height } = useWindowDimensions();

  const isByAltitude = true;

  const [settingsOn, setSettingsOn] = useState(false);

  const scale = useSharedValue(1);
  const magnitude = useSharedValue(1);
  const altitudeFactor = 4;

  const {
    clock,
    prevClock,
    total_vertical_force,
    acceleration,
    velocity,
    altitude,
    target_altitude,
    thrust,
    gravity,
  } = useForces("altitude");

  const Background = styled.View`
    height: ${height}px;
    width: ${width}px;
    background-color: white;
  `;

  const Floor = styled.View`
    height: ${height * 0.4}px;
    width: ${width}px;
    background-color: ${colors.grey};
    padding: ${margin / 2}px;
    top: ${height * 0.6}px;
  `;

  const Air = styled.View`
    height: ${height * 0.6}px;
    width: ${width}px;
    position: absolute;
    flex-direction: row;
    justify-content: start;
    top: 0;
  `;

  return (
    <Background>
      <Floor>
        <DistanceBar />
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
          }}
        >
          {!isByAltitude && <Slider {...{ thrust }} {...{ clock }} />}
        </View>
      </Floor>

      <Air>
        <AltitudeBar
          {...{ scale }}
          {...{ altitudeFactor }}
          {...{ magnitude }}
        />
        <View style={{ flex: 1 }} />
        <AltitudeInput {...{target_altitude}}/>

        {settingsOn && (
          <Settings
            {...{ clock }}
            {...{ prevClock }}
            {...{ total_vertical_force }}
            {...{ acceleration }}
            {...{ velocity }}
            {...{ altitude }}
          />
        )}
        <View style={{ height: 70 }}>
          <TouchableOpacity
            onPress={() => setSettingsOn((curr) => !curr)}
            style={{
              padding: margin / 2,
            }}
          >
            <Feather name="settings" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <Aircraft
          {...{ thrust }}
          {...{ gravity }}
          {...{ altitude }}
          {...{ scale }}
          {...{ altitudeFactor }}
          {...{ magnitude }}
        />
      </Air>
    </Background>
  );
};

export default FlightPage;
