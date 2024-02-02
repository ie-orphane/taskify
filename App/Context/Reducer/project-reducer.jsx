const name = "Project";

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.value };
    case "description":
      return { ...state, description: action.value };
    case "color":
      return { ...state, color: action.value };
    case "reset":
      return { name: "", description: "", color: "" };
    default:
      throw new Error(`undefiened action type: ${action.type}`);
  }
};

const initializer = { name: "", description: "", color: "" };

export { name, reducer, initializer };
