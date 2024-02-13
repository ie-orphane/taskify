import { useEffect } from "react";
import { useAppContext } from "../../../context";
import { Pressable, Text, TextInput, View } from "react-native";
import { Arrow } from "../../../assets/icons";
import { useNavigation } from "@react-navigation/native";
import { useForm } from "../../../hooks";
import { SHADOWS } from "../../../styles";

export const EditProfileScreen = ({ route }) => {
  const navigation = useNavigation();
  const { user, setHomeRoute } = useAppContext();

  const { formState, handleChange } = useForm({
    name: user.displayName,
    email: user.email,
    password: user.password,
  });

  useEffect(() => {
    setHomeRoute(route.name);
    return () => setHomeRoute("Profile");
  }, []);

  return (
    <View className="rounded-lg px-7 pb-8 pt-16">
      <View className="flex-row items-center">
        <Pressable
          onPress={() => navigation.navigate("Dashboard")}
          className="w-11 h-11 rounded-full border border-dark/5 items-center justify-center"
        >
          <Arrow color="dark" size={22} stroke={1.75} />
        </Pressable>
        <Text className="font-medium text-dark mx-auto text-2xl">Edit Profile</Text>
      </View>

      <Pressable className="rounded-full w-44 h-44 border self-center my-12"></Pressable>

      <Text className="text-lg tracking-wider text-black/[32.5%] font-medium mb-1">Name</Text>
      <TextInput
        value={formState.name}
        onChangeText={(text) => {
          handleChange("name", text);
        }}
        className="text-xl border border-primary/[31%] focus:border-primary p-4 rounded-lg text-dark font-medium"
      />

      <Text className="text-lg tracking-wider text-black/[32.5%] font-medium  mt-5 mb-1">
        Email
      </Text>
      <TextInput
        value={formState.email}
        onChangeText={(text) => {
          handleChange("email", text);
        }}
        className="text-xl border border-primary/[31%] focus:border-primary p-4 rounded-lg text-dark font-medium"
      />

      {(formState.name != user.displayName || formState.email != user.email) && (
        <Text
          style={SHADOWS.medium}
          className="text-white text-2xl text-center bg-primary rounded-2xl py-3 mt-6"
        >
          Save
        </Text>
      )}
    </View>
  );
};
