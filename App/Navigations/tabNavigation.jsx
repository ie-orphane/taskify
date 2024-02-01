import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { ProfileScreen } from "../Screens/Profile/profileScreen";
import { BoardScreen } from "../Screens/Board/boardScreen";
import { COLORS } from "../../constants";
import { useContext } from "react";
import { HomeRouteContext } from "../Context/homeRouteContext";
import { HomeNavigation } from "./homeNavigation";

const tab = createBottomTabNavigator();

export const TabNavigation = () => {
  const [homeRoute, _] = useContext(HomeRouteContext);

  return (
    <tab.Navigator screenOptions={{ headerShown: false }}>
      <tab.Screen
        name="Home"
        initialParams={"screen"}
        component={HomeNavigation}
        options={{
          tabBarStyle: homeRoute != "Dashboard" ? { display: "none" } : {},
          tabBarIcon: ({ focused }) => (
            <Entypo name="home" size={24} color={focused ? COLORS.primary : COLORS.gray} />
          ),
        }}
      />
      <tab.Screen
        name="Board"
        component={BoardScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name="clipboard-list"
              size={24}
              color={focused ? COLORS.primary : COLORS.gray}
            />
          ),
        }}
      />
      <tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <FontAwesome name="user" size={24} color={focused ? COLORS.primary : COLORS.gray} />
          ),
        }}
      />
    </tab.Navigator>
  );
};
