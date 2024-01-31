import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { HomeScreen } from "../Screens/Home/home";
import { ProfileScreen } from "../Screens/Profile/profile";
import { BoardScreen } from "../Screens/Board/board";
import { COLORS } from "../../constants";

const tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <tab.Navigator screenOptions={{ headerShown: false }}>
      <tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
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
}
