import * as ReactNavigationStack from "@react-navigation/stack";
import HomeScreen from "../../tabs/home/HomeScreen";
import CoinDetailsScreen from "../../stacks/CoinDetailsScreen";

const Stack = ReactNavigationStack.createStackNavigator();

const HomeNavigation = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...ReactNavigationStack.TransitionPresets.ScaleFromCenterAndroid,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
      <Stack.Screen name="coindetails" component={CoinDetailsScreen} />
    </Stack.Navigator>
  );
};

export default HomeNavigation;
