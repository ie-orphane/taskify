import { useState } from "react";
import { useAppContext } from "../../../../context";
import { useForm } from "../../../../hooks";
import { Pressable, Text, View } from "react-native";
import { CreateInput } from "./create-input";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Entypo } from "@expo/vector-icons";
import { addTask } from "../../../../services/firebase";
import { capitalize } from "../../../../utils/helpers";
import { COLORS, SHADOWS } from "../../../../styles";

export const CreateTask = () => {
  const { user, fetchTasks, Collections, toggleHandler } = useAppContext();

  const [showDateTime, setShowDateTime] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);

  const now = new Date();
  const { formState, handleChange } = useForm({
    name: "",
    note: "",
    collectionId: Collections[0]?.id,
    date: now,
    start: now,
    end: new Date(new Date().setHours(now.getHours() + 1)),
  });

  const [onError, setError] = useState({
    name: false,
    note: false,
    start: false,
    end: false,
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

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };

  const formattedDate = (date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "2-digit",
    });
  };

  const formattedTime = (date) => {
    return date
      .toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
      .toLowerCase();
  };

  const handleAddTask = async () => {
    if (formState.name.trim() == "") {
      handleErrorChange("name", true);
      return;
    }

    if (formState.note.trim() == "") {
      handleErrorChange("note", true);
      return;
    }

    setError({
      name: false,
      note: false,
      start: false,
      end: false,
    });

    try {
      const newTask = {
        ...formState, // name note collectionId date start end
        userId: user.uid,
        completed: false,
      };
      // add new task to db
      await addTask(newTask);
      // update all tasks
      await fetchTasks();
      // hide the modal
      toggleHandler();
    } catch (error) {
      console.error(".../create-task/handleAddTask", error.message);
    }
  };

  return (
    <>
      {["name", "note"].map((title, index) => (
        <View key={index} className="w-full mb-2 bg-white rounded-lg py-1 px-2">
          <Text className="text-lg tracking-wider text-black/[32.5%] font-medium mb-1">
            Task {capitalize(title)}
          </Text>
          <CreateInput
            value={formState[title]}
            onChangeText={(text) => {
              handleChange(title, text);
            }}
            placeholder={`Enter Task ${capitalize(title)}`}
            onError={onError[title]}
            {...{ title, handleErrorChange }}
          />
        </View>
      ))}

      <View className="w-full mb-2 bg-white rounded-lg py-1 px-2">
        <Text className="text-lg tracking-wider text-black/[32.5%] font-medium mb-1">
          Collection
        </Text>

        <Pressable
          onPress={toggleDropdown}
          style={{ borderColor: COLORS.primary + "1f" }}
          className="flex-row justify-between p-4 rounded-lg border"
        >
          <Text className="text-xl text-dark font-medium">
            {Collections.find((item) => item.id == formState.collectionId)?.name}
          </Text>

          <Entypo
            name={dropdownVisible ? "chevron-down" : "chevron-right"}
            size={24}
            color={COLORS.dark + "bf"}
          />
        </Pressable>

        {dropdownVisible ? (
          <View className="absolute bg-white border z-10 border-black/25 w-full rounded-xl top-full">
            {Collections.filter((item) => item.id != formState.collectionId).map((item, index) => (
              <Pressable
                key={index}
                onPress={() => {
                  handleChange("collectionId", item.id);
                  toggleDropdown();
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
            ))}
          </View>
        ) : null}
      </View>

      <View className="w-full mb-2 bg-white rounded-lg py-1 px-2">
        <Text className="text-lg tracking-wider text-black/[32.5%] font-medium mb-1">Date</Text>
        <Text
          style={{ borderColor: COLORS.primary + "1f" }}
          onPress={() => setShowDateTime("date")}
          className="text-xl p-4 rounded-lg border text-dark font-medium"
        >
          {formattedDate(formState.date)}
        </Text>
        {showDateTime == "date" && (
          <DateTimePicker
            minimumDate={now}
            value={formState.date}
            onChange={(_, date) => {
              handleChange("date", date);
              setShowDateTime("");
            }}
          />
        )}
      </View>

      <View className="flex-row justify-between w-full">
        {["start", "end"].map((title, index) => (
          <View key={index} className="w-[49%] bg-white rounded-lg py-1 px-2">
            <Text className="text-lg tracking-wider text-black/[32.5%] font-medium mb-1">
              {capitalize(title)} Time
            </Text>
            <Text
              style={{ borderColor: COLORS.primary + "1f" }}
              onPress={() => setShowDateTime(title)}
              className="text-xl p-4 rounded-lg border text-dark font-medium"
            >
              {formattedTime(formState[title])}
            </Text>
            {showDateTime == title && (
              <DateTimePicker
                value={formState[title]}
                onChange={(_, date) => {
                  handleChange(title, date);
                  setShowDateTime("");
                }}
                mode="time"
              />
            )}
          </View>
        ))}
      </View>

      <Pressable
        onPress={handleAddTask}
        style={SHADOWS.medium}
        className="bg-primary rounded-2xl py-3 w-[75%] mt-4"
      >
        <Text className="text-white text-2xl text-center">Add Task</Text>
      </Pressable>
    </>
  );
};
