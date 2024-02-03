import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useAppContext } from "../Context";
import { HomeNavigation } from "./home-navigation";
import { ProfileScreen, BoardScreen } from "../Screens";

const tab = createBottomTabNavigator();

export const TabNavigation = () => {
  const { homeRoute } = useAppContext();

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
