import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyDWaxvmenenjzsU32y-C3amMa0TR1AbyK4",
    authDomain: "maqbool-registration-ctns-new.firebaseapp.com",
    projectId: "maqbool-registration-ctns-new",
    storageBucket: "maqbool-registration-ctns-new.appspot.com",
    messagingSenderId: "767061983430",
    appId: "1:767061983430:web:bced2eada92bb9b7a397c7",
    measurementId: "G-523GFYZPMX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const db = firebaseApp.firestore()

export default db;