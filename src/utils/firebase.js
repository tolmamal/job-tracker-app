import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

let firebaseConfig = {
    apiKey: "AIzaSyAoHmxOtyOGf3YCVKL3MuTsGzkvGB-I2eU",
    authDomain: "job-tracker-8e89e.firebaseapp.com",
    databaseURL: "https://job-tracker-8e89e.firebaseio.com",
    projectId: "job-tracker-8e89e",
    storageBucket: "job-tracker-8e89e.appspot.com",
    messagingSenderId: "1093083820905",
    appId: "1:1093083820905:web:5a32529e97f1ef4fba03f8",
    measurementId: "G-TG8FH9FQP1"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ timestampsInSnapshots: true });

export default firebase;
