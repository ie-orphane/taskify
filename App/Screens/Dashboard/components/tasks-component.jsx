import { useEffect, useReducer, useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";
import { COLORS } from "../../../../styles";
import { useAppContext } from "../../../../context";
import { Check, Filter } from "../../../../assets/icons";
import { updateDataBase } from "../../../../services/firebase/db";
import { BlurView } from "expo-blur";

export const TasksComponent = () => {
  const now = new Date();
  const { Tasks, setTasks, Collections, setCollections } = useAppContext();

  const [modalVisible, setModalVisible] = useState(true);
  const toggleHandler = () => {
    setModalVisible((prev) => !prev);
  };

  const [filter, setFilter] = useState({
    toString: () => "all",
    predicate: (item) => item,
  });
  const [selected, setSelected] = useState({
    tasks: Tasks,
    pending: Tasks.filter((task) => !task.completed).length,
  });

  // Array.prototype.filter();

  const filters = [
    {
      toString: () => "all",
      predicate: (item) => item,
    },
    {
      toString: () => "today",
      predicate: (item) => item._date.getDate() == now.getDate(),
    },
  ];

  const reducer = (state, { type }) => {
    switch (type) {
      case "All":
        return {
          name: "All",
          tasks: Tasks,
          pending: Tasks.filter((task) => !task.completed).length,
          predicate: (item) => item,
        };
      case "Today":
        return {
          name: "Today",
          tasks: Tasks.filter((task) => task._date.getDate() == now.getDate()),
          pending: Tasks.filter((task) => task._date.getDate() == now.getDate() && !task.completed)
            .length,
          predicate: (item) => item._date.getDate() == now.getDate(),
        };
      case "Reset":
        return {
          ...state,
          tasks: Tasks.filter(state.predicate),
          pending: Tasks.filter(state.predicate).filter((task) => !task.completed).length,
        };
      default:
        throw new Error("unokwn action type");
    }
  };

  const initializer = {
    name: "All",
    tasks: Tasks,
    pending: Tasks.filter((task) => !task.completed).length,
    predicate: (item) => item,
  };

  const [state, dispatch] = useReducer(reducer, initializer);

  useEffect(() => {
    dispatch({ type: "Reset" });
  }, [Tasks]);

  const updateData = async (collectionId, taskId, newCompletedValue) => {
    // update tasks data
    await updateDataBase("tasks", taskId, "completed", newCompletedValue);

    // Update tasks state
    const updatedTasks = Tasks.map((task) =>
      task.id === taskId ? { ...task, completed: newCompletedValue } : task
    );
    setTasks(updatedTasks);

    // update collections data
    const correspondingCollection = Collections.find((collection) => collection.id == collectionId);
    await updateDataBase(
      "collections",
      collectionId,
      "completedTasks",
      correspondingCollection.completedTasks + (newCompletedValue ? 1 : -1)
    );

    // Update collections state
    const updatedCollections = Collections.map((collection) => {
      if (collection.id === collectionId) {
        collection.completedTasks += newCompletedValue ? 1 : -1;
      }
      return collection;
    });
    setCollections(updatedCollections);
  };

  const getCollectionName = (collectionId) => {
    return Collections.find((item) => item.id == collectionId).name;
  };

  return (
    <>
      <View className="px-8 mt-6 mb-2 flex-row items-center">
        <View>
          <Text className="text-2xl font-semibold text-dark">My Tasks</Text>
          {state.pending != 0 && (
            <Text className="text-base text-black/50">
              {state.pending + ` Task${state.pending > 1 ? "s" : ""} Pending`}
            </Text>
          )}
        </View>

        <Pressable onPress={toggleHandler} className="ml-auto">
          <Filter />
        </Pressable>

        <Modal transparent={true} animationType="fade" visible={modalVisible}>
          <BlurView intensity={5}>
            <Pressable onPress={toggleHandler} className="h-full justify-end bg-black/25">
              <Pressable
                className="bg-white py-5 px-8 rounded-t-3xl"
                onPress={(e) => e.stopPropagation()}
              >
                <View className="h-[6] w-11 rounded bg-dark/5 mb-8 mx-auto"></View>
                <View className="bg-primary/5 rounded-3xl flex-row">
                  {["All", "Today"].map((item, index) => (
                    <Pressable
                      key={index}
                      className={`w-[50%] py-2 rounded-3xl ${
                        state.name == item ? "bg-primary" : ""
                      }`}
                      onPress={() => {
                        dispatch({ type: item });
                        toggleHandler();
                      }}
                    >
                      <Text
                        className={`text-center font-medium text-lg ${
                          state.name == item ? "text-white" : "text-black/75"
                        }`}
                      >
                        {item}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </Pressable>
            </Pressable>
          </BlurView>
        </Modal>
      </View>

      <ScrollView className="my-2 px-8" showsVerticalScrollIndicator={false}>
        {state.tasks
          .sort((a, b) => b._date - a._date)
          .map((item, index) => (
            <View
              key={index}
              className={`bg-white border-primary/10 border p-4 rounded-lg ${
                index != 0 ? "mt-3 " : " "
              }`}
            >
              <View className="flex-row justify-between border-b border-black/5 pb-3">
                {/* title and project */}
                <View>
                  <Text
                    className={`text-xl text-dark font-medium ${
                      item.completed ? "line-through" : ""
                    }`}
                  >
                    {item.name}
                  </Text>
                  <Text className="font-medium text-black/50">
                    {getCollectionName(item.collectionId)}
                  </Text>
                </View>
                {/* completed mark */}
                <Pressable
                  onPress={() => updateData(item.collectionId, item.id, !item.completed)}
                  style={
                    item.completed
                      ? { backgroundColor: COLORS.primary }
                      : { borderWidth: 2, borderColor: "#0001" }
                  }
                  className="self-center w-[27] h-[27] rounded-full items-center content-center justify-center"
                >
                  {item.completed ? <Check /> : null}
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
