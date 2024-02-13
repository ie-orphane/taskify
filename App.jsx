import { NavigationContainer } from "@react-navigation/native";
import { AppProvider } from "./context";
import { onUserStateChanged } from "./services/firebase";
import { useEffect, useState } from "react";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { View } from "react-native";
import { Logo } from "./assets/icons";
import { AuthNavigation } from "./app/navigation/auth";
import { MainNavigation } from "./app/navigation/main";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onUserStateChanged(setUser);
    console.log(user);
    return () => unsubscribe();
  }, []);

  return (
    <AppProvider {...{ user, setUser, setLoading }}>
      <NavigationContainer>
        {loading ? (
          <View className="bg-primary h-full items-center justify-center">
            <Logo />
          </View>
        ) : user ? (
          <MainNavigation />
        ) : (
          <AuthNavigation />
        )}
        <ExpoStatusBar style="auto" />
      </NavigationContainer>
    </AppProvider>
  );
}
