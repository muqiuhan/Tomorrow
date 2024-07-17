import * as ReactNavigationNative from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import * as Nativewind from "nativewind";
import React from "react";
import { Text, View } from "react-native";
import Animated, * as ReactNativeReanimated from "react-native-reanimated";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";

const SplashScreen = () => {
  const { colorScheme, toggleColorScheme } = Nativewind.useColorScheme();
  const {
    navigate,
  }: ReactNavigationNative.NavigationProp<SplashNavigationType> =
    ReactNavigationNative.useNavigation();

  /* expo-image supports BlurHash and ThumbHash - compact representations of a placeholder for an image.
   * see: https://blurha.sh/ */
  const blurhash = "LB3|F$uhUbaKuhkVVYaeUcVYQ8aK";

  React.useEffect(() => {
    setTimeout(() => {
      navigate("Welcome");
    }, 2000),
      [];
  });

  return (
    /* Ensure that the displayed content of the startup page is within the visible range of the screen
     * (if SafeAreaView is not used, the content may be rendered in the status bar on some devices) */
    <SafeAreaView className="flex-1 justify-center items-center">
      <StatusBar style="auto" />
      <View className="w-full px-4 items-center">
        <Animated.View
          className="flex-row justify-center items-center"
          entering={ReactNativeReanimated.FadeInRight.duration(100).springify()}
        >
          <View className="pr-2">
            <View className="w-20 h-20 overflow-hidden">
              <Image
                className="w-full h-full flex-1"
                source={require("../../../assets/splash.png")}
                contentFit="cover"
                transition={1000}
                placeholder={blurhash}
              />
            </View>
          </View>
        </Animated.View>
        <Animated.View
          className="flex-row justify-center items-center"
          entering={ReactNativeReanimated.FadeInRight.duration(100)
            .delay(200)
            .springify()}
        >
          <Text className="text-neutral-600 text-xl leading-[60px] pl-1" style={{fontFamily: "MiSans"}}>
            TOMO
          </Text>
          <Text className="text-[#31aca3] text-xl leading-[60px] pl-1" style={{fontFamily: "MiSans"}}>
            RROW
          </Text>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default SplashScreen;
