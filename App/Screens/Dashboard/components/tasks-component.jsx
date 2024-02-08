import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../../../constants";
import { useAppContext } from "../../../../context";
import { today } from "../../../../utils/datetime";
import { addTask } from "../../../../services/firebase";

export const TasksComponent = () => {
  const now = new Date();
  const { user, state, dispatch, Tasks, fetchTasks, Collections } = useAppContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filterSelected, setFilterSelected] = useState("All");

  const filters = {
    All: Tasks,
    Today: Tasks.filter((task) => task._date.day == now.getDate()),
    Pending: Tasks.filter((task) => !task.completed),
    Completed: Tasks.filter((task) => task.completed),
  };

  const handleAddTask = async () => {
    // if (taskInput.trim() !== '') {
    try {
      const newTask = {
        ...state.task, // name note collectionId
        userId: user.uid,
        completed: false,
        start: new Date(),
        end: new Date(),
      };
      // add new task to db
      await addTask(newTask);
      // update all tasks
      await fetchTasks();
      // reset the state the iniale value
      dispatch({ target: "Task", type: "RESET" });
      // hide the modal
      setModalVisible(false);
    } catch (error) {
      console.error(".../dashboard/.../tasks-components/handleAddTask", error.message);
    }
    // }
  };

  return (
    <>
      {/* Header & add button */}
      <View className="flex-row px-8 pt-6 items-center justify-between">
        {/* heading & description */}
          <Text className="text-2xl font-bold text-dark">Recent Tasks</Text>

        {/* add button */}
        {/* {Collections.length != 0 && (
          <Pressable
            onPress={() => setModalVisible(true)}
            className="bg-main/5 px-6 py-2 rounded-lg"
          >
            <Text className="text-main/75 text-xl font-medium">+ New Task</Text>
          </Pressable>
        )} */}
      </View>

      {/* add new project modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <Pressable
          onPress={() => setModalVisible(false)}
          className="content-center h-screen w-screen bg-black/[62.5%] justify-end"
        >
          {/* modal body */}
          <Pressable
            className="bg-white self-end py-10 px-8 w-full rounded-t-[50]"
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            {/* title */}
            <Text className="text-3xl font-bold mb-6">Create New Task</Text>
            {/* task name */}
            <View>
              <Text className="text-xl font-bold text-black/75 mb-2">Task Name</Text>
              <TextInput
                value={state.task.name}
                onChangeText={(text) => dispatch({ target: "Task", type: "NAME", payload: text })}
                className="text-xl bg-black/5 py-3 px-5 rounded-xl"
                placeholder="Enter Task Name"
              />
            </View>

            {/* task description */}
            <View className="mt-6">
              <Text className="text-xl font-bold text-black/75 mb-2">Task Note</Text>
              <TextInput
                value={state.task.description}
                onChangeText={(text) => dispatch({ target: "Task", type: "NOTE", payload: text })}
                className="text-xl bg-black/5 py-3 px-5 rounded-xl"
                placeholder="Enter Task Note"
              />
            </View>

            {/* task collection */}
            <View className="mt-6">
              <Text className="text-xl font-bold text-black/75 mb-3">Task Collection</Text>
              <Pressable
                onPress={() => setDropdownVisible(!dropdownVisible)}
                className="bg-black/5 py-3 px-5 rounded-xl flex-row justify-between"
              >
                {state.task.collectionId == "" ? (
                  <Text className="text-xl text-black/[37.5%]">Choose a collection</Text>
                ) : (
                  <Text className="text-xl">
                    {Collections.find((item) => item.id == state.task.collectionId).name}
                  </Text>
                )}

                <Entypo
                  name={dropdownVisible ? "chevron-up" : "chevron-right"}
                  size={24}
                  color="#000b"
                />
              </Pressable>
              {dropdownVisible ? (
                <View className="absolute bg-white border border-black/25 w-full rounded-xl bottom-2/3">
                  {Collections.filter((item) => item.id != state.task.collectionId).map(
                    (item, index) => (
                      <Pressable
                        key={index}
                        onPress={() => {
                          dispatch({ target: "Task", type: "COLLECTIONID", payload: item.id });
                          setDropdownVisible(!dropdownVisible);
                        }}
                      >
                        <Text
                          className={`text-xl py-3 px-5 ${
                            index != Collections.length - 1 ? "border-b border-black/[12.5%]" : ""
                          }`}
                        >
                          {item.name}
                        </Text>
                      </Pressable>
                    )
                  )}
                </View>
              ) : null}
            </View>

            {/* add button */}
            <Pressable onPress={handleAddTask} className="bg-main/5 py-4 rounded-3xl mt-8">
              <Text className="text-main/75 text-xl font-medium self-center">Add Task</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* projects */}
      <ScrollView className="my-2 px-8" showsVerticalScrollIndicator={false}>
        {/* tasks filter */}
        {/* <View className="flex-row justify-between">
          {Object.entries(filters).map(([title, correspondTasks], index) => (
            <Pressable
              key={index}
              onPress={() => setFilterSelected(title)}
              className="flex-row items-center"
            >
              <Text
                style={{ color: filterSelected == title ? "#0057fbdf" : "#0000003f" }}
                className="mr-1 text-lg font-medium"
              >
                {title}
              </Text>
              <View
                style={{ backgroundColor: filterSelected == title ? "#0057fb" : "#0000001f" }}
                className="bg-main rounded-full w-[16] h-[16] items-center justify-center"
              >
                <Text className="text-white text-xs">{correspondTasks.length}</Text>
              </View>
              {title == "All" && (
                <View className="bg-black/[12.5%] w-[2] h-[20] absolute -right-1/2 rounded" />
              )}
            </Pressable>
          ))}
        </View> */}

        {/* tasks */}
        {/* <View className="border border-green-500"> */}
          {filters[filterSelected].map((item, index) => (
            <View key={index} className={`bg-white p-4 rounded-lg ${index != 0 ? "mt-3 " : " "}`}>
              <View className="flex-row justify-between border-b border-black/5 pb-3">
                {/* title and project */}
                <View>
                  <Text className={`text-xl font-medium ${item.completed ? "line-through" : ""}`}>
                    {item.name}
                  </Text>
                  <Text className="font-medium text-black/50">{item.collection}</Text>
                </View>
                {/* completed mark */}
                <Pressable
                  onPress={() => updateTask()}
                  style={
                    item.completed
                      ? { backgroundColor: COLORS.primary }
                      : { borderWidth: 2, borderColor: "#0001" }
                  }
                  className="self-center rounded-full p-[5]"
                >
                  <Entypo name="check" size={14} color="#fff" />
                </Pressable>
              </View>
              {/* datetime */}
              <View className="mt-4 flex-row">
                {item._date.day == now.getDate() ? (
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
        {/* </View> */}
      </ScrollView>
    </>
  );
};
