import { Text, View } from "react-native";
import { useAppContext } from "../../../Context";
import { useTasks } from "../../../hooks";
import { useEffect, useState } from "react";

export const UserComponent = () => {
  const now = new Date();

  const { user } = useAppContext();
  const [state, dispatch] = useTasks();
  const [todayTasks, setTodayTasks] = useState();

  useEffect(() => {
    setTodayTasks(state.filter((task) => task._date.day == now.getDay()).length);
  }, [state]);

  return (
    <View className="px-8 pb-6 pt-10 bg-white/75">
      <View>
        <Text className="text-5xl font-bold">Hey, {user.name}</Text>
        <Text className="text-xl text-black/50 font-medium">{`${todayTasks} task${
          todayTasks > 1 ? "s" : ""
        } for today!`}</Text>
      </View>
    </View>
  );
};
