import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { COLORS } from "../../../../constants";
import { useAppContext } from "../../../../context";
import icons from "../../../../assets/icons";
import { updateTask } from "../../../../services/firebase";

export const TasksComponent = () => {
  const now = new Date();
  const { Tasks, Collections, fetchTasks } = useAppContext();

  const [filterSelected, setFilterSelected] = useState("All");

  const filters = {
    All: Tasks,
    Today: Tasks.filter((task) => task._date.day == now.getDate()),
    Pending: Tasks.filter((task) => !task.completed),
    Completed: Tasks.filter((task) => task.completed),
  };

  const getCollectionName = (collectionId) => {
    return Collections.find((item) => item.id == collectionId)?.name;
  };

  return (
    <>
      <Text className="text-2xl px-8 pt-6 font-bold text-dark">Recent Tasks</Text>
      <ScrollView className="my-2 px-8" showsVerticalScrollIndicator={false}>
        {Tasks.sort((a, b) => b._date - a._date).map((item, index) => (
          <View key={index} className={`bg-white p-4 rounded-lg ${index != 0 ? "mt-3 " : " "}`}>
            <View className="flex-row justify-between border-b border-black/5 pb-3">
              {/* title and project */}
              <View>
                <Text className={`text-xl font-medium ${item.completed ? "line-through" : ""}`}>
                  {item.name}
                </Text>
                <Text className="font-medium text-black/50">
                  {getCollectionName(item.collectionId)}
                </Text>
              </View>
              {/* completed mark */}
              <Pressable
                onPress={async () => {
                  await updateTask(item);
                  await fetchTasks();
                }}
                style={
                  item.completed
                    ? { backgroundColor: COLORS.primary }
                    : { borderWidth: 2, borderColor: "#0001" }
                }
                className="self-center w-[27] h-[27] rounded-full items-center content-center justify-center"
              >
                {item.completed ? <icons.Check /> : null}
              </Pressable>
            </View>
            {/* datetime */}
            <View className="mt-4 flex-row">
              {item._date.getDate() == now.getDate() ? (
                <>
                  <Text className="font-medium text-black/50">Today</Text>
                  <Text className="ml-2 text-black/25">
                    {item.start} - {item.end}
                  </Text>
                </>
              ) : (
                <Text className="font-medium text-black/50">{item.date}</Text>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </>
  );
};
