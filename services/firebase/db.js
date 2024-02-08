import { bg, br } from "../../utils/colorful";
import { db } from "./config";
import { addDoc, collection, doc, getDoc, getDocs, query, where, setDoc } from "firebase/firestore";

export const fetchUserCollections = async (uid) => {
  try {
    console.log(`${bg.yellow} fetching ${br} [db/fetchUserCollections]`);
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
    console.log(`${bg.yellow} fetching ${br} [db/fetchUserTasks]`);
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
    console.log(`${bg.yellow} fetching ${br} [db/fetchUserById] ${uid}`);
    const userDoc = await getDoc(doc(db, "users", uid));
    console.log(`${bg.green} success ${br} [db/fetchUserById]`);
    return userDoc.data();
  } catch (error) {
    console.error(`[db/fetchUserById]`, error.message);
  }
};

export const addTask = async (task) => {
  try {
    console.log("[db/addTask] adding new task...");
    const tasksCollection = collection(db, "tasks");
    await addDoc(tasksCollection, { ...task, datetime: new Date() });
    console.log("[firebase/db/addTask] Task added successfully!");
  } catch (error) {
    console.error("db/addTask:", error.message);
  }
};

export const addCollection = async (Collection) => {
  try {
    console.log("[db/addCollection] adding new collection...");
    const collectionsCollection = collection(db, "collections");
    await addDoc(collectionsCollection, { ...Collection, datetime: new Date() });
    console.log("[db/addCollection] Collection added successfully!");
  } catch (error) {
    console.error("db/addCollection:", error.message);
  }
};

export const addUser = async (uid, user) => {
  try {
    console.log("[db/addCollection] adding new User...");
    const docRef = doc(db, "users", uid);
    await setDoc(docRef, user);
    console.log("[db/addCollection] User added successfully!");
  } catch (error) {
    console.error("db/addCollection:", error.message);
  }
};
