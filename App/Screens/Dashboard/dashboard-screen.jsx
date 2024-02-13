import { Modal, Pressable, View, Text } from "react-native";
import { useAppContext } from "../../../context";
import { CollectionsComponent } from "./components/collections-component";
import { TasksComponent } from "./components/tasks-component";
import { UserComponent } from "./components/user-component";
import { EditeSquare, Plus, PlusSquare, X } from "../../../assets/icons";
import { BlurView } from "expo-blur";
import { CreateTask } from "./components/create-task";
import { CreateCollection } from "./components/create-collection";

export const DashboardScreen = () => {
  const { toggleHandler, modalVisible, currentMode, setCurrentMode, Collections } = useAppContext();

  const mods = [
    {
      name: "Task",
      component: <CreateTask />,
      Icon: EditeSquare,
    },
    {
      name: "Collection",
      component: <CreateCollection />,
      Icon: PlusSquare,
    },
  ];

  return (
    <>
      <UserComponent />
      <CollectionsComponent />
      <TasksComponent />

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <BlurView intensity={5}>
          <Pressable
            onPress={toggleHandler}
            className="h-full items-center justify-end bg-black/25 pl-4 pr-8 pb-12"
          >
            <View className="h-[6] w-11 rounded bg-white mb-4"></View>

            {currentMode ?? (
              <>
                {mods.map(({ name, Icon, component }, index) =>
                  name === "Task" && Collections.length == 0 ? null : (
                    <Pressable
                      key={index}
                      onPress={(e) => {
                        e.stopPropagation();
                        setCurrentMode(component);
                      }}
                      className={`flex-row items-center w-full border bg-white border-dark/10 rounded-xl py-4 px-6 mb-4`}
                    >
                      <Icon />
                      <Text className="ml-2 text-[22px] font-medium text-dark">Create {name}</Text>
                    </Pressable>
                  )
                )}
              </>
            )}
          </Pressable>

          <Pressable
            onPress={toggleHandler}
            className="bg-primary w-11 h-11 items-center justify-center rounded-full absolute bottom-3 right-3"
          >
            <X />
          </Pressable>
        </BlurView>
      </Modal>

      <Pressable
        onPress={toggleHandler}
        className="bg-primary w-11 h-11 items-center justify-center rounded-full absolute bottom-3 right-3"
      >
        <Plus />
      </Pressable>
    </>
  );
};
