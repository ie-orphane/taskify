const name = "Collection";

const reducer = (state, { type, value }) => {
  switch (type) {
    case "NAME":
      return { ...state, name: value };
    case "DESCRIPTION":
      return { ...state, description: value };
    case "COLOR":
      return { ...state, color: value };
    case "RESET":
      return { name: "", description: "", color: "" };
    default:
      throw new Error(`${name} reducer : undefiened action type: ${type}`);
  }
};

const initializer = { name: "", description: "", color: "" };

export { name, reducer, initializer };
