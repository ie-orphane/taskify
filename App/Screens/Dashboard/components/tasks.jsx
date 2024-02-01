import { useState } from "react";
import { Pressable, Text, View } from "react-native";

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

// const tasksData = [
//   {
//     id: 1257,
//     name: "Client Review & Feedback",
//     description: "get client reviews and feedbacks",
//     project: {
//         id: 2145,
//         name: "Crypto Wallet Redesign"
//     },
//     completed: false,
//     start: "10:00 PM",
//     end: "11:45 PM",
//     date: "Jan 27",
//     _date: {
//       day: 29,
//       month: 2,
//       year: 2024,
//     },
//   },
// ];

// class Task {
//   constructor(data) {
//     this.name = data.name;
//     this.color = data.color;
//     this.date = data.date;

//     const percentage = (data.completed / data.tasks.length) * 100 || 0;
//     if (percentage > 100) throw new Error("percentage is greater then 100%");

//     const full = parseInt(percentage / 20); // w-[100%] : full
//     const rest = parseInt(percentage % 20); // w-[~%] : rest
//     const none = 5 - Math.min(parseInt(percentage % 20), 1) - parseInt(percentage / 20); // w-0 : none

//     this.bar = [
//       ...Array.from({ length: full }, () => {
//         return { width: "100%" };
//       }),
//       ...(rest != 0 ? [{ width: `${rest}%` }] : []),
//       ...Array.from({ length: none }, () => {
//         return { width: 0 };
//       }),
//     ];
//     this.per = parseInt(percentage);
//   }
// }

// const tasks = projectsData.map((data) => new Project(data));

export const TasksComponent = () => {
  const now = new Date();
  const [modalVisible, setModalVisible] = useState(false);
  const [filterSelected, setFilterSelected] = useState("All");

  return (
    <View className="px-8 py-6">
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

      <View>
        {/* tasks filter */}
        <View className="flex-row justify-between">
          {["All", "Today", "to do", "Completed"].map((filter, index) => (
            <Pressable
              key={index}
              onPress={() => setFilterSelected(filter)}
              className="flex-row items-center"
            >
              <Text
                style={{ color: filterSelected == filter ? "#0057fbdf" : "#0000003f" }}
                className="mr-1 text-lg font-medium"
              >
                {filter}
              </Text>
              <View
                style={{ backgroundColor: filterSelected == filter ? "#0057fb" : "#0000001f" }}
                className="bg-main rounded-full w-[16] h-[16] items-center justify-center"
              >
                <Text className="text-white text-xs">7</Text>
              </View>
              {filter == "All" && (
                <View className="bg-black/[12.5%] w-[2] h-[20] absolute -right-1/2 rounded" />
              )}
            </Pressable>
          ))}
        </View>

        {/* tasks */}

      </View>
    </View>
  );
};
