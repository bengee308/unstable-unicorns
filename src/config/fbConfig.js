import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
// Your web app's Firebase configuration
var firebaseConfig = {
apiKey: "AIzaSyDoiHB6HmQGP3tlRUVkDPxTkVjA2VmtVgY",
authDomain: "unstable-unicorns-b3550.firebaseapp.com",
databaseURL: "https://unstable-unicorns-b3550.firebaseio.com",
projectId: "unstable-unicorns-b3550",
storageBucket: "unstable-unicorns-b3550.appspot.com",
messagingSenderId: "556117934849",
appId: "1:556117934849:web:6a01a01f67b4e5e46e1100",
measurementId: "G-4PY3C2R3Z8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore();
export default firebase;