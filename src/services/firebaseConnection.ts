
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBOfC3a6oOVYrmdTiNXGbIb0uplum8xktA",
  authDomain: "reactlink-285b6.firebaseapp.com",
  projectId: "reactlink-285b6",
  storageBucket: "reactlink-285b6.appspot.com",
  messagingSenderId: "25017211317",
  appId: "1:25017211317:web:71d1a325fd52e46009e1fc",
  measurementId: "G-CLC8X6ZQXK"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export {auth, db};
