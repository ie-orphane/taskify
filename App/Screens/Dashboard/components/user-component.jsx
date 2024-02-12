import { Image, Text, View } from "react-native";
import { useAppContext } from "../../../../context";
import { Bell, Category } from "../../../../assets/icons"
import Photo from "../../../../assets/images/IMG_20240208_133954.jpg";

export const UserComponent = () => {
  const { user } = useAppContext();

  return (
    <View className="flex-row items-center px-8 pb-3 pt-16 bg-white">
      {/* <Image className="w-11 h-11 rounded-full" source={Photo} /> */}
      <View className="w-11 h-11 rounded-full [border-width:1.5px] border-primary/5 items-center justify-center">
        <Category />
      </View>

      <View className="mx-auto">
        <Text className="text-black/50 font-medium text-center text-lg tracking-tighter">Good Morning!</Text>
        <Text className="text-xl text-dark font-bold text-center">{user.displayName}</Text>
      </View>

      <View className="w-11 h-11 rounded-full [border-width:1.5px] border-primary/5 items-center justify-center">
        <Bell />
      </View>
    </View>
  );
};
