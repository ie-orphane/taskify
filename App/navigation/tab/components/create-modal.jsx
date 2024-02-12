import { Modal, Pressable, Text, View } from "react-native";
import { EditeSquare, PlusSquare, X } from "../../../../assets/icons";
import { BlurView } from "expo-blur";
import { SHADOWS } from "../../../../styles";
import { useAppContext } from "../../../../context";
import { CreateTask } from "./create-task";
import { CreateCollection } from "./create-collection";

export const CreateModal = () => {
  const { Collections, modalVisible, toggleHandler, currentMode, setCurrentMode } = useAppContext();
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
    <Modal animationType="fade" transparent={true} visible={modalVisible}>
      <BlurView intensity={5}>
        <Pressable
          onPress={toggleHandler}
          className="content-center h-full justify-end bg-black/25"
        >
          <Pressable
            className="bg-white py-5 px-8 w-full rounded-t-3xl items-center"
            onPress={(e) => e.stopPropagation()}
          >
            <View className="h-[6] w-11 rounded bg-dark/5 mb-8"></View>

            {!currentMode ? (
              <>
                {mods.map(({ name, Icon, component }, index) =>
                  name === "Task" && Collections.length == 0 ? null : (
                    <Pressable
                      key={index}
                      onPress={() => setCurrentMode(component)}
                      className={`flex-row items-center w-full border border-dark/10 rounded-xl py-[14] px-6 mt-4`}
                    >
                      <Icon />
                      <Text className="ml-2 text-[22px] font-medium text-dark">Create {name}</Text>
                    </Pressable>
                  )
                )}

                <Pressable
                  style={SHADOWS.medium}
                  onPress={toggleHandler}
                  className="bg-primary/100 w-11 h-11 items-center justify-center rounded-full mt-4"
                >
                  <X />
                </Pressable>
              </>
            ) : (
              currentMode
            )}
          </Pressable>
        </Pressable>
      </BlurView>
    </Modal>
  );
};
