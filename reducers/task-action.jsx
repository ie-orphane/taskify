const initializer = { name: "", note: "", collectionId: "", date: null };

const reducer = (state, { type, payload }) => {
  switch (type) {
    case "NAME":
      return { ...state, name: payload };
    case "NOTE":
      return { ...state, note: payload };
    case "COLLECTION":
      return { ...state, collectionId: payload };
    case "DATE":
      return { ...state, date: payload };
    case "RESET":
      return { name: "", note: "", collectionId: "", date: null };
    default:
      return state;
  }
};

export { reducer, initializer };
