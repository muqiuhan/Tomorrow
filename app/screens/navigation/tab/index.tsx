import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import * as ReactNavigationBottomTabs from "@react-navigation/bottom-tabs";
import * as ReactNavigationStack from "@react-navigation/stack";
import HomeNavigation from "./HomeNavigation";
import MarketNavigation from "./MarketNavigation";
import NewsDetailsScreen from "../../stacks/NewsDetailsScreen";
import SearchNavigation from "./SearchNavigation";
import ProfileNavigation from "./ProfileNavigation";

const Tab = ReactNavigationBottomTabs.createBottomTabNavigator();

const TabNavigation = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          const iconName = () => {
            if (route.name === "home") {
              return "home";
            } else if (route.name === "market") {
              return "stats-chart-outline";
            } else if (route.name === "search") {
              return "search-outline";
            } else if (route.name === "news") {
              return "newspaper-outline";
            } else if (route.name === "profile") {
              return "person-outline";
            }
          };

          return (
            <Ionicons
              name={iconName()}
              size={25}
              color={focused ? "#4984dc" : "gray"}
            />
          );
        },
        tabBarActiveTintColor: "#4984dc",
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "MiSans",
          fontWeight: "bold",
        },
        ...ReactNavigationStack.TransitionPresets.ScaleFromCenterAndroid,
        animationEnabled: true,
        gestureEnabled: true,
        gestureDirection: "horizontal",
      })}
    >
      <Tab.Screen name="home" component={HomeNavigation} />
      <Tab.Screen name="market" component={MarketNavigation} />
      <Tab.Screen name="search" component={SearchNavigation} />
      <Tab.Screen name="news" component={NewsDetailsScreen} />
      <Tab.Screen name="profile" component={ProfileNavigation} />
    </Tab.Navigator>
  );
};

export default TabNavigation;
