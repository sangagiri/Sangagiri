// ============================================================
//  js/modules/firebase.js
//  Initialize Firebase — import this everywhere you need db/auth
// ============================================================
import { initializeApp }       from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore }        from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth }             from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const firebaseConfig = {
  apiKey:            "AIzaSyBGd3SjDPuuKZuRWga536rS56NLXno1kPo",
  authDomain:        "sangagiri.firebaseapp.com",
  projectId:         "sangagiri",
  storageBucket:     "sangagiri.firebasestorage.app",
  messagingSenderId: "1067104477055",
  appId:             "1:1067104477055:web:1729edaa0c33e7b22c844a"
};

const app  = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
export const auth = getAuth(app);
