import { useNavigation } from "@react-navigation/native";
import { Pressable, Text, View } from "react-native";
import { signIn } from "../../../services/firebase";
import { useState } from "react";
import { FormInput } from "../../layouts";

export const SignInScreen = () => {
  const navigation = useNavigation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  return (
    <View className="h-full bg-white pt-20 px-8">
      <Text className="text-3xl font-bold tracking-widest">Welcome back chef!</Text>
      <Text className="text-xl font-medium text-black/75 mb-4 tracking-tighter">
        Great to see you again
      </Text>

      {[
        [email, setEmail, "Email Address"],
        [password, setPassword, "Password"],
      ].map(([state, setState, text], index) => (
        <FormInput
          key={index}
          value={state}
          onChangeText={setState}
          placeholder={text}
          onError={error}
          setError={setError}
        />
      ))}

      <Pressable onPress={() => {}}>
        <Text className="self-end mt-10 text-black/75 text-lg font-medium">Forgot password?</Text>
      </Pressable>

      <Pressable
        onPress={async () => {
          await signIn(email, password);
        }}
        className="mt-4 bg-main/[87.5%] active:bg-main/100 w-full rounded-lg py-5"
      >
        <Text className="text-center text-white text-2xl font-medium">Login</Text>
      </Pressable>

      <Text
        style={error ? {} : { display: "none" }}
        className="mt-10 text-center text-red-600/75 text-2xl font-medium"
      >
        Invalid email or password!
      </Text>

      <View className="h-[1] bg-black/10 my-14"></View>

      <View className="flex-row items-center justify-center">
        <Text className="text-center text-black/75 text-xl font-medium">
          Don't have an account?
        </Text>

        <Pressable
          className="ml-2"
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text className="text-xl text-main/75 font-medium">Log in</Text>
        </Pressable>
      </View>
    </View>
  );
};
