import { useEffect, useReducer } from "react";
import { useAppContext } from "../Context";
import { fetchUserTasks } from "../../services/firebase";
import { Task } from "../utils/classes";

export const useTasks = () => {
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "SET":
        return payload;
      case "COMPLETED":
        const current = state.find((item) => item.id == payload);
        current.completed = !current.completed;
        return [...state];
      case "NEW":
        return [payload, ...state];
      default:
        throw new Error(`undefiened tasksReducer action type: ${type}`);
    }
  };

  const [state, dispatch] = useReducer(reducer, []);
  const { user } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      const userTasks = await fetchUserTasks(user.id);
      dispatch({ type: "SET", payload: userTasks.map((data) => new Task(data)) });
    };
    fetchData();
  }, []);

  return [state, dispatch];
};
