const initializer = { name: "", description: "", color: "" };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "NAME":
      return { ...state, name: payload };
    case "DESCRIPTION":
      return { ...state, description: payload };
    case "COLOR":
      console.log(payload);
      return { ...state, color: payload };
    case "RESET":
      return { name: "", description: "", color: "" };
    default:
      return state;
  }
};

export { reducer, initializer };
