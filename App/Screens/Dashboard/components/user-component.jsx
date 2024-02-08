import { Text, View } from "react-native";
import { useAppContext } from "../../../../context";
import { useEffect, useState } from "react";
import Icons from "../../../../assets/icons";

export const UserComponent = () => {
  const now = new Date();

  const { user, Tasks } = useAppContext();
  const [todayTasks, setTodayTasks] = useState(0);

  useEffect(() => {
    setTodayTasks(Tasks.filter((task) => task._date.day == now.getDate()).length);
  }, [Tasks]);

  return (
    <View className="flex-row items-center px-8 pb-3 pt-16 bg-white">
      <View className="w-11 h-11 rounded-full [border-width:1.75px] border-black/[12.5%]"></View>

      <View>
        <Text className="text-xl text-black/50 font-medium ml-3">Welcome {user.displayName}!</Text>
        {todayTasks != 0 && (
          <Text className="text-xl text-black/50 font-medium">{`${todayTasks} task${
            todayTasks > 1 ? "s" : ""
          } for today!`}</Text>
        )}
      </View>

      <View className="w-11 h-11 rounded-full  [border-width:1.75px] border-black/5 ml-auto items-center justify-center">
        <Icons.Bell />
      </View>
    </View>
  );
};
