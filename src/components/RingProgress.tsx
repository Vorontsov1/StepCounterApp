import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import Svg, { Circle, Rect } from "react-native-svg";
import Animated, {
    useAnimatedProps,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";


const AnimatedCircle = Animated.createAnimatedComponent(Circle);

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

    const fill = useSharedValue(0.5);

    useEffect(() => { 
        fill.value = withTiming(progress, {duration: 2000});
    },[progress])


    const animatedProps = useAnimatedProps(() => ({ 
        strokeDasharray: [circumference * fill.value, circumference],
    }))
    
    
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
              <AnimatedCircle
                  animatedProps={animatedProps}
          r={innerRadius}
          cx={radius}
          cy={radius}
          originX={radius}
          originY={radius}
          strokeWidth={strokeWidth}
          stroke={color}
          strokeLinecap="round"
          rotation="-90"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({});

export default RingProgress;
