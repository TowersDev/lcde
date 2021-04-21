import fb from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyD5qdooWbWqiVCyerQKZf4eY1_05v0Ctso",
  authDomain: "lcde-5848e.firebaseapp.com",
  databaseURL: "https://lcde-5848e.firebaseio.com",
  projectId: "lcde-5848e",
  storageBucket: "lcde-5848e.appspot.com",
  messagingSenderId: "1091556095187",
  appId: "1:1091556095187:web:9343b3c833fe066c629026",
  measurementId: "G-T56S565KZS",
};

// Initialize Firebase
export const firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app()
