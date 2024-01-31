import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import TabNavigation from "./App/Navigations/tabNavigation";

export default function MyComponent() {
  return (
    <>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
      <StatusBar />
    </>
  );
}
