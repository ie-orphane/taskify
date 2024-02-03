import { auth } from "./config";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("User signed up:", user.email);
  } catch (error) {
    console.error(error.message);
  }
};

export const signIn = async (email, password) => {
  try {
    console.log("login")
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    console.log("user signed in:", user.uid)
    return user.uid;
  } catch (error) {
    if (error.code == "auth/invalid-credential") return null;
    console.error(error.message);
  }
};
