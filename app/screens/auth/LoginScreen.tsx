import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Pressable,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import Animated, * as ReactNativeReanimated from "react-native-reanimated";
import * as ReactNavigationNative from "@react-navigation/native";
import Button from "@/app/components/Button";
import Breaker from "@/app/components/Breaker";
import ButtonOutline from "@/app/components/ButtonOutline";

const { width, height } = Dimensions.get("window");

const LoginScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailBorderColor, setEmailBorderColor] =
    React.useState("border-gray-400");
  const [passwordBorderColor, setPasswordBorderColor] =
    React.useState("border-gray-400");
  const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const {
    navigate: navigateAuth,
  }: ReactNavigationNative.NavigationProp<AuthNavigationType> =
    ReactNavigationNative.useNavigation();

  return (
    <View className="flex-1">
      {isLoading && (
        <View className="absolute z-50 h-full w-full justify-center items-center">
          <View className="h-full w-full justify-center items-center bg-black opacity-[0.45]">
            <View className="absolute">
              <ActivityIndicator size="large" color="white" />
            </View>
          </View>
        </View>
      )}

      <View className="justify-center items-center relative flex-1">
        <View
          className="justify-center w-full px-4 space-y-4"
          style={{
            height: height * 0.75,
          }}
        >
          <Animated.View
            className="justify-center items-center"
            entering={ReactNativeReanimated.FadeInDown.duration(
              100
            ).springify()}
          >
            <Text
              className="text-neutral-800 text-2xl leading-[60px]"
              style={{
                fontFamily: "MiSans",
              }}
            >
              欢迎回来
            </Text>

            <Text
              className="text-neutral-500 text-sm font-medium"
              style={{
                fontFamily: "MiSans",
              }}
            >
              请输入你的登陆信息
            </Text>
          </Animated.View>

          <Animated.View
            className="py-8 space-y-8"
            entering={ReactNativeReanimated.FadeInDown.duration(100)
              .delay(200)
              .springify()}
          >
            <View className={`border-2 ${emailBorderColor} rounded-lg`}>
              <TextInput
                className="p-3"
                style={{
                    fontFamily: "FrankMono"
                }}
                onChangeText={(text) => {
                  setEmail(text);
                  setEmailBorderColor("border-blue-400");
                }}
                value={email}
                placeholder="邮箱"
                autoCapitalize="none"
              />
            </View>

            <View
              className={`border-2 ${passwordBorderColor} rounded-lg flex-row justify-between`}
            >
              <TextInput
                className="p-3"
                style={{
                    fontFamily: "FrankMono"
                }}
                onChangeText={(text) => {
                  setPassword(text);
                  setPasswordBorderColor("border-blue-400");
                }}
                value={password}
                secureTextEntry={!passwordIsVisible}
                placeholder="密码"
                autoCapitalize="none"
              />

              <View className="pr-2 justify-center">
                <Pressable
                  onPress={() => setPasswordIsVisible(!passwordIsVisible)}
                >
                  <AntDesign
                    name={passwordIsVisible ? "eyeo" : "eye"}
                    size={20}
                    color="black"
                  />
                </Pressable>
              </View>
            </View>
          </Animated.View>

          <Animated.View
            className="pb-6"
            entering={ReactNativeReanimated.FadeInDown.duration(100)
              .delay(300)
              .springify()}
          >
            <Button
              text="登陆"
              action={() => {
                if (email === "") setEmailBorderColor("border-red-500");
                if (password === "") setPasswordBorderColor("border-red-500");
              }}
            />
          </Animated.View>

          <View>
            <Breaker text="OR" duration={100} delay={500} />
          </View>

          <Animated.View
            className="border border-white pb-4"
            entering={ReactNativeReanimated.FadeInDown.duration(100)
              .delay(300)
              .springify()}
          >
            <ButtonOutline
              text="使用你的 Google 账号"
              bg="bg-black"
              fg="text-white"
            >
              <AntDesign name="google" size={20} color="white" />
            </ButtonOutline>
          </Animated.View>

          <Animated.View
            className="flex-row justify-center items-center"
            entering={ReactNativeReanimated.FadeInDown.duration(100)
              .delay(400)
              .springify()}
          >
            <Text
              className="text-neutral-500 text-sm font-medium leading-[30px] text-center"
              style={{
                fontFamily: "MiSans",
              }}
            >
              没有账号？
            </Text>

            <Pressable onPress={() => navigateAuth("Register")}>
              <Text
                className="text-neutral-800 text-sm font-medium leading-[30px] text-center"
                style={{
                  fontFamily: "MiSans",
                }}
              >
                注册
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default LoginScreen;
