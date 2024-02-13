import { useEffect, useState } from "react";
import { COLORS } from "../../../../styles";
import { TextInput } from "react-native";

export const CreateInput = (props) => {
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
        props.handleErrorChange(props.title, false);
      }}
      onBlur={() => {
        setBorderColor(blurBorderColor);
        props.handleErrorChange(props.title, false);
      }}
      style={{ borderColor: borderColor }}
      className="text-xl border p-4 rounded-lg text-dark font-medium"
      placeholderTextColor={"#0003"}
    />
  );
};
