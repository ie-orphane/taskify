import { useEffect } from "react";
import { useAppContext } from "../../../context";
import { View, Text } from "react-native";

export const ResetPasswordScreen = ({ route }) => {
  const { setHomeRoute } = useAppContext();

  useEffect(() => {
    setHomeRoute(route.name);
    return () => setHomeRoute("Profile");
  }, []);

  return (
    <View className="h-full items-center justify-center">
      <Text>Reset Password</Text>
    </View>
    
  );
};
