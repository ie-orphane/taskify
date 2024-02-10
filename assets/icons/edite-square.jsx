import Svg, { Path, G } from "react-native-svg";
import { COLORS } from "../../constants";

export default EditeSquare = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G>
        {[
          "M11.4923 2.789H7.7533C4.6783 2.789 2.75031 4.966 2.75031 8.048V16.362C2.75031 19.444 4.6693 21.621 7.7533 21.621H16.5773C19.6623 21.621 21.5813 19.444 21.5813 16.362V12.334",
          "M8.82782 10.9209L16.3008 3.44793C17.2318 2.51793 18.7408 2.51793 19.6718 3.44793L20.8888 4.66493C21.8198 5.59593 21.8198 7.10593 20.8888 8.03593L13.3798 15.5449C12.9728 15.9519 12.4208 16.1809 11.8448 16.1809H8.09882L8.19282 12.4009C8.20682 11.8449 8.43382 11.3149 8.82782 10.9209Z",
          "M15.1652 4.60254L19.7312 9.16854",
        ].map((draw, index) => (
          <Path
            key={index}
            d={draw}
            stroke={COLORS.dark}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...(index === 1 ? { fillRule: "evenodd", clipRule: "evenodd" } : {})}
          />
        ))}
      </G>
    </Svg>
  );
};