// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getStorage} from 'firebase/storage'
import { getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBz7hDMaUoxYxP8480_zZWZmkyaSv03yiE",
  authDomain: "new-blog-2acdc.firebaseapp.com",
  projectId: "new-blog-2acdc",
  storageBucket: "new-blog-2acdc.appspot.com",
  messagingSenderId: "237819697906",
  appId: "1:237819697906:web:27c36bdb79ee7c53f78e6b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };