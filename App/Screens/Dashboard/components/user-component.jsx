import { Image, Text, View } from "react-native";
import { useAppContext } from "../../../../context";
import Icons from "../../../../assets/icons";
import Photo from "../../../../assets/images/IMG_20240208_133954.jpg";

export const UserComponent = () => {
  const { user } = useAppContext();

  return (
    <View className="flex-row items-center px-8 pb-3 pt-16 bg-white">
      <Image className="w-11 h-11 rounded-full" source={Photo} />

      <View className="ml-3">
        <Text className="text-black/50 font-medium text-lg tracking-tighter">Good Morning!</Text>
        <Text className="text-xl text-dark font-bold">{user.displayName}</Text>
      </View>

      <View className="w-11 h-11 rounded-full [border-width:1.5px] border-black/[2.5%] ml-auto items-center justify-center">
        <Icons.Bell />
      </View>
    </View>
  );
};
