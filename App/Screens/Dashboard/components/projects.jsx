import { FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useReducer, useState } from "react";
import { Link, useNavigation } from "@react-navigation/native";

const projectsData = [
  {
    id: "0p1245",
    name: "Crypto Wallet Redesign",
    tasks: ["0t1257", "0t5212", "0t6354", "0t3621", "0t7850"],
    completed: 4,
    color: "#f59e0b",
    date: "Jan 27",
    _date: {
      day: 29,
      month: 2,
      year: 2024,
    },
  },
  {
    name: "Buxica Dribble Team",
    tasks: ["0t1257", "0t5212", "0t6354"],
    completed: 1,
    color: "#8b5cf6",
    date: "Jan 19",
    _date: {
      day: 16,
      month: 1,
      year: 2024,
    },
  },
];

class Project {
  constructor(data) {
    this.name = data.name;
    this.color = data.color;
    this.date = data.date;

    const percentage = (data.completed / data.tasks.length) * 100 || 0;
    if (percentage > 100) throw new Error("percentage is greater then 100%");

    const full = parseInt(percentage / 20); // w-[100%] : full
    const rest = parseInt(percentage % 20); // w-[~%] : rest
    const none = 5 - Math.min(parseInt(percentage % 20), 1) - parseInt(percentage / 20); // w-0 : none

    this.bar = [
      ...Array.from({ length: full }, () => {
        return { width: "100%" };
      }),
      ...(rest != 0 ? [{ width: `${rest}%` }] : []),
      ...Array.from({ length: none }, () => {
        return { width: 0 };
      }),
    ];
    this.per = parseInt(percentage);
  }
}

const projects = projectsData.map((data) => new Project(data));

export const ProjectsComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [radioSelected, setRadioSelected] = useState(0);

  const radioOptions = [
    "#f59e0b",
    "#84cc16",
    "#10b981",
    "#06b6d4",
    "#3b82f6",
    "#8b5cf6",
    "#d946ef",
    "#f43f5e",
  ];
  const navigate = useNavigation();

  const reducer = (state, action) => {
    switch (action.type) {
      case "name":
        // throw new Error("eroror")
        return { ...state, name: action.value };
      case "description":
        return { ...state, description: action.value };
      case "color":
        return { ...state, color: action.value };
      case "new":
        return { name: "", description: "", color: "" };
      default:
        throw new Error("undefiened action.type");
    }
  };

  const [project, dispath] = useReducer(reducer, { name: "", description: "", color: "" });

  return (
    <View className="px-8 py-4 bg-white/75">
      <View className="flex-row items-center justify-between pb-6">
        {/* heading & description */}
        <View>
          <Text className="text-3xl font-bold">Projects</Text>
          <Text className="text-black/30 text-lg font-medium">
            You have
            <Text className="text-main font-medium"> {projects.length} </Text>
            Projects
          </Text>
        </View>

        {/* add button */}
        <Pressable onPress={() => setModalVisible(true)} className="bg-main/5 px-6 py-2 rounded-lg">
          <Text className="text-main/75 text-xl font-medium">+ Add</Text>
        </Pressable>
      </View>

      {/* add new project modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <Pressable
          onPress={() => setModalVisible(false)}
          className="content-center h-screen bg-black/[62.5%] justify-end"
        >
          {/* modal body */}
          <Pressable
            className="bg-white self-end py-10 px-8 rounded-t-[50]"
            onPress={(e) => {
              e.stopPropagation();
            }}
          >
            {/* title */}
            <Text className="text-3xl font-bold mb-6">Create New Project</Text>
            {/* project name */}
            <View>
              <Text className="text-xl font-bold text-black/75 mb-2">Project Name</Text>
              <TextInput
                value={project.name}
                onChangeText={(text) => dispath({ type: "name", value: text })}
                className="text-xl bg-black/5 py-3 px-5 rounded-xl"
                placeholder="Enter Project Name"
              />
            </View>

            {/* project description */}
            <View className="mt-6">
              <Text className="text-xl font-bold text-black/75 mb-2">Project Description</Text>
              <TextInput
                value={project.description}
                onChangeText={(text) => dispath({ type: "description", value: text })}
                className="text-xl bg-black/5 py-3 px-5 rounded-xl"
                placeholder="Enter Project Description"
              />
            </View>

            {/* project color */}
            <View className="mt-6 mb-8">
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
            </View>

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

                dispath({ type: "new" });
                setModalVisible(false);
              }}
              className="bg-main/5 py-4 rounded-3xl"
            >
              <Text className="text-main/75 text-xl font-medium self-center">Add Project</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      <FlatList
        data={projects}
        keyExtractor={(_, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => navigate.navigate("Project")}
            style={{ backgroundColor: item.color + "c0" }}
            className={`rounded-lg px-7 py-5 w-[275] ${index != 0 ? "ml-3 " : " "}`}
          >
            {/* title */}
            <Text className="text-white text-2xl font-semibold capitalize">{item.name}</Text>

            {/* progress */}
            <View className="py-6">
              <View className="flex-row justify-between pb-2">
                <Text className="text-white/[62.5%]">Progress</Text>
                <Text className="text-white/[62.5%]">{item.per}%</Text>
              </View>

              {/* progress bar */}
              <View className="flex-row gap-1">
                {item.bar.map((width, index) => (
                  <View key={index} className="flex-1 h-[6] relative">
                    <View className="bg-white/25 h-[6] w-[100%] flex-1 rounded absolute"></View>
                    <View style={width} className={`bg-white h-[6] rounded absolute`}></View>
                  </View>
                ))}
              </View>
            </View>

            {/* foot : info */}
            <View className="flex-row items-center">
              <EvilIcons name="calendar" size={28} color="rgba(255,255,255,.5)" />
              <Text className="text-white/50">{item.date}</Text>
            </View>
          </Pressable>
        )}
      />
    </View>
  );
};
