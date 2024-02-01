import { createStackNavigator } from "@react-navigation/stack";
import { ProjectScreen } from "../Screens/Project/projectScreen";
import { DashboardScreen } from "../Screens/Dashboard/dashboardScreen";

const Stack = createStackNavigator();

export const HomeNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: true }}>
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Project" component={ProjectScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
