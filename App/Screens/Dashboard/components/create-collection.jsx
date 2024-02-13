import { Pressable, Text, View } from "react-native";
import { SHADOWS } from "../../../../styles";
import { capitalize } from "../../../../utils/helpers";
import { useAppContext } from "../../../../context";
import { useForm } from "../../../../hooks";
import { useState } from "react";
import { addCollection } from "../../../../services/firebase";
import { CreateInput } from "./create-input";

export const CreateCollection = () => {
  const { user, fetchCollections, toggleHandler } = useAppContext();

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

  const { formState, handleChange } = useForm({
    name: "",
    description: "",
    color: "#f59e0b",
  });

  const [onError, setError] = useState({
    name: false,
    description: false,
  });

  const handleErrorChange = (key, value) => {
    const newValue = value;
    setError((prev) => {
      return {
        ...prev,
        [key]: newValue,
      };
    });
  };

  const handleAddCollection = async () => {
    if (formState.name.trim() == "") {
      handleErrorChange("name", true);
      return;
    }

    if (formState.description.trim() == "") {
      handleErrorChange("description", true);
      return;
    }

    setError({
      name: false,
      description: false,
    });

    try {
      const newCollection = {
        ...formState, // name description color
        userId: user.uid,
        tasks: [],
        completedTasks: 0,
      };
      // add new collection to db
      await addCollection(newCollection);
      // update all collections
      await fetchCollections();
      // hide the modal
      toggleHandler();
    } catch (error) {
      console.error(".../create-collection/handleAddCollection", error.message);
    }
  };

  return (
    <>
      {["name", "description"].map((title, index) => (
        <View key={index} className="w-full mb-6">
          <Text className="text-lg tracking-wider text-black/[32.5%] font-medium mb-1">
            Collection {capitalize(title)}
          </Text>
          <CreateInput
            value={formState[title]}
            onChangeText={(text) => {
              handleChange(title, text);
            }}
            placeholder={`Enter Collection ${capitalize(title)}`}
            onError={onError[title]}
            {...{ title, handleErrorChange }}
          />
        </View>
      ))}

      <View className="w-full mb-6">
        <Text className="text-lg tracking-wider text-black/[32.5%] font-medium mb-1">
          Choose a color:
        </Text>
        <View className="flex-wrap flex-row px-12">
          {radioOptions.map((option, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setRadioSelected(index);
                handleChange("color", option);
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

      <Pressable
        onPress={handleAddCollection}
        style={SHADOWS.medium}
        className="bg-primary rounded-2xl py-3 w-[75%] mt-6"
      >
        <Text className="text-white text-2xl text-center">Add Collection</Text>
      </Pressable>
    </>
  );
};
