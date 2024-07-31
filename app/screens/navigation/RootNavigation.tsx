import React from "react";
import * as ReactNavigationStack from "@react-navigation/stack";
import * as ReactNavigationNative from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import TabNavigation from "./tab";
import { useUserStore } from "@/store/useUserStore";

const Stack = ReactNavigationStack.createStackNavigator();

const RootNavigation = () => {
  const { session } = useUserStore();

  return (
    <ReactNavigationNative.NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...ReactNavigationStack.TransitionPresets.SlideFromRightIOS,
          ...ReactNavigationStack.TransitionPresets.ScaleFromCenterAndroid,
          animationEnabled: true,
          gestureEnabled: true,
          gestureDirection: "horizontal",
        }}
      >
        {session && session.user ? (
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        ) : (
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </ReactNavigationNative.NavigationContainer>
  );
};

export default RootNavigation;
