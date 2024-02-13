import { Text, View, Pressable } from "react-native";
import { InfoComponent } from "./components/info-component";
import { OptionsComponent } from "./components/options-component";
import { Cross } from "../../../assets/icons";
import { useNavigation } from "@react-navigation/native";

export const ProfileScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View className="rounded-lg px-7 pb-8 pt-16">
      <View className="flex-row items-center mb-6">
        <Pressable
          onPress={() => navigation.navigate("Dashboard")}
          className="w-11 h-11 rounded-full border border-dark/5 items-center justify-center"
        >
          {/* <Arrow color="dark" size={22} stroke={1.75} /> */}
          <Cross color="dark" size={22} stroke={1.75} />
        </Pressable>
        {/* <Text className="font-medium text-dark mx-auto text-2xl">Profile</Text> */}
      </View>

      <InfoComponent />
      <OptionsComponent />

      <Text className="text-center mt-6 text-red-400 text-base font-medium">Logout</Text>
    </View>
  );
};
