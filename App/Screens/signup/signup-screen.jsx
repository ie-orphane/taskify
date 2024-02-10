import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { FormInput } from "../../layouts";
import { signUp } from "../../../services/firebase";

export const SignUpScreen = () => {
  const navigation = useNavigation();

  const [error, setError] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <View className="h-full bg-white pt-20 px-8">
      <Text className="text-3xl font-bold tracking-widest">Welcome to taskify!</Text>
      <Text className="text-xl font-medium text-black/75 mb-4 tracking-tighter">
        Let's register an Account
      </Text>

      {[
        [name, setName, "Name"],
        [email, setEmail, "Email Address"],
        [password, setPassword, "Password"],
        [confirmPassword, setConfirmPassword, "Confirm Password"],
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

      <Pressable
        onPress={async () => {
          await signUp(name, email, password);
        }}
        className="mt-12 bg-main/[87.5%] active:bg-main/100 w-full rounded-lg py-5"
      >
        <Text className="text-center text-white text-2xl font-medium">Create an account</Text>
      </Pressable>

      <View className="h-[1] bg-black/25 my-10"></View>

      <View className="flex-row items-center justify-center">
        <Text className="text-center text-black/75 text-xl font-medium">
          Already have an account?
        </Text>

        <Pressable
          className="ml-2"
          onPress={() => {
            navigation.navigate("signIn");
          }}
        >
          <Text className="text-xl text-main/75 font-medium">Log in</Text>
        </Pressable>
      </View>
    </View>
  );
};
