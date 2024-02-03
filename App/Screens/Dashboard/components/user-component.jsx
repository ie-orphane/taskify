import { Text, View } from "react-native";
import { useAppContext } from "../../../Context";

export const UserComponent = () => {
  const { user } = useAppContext();

  return (
    <View className="px-8 pb-6 pt-10 bg-white/75">
      <View>
        <Text className="text-5xl font-bold">Hey, {user.name}</Text>
        <Text className="text-xl text-black/50 font-medium">{7} task(s) for today!</Text>
      </View>
    </View>
  );
};
