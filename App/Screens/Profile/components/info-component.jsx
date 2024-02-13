import { Pressable, Text, View } from "react-native";
import { useAppContext } from "../../../../context";
import { CheckSquare, TimeSquare } from "../../../../assets/icons";
import { useNavigation } from "@react-navigation/native";

export const InfoComponent = () => {
  const { user, Tasks } = useAppContext();
  const navigation = useNavigation()

  return (
    <>
      <View className="items-center">
        <View className="w-20 h-20 border rounded-full"></View>
        <Text className="text-dark font-semibold text-4xl mt-2">{user.displayName}</Text>
        <Text className="text-lg text-black/50">{user.email}</Text>
        <Pressable onPress={() => {navigation.navigate("EditProfile")}} className="border-primary border rounded-lg px-4 py-1 mt-2">
          <Text className="text-dark text-base">Edit</Text>
        </Pressable>
      </View>

      <View className="justify-evenly flex-row mt-6">
        <View className="items-center">
          <TimeSquare />
          <Text className="font-bold text-dark text-3xl my-1">
            {Tasks.filter((item) => !item.completed).length}
          </Text>
          <Text className="text-base text-black/50">On Going</Text>
        </View>

        <View className="items-center">
          <CheckSquare />
          <Text className="font-bold text-dark text-3xl my-1">
            {Tasks.filter((item) => item.completed).length}
          </Text>
          <Text className="text-base text-black/50">Total Complete</Text>
        </View>
      </View>
    </>
  );
};
