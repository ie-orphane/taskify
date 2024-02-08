const initializer = { name: "", note: "", collectionId: "" };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "NAME":
      return { ...state, name: payload };
    case "NOTE":
      return { ...state, note: payload };
    case "COLLECTION":
      return { ...state, collectionId: payload };
    case "RESET":
      return { name: "", note: "", collectionId: "" };
    default:
      return state;
  }
};

export { reducer, initializer };
