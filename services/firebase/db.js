import { bg, br } from "../../utils/colorful";
import { db } from "./config";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export const fetchUserCollections = async (uid) => {
  try {
    console.log(`${bg.yellow} fetching ${br} Collections`);
    // collection refrence based on user id
    const ref = query(collection(db, "collections"), where("userId", "==", uid));
    // get correspond collections
    const allCollections = await getDocs(ref);
    console.log(`${bg.green} success ${br} [db/fetchUserCollections]`);
    // return formated collections data
    return allCollections.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`[db/fetchUserCollections]`, error.message);
  }
};

export const fetchUserTasks = async (uid) => {
  try {
    console.log(`${bg.yellow} fetching ${br} Tasks`);
    // task refrence based on user id
    const ref = query(collection(db, "tasks"), where("userId", "==", uid));
    // get correspond tasks
    const allTasks = await getDocs(ref);
    console.log(`${bg.green} success ${br} [db/fetchUserTasks]`);
    // return formated tasks data
    return allTasks.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`[db/fetchUserTasks]`, error.message);
  }
};

export const fetchUserById = async (uid) => {
  try {
    console.log(`${bg.yellow} fetching ${br} User ${uid}`);
    const userDoc = await getDoc(doc(db, "users", uid));
    console.log(`${bg.green} success ${br} [db/fetchUserById]`);
    return userDoc.data();
  } catch (error) {
    console.error(`[db/fetchUserById]`, error.message);
  }
};

export const addTask = async (task) => {
  try {
    console.log(`${bg.blue} adding ${br} new Task`);
    const tasksCollection = collection(db, "tasks");
    await addDoc(tasksCollection, { ...task });
    console.log(`${bg.green} success ${br} [db/addTask]`);
  } catch (error) {
    console.error("db/addTask:", error.message);
  }
};

export const addCollection = async (Collection) => {
  try {
    console.log(`${bg.blue} adding ${br} new Collection`);
    const collectionsCollection = collection(db, "collections");
    await addDoc(collectionsCollection, { ...Collection, datetime: new Date() });
    console.log(`${bg.green} success ${br} [db/addCollection]`);
  } catch (error) {
    console.error("db/addCollection:", error.message);
  }
};

export const addUser = async (uid, user) => {
  try {
    console.log(`${bg.blue} adding ${br} new User`);
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, user);
    console.log(`${bg.green} success ${br} [db/addUser]`);
  } catch (error) {
    console.error("db/addUser:", error.message);
  }
};

export const updateTask = async (task) => {
  try {
    console.log(`${bg.magenta} updating ${br} Task ${task.id}`);
    const docRef = doc(db, "tasks", task.id);
    const newValue = !task.completed;
    await updateDoc(docRef, {
      completed: newValue,
    });
    console.log(`${bg.green} success ${br} [db/updateTask]`);
  } catch (error) {
    console.error("Error updating task: ", error);
  }
};
