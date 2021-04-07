import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAoRoyHzFA3b1NvvKNcySoz4hw8FuO3wxs",
  authDomain: "chatmessenger-e75df.firebaseapp.com",
  projectId: "chatmessenger-e75df",
  storageBucket: "chatmessenger-e75df.appspot.com",
  messagingSenderId: "442411184295",
  appId: "1:442411184295:web:a40f1b5979a647f5b3ab82"
};

const app = !firebase.apps.length
  ? firebase.initializeApp(firebaseConfig)
  : firebase.app;

const db = app.firestore();
const auth = app.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
