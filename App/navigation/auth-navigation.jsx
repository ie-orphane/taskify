import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen, SignInScreen, SignUpScreen } from "../Screens";

const Stack = createStackNavigator();

export const AuthNavigation = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="signIn" component={SignInScreen} />
    </Stack.Navigator>
  );
};
