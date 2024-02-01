import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { TabNavigation } from "./app/Navigations/tabNavigation";
import { HomeRouteProvider } from "./app/Context/homeRouteContext";

export default function MyComponent() {
  return (
    <HomeRouteProvider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
      <StatusBar />
    </HomeRouteProvider>
  );
}
