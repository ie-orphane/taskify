import { FlatList, Pressable, Text, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAppContext } from "../../../../context";

export const CollectionsComponent = () => {
  const navigate = useNavigation();
  const { Tasks, Collections } = useAppContext();

  return (
    <View className="py-4 bg-white">
      <View className="px-8 flex-row items-center justify-between mb-6">
        <Text className="text-4xl font-bold text-dark w-[72.5%]">
          Let’s make a habits together 🙌
        </Text>
      </View>

      <FlatList
        data={Collections}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => navigate.navigate("Collection", { item })}
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
                <Text className="text-white/[62.5%]">
                  {Math.trunc(
                    (Tasks.filter((task) => task.collectionId == item.id && task.completed).length /
                      item.tasks.length || 0) * 100
                  )}
                  %
                </Text>
              </View>

              {/* progress bar */}
              <View className="flex-row gap-1">
                {/* {getProgressBar(item).map((width, index) => (
                  <View key={index} className="flex-1 h-[6] relative">
                    <View className="bg-white/25 h-[6] w-[100%] flex-1 rounded absolute"></View>
                    <View style={width} className={`bg-white h-[6] rounded absolute`}></View>
                  </View>
                ))} */}
                <View className="flex-1 h-[6] relative">
                  <View className="bg-white/25 h-[6] w-[100%] flex-1 rounded absolute"></View>
                  <View
                    style={{
                      width: `${
                        (Tasks.filter((task) => task.collectionId == item.id && task.completed)
                          .length /
                          item.tasks.length) *
                          100 || 0
                      }%`,
                    }}
                    className="bg-white h-[6] rounded absolute"
                  ></View>
                </View>
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
