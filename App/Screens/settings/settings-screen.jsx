import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useAppContext } from "../../../context";
import { Arrow, Switch } from "../../../assets/icons";
import { useNavigation } from "@react-navigation/native";

export const SettingsScreen = ({ route }) => {
  const { setHomeRoute } = useAppContext();
  const [notification, setNotification] = useState(false);
  const [darkMood, setDarkMood] = useState(false);
  const navigation = useNavigation()

  useEffect(() => {
    setHomeRoute(route.name);
    return () => setHomeRoute("Dashboard");
  }, []);

  return (
    <View className="rounded-lg px-7 pb-8 pt-16">
      <View className="flex-row items-center mb-12">
        <Pressable
          onPress={() => navigation.navigate("Dashboard")}
          className="w-11 h-11 rounded-full border border-dark/5 items-center justify-center"
        >
          <Arrow color="dark" size={22} stroke={1.75} />
        </Pressable>
        <Text className="font-medium text-dark mx-auto text-2xl">Settings</Text>
      </View>

      <Pressable
        onPress={() => {
          setNotification((prev) => !prev);
        }}
        className="border border-primary/[12.5%] rounded-xl flex-row justify-between px-5 py-4 items-center mb-4"
      >
        <Text className="text-dark text-xl font-medium">Push Notification</Text>
        <Switch active={notification} />
      </Pressable>

      <Pressable
        onPress={() => {
          setDarkMood((prev) => !prev);
        }}
        className="border border-primary/[12.5%] rounded-xl flex-row justify-between px-5 py-4 items-center mb-4"
      >
        <Text className="text-dark text-xl font-medium">Dark Mood</Text>
        <Switch active={darkMood} />
      </Pressable>

      <Pressable
        onPress={() => {}}
        className="border border-primary/[12.5%] rounded-xl flex-row justify-between px-5 py-4 items-center mb-4"
      >
        <Text className="text-dark text-xl font-medium">Help</Text>
        <Arrow color="dark" rotate={180} />
      </Pressable>

      <Pressable
        onPress={() => {}}
        className="border border-primary/[12.5%] rounded-xl flex-row justify-between px-5 py-4 items-center mb-4"
      >
        <Text className="text-dark text-xl font-medium">About Application</Text>
        <Arrow color="dark" rotate={180} />
      </Pressable>
    </View>
  );
};
