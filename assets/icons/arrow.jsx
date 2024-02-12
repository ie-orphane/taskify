import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../styles";

export const Arrow = ({ color, rotate }) => {
  return (
    <Svg
      rotation={rotate ?? 0}
      width={14}
      height={14}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Path
        d="M12.9167 15.8333L7.08335 9.99996L12.9167 4.16663"
        stroke={COLORS[color]}
        strokeOpacity={0.875}
        strokeWidth={2.75}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
