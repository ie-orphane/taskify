import { NavigationContainer } from "@react-navigation/native";
import { AuthNavigation } from "./app/navigation/auth-navigation";
import { AppProvider } from "./context";
import { onUserStateChanged } from "./services/firebase";
import { useEffect, useState } from "react";
import ExpoStatusBar from "expo-status-bar/build/ExpoStatusBar";
import { TabNavigation } from "./app/navigation/tab";

export default function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onUserStateChanged(setUser);
    return () => unsubscribe();
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
