import { useState } from "react";

export const useForm = (initialState) => {
  const [formState, setFormState] = useState(initialState);

  const handleChange = (key, value) => {
    const newValue = value;
    setFormState((prev) => ({
      ...prev,
      [key]: newValue,
    }));
  };

  return { formState, setFormState, handleChange };
};
