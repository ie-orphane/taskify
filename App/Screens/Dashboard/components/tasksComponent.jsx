import { useState } from "react";
import { FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { COLORS } from "../../../../constants";
import { useAppContext } from "../../../Context";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export const TasksComponent = () => {
  const now = new Date();
  const { Task, Tasks, Projects } = useAppContext();
  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [filterSelected, setFilterSelected] = useState("All");

  const filters = {
    All: Tasks.state,
    Today: Tasks.state.filter((task) => task._date.day == now.getDate()),
    "to do": Tasks.state.filter((task) => !task.completed),
    Completed: Tasks.state.filter((task) => task.completed),
  };

  return (
    <View className="px-8 py-6 h-full">
      {/* Header & add button */}
      <View className="flex-row items-center justify-between pb-6">
        {/* heading & description */}
        <View>
          <Text className="text-3xl font-bold">Tasks</Text>
          <Text className="text-black/25 text-lg font-medium">
            {`${days[now.getDay()]}, ${now.getDate()} ${months[now.getMonth()]}`}
          </Text>
        </View>

        {/* add button */}
        <Pressable onPress={() => setModalVisible(true)} className="bg-main/5 px-6 py-2 rounded-lg">
          <Text className="text-main/75 text-xl font-medium">+ New Task</Text>
        </Pressable>
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
                value={Task.state.name}
                onChangeText={(text) => Task.dispatch({ type: "name", value: text })}
                className="text-xl bg-black/5 py-3 px-5 rounded-xl"
                placeholder="Enter Task Name"
              />
            </View>

            {/* task description */}
            <View className="mt-6">
              <Text className="text-xl font-bold text-black/75 mb-2">Task Note</Text>
              <TextInput
                value={Task.state.description}
                onChangeText={(text) => Task.dispatch({ type: "note", value: text })}
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
                {Task.state.collection == "" ? (
                  <Text className="text-xl text-black/[37.5%]">Choose a collection</Text>
                ) : (
                  <Text className="text-xl">{Task.state.collection}</Text>
                )}

                <Entypo
                  name={dropdownVisible ? "chevron-up" : "chevron-right"}
                  size={24}
                  color="#000b"
                />
              </Pressable>
              {dropdownVisible ? (
                <View className="absolute bg-white border border-black/25 w-full rounded-xl bottom-2/3">
                  {Projects.state
                    .filter((item) => item.name != Task.state.collection)
                    .map((item, index) => (
                      <Pressable
                        key={index}
                        onPress={() => {
                          Task.dispatch({ type: "collection", value: item.name });
                          setDropdownVisible(!dropdownVisible);
                        }}
                      >
                        <Text
                          className={`text-xl py-3 px-5 ${
                            index != Projects.state.length - 1
                              ? "border-b border-black/[12.5%]"
                              : ""
                          }`}
                        >
                          {item.name}
                        </Text>
                      </Pressable>
                    ))}
                </View>
              ) : null}
            </View>

            {/* add button */}
            <Pressable
              onPress={() => {
                const now = new Date();
                const newTask = {
                  ...Task.state,
                  completed: false,
                  // start: "10:00 PM",
                  // end: "11:45 PM",
                  date: "1 February",
                  _date: {
                    day: now.getDate(),
                    month: now.getMonth(),
                    year: now.getFullYear(),
                  },
                };
                // add new projects item to state
                Tasks.dispatch({ type: "new", value: newTask });
                // reset the state the iniale value
                Task.dispatch({ type: "reset" });
                // hide the modal
                setModalVisible(false);
              }}
              className="bg-main/5 py-4 rounded-3xl mt-8"
            >
              <Text className="text-main/75 text-xl font-medium self-center">Add Task</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* projects */}
      <View>
        {/* tasks filter */}
        <View className="flex-row justify-between">
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
        </View>

        {/* tasks */}
        <FlatList
          className="mt-8 max-h-[40vh]"
          data={filters[filterSelected]}
          keyExtractor={(_, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <View className={`bg-white/75 p-4 rounded-lg ${index != 0 ? "mt-3 " : " "}`}>
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
                  onPress={() => Tasks.dispatch({ type: "completed", value: item.id })}
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
          )}
        />
      </View>
    </View>
  );
};
