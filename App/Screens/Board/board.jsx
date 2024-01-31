import { useState } from "react";
import { Pressable, View } from "react-native";

// function RadioButton() {
//   const [radioButton, setRadioButton] = useState("Yes");
//   return (
//     <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
//       <TouchableOpacity onPress={() => setRadioButton("Yes")}>
//         <Text>
//           <Ionicons
//             name={radioButton === "Yes" ? "radio-button-on" : "radio-button-off"}
//             size={18}
//             color="green"
//           />
//           Yes
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => setRadioButton("No")}>
//         <Text>
//           <Ionicons
//             name={radioButton === "No" ? "radio-button-on" : "radio-button-off"}
//             size={18}
//             color="green"
//           />
//           No
//         </Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// function RadioButton(props) {
//   return (
//     <View
//       style={[
//         {
//           height: 24,
//           width: 24,
//           borderRadius: 12,
//           borderWidth: 2,
//           borderColor: "#000",
//           alignItems: "center",
//           justifyContent: "center",
//         },
//         props.style,
//       ]}
//     >
//       {props.selected ? (
//         <View
//           style={{
//             height: 12,
//             width: 12,
//             borderRadius: 6,
//             backgroundColor: "#000",
//           }}
//         />
//       ) : null}
//     </View>
//   );
// }

export const BoardScreen = () => {
  const [radioSelected, setRadioSelected] = useState(1);

  const products = [
    {
      id: 1,
    },
    {
      id: 2,
    },
    {
      id: 3,
    },
  ];

  return products.map((val) => {
    return (
      <Pressable key={val.id} onPress={() => {setRadioSelected(val.id)}}>
        <View
          style={{
            height: 24,
            width: 24,
            borderRadius: 12,
            borderWidth: 2,
            borderColor: "#000",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {val.id == radioSelected ? (
            <View
              style={{
                height: 12,
                width: 12,
                borderRadius: 6,
                backgroundColor: "#000",
              }}
            />
          ) : null}
        </View>
      </Pressable>
    );
  });
};
