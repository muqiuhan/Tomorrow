import React from "react";
import { Text, View } from "react-native";
import Animated, * as ReactNativeReanimated from "react-native-reanimated";

interface BreakProps {
  text: string;
  duration: number;
  delay: number;
}

const Breaker: React.FC<BreakProps> = ({ text, duration, delay }) => {
  return (
    <Animated.View
      className="flex-row w-full"
      entering={ReactNativeReanimated.FadeInRight.duration(duration)
        .delay(delay)
        .springify()}
    >
      <View className="h-10 w-[40%] justify-center items-center">
        <View className="border-t-2 border-grey-400 w-full"></View>
      </View>

      <View className="w-[20%] justify-center items-center">
        <Text className="text-base text-neutral-500">{text}</Text>
      </View>

      <View className="h-10 w-[40%] justify-center items-center">
        <View className="border-t-2 border-grey-400 w-full"></View>
      </View>
    </Animated.View>
  );
};

export default Breaker;
