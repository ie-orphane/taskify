import { createStackNavigator } from "@react-navigation/stack";
import { ProfileScreen } from "../Screens";
import { HomeNavigation } from "./home-navigation";
import { Modal, Pressable, View } from "react-native";
import { SHADOWS } from "../../constants";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import icons from "../../assets/icons";

const Stack = createStackNavigator();

export const TabNavigation = () => {
  const tabs = [
    {
      title: "Home",
      Icon: icons.Home,
      component: HomeNavigation,
    },
    { title: "Create" },
    {
      title: "Profile",
      Icon: icons.Profile,
      component: ProfileScreen,
    },
  ];

  const [route, setRoute] = useState("Home");
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);

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

      <View className="flex-row justify-around items-center pt-1 pb-3 bg-lightGray">
        {tabs.map((tab, index) =>
          tab.title === "Create" ? (
            <View
              key={index}
              style={{ flex: 1 / 1.5 }}
              className="items-center flex-1 h-12 justify-center"
            >
              <Pressable
                style={SHADOWS.medium}
                onPress={() => {}}
                className="bg-primary/100 w-11 h-11 mb-3 items-center justify-center rounded-full"
              >
                <icons.Plus />
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
                  style={{ transform: [{ translateY: 6 }] }}
                  className="absolute -bottom-1/4 w-[12] h-[12] bg-primary rounded-full"
                ></View>
              )}
            </Pressable>
          )
        )}
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible}></Modal>
    </>
  );
};
