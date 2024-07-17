import { StatusBar } from "expo-status-bar";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const WelcomeScreen = () => {
    return (
        <SafeAreaView className="flex-1 justify-between items-center">
            <StatusBar style="auto" />
        </SafeAreaView>
    )
}

export default WelcomeScreen;