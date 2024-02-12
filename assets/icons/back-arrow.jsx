import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../styles";

export const BackArrow = () => {
  return (
    <Svg width={20} height={20} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M12.9167 15.8333L7.08335 9.99996L12.9167 4.16663"
        stroke={COLORS.white}
        strokeOpacity={0.75}
        strokeWidth={1.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
