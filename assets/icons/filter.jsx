import Svg, { Path } from "react-native-svg";
import { COLORS } from "../../styles";

export const Filter = () => {
  return (
    <Svg width={24} height={25} viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
      <Path
        d="M4 5.5L10 5.5M10 5.5C10 6.60457 10.8954 7.5 12 7.5C13.1046 7.5 14 6.60457 14 5.5M10 5.5C10 4.39543 10.8954 3.5 12 3.5C13.1046 3.5 14 4.39543 14 5.5M14 5.5L20 5.5M4 12.5L16 12.5M16 12.5C16 13.6046 16.8954 14.5 18 14.5C19.1046 14.5 20 13.6046 20 12.5C20 11.3954 19.1046 10.5 18 10.5C16.8954 10.5 16 11.3954 16 12.5ZM8 19.5L20 19.5M8 19.5C8 18.3954 7.10457 17.5 6 17.5C4.89543 17.5 4 18.3954 4 19.5C4 20.6046 4.89543 21.5 6 21.5C7.10457 21.5 8 20.6046 8 19.5Z"
        stroke={COLORS.dark}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
};
