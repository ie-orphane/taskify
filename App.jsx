import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigation } from "./app/navigation/auth-navigation";
import { AppProvider } from "./context";
import { onUserStateChanged } from "./services/firebase";
import { TabNavigation } from "./app/navigation/tab2-navigation";
import { useEffect, useState } from "react";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";

export default function MyComponent() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onUserStateChanged(setUser);

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AppProvider user={user} setUser={setUser}>
      <NavigationContainer>
        {user ? <TabNavigation /> : <AuthNavigation />}
        <ExpoStatusBar style="auto" />
      </NavigationContainer>
    </AppProvider>
  );
}
