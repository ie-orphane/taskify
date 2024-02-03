import { createStackNavigator } from "@react-navigation/stack";
import { CollectionScreen, DashboardScreen } from "../Screens";

const Stack = createStackNavigator();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Project" component={CollectionScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
