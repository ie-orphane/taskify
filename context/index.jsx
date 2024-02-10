import { createContext, useContext, useEffect, useReducer, useState } from "react";
import { initializer, reducer } from "../reducers";
import { fetchUserCollections, fetchUserTasks } from "../services/firebase";
import { Collection, Task } from "../utils/classes";

const appContext = createContext();

const AppProvider = ({ children, user, setUser }) => {
  const [homeRoute, setHomeRoute] = useState("Dashboard");
  // const [state, dispatch] = useReducer(reducer, initializer);

  const [modalVisible, setModalVisible] = useState(false);

  const [Tasks, setTasks] = useState([]);
  const [Collections, setCollections] = useState([]);

  const fetchTasks = async () => {
    try {
      const userTasks = await fetchUserTasks(user.uid);
      setTasks(userTasks.map((data) => new Task(data)));
    } catch (error) {
      console.error("Error:", error);
    }
  };

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
      // try {
        fetchCollections();
        fetchTasks();
      // } catch (error) {
      //   console.error("Error:", error);
      // }
    }
  }, [user]);

  const appValue = {
    homeRoute,
    setHomeRoute,
    user,
    setUser,
    // state,
    // dispatch,
    Tasks,
    fetchTasks,
    Collections,
    fetchCollections,
    modalVisible,
    setModalVisible,
  };

  return <appContext.Provider value={appValue}>{children}</appContext.Provider>;
};

const useAppContext = () => useContext(appContext);

export { AppProvider, useAppContext };
