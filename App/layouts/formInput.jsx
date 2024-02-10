import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { COLORS } from "../../styles";

export const FormInput = (props) => {
  const blurBorderColor = COLORS.primary + "1f";
  const [borderColor, setBorderColor] = useState(blurBorderColor);

  useEffect(() => {
    props.onError ? setBorderColor("#e11d48") : setBorderColor(blurBorderColor);
  }, [props.onError]);

  return (
    <TextInput
      {...props}
      onFocus={() => {
        setBorderColor(COLORS.primary);
        props?.setError(false);
      }}
      onBlur={() => {
        setBorderColor(blurBorderColor);
        props?.setError(false);
      }}
      style={{ borderColor: borderColor }}
      className="text-xl border p-4 rounded-lg mt-3"
      placeholderTextColor={"#0003"}
    />
  );
};
