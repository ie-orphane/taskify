import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, TextInput, View } from "react-native";

export const SignUpScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="h-screen w-screen bg-white pt-12 px-8">
      <Text className="text-3xl font-medium">Create an account</Text>

      <TextInput className="text-xl bg-black/5 p-4 rounded-lg mt-8" placeholder="Name" />
      <TextInput className="text-xl bg-black/5 p-4 rounded-lg mt-3" placeholder="Email Address" />
      <TextInput className="text-xl bg-black/5 p-4 rounded-lg mt-3" placeholder="Password" />
      <TextInput
        className="text-xl bg-black/5 p-4 rounded-lg mt-3"
        placeholder="Confirm Password"
      />

      <Pressable
        onPress={() => {}}
        className="mt-12 bg-main/[87.5%] active:bg-main/100 w-full rounded-lg py-5"
      >
        <Text className="text-center text-white text-2xl font-medium">Create an account</Text>
      </Pressable>

      <View className="h-[1] bg-black/25 my-10"></View>

      <Pressable
        onPress={() => {
          navigation.navigate("signIn");
        }}
      >
        <Text className="text-center text-black/[37.5%] text-2xl font-medium">
          Already have an account?
        </Text>
      </Pressable>
    </View>
  );
};
