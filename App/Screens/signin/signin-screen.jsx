import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, TextInput, View } from "react-native";
import { signIn, fetchUserById } from "../../../services/firebase";
import { useState } from "react";
import { useAppContext } from "../../Context";

export const SignInScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("user@test.com");
  const [password, setPassword] = useState("test@@");
  const [error, setError] = useState(false);

  const { setUser } = useAppContext();

  return (
    <View className="h-screen w-screen bg-white pt-12 px-8">
      <Text className="text-3xl font-medium">Welcome back</Text>

      <TextInput
        value={email}
        onChangeText={(text) => setEmail(text)}
        className="text-xl bg-black/5 p-4 rounded-lg mt-3"
        placeholder="Email Address"
      />
      <TextInput
        value={password}
        onChangeText={(text) => setPassword(text)}
        className="text-xl bg-black/5 p-4 rounded-lg mt-3"
        placeholder="Password"
      />

      <Pressable
        onPress={async () => {
          const uid = await signIn(email, password);
          if (uid) {
            setUser(await fetchUserById(uid));
            navigation.navigate("App");
          } else {
            setError(true);
          }
        }}
        className="mt-12 bg-main/[87.5%] active:bg-main/100 w-full rounded-lg py-5"
      >
        <Text className="text-center text-white text-2xl font-medium">Login</Text>
      </Pressable>

      <Text
        style={error ? {} : { display: "none" }}
        className="mt-10 text-center text-red-600/75 text-2xl font-medium"
      >
        Invalid email or password!
      </Text>

      <Pressable onPress={() => {}}>
        <Text className="text-center mt-10 text-black/[37.5%] text-2xl font-medium">
          Forgot password?
        </Text>
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
