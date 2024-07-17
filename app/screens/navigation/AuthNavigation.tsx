import * as ReactNavigationStack from "@react-navigation/stack";
import SplashScreen from "../auth/SplashScreen";
import WelcomeScreen from "../auth/WelcomeScreen";
import LoginScreen from "../auth/LoginScreen";
import RegisterScreen from "../auth/RegisterScreen";

const Stack = ReactNavigationStack.createStackNavigator();

const AuthNavigation = () => {
    return (
        /* Hide the secondary title bar because AuthNavigation is a child Stack */
        <Stack.Navigator screenOptions={{
            headerShown: false,
            ...ReactNavigationStack.TransitionPresets.SlideFromRightIOS,
            ...ReactNavigationStack.TransitionPresets.ScaleFromCenterAndroid,
            animationEnabled: true,
            gestureEnabled: true,
            gestureDirection: "horizontal"
        }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Welcome" component={WelcomeScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    )
}

export default AuthNavigation;