// /src/firebase/firebaseConfig.jsx
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAG4nocBZeOhgmIoM2Ay5jCEPiAhsISfJA",
  authDomain: "interstellar-devs.firebaseapp.com",
  projectId: "interstellar-devs",
  storageBucket: "interstellar-devs.appspot.com",
  messagingSenderId: "464043524239",
  appId: "1:464043524239:web:187179e678e2bba12d70fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and export it
const auth = getAuth(app);

export { auth, app };
