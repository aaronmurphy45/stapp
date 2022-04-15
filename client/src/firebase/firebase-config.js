// Import the functions you need from the SDKs you need
/*8
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyIP1D9r8RQgSo6ypflkxp78SCqpFeXg0",
  authDomain: "final-year-project-f2fb9.firebaseapp.com",
  projectId: "final-year-project-f2fb9",
  storageBucket: "final-year-project-f2fb9.appspot.com",
  messagingSenderId: "1035660284773",
  appId: "1:1035660284773:web:176af23ca11e14653f878c",
  measurementId: "G-16NEZZEG6Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/

//import * as firebase from 'firebase';
import firebase from "firebase/compat/app";
import "firebase/compat/auth"
import "firebase/compat/database"
import "firebase/compat/firestore"




import { ref } from "firebase/storage"
import { child,get  } from "firebase/database";


import { getAuth, getRedirectResult, FacebookAuthProvider } from "firebase/auth";

const provider = new FacebookAuthProvider();
provider.setCustomParameters({
  'display': 'popup'
});


const firebaseConfig = {
    apiKey: "AIzaSyAyIP1D9r8RQgSo6ypflkxp78SCqpFeXg0",
    authDomain: "final-year-project-f2fb9.firebaseapp.com",
    projectId: "final-year-project-f2fb9",
    storageBucket: "final-year-project-f2fb9.appspot.com",
    messagingSenderId: "1035660284773",
    appId: "1:1035660284773:web:176af23ca11e14653f878c",
    measurementId: "G-16NEZZEG6Y",
    databaseURL:"https://final-year-project-f2fb9-default-rtdb.europe-west1.firebasedatabase.app/"

  };

const app = firebase.initializeApp(firebaseConfig);
const auth = app.auth();
const db = app.firestore();
const dbs = app.database()
const googleProvider = new firebase.auth.GoogleAuthProvider();

const signInWithEmailAndPassword = async (email, password) => {

  try {
    await auth.signInWithEmailAndPassword(email, password);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

// save tio firebase
const saveToFirebase = async (data) => {
  try {
    await db.collection("users").add(data);
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
/*
const onFacebookButtonPress = async () => {
  const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  if (result.isCancelled) {
    throw 'User cancelled the login process';
  }

  // Once signed in, get the users AccesToken
  const data = await AccessToken.getCurrentAccessToken();

  if (!data) {
    throw 'Something went wrong obtaining access token';
  }

  // Create a Firebase credential with the AccessToken
  const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(facebookCredential);
}
*/


 


const signInWithPopupx = async () => {
    try {
      const res = await auth.signInWithPopup(provider);
      const user = res.user;
      const query = await db
        .collection("users")
        .where("uid", "==", user.uid)
        .get();
      if (query.docs.length === 0) {
        await db.collection("users").add({
          uid: user.uid,
          name: user.displayName,
          authProvider: "facebook",
          email: user.email,
        });
      }
    }
    catch (err) {
      console.log(err);
      alert(err.message);
    }
};



const signInWithGoogle = async () => {
  try {
    const res = await auth.signInWithPopup(googleProvider);
    const user = res.user;
    const query = await db
      .collection("users")
      .where("uid", "==", user.uid)
      .get();
    if (query.docs.length === 0) {
      await db.collection("users").add({
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};



const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await auth.createUserWithEmailAndPassword(email, password);
    const user = res.user;
    await db.collection("users").add({
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const sendPasswordResetEmail = async (email) => {
  try {
    await auth.sendPasswordResetEmail(email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};






  const logout = () => {
    console.log(auth)
    auth.signOut();
    console.log(auth)
  };

  export {
    auth,
    db,
    signInWithGoogle,
    signInWithEmailAndPassword,
    registerWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithPopupx,
    logout,
    ref,
    dbs,
    child,
    get
  };