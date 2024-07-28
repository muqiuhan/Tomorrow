import * as ReactNavigationNative from "@react-navigation/native";
import * as Nativewind from "nativewind";
import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { Image } from "expo-image";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated, * as ReactNativeReanimated from "react-native-reanimated";
import React from "react";

const SplashScreen = () => {
  const { colorScheme, toggleColorScheme } = Nativewind.useColorScheme();
  const {
    navigate: navigateWelcome,
  }: ReactNavigationNative.NavigationProp<SplashNavigationType> =
    ReactNavigationNative.useNavigation();

  React.useEffect(() => {
    setTimeout(() => {
      navigateWelcome("Welcome");
    }, 2000),
      [];
  });

  /* expo-image supports BlurHash and ThumbHash
   * -- compact representations of a placeholder for an image.
   * see: https://blurha.sh/ */
  const blurhash = "LGPZy6t7~qflxtWBRlt7?bRjs%xu";

  return (
    /* Ensure that the displayed content of the startup page is within
     * the visible range of the screen (if SafeAreaView is not used,
     * the content may be rendered in the status bar on some devices) */
    <View className="flex-1 justify-center items-center">
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
                source={require("../../../assets/images/splash.png")}
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
          <Text
            className="text-neutral-600 text-xl leading-[60px] pl-1"
            style={{ fontFamily: "MiSans" }}
          >
            TOMO
          </Text>
          <Text
            className="text-[#4984dc] text-xl leading-[60px] pl-1"
            style={{ fontFamily: "MiSans" }}
          >
            RROW
          </Text>
        </Animated.View>
      </View>
    </View>
  );
};

export default SplashScreen;
