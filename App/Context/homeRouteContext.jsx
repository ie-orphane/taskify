import { createContext, useState } from "react";

export const HomeRouteContext = createContext();

export const HomeRouteProvider = ({ children }) => {
  const [homeRoute, setHomeRoute] = useState("Dashboard");

  return (
    <HomeRouteContext.Provider value={[homeRoute, setHomeRoute]}>
      {children}
    </HomeRouteContext.Provider>
  );
};
