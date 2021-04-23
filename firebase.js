//import * as firebase from 'firebase'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyACaKnN2j7vzTJwUnTQqlSkvwl9jX7vHDM",
    authDomain: "signal-rnative.firebaseapp.com",
    projectId: "signal-rnative",
    storageBucket: "signal-rnative.appspot.com",
    messagingSenderId: "509237992728",
    appId: "1:509237992728:web:9a7a9358fc39439962126d"
};

let app

if(firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig)
} else {
    app = firebase.app()
}

const db = app.firestore()
const auth = firebase.auth()

export {db, auth}