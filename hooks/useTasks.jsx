import { useEffect, useState } from "react";
import { fetchUserTasks } from "../services/firebase";
import { Task } from "../utils/classes";

export const useTasks = (user) => {
  const [Tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const userTasks = await fetchUserTasks(user.uid);
    setTasks(userTasks.map((data) => new Task(data)));
  };

  useEffect(() => {
    if (user) {
      fetchTasks();
    }
  }, [user]);

  return { Tasks, setTasks, fetchTasks };
};
