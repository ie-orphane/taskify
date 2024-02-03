import { useEffect, useReducer } from "react";
import { useAppContext } from "../Context";
import { fetchUserCollections } from "../../services/firebase";
import { Collection } from "../utils/classes";

export const useCollections = () => {
  const reducer = (state, { type, payload }) => {
    switch (type) {
      case "SET":
        return payload;
      case "New":
        return [payload, ...state];
      default:
        throw new Error(`undefiened collectionReducer action type: ${type}`);
    }
  };

  const [state, dispatch] = useReducer(reducer, []);
  const { user } = useAppContext();

  useEffect(() => {
    const fetchData = async () => {
      const userCollections = await fetchUserCollections(user.id);
      dispatch({ type: "SET", payload: userCollections.map((data) => new Collection(data)) });
    };
    fetchData();
  }, []);

  return [state, dispatch];
};
