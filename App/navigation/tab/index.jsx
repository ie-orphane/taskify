import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "../../Screens";
import { HomeNavigation } from "../home-navigation";
import { Pressable, View } from "react-native";
import { SHADOWS } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Home, Plus, Profile } from "../../../assets/icons";
import { CreateModal } from "./components/create-modal";
import { useAppContext } from "../../../context";

const Stack = createStackNavigator();

export const TabNavigation = () => {
  const tabs = [
    {
      title: "Home",
      Icon: Home,
      component: HomeNavigation,
    },
    { title: "Create" },
    {
      title: "Profile",
      Icon: Profile,
      component: ProfileScreen,
    },
  ];

  const { homeRoute, toggleHandler } = useAppContext();

  const navigation = useNavigation();
  const [route, setRoute] = useState("Home");

  return (
    <>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          transitionSpec: {
            open: { animation: "timing", config: { duration: 10 } },
            close: { animation: "timing", config: { duration: 10 } },
          },
          headerShown: false,
        }}
      >
        {tabs.map((tab, index) =>
          tab.title == "Create" ? null : (
            <Stack.Screen key={index} name={tab.title} component={tab.component} />
          )
        )}
      </Stack.Navigator>

      <CreateModal />

      {homeRoute == "Dashboard" && (
        <View className="flex-row items-center pt-1 pb-3 bg-lightGray">
          {tabs.map((tab, index) =>
            tab.title === "Create" ? (
              <View
                key={index}
                style={{ flex: 1 / 1.5 }}
                className="items-center flex-1 h-12 justify-center"
              >
                <Pressable
                  style={SHADOWS.medium}
                  onPress={toggleHandler}
                  className="bg-primary/100 w-11 h-11 mb-3 items-center justify-center rounded-full"
                >
                  <Plus />
                </Pressable>
              </View>
            ) : (
              <Pressable
                key={index}
                onPress={() => {
                  navigation.navigate(tab.title);
                  setRoute(tab.title);
                }}
                className="items-center flex-1 h-12 justify-center"
              >
                <tab.Icon active={route == tab.title} />
                {/* {route == tab.title && (
                <View className="mt-2 w-[6] h-[6] bg-primary rounded-full"></View>
              )} */}
                {route == tab.title && (
                  <View
                    style={{ transform: [{ translateY: 7 }] }}
                    className="absolute -bottom-1/4 w-[12] h-[12] bg-primary rounded-full"
                  ></View>
                )}
              </Pressable>
            )
          )}
        </View>
      )}
    </>
  );
};
