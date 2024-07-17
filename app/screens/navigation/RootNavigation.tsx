import React from "react";
import * as ReactNavigationStack from "@react-navigation/stack";
import * as ReactNavigationNative from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import TabNavigation from "./tab";

const Stack = ReactNavigationStack.createStackNavigator();

const RootNavigation = () => {
  const [session, setSession] = React.useState(false);

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
        {session ? (
          <Stack.Screen name="TabNavigation" component={TabNavigation} />
        ) : (
          <Stack.Screen name="AuthNavigation" component={AuthNavigation} />
        )}
      </Stack.Navigator>
    </ReactNavigationNative.NavigationContainer>
  );
};

export default RootNavigation;
