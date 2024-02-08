import { useEffect, useState } from "react";
import { TextInput } from "react-native";
import { COLORS } from "../../constants";

export const FormInput = (props) => {
  const [borderColor, setBorderColor] = useState("#0000003f");

  useEffect(() => {
    props.onError ? setBorderColor("#e11d48") : setBorderColor("#0000003f");
  }, [props.onError]);

  return (
    <TextInput
      onFocus={() => {
        setBorderColor(COLORS.primary);
        props.setError(false);
      }}
      onBlur={() => {
        setBorderColor("#0000003f");
        props.setError(false);
      }}
      style={{ borderColor: borderColor }}
      className={`text-xl border p-4 rounded-lg mt-3`}
      {...props}
    />
  );
};
