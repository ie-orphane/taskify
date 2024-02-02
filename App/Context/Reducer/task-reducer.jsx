const name = "Task";

const reducer = (state, action) => {
  switch (action.type) {
    case "name":
      return { ...state, name: action.value };
    case "note":
      return { ...state, description: action.value };
    case "collection":
      return { ...state, collection: action.value };
    case "reset":
      return { name: "", note: "", collection: "" };
    default:
      throw new Error(`${name} reducer : undefiened action type: ${action.type}`);
  }
};

const initializer = { name: "", note: "", collection: "" };

export { name, reducer, initializer };
