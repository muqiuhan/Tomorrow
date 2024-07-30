import * as ExpoFont from "expo-font";
import * as ExpoSplashScreen from "expo-splash-screen";
import * as ExpoVectorIcons from "@expo/vector-icons";
import React from "react";

const useCachedResources = () => {
  const [isLoadingComplete, setIsLoadingComplete] = React.useState(false);

  React.useEffect(() => {
    const loadResourcesAndDataAsync = async () => {
      try {
        ExpoSplashScreen.preventAutoHideAsync();
        await ExpoFont.loadAsync({
          FrankMono: require("../assets/fonts/FrankMono.ttf"),
          MiSans: require("../assets/fonts/MiSans_Semibold.ttf"),
          ...ExpoVectorIcons.FontAwesome.font,
        });
      } catch (exn) {
        alert(exn);
      } finally {
        setIsLoadingComplete(true);
        ExpoSplashScreen.hideAsync();
      }
    };

    loadResourcesAndDataAsync();
  }, []);

  return isLoadingComplete;
};

export default useCachedResources;
