import { useEffect } from "react";
import { useAppContext } from "../../Context";
import { Text } from "react-native";

export const CollectionScreen = ({ route }) => {
  const { setHomeRoute } = useAppContext();

  useEffect(() => {
    setHomeRoute(route.name);
    return () => setHomeRoute("Dashboard");
  }, []);

  return <Text>sala al 3alam</Text>;
};
