import {
  View,
  Text,
  ActivityIndicator,
  Dimensions,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import Animated, * as ReactNativeReanimated from "react-native-reanimated";
import * as ReactNavigationNative from "@react-navigation/native";
import Button from "@/app/components/Button";
import Breaker from "@/app/components/Breaker";
import ButtonOutline from "@/app/components/ButtonOutline";
import { supabase } from "@/lib/supabase";

const { width, height } = Dimensions.get("window");

const RegisterScreen = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [emailBorderColor, setEmailBorderColor] =
    React.useState("border-gray-400");
  const [passwordBorderColor, setPasswordBorderColor] =
    React.useState("border-gray-400");
  const [passwordIsVisible, setPasswordIsVisible] = React.useState(false);

  const [isLoading, setIsLoading] = React.useState(false);

  const signUpWithEmail = async () => {
    setIsLoading(true);

    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (!session) Alert.alert("注册成功！请检查你的邮箱中用于验证的邮件");
    if (error) setIsLoading(false);
    else setIsLoading(false);
  };

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
              注册 Tomorrow 账号
            </Text>

            <Text
              className="text-neutral-500 text-sm font-medium"
              style={{
                fontFamily: "MiSans",
              }}
            >
              请输入你的注册信息
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
                  fontFamily: "FrankMono",
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
                  fontFamily: "FrankMono",
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
              text="注册"
              action={() => {
                if (email === "") setEmailBorderColor("border-red-500");
                if (password === "") setPasswordBorderColor("border-red-500");
                signUpWithEmail();
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
              已经有账号？
            </Text>

            <Pressable onPress={() => navigateAuth("Login")}>
              <Text
                className="text-neutral-800 text-sm font-medium leading-[30px] text-center"
                style={{
                  fontFamily: "MiSans",
                }}
              >
                登陆
              </Text>
            </Pressable>
          </Animated.View>
        </View>
      </View>
    </View>
  );
};

export default RegisterScreen;
