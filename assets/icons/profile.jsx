import Svg, { Path, G } from "react-native-svg";
import { COLORS } from "../../constants";

export default Profile = ({ active }) => {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      {active ? (
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.294 7.29105C17.294 10.2281 14.9391 12.5831 12 12.5831C9.0619 12.5831 6.70601 10.2281 6.70601 7.29105C6.70601 4.35402 9.0619 2 12 2C14.9391 2 17.294 4.35402 17.294 7.29105ZM12 22C7.66237 22 4 21.295 4 18.575C4 15.8539 7.68538 15.1739 12 15.1739C16.3386 15.1739 20 15.8789 20 18.599C20 21.32 16.3146 22 12 22Z"
          fill={COLORS.primary}
        />
      ) : (
        <G>
          {[
            "M11.9848 15.3462C8.11714 15.3462 4.81429 15.931 4.81429 18.2729C4.81429 20.6148 8.09619 21.2205 11.9848 21.2205C15.8524 21.2205 19.1543 20.6348 19.1543 18.2938C19.1543 15.9529 15.8733 15.3462 11.9848 15.3462Z",
            "M11.9848 12.0059C14.5229 12.0059 16.58 9.94782 16.58 7.40972C16.58 4.87163 14.5229 2.81448 11.9848 2.81448C9.44667 2.81448 7.38857 4.87163 7.38857 7.40972C7.38 9.93925 9.42381 11.9973 11.9524 12.0059H11.9848Z",
          ].map((draw, index) => (
            <Path
              key={index}
              fillRule="evenodd"
              clipRule="evenodd"
              d={draw}
              stroke={COLORS.dark}
              strokeOpacity={0.5}
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </G>
      )}
    </Svg>
  );
};
