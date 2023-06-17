import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";

type RingProgressProps = {
  radius?: number;
    strokeWidth?: number;
    progress: number;
};

const color = "#ee0f55";

const RingProgress = ({
  radius = 100,
  strokeWidth = 35,
  progress,
}: RingProgressProps) => {
  const innerRadius = radius - strokeWidth / 2;
  const circumference = innerRadius * 2 * Math.PI;

  return (
    <View
      style={{
        width: radius * 2,
        height: radius * 2,
        alignSelf: "center",
      }}
    >
      <Svg>
        {/* background */}
        <Circle
          r={innerRadius}
          cx={radius}
          cy={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          opacity={0.2}
        />
        {/* foreground */}
        <Circle
          r={innerRadius}
          cx={radius}
          cy={radius}
          originX={radius}
          originY={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeDasharray={[circumference * progress, circumference]}
          strokeLinecap="round"
          rotation="-90"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RingProgress;
