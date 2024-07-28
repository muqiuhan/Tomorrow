import Breaker from "@/app/components/Breaker";
import Button from "@/app/components/Button";
import ButtonOutline from "@/app/components/ButtonOutline";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ReactNavigationNative from "@react-navigation/native";
import Animated, * as ReactNativeReanimated from "react-native-reanimated";

const WelcomeScreen = () => {
  const blurhash = "LGPZy6t7~qflxtWBRlt7?bRjs%xu";

  const {
    navigate: navigateAuth,
  }: ReactNavigationNative.NavigationProp<AuthNavigationType> =
    ReactNavigationNative.useNavigation();

  return (
    <View className="flex-1 justify-between items-center">
      <StatusBar style="auto" />
      <View className="w-full h-full px-4 items-center justify-center space-y-6">
        <View className="w-full px-4 items-center">
          <Animated.View
            className="flex-row justify-center items-center"
            entering={ReactNativeReanimated.FadeInRight.duration(
              100
            ).springify()}
          >
            <View className="w-20 h-20 overflow-hidden">
              <Image
                className="w-full h-full flex-1"
                source={require("../../../assets/images/logo.png")}
                contentFit="cover"
                transition={1000}
                placeholder={blurhash}
              />
            </View>
          </Animated.View>
        </View>

        <View className="justify-center items-center">
          <Animated.Text
            className="text-neutral-800 text-3xl font-medium leading-[60px]"
            style={{ fontFamily: "MiSans" }}
            entering={ReactNativeReanimated.FadeInDown.duration(100)
              .delay(100)
              .springify()}
          >
            Welcome
          </Animated.Text>
        </View>

        <View className="w-full justify-start">
          <Animated.View
            className="pb-6"
            entering={ReactNativeReanimated.FadeInDown.duration(100)
              .delay(300)
              .springify()}
          >
            <Button text="Login" action={() => navigateAuth("Login")} />
          </Animated.View>

          <Animated.View
            entering={ReactNativeReanimated.FadeInDown.duration(100)
              .delay(400)
              .springify()}
          >
            <ButtonOutline
              text="Sign up"
              action={() => navigateAuth("Register")}
            />
          </Animated.View>
        </View>

        <View>
          <Breaker text="OR" duration={100} delay={500} />
        </View>

        <View className="w-full justify-normal">
          <Animated.View
            className="border border-white pb-4"
            entering={ReactNativeReanimated.FadeInDown.duration(100)
              .delay(600)
              .springify()}
          >
            <ButtonOutline text="Continue with Google">
              <AntDesign name="google" size={20} color="grey" />
            </ButtonOutline>
          </Animated.View>

          <Animated.View
            entering={ReactNativeReanimated.FadeInDown.duration(100)
              .delay(700)
              .springify()}
          >
            <ButtonOutline text="Continue with Apple">
              <AntDesign name="apple1" size={20} color="grey" />
            </ButtonOutline>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default WelcomeScreen;
