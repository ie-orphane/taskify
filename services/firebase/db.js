import { db } from "./config";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

export const fetchUserCollections = async (uid) => {
  try {
    // collection refrence based on user id
    const ref = query(collection(db, "collections"), where("userId", "==", uid));
    // get correspond collections
    const allCollections = await getDocs(ref);
    // return formated collections data
    return allCollections.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching users data:", error.message);
    throw error;
  }
};

export const fetchUserTasks = async (uid) => {
  try {
    // task refrence based on user id
    const ref = query(collection(db, "tasks"), where("userId", "==", uid));
    // get correspond tasks
    const allTasks = await getDocs(ref);
    // return formated tasks data
    return allTasks.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error("Error fetching users data:", error.message);
    throw error;
  }
};

export const fetchUserById = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    const userData = { id: userDoc.id, ...userDoc.data() };
    await fetchUserCollections(uid);
    return userData;
  } catch (error) {
    console.error("services/db/fetchUserId :", error.message);
    return fetchUserById(uid)
  }
};
