import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../styles";

export const Plus2 = () => {
  return (
    <Svg width={23} height={24} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4 12.5H20M12 4.5V20.5"
        stroke={COLORS.dark}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
