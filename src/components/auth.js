import firebase from "firebase/app";
import 'firebase/auth'

const config = {
    apiKey: "AIzaSyC9CAxlZsQ7jzHBl5YkbUHY0zGxCwhq-cc",
    authDomain: "wisdom-c02f4.firebaseapp.com",
    databaseURL: "https://wisdom-c02f4.firebaseio.com",
    projectId: "wisdom-c02f4",
    storageBucket: "wisdom-c02f4.appspot.com",
    messagingSenderId: "1078468381731"
};
// Initialize Firebase

firebase.initializeApp(config);

const auth = firebase.auth();
window.auth = auth;

export {auth};
