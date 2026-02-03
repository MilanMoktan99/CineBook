// config/auth.js
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const googleProvider = new GoogleAuthProvider();

// Register with email/password
export const registerWithEmail = async (name, email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  // Admin logic: change email to your admin emails
  const role = email === "milanmok816@gmail.com" ? "admin" : "user";

  await setDoc(doc(db, "users", user.uid), {
    uid: user.uid,
    displayName: name,
    email,
    role,
    createdAt: new Date(),
    photoURL: "",
  });

  return { uid: user.uid, displayName: name, email, role, photoURL: "" };
};

// Login with email/password
export const loginWithEmail = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  const user = res.user;

  // Fetch user role from Firestore
  const docSnap = await getDoc(doc(db, "users", user.uid));
  const data = docSnap.exists() ? docSnap.data() : null;

  return {
    uid: user.uid,
    displayName: data?.displayName || "",
    email: user.email,
    role: data?.role || "user",
    photoURL: data?.photoURL || "",
  };
};

// Sign in with Google
export const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  const user = res.user;

  // Admin check
  const role = user.email === "milanmok816@gmail.com" ? "admin" : "user";

  await setDoc(
    doc(db, "users", user.uid),
    {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      photoURL: user.photoURL || "",
      role,
      createdAt: new Date(),
    },
    { merge: true }
  );

  return { uid: user.uid, displayName: user.displayName, email: user.email, photoURL: user.photoURL || "", role };
};
