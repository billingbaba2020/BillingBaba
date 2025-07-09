import { initializeApp } from "firebase/app";
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  EmailAuthProvider,
  reauthenticateWithCredential,
  signInWithPhoneNumber,
  RecaptchaVerifier,
  updateProfile,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCgUkIrYWU4MbAp89BkmeZm4C6dDT96T_M",
  authDomain: "billing-baba.firebaseapp.com",
  projectId: "billing-baba",
  storageBucket: "billing-baba.appspot.com",
  messagingSenderId: "893186141142",
  appId: "1:893186141142:web:e1a74ab8f26d22f48ad277",
  measurementId: "G-WP7KYER515"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }

    return {
      data: {
        uid: user.uid,
        name: user.displayName,
        email: user.email,
        authProvider: "google"
      },
      newUser: docs.docs.length === 0,
    };
  } catch (err) {
    console.error("Google Sign-In Error:", err.message);
    alert("Google Sign-In failed.");
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  const res = await signInWithEmailAndPassword(auth, email, password);
  const user = res.user;

  return {
    data: {
      uid: user.uid,
      email: user.email,
      authProvider: "local"
    },
    newUser: false
  };
};

const registerWithEmailAndPassword = async (email, password, name) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  const user = res.user;

  await updateProfile(user, { displayName: name });

  await addDoc(collection(db, "users"), {
    uid: user.uid,
    name,
    email,
    authProvider: "local"
  });

  return {
    data: {
      uid: user.uid,
      name,
      email,
      authProvider: "local"
    },
    newUser: true
  };
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error("Password Reset Error:", err.message);
    alert("Reset failed: " + err.message);
  }
};

const logout = async () => {
  localStorage.removeItem("uid");
  await signOut(auth);
};

function saveUidToLocalStorage(uid) {
  localStorage.setItem("uid", uid);
}

function getUidFromLocalStorage() {
  return localStorage.getItem("uid");
}

const setUpRecaptcha = (containerId) => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: (response) => {
      console.log("Recaptcha resolved");
    },
  });
};

const signInWithPhoneNum = async (phoneNumber, containerId) => {
  setUpRecaptcha(containerId);
  const appVerifier = window.recaptchaVerifier;
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    return true;
  } catch (error) {
    console.error("Phone Sign-In Error:", error.message);
    alert("Error sending OTP");
    return false;
  }
};

const verifyOTP = async (otp) => {
  try {
    const result = await window.confirmationResult.confirm(otp);
    const user = result.user;

    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);

    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        authProvider: "phone",
      });
    }

    return {
      data: {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        authProvider: "phone"
      },
      newUser: docs.docs.length === 0
    };
  } catch (error) {
    console.error("OTP Verification Error:", error.message);
    alert("OTP Verification failed");
  }
};

export {
  auth,
  db,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  saveUidToLocalStorage,
  getUidFromLocalStorage,
  signInWithPhoneNum,
  verifyOTP,
  EmailAuthProvider,
  reauthenticateWithCredential,
};
