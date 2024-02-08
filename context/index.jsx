import { createContext, useContext, useReducer, useState } from "react";
import { initializer, reducer } from "../reducers";
import { useCollections, useTasks } from "../hooks";

const appContext = createContext();

const AppProvider = ({ children, user, setUser }) => {
  const [homeRoute, setHomeRoute] = useState("Dashboard");
  const [state, dispatch] = useReducer(reducer, initializer);

  const { Tasks, fetchTasks } = useTasks(user);
  const { Collections, fetchCollections } = useCollections(user);

  const appValue = {
    homeRoute,
    setHomeRoute,
    user,
    setUser,
    state,
    dispatch,
    Tasks,
    fetchTasks,
    Collections,
    fetchCollections,
  };

  return <appContext.Provider value={appValue}>{children}</appContext.Provider>;
};

const useAppContext = () => useContext(appContext);

export { AppProvider, useAppContext };
