// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBL5RG9_DMyXAxS7-B9MQBv6Nn6bWk4UaY",
    authDomain: "react-basic-search.firebaseapp.com",
    projectId: "react-basic-search",
    storageBucket: "react-basic-search.appspot.com",
    messagingSenderId: "627672607471",
    appId: "1:627672607471:web:09cda9a3e3f48aa243091a",
    measurementId: "G-H5W5WNCV22"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
