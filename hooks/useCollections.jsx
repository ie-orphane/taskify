import { useEffect, useState } from "react";
import { fetchUserCollections } from "../services/firebase";
import { Collection } from "../utils/classes";

export const useCollections = (user) => {
  const [Collections, setCollections] = useState([]);

  const fetchCollections = async () => {
    const userCollections = await fetchUserCollections(user.uid);
    setCollections(userCollections.map((data) => new Collection(data)));
  };

  useEffect(() => {
    if (user) {
      fetchCollections();
    }
  }, [user]);

  return { Collections, setCollections, fetchCollections };
};
