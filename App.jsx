import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigation } from "./app/navigation/auth-navigation";
import { AppProvider } from "./context";
import { onUserStateChanged } from "./services/firebase";
import { useEffect, useState } from "react";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { TabNavigation } from "./app/navigation/tab";
import { View } from "react-native";
import icons from "./assets/icons";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onUserStateChanged(setUser, setLoading);
    return () => unsubscribe();
  }, []);

  return (
    <AppProvider {...{ user, setUser, setLoading }}>
      <NavigationContainer>
        {loading ? (
          <View className="bg-primary h-full items-center justify-center">
            <icons.Logo />
          </View>
        ) : user ? (
          <TabNavigation />
        ) : (
          <AuthNavigation />
        )}
        <ExpoStatusBar style="auto" />
      </NavigationContainer>
    </AppProvider>
  );
}
