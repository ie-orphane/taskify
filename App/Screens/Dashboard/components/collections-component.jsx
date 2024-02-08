import { FlatList, Modal, Pressable, Text, TextInput, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../../context";
import { addCollection } from "../../../../services/firebase";

export const CollectionsComponent = () => {
  const navigate = useNavigation();
  const { user, state, dispatch, Collections, fetchCollections } = useAppContext();

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

  const handleAddCollection = async () => {
    // if (taskInput.trim() !== '') {
    try {
      const newCollection = {
        ...state.collection, // name description color
        userId: user.uid,
        tasks: [],
        completed: 0,
      };
      // add new collection to db
      await addCollection(newCollection);
      // update all collections
      await fetchCollections();
      // reset state to initiale value
      dispatch({ target: "Collection", type: "RESET" });
      // hide modal
      setModalVisible(false);
      // }
    } catch (error) {
      console.error(".../dashboard/.../tasks-components/handleAddTask", error.message);
    }
  };

  return (
    <View className="py-4 bg-white">
      {/* Header & add button */}
      <View className="px-8 flex-row items-center justify-between pb-3">
        {/* heading & description */}
        <View>
          <Text className="text-4xl font-bold text-dark w-3/5">Let’s make a habits together 🙌</Text>
          {/* <Text className="text-black/30 text-lg font-medium">
            You have
            <Text className="text-main font-medium"> {Collections.length} </Text>
            Collections
          </Text> */}
        </View>

        {/* add button */}
        {/* <Pressable onPress={() => setModalVisible(true)} className="bg-primary/5 px-6 py-2 rounded-lg">
          <Text className="text-main/75 text-xl font-medium">+ Add</Text>
        </Pressable> */}
      </View>

      {/* add new collection modal */}
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
            <Text className="text-3xl font-bold mb-6">Create New Collection</Text>
            {/* project name */}
            <View>
              <Text className="text-xl font-bold text-black/75 mb-2">Collection Name</Text>
              <TextInput
                value={state.collection.name}
                onChangeText={(text) =>
                  dispatch({ target: "Collection", type: "NAME", payload: text })
                }
                className="text-xl bg-black/5 py-3 px-5 rounded-xl"
                placeholder="Enter Collection Name"
              />
            </View>

            {/* project description */}
            <View className="mt-6">
              <Text className="text-xl font-bold text-black/75 mb-2">Collection Description</Text>
              <TextInput
                value={state.collection.description}
                onChangeText={(text) =>
                  dispatch({ target: "Collection", type: "DESCRIPTION", payload: text })
                }
                className="text-xl bg-black/5 py-3 px-5 rounded-xl"
                placeholder="Enter Collection Description"
              />
            </View>

            {/* project color */}
            <View className="mt-6">
              <Text className="text-xl font-bold text-black/75 mb-3">Choose a color:</Text>
              <View className="flex-wrap flex-row px-12 justify-center">
                {radioOptions.map((option, index) => (
                  <Pressable
                    key={index}
                    onPress={() => {
                      setRadioSelected(index);
                      dispatch({ target: "Collection", type: "COLOR", payload: option });
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
            <Pressable onPress={handleAddCollection} className="bg-main/5 py-4 rounded-3xl mt-8">
              <Text className="text-main/75 text-xl font-medium self-center">Add Collection</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>

      {/* projects */}
      <FlatList
        data={Collections}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => navigate.navigate("Collection")}
            style={{ backgroundColor: item.color + "c0" }}
            className={`rounded-lg px-7 py-5 w-[275] ${
              index == 0 ? "ml-8 mr-3" : index == Collections.length - 1 ? "ml-3 mr-8" : "mx-3"
            }`}
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
