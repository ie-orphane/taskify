import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";

export const HomeScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="bg-white">
      <View className="items-center justify-end h-full pb-[100] px-8">
        <Text className="text-5xl font-medium">Hey! Welcome</Text>
        <Text className="text-xl tracking-wider text-black/50 text-center mt-2">
          Your one step for a simple tracking tasks
        </Text>

        <Pressable
          onPress={() => {
            navigation.navigate("SignUp");
          }}
          className="mt-12 bg-main/[87.5%] active:bg-main/100 w-full rounded-lg py-5"
        >
          <Text className="text-center text-white text-2xl font-medium">Get Started</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("signIn");
          }}
          className="mt-4 border bg-black/80 active:bg-black/100 w-full rounded-lg py-5"
        >
          <Text className="text-center text-white text-2xl">I already have an account</Text>
        </Pressable>
      </View>
    </View>
  );
};
