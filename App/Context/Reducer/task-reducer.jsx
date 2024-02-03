const name = "Task";

const reducer = (state, { type, value }) => {
  switch (type) {
    case "name":
      return { ...state, name: value };
    case "note":
      return { ...state, description: value };
    case "collection":
      return { ...state, collection: value };
    case "reset":
      return { name: "", note: "", collection: "" };
    default:
      throw new Error(`${name} reducer : undefiened action type: ${type}`);
  }
};

const initializer = { name: "", note: "", collection: "" };

export { name, reducer, initializer };
