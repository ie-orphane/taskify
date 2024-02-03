import { createContext, useContext, useReducer, useState } from "react";
import { Task, Collection } from "../actions";

const appContext = createContext();

const AppProvider = ({ children }) => {
  const [homeRoute, setHomeRoute] = useState("Dashboard");
  const [user, setUser] = useState(null);

  // const [taskState, taskDispatch] = useReducer(Task.reducer, Task.initializer);
  // const [projectState, projectDispatch] = useReducer(Project.reducer, Project.initializer);

  return (
    <appContext.Provider
      value={{
        homeRoute: homeRoute,
        setHomeRoute: setHomeRoute,
        user: user,
        setUser: setUser,
        // Task: { state: taskState, dispatch: taskDispatch },
        // Project: { state: projectState, dispatch: projectDispatch },
      }}
    >
      {children}
    </appContext.Provider>
  );
};

const useAppContext = () => useContext(appContext);

export { AppProvider, useAppContext };
