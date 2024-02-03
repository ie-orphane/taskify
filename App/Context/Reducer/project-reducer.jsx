const name = "Project";

const reducer = (state, { type, value }) => {
  switch (type) {
    case "name":
      return { ...state, name: value };
    case "description":
      return { ...state, description: value };
    case "color":
      return { ...state, color: value };
    case "reset":
      return { name: "", description: "", color: "" };
    default:
      throw new Error(`${name} reducer : undefiened action type: ${type}`);
  }
};

const initializer = { name: "", description: "", color: "" };

export { name, reducer, initializer };
