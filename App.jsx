import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "react-native";
import { AuthNavigation } from "./app/Navigations/auth-navigation";
import { AppProvider } from "./app/Context";

export default function MyComponent() {
  return (
    <AppProvider>
      <NavigationContainer>
        <AuthNavigation />
        <StatusBar style="auto" />
      </NavigationContainer>
    </AppProvider>
  );
}
