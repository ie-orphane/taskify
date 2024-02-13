import { auth } from "./config";
import { addUser, fetchUserById } from "./db";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storeUserToken = async (token) => {
  try {
    await AsyncStorage.setItem("userToken", token);
  } catch (error) {
    console.error("Error storing user token:", error.message);
  }
};

const getUserToken = async () => {
  try {
    const token = await AsyncStorage.getItem("userToken");
    return token;
  } catch (error) {
    console.error("Error getting user token:", error.message);
    return null;
  }
};

export const signUp = async (name, email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    await addUser(user.uid, { collections: [], displayName: name, photoURL: "" });
    await storeUserToken(user.accessToken);
    console.log("User signed up:", user.email);
  } catch (error) {
    console.error(error.message);
  }
};

export const signIn = async (email, password) => {
  try {
    console.log("login...");
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    console.log("still login..");
    const user = userCredential.user;
    await storeUserToken(user.accessToken);
    console.log("user signed in:", user.uid);
    return user.uid;
  } catch (error) {
    if (error.code == "auth/invalid-credential") return null;
    console.error(error.message);
  }
};

export const onUserStateChanged = (callback) => {
  return onAuthStateChanged(auth, async (user) => {
    if (user) {
      const token = await user.getIdToken();
      await storeUserToken(token);
      const userData = await fetchUserById(user.uid);
      callback({ ...user, ...userData });
    } else {
      console.log("anynomus user: ", user);
      callback(user);
    }
  });
};
