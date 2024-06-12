// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA8xRzpIOZrrSHML6EFCX7MJ6tNRJaJdpU",
  authDomain: "user-email-password-auth-ab856.firebaseapp.com",
  projectId: "user-email-password-auth-ab856",
  storageBucket: "user-email-password-auth-ab856.appspot.com",
  messagingSenderId: "153383768628",
  appId: "1:153383768628:web:eb9a663c75336f8418b061"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default auth;
// export default app;