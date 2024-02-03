const name = "Collections";

const reducer = (state, { type, payload }) => {
  console.log("colections")
  switch (type) {
    case "SET":
      console.log("setting", payload)
      return payload;
    case "New":
      return [payload, ...state];
    default:
      throw new Error(`${name} reducer : undefiened action type: ${type}`);
  }
};

const initializer = [];

export { name, reducer, initializer };
