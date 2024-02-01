import { useContext, useEffect } from "react";
import { HomeRouteContext } from "../../Context/homeRouteContext";
import { Text } from "react-native";

export const ProjectScreen = ({ route }) => {
  const [_, setHomeRoute] = useContext(HomeRouteContext);

  useEffect(() => {
    setHomeRoute(route.name);
    return () => setHomeRoute("Dashboard");
  }, [route]);

  return <Text>sala al 3alam</Text>;
};
