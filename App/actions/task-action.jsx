const name = "Task";

const reducer = (state, { type, value }) => {
  switch (type) {
    case "NAME":
      return { ...state, name: value };
    case "NOTE":
      return { ...state, description: value };
    case "COLLECTION":
      return { ...state, collection: value };
    case "RESET":
      return { name: "", note: "", collection: "" };
    default:
      throw new Error(`${name} reducer : undefiened action type: ${type}`);
  }
};

const initializer = { name: "", note: "", collection: "" };

export { name, reducer, initializer };
