import { Pressable, Text, View } from "react-native";
import { Arrow } from "../../../../assets/icons";
import { useNavigation } from "@react-navigation/native";

export const OptionsComponent = () => {
  const navigation = useNavigation();
  return (
    <>
      <Pressable
        onPress={() => {
          navigation.navigate("ResetPassword");
        }}
        className="border border-primary/[12.5%] rounded-xl flex-row justify-between px-5 py-4 items-center mt-8 mb-4"
      >
        <Text className="text-dark text-xl font-medium">Reset Password</Text>
        <Arrow color="dark" rotate={180} />
      </Pressable>

      <Pressable
        onPress={() => {
          navigation.navigate("Settings");
        }}
        className="border border-primary/[12.5%] rounded-xl flex-row justify-between px-5 py-4 items-center mb-4"
      >
        <Text className="text-dark text-xl font-medium">Settings</Text>
        <Arrow color="dark" rotate={180} />
      </Pressable>
    </>
  );
};
