import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Entypo, FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { COLORS } from "../../constants";
import { useAppContext } from "../../context";
import { HomeNavigation } from "./home-navigation";
import { ProfileScreen, BoardScreen, CreateScreen } from "../Screens";
import { useState } from "react";
import { Modal, Pressable, Text, View, TextInput } from "react-native";

const Tab = createBottomTabNavigator();

export const TabNavigation = () => {
  const { homeRoute } = useAppContext();

  const [modalVisible, setModalVisible] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const [tabs, setTabs] = useState([
    {
      name: "Home",
      component: HomeNavigation,
      barIcon: ({ focused }) => (
        <Entypo name="home" size={28} color={focused ? COLORS.primary : COLORS.gray} />
      ),
    },
    {
      name: "Board",
      title: "",
      component: BoardScreen,
      barIcon: ({ focused }) => (
        <MaterialCommunityIcons
          name="clipboard-list"
          size={28}
          color={focused ? COLORS.primary : COLORS.gray}
        />
      ),
    },
    {
      name: "Profile",
      title: "",
      component: ProfileScreen,
      barIcon: ({ focused }) => (
        <FontAwesome name="user" size={24} color={focused ? COLORS.primary : COLORS.gray} />
      ),
    },
    {
      name: "Create",
      component: CreateScreen,
      title: "",
      barIcon: ({ focused }) => (
        <View className="bg-primary/100 w-11 h-11 items-center justify-center rounded-full">
          <Entypo name="plus" size={28} color="white" />
        </View>
      ),
    },
  ]);

  const handleActiveBar = (activeName) => {
    const newTabs = tabs.map((tab) => {
      tab.name == activeName ? (tab.title = activeName) : (tab.title = "");
      return tab;
    });
    setTabs(newTabs);
  };

  const { user, state, dispatch, fetchTasks, Collections } = useAppContext();

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
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: "bold",
            marginTop: 14,
            backgroundColor: "black",
            width: "100%",
            height: "50%",
          },
          tabBarItemStyle: {
            backgroundColor: "yellow",
            alignItems: "center",
            alignContent: "center",
            justifyContent: "center",
          },
          tabBarStyle:
            homeRoute != "Dashboard"
              ? { display: "none" }
              : { backgroundColor: "red", height: 150 },
        }}
      >
        {tabs.map((tab, index) => (
          <Tab.Screen
            key={index}
            name={tab.name}
            component={tab.component}
            options={{
              tabBarIcon: tab.barIcon,
              title: tab.title,
            }}
            listeners={{
              tabPress: (e) => {
                if (tab.name === "Create") e.preventDefault(), setModalVisible(true);
                else handleActiveBar(e.target.split("-")[0]);
              },
            }}
          />
        ))}
      </Tab.Navigator>

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
    </>
  );
};
