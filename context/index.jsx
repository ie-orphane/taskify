import { createContext, useContext, useEffect, useState } from "react";
import { fetchUserCollections, fetchUserTasks } from "../services/firebase";
import { Collection, Task } from "../utils/classes";

const appContext = createContext();

const AppProvider = ({ children, user, setUser }) => {
  const [homeRoute, setHomeRoute] = useState("Dashboard");

  // create modal context
  const [modalVisible, setModalVisible] = useState(false);
  const [currentMode, setCurrentMode] = useState("Task");
  const toggleHandler = () => {
    setModalVisible((prev) => !prev);
    setCurrentMode(null);
  };

  // tasks context
  const [Tasks, setTasks] = useState([]);
  const fetchTasks = async () => {
    try {
      const userTasks = await fetchUserTasks(user.uid);
      setTasks(userTasks.map((data) => new Task(data)));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // collections context
  const [Collections, setCollections] = useState([]);
  const fetchCollections = async () => {
    try {
      const userCollections = await fetchUserCollections(user.uid);
      setCollections(userCollections.map((data) => new Collection(data)));
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchCollections();
      fetchTasks();
    }
  }, [user]);

  const appValue = {
    homeRoute,
    setHomeRoute,
    user,
    setUser,
    // tasks context
    Tasks,
    fetchTasks,
    // collections context
    Collections,
    fetchCollections,
    // create modal context
    modalVisible,
    currentMode,
    setCurrentMode,
    toggleHandler,
  };

  return <appContext.Provider value={appValue}>{children}</appContext.Provider>;
};

const useAppContext = () => useContext(appContext);

export { AppProvider, useAppContext };
