import firebase from "firebase/app"
import "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyBrUUNGbGfezB2EYqvf3Z2GvIRUA5w2op4",
  authDomain: "uploading-2.firebaseapp.com",
  projectId: "uploading-2",
  storageBucket: "uploading-2.appspot.com",
  messagingSenderId: "179867338789",
  appId: "1:179867338789:web:9b1b9e3671eeb1091397cc"
};


// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();

export { firebaseConfig as default};