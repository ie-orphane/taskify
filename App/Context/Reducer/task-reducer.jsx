const name = "Task";

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.value };
    case "note":
      return { ...state, description: action.value };
    case "reset":
      return { name: "", description: "", color: "" };
    default:
      throw new Error(`undefiened action type: ${action.type}`);
  }
};

const initializer = { name: "", note: "" };

export { name, reducer, initializer };
