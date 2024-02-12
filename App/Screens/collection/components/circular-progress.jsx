import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

export const CircularProgressBar = ({ radius, strokeWidth, progress, maxValue, color }) => {
  return (
    <View style={{ height: radius * 2, width: radius * 2 }} className="rounded-full ml-auto">
      <Svg height={radius * 2} width={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="#fff"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${2 * Math.PI * radius}`}
          strokeDashoffset={(1 - progress / maxValue) * 2 * Math.PI * radius}
          strokeLinecap="round"
          strokeLinejoin="round"
          transform={`rotate(-90 ${radius} ${radius})`}
        />
        <Circle
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
          stroke="#f3f4f83f"
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeDasharray={`${2 * Math.PI * radius}`}
        />
      </Svg>

      <View className="w-full h-full absolute items-center justify-center">
        <View
          style={{
            width: (radius - strokeWidth) * 2,
            height: (radius - strokeWidth) * 2,
            // backgroundColor: color + "11"
          }}
          className="rounded-full items-center justify-center"
        >
          <Text className=" text-white font-bold text-lg">{progress}/{maxValue}</Text>
        </View>
      </View>
    </View>
  );
};

// const styles = StyleSheet.create({
//   container: {
//     alignItems: "center",
//   },
//   text: {
//     marginTop: 10,
//     fontSize: 18,
//   },
// });
