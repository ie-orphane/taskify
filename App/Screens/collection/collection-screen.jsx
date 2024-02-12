import { useEffect } from "react";
import { useAppContext } from "../../../context";
import { Pressable, ScrollView, Text, View } from "react-native";
import { BackArrow, Check, Edite } from "../../../assets/icons";
import { CircularProgressBar } from "./components/circular-progress";
import { COLORS } from "../../../styles";
import { useNavigation } from "@react-navigation/native";
import { updateDataBase } from "../../../services/firebase/db";

export const CollectionScreen = ({ route }) => {
  const { setHomeRoute, Tasks, setTasks, Collections, setCollections } = useAppContext();
  const now = new Date();

  const { item } = route.params;
  const navigation = useNavigation();

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

  useEffect(() => {
    setHomeRoute(route.name);
    return () => setHomeRoute("Dashboard");
  }, []);

  return (
    <>
      <View style={{ backgroundColor: item.color + "c0" }} className="rounded-lg px-7 pb-8 pt-16">
        <View className="flex-row items-center mb-6">
          <Pressable
            onPress={() => navigation.navigate("Dashboard")}
            className="w-11 h-11 rounded-full [border-width:1.5px] border-white/10 items-center justify-center"
          >
            <BackArrow />
          </Pressable>
          <View className="w-11 h-11 ml-auto rounded-full [border-width:1.5px] border-white/10 items-center justify-center">
            <Edite />
          </View>
        </View>

        <View className="flex-row items-center">
          <View className="w-[62.5%]">
            <Text className="text-white text-2xl font-semibold capitalize">{item.name}</Text>
            <Text className="text-white/95 text-lg">{item.description}</Text>
          </View>

          {item.tasks.length != 0 && (
            <CircularProgressBar
              radius={28.5}
              strokeWidth={4}
              progress={item.completedTasks}
              maxValue={item.tasks.length}
              color={item.color}
              // classname="ml-auto p-20"
            />
          )}
        </View>

        {/* foot : info */}
        {/* <View className="flex-row items-center">
          <EvilIcons name="calendar" size={28} color="rgba(255,255,255,.5)" />
          <Text className="text-white/50">{item.date}</Text>
        </View> */}
      </View>

      <View className="px-8 mt-6 mb-2">
        <Text className="text-2xl font-semibold text-dark">Tasks</Text>
        {/* <Text className="text-base text-black/50">
          {selectedTasks.filter((task) => !task.completed).length} Tasks Pending
        </Text> */}
      </View>

      <ScrollView className="my-2 px-8" showsVerticalScrollIndicator={false}>
        {Tasks.filter((task) => task.collectionId == item.id)
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
                  {/* <Text className="font-medium text-black/50">
                  {getCollectionName(item.collectionId)}
                </Text> */}
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
