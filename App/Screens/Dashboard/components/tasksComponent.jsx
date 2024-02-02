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
  const [modalVisible, setModalVisible] = useState(false);
  const [filterSelected, setFilterSelected] = useState("All");
  const { Task, Tasks } = useAppContext();

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
            {/* project name */}
            <View>
              <Text className="text-xl font-bold text-black/75 mb-2">Task Name</Text>
              <TextInput
                value={Task.state.name}
                onChangeText={(text) => Task.dispatch({ type: "name", value: text })}
                className="text-xl bg-black/5 py-3 px-5 rounded-xl"
                placeholder="Enter Task Name"
              />
            </View>

            {/* project description */}
            <View className="mt-6">
              <Text className="text-xl font-bold text-black/75 mb-2">Task Note</Text>
              <TextInput
                value={Task.state.description}
                onChangeText={(text) => Task.dispatch({ type: "note", value: text })}
                className="text-xl bg-black/5 py-3 px-5 rounded-xl"
                placeholder="Enter Task Note"
              />
            </View>

            {/* project color */}
            {/* <View className="mt-6 mb-8">
              <Text className="text-xl font-bold text-black/75 mb-3">Choose a color:</Text>
              <View className="flex-wrap flex-row px-12 justify-center">
                {radioOptions.map((option, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setRadioSelected(index);
                      dispath({ type: "color", value: option });
                    }}
                  >
                    <View
                      style={{ borderColor: option }}
                      className={`w-[50] h-[50] items-center justify-center rounded-lg ${
                        index == radioSelected ? "border-2" : ""
                      }`}
                    >
                      <View style={{ backgroundColor: option }} className="w-[40] h-[40] rounded" />
                    </View>
                  </Pressable>
                ))}
              </View>
            </View> */}

            {/* add button */}
            <Pressable
              onPress={() => {
                const now = new Date();
                const newProject = new Project({
                  ...project,
                  tasks: [],
                  completed: 0,
                  date: now.toDateString().split(" ").slice(1, -1).join(" "),
                  _date: {
                    day: now.getDate(),
                    month: now.getMonth(),
                    year: now.getFullYear(),
                  },
                });
                projects.unshift(newProject);

                // reset the state the iniale value
                Task.dispatch({ type: "new" });
                // hide the modal
                setModalVisible(false);
              }}
              className="bg-main/5 py-4 rounded-3xl mt-8"
            >
              <Text className="text-main/75 text-xl font-medium self-center">Add Project</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* projects */}
      <View>
        {/* tasks filter */}
        <View className="flex-row justify-between">
          {[
            ["All", Tasks.state.length],
            ["Today", Tasks.state.filter((task) => task._date.day == now.getDate()).length],
            ["to do", Tasks.state.filter((task) => !task.completed).length],
            ["Completed", Tasks.state.filter((task) => task.completed).length],
          ].map(([title, count], index) => (
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
                <Text className="text-white text-xs">{count}</Text>
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
          data={Tasks.state}
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
                  <Text className="font-medium text-black/50">{item.project.name}</Text>
                </View>
                {/* completed mark */}
                <Pressable
                  onPress={() =>
                    Tasks.dispatch({ type: "completed", index: index, value: !item.completed })
                  }
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
