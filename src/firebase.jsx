import { initializeApp } from "firebase/app";
// import { createProfile } from "./src/features/leadData/leadDataReducer";
// import { doc, getDoc } from "firebase/firestore";
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
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCNo9ogRf1OfHnv2WmOfcWF5tbVVoEl_7k",
//   authDomain: "athlead-e99b5.firebaseapp.com",
//   projectId: "athlead-e99b5",
//   storageBucket: "athlead-e99b5.appspot.com",
//   messagingSenderId: "309170576748",
//   appId: "1:309170576748:web:906a3f68efd541c0356749",
//   measurementId: "G-DBV3L9VYMT",
// };
// const firebaseConfigOld = {
//   apiKey: "AIzaSyDXvyC4SXHqB7WehW-2ApAMdjesXnNWirc",
//   authDomain: "fir-auth-20b27.firebaseapp.com",
//   projectId: "fir-auth-20b27",
//   storageBucket: "fir-auth-20b27.firebasestorage.app",
//   messagingSenderId: "796452404504",
//   appId: "1:796452404504:web:0317ee0856c3f3be35726d"
// };

// const firebaseConfig = {
//   apiKey: "AIzaSyCgUkIrYWU4MbAp89BkmeZm4C6dDT96T_M",
//   authDomain: "billing-baba.firebaseapp.com",
//   projectId: "billing-baba",
//   storageBucket: "billing-baba.appspot.com",
//   messagingSenderId: "893186141142",
//   appId: "1:893186141142:web:e1a74ab8f26d22f48ad277",
//   measurementId: "G-WP7KYER515"
// };

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
const registerWithPhoneAndPassword = async (phoneNumber, password, containerId) => {
  const confirmationResult = await signInWithPhoneNum(phoneNumber, containerId);
  if (!confirmationResult) return false;

  // Wait for OTP verification
  window.confirmationResult.confirm = async (otp) => {
    try {
      const result = await window.confirmationResult.confirm(otp);
      const user = result.user;

      // Add phone-password combo to Firestore (password should be hashed ideally)
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        phoneNumber,
        password, // 🔒 Ideally use bcrypt hash
        authProvider: "phone-password",
      });

      return { data: user, newUser: true };
    } catch (error) {
      console.error(error);
      alert("OTP verification failed");
    }
  };
};

const loginWithPhoneAndPassword = async (phoneNumber, password) => {
  try {
    const q = query(
      collection(db, "users"),
      where("phoneNumber", "==", phoneNumber)
    );
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      alert("User not found");
      return null;
    }

    const userData = querySnapshot.docs[0].data();
    if (userData.password !== password) {
      alert("Incorrect password");
      return null;
    }

    // Fake login success since we aren't signing in via Firebase Auth
    // You can optionally link to anonymous user or handle session manually
    return { data: userData, newUser: false };
  } catch (error) {
    console.error("Login failed:", error);
    alert("Error logging in with phone + password");
  }
};


const auth = getAuth(app);
const db = getFirestore(app);
// const history = useHistory();

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    // console.log(user);
    const q = query(collection(db, "users"), where("uid", "==", user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
      const profileData = {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
        password: null,
      };
      //   saveUidToLocalStorage(user.uid);
      // Uncomment and call the createProfile function to create the profile in Firestore.
      // await createProfile(profileData);
      return { data: profileData, newUser: true };
    } else {
      // Existing user, return the existing user data.
      const existingUserData = user;
      //   saveUidToLocalStorage(user.uid);
      return { data: existingUserData, newUser: false };
    }
  } catch (err) {
    console.error(err);
    console.log(err.message);
    alert("Error signing in with Google. Please try again.");
  }
};

const fetchUsers = async () => {
  try {
    const usersCollection = db.firestore().collection("users");
    const snapshot = await usersCollection.get();
    const fetchedUsers = snapshot.docs.map((doc) => doc.data());
    return fetchedUsers;
  } catch (error) {
    console.error(error);
  }
};

const logInWithEmailAndPassword = async (email, password) => {
  // console.log("signin hit");
  let res = await signInWithEmailAndPassword(auth, email, password);
  // console.log(res);
  //   return res;
  return { data: res.user.uid, newUser: true };
};

const registerWithEmailAndPassword = async (email, password, name) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "users"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
    // .log();
    return user.uid;
  } catch (err) {
    console.error(err);
    // alert(err.message);

    alert("Error signing in with Google. Please try again.");
  }
};
const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    // alert(err.message);

    alert("Error signing in with Google. Please try again.");
  }
};

const logout = async () => {
  localStorage.setItem("data", {});
  localStorage.setItem("uid", {});
  await signOut(auth);
};

function saveUidToLocalStorage(uid) {
  try {
    localStorage.setItem("uid", uid);
  } catch (error) {
    console.error("Error saving uid to local storage:", error);
  }
}

// Function to read the "uid" string from local storage
function getUidFromLocalStorage() {
  try {
    return localStorage.getItem("uid");
  } catch (error) {
    console.error("Error getting uid from local storage:", error);
    return null;
  }
}

const setUpRecaptcha = (containerId) => {
  window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
    size: "invisible",
    callback: (response) => {
      // reCAPTCHA solved, allow signInWithPhoneNumber.
      // onSignInSubmit();
      console.log("Recaptcha resolved");
    },
  });
};

const signInWithPhoneNum = async (phoneNumber, containerId) => {
  setUpRecaptcha(containerId);
  const appVerifier = window.recaptchaVerifier;
  try {
    const confirmationResult = await signInWithPhoneNumber(
      auth,
      phoneNumber,
      appVerifier
    );
    window.confirmationResult = confirmationResult;
    // alert("OTP sent");
    return true;
  } catch (error) {
    console.error(error);
    console.log(error.message);
    alert("Error in sending OTP");
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
      const profileData = {
        uid: user.uid,
        phoneNumber: user.phoneNumber,
        authProvider: "phone",
      };
      // Uncomment and call the createProfile function to create the profile in Firestore.
      // await createProfile(profileData);
      return { data: profileData, newUser: true };
    } else {
      // Existing user, return the existing user data.
      const existingUserData = user;
      return {
        data: existingUserData,
        newUser: false,
      };
    }
  } catch (error) {
    console.error(error);
    console.log(error.message);
    alert("Error in verifying OTP");
  }
};
export {
  auth,
  EmailAuthProvider,
  reauthenticateWithCredential,
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
  loginWithPhoneAndPassword,
  registerWithPhoneAndPassword,
};