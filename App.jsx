import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { TabNavigation } from "./app/Navigations/tabNavigation";
import { AppProvider } from "./app/Context";

export default function MyComponent() {
  return (
    <AppProvider>
      <NavigationContainer>
        <TabNavigation />
      </NavigationContainer>
      <StatusBar />
    </AppProvider>
  );
}
