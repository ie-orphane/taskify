import { createContext, useContext, useReducer, useState } from "react";
import { Task, Tasks, Project, Projects } from "./Reducer";

const appContext = createContext();

const AppProvider = ({ children }) => {
  const [homeRoute, setHomeRoute] = useState("Dashboard");

  const [taskState, taskDispatch] = useReducer(Task.reducer, Task.initializer);
  const [tasksState, tasksDispatch] = useReducer(Tasks.reducer, Tasks.initializer);
  const [projectState, projectDispatch] = useReducer(Project.reducer, Project.initializer);
  const [projectsState, projectsDispatch] = useReducer(Projects.reducer, Projects.initializer);

  return (
    <appContext.Provider
      value={{
        homeRoute: homeRoute,
        setHomeRoute: setHomeRoute,
        Task: { state: taskState, dispatch: taskDispatch },
        Tasks: { state: tasksState, dispatch: tasksDispatch },
        Project: { state: projectState, dispatch: projectDispatch },
        Projects: { state: projectsState, dispatch: projectsDispatch },
      }}
    >
      {children}
    </appContext.Provider>
  );
};

const useAppContext = () => useContext(appContext);

export { AppProvider, useAppContext };
