import Svg, { Path, G } from "react-native-svg";
import { COLORS } from "../../constants";

export default PlusSquare = () => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <G>
        {[
          "M12 8.32733V15.6537",
          "M15.6667 11.9905H8.33334",
          "M16.6857 2H7.31429C4.04762 2 2 4.31208 2 7.58516V16.4148C2 19.6879 4.0381 22 7.31429 22H16.6857C19.9619 22 22 19.6879 22 16.4148V7.58516C22 4.31208 19.9619 2 16.6857 2Z",
        ].map((draw, index) => (
          <Path
            key={index}
            d={draw}
            stroke={COLORS.dark}
            strokeWidth="1.75"
            strokeLinecap="round"
            strokeLinejoin="round"
            {...(index === 2 ? { fillRule: "evenodd", clipRule: "evenodd" } : {})}
          />
        ))}
      </G>
    </Svg>
  );
};
