import  firebase from 'firebase'
import  '@firebase/auth'
import  '@firebase/firestore'
import  '@firebase/storage'

const app = firebase.initializeApp({
    apiKey: "AIzaSyDNrKPk_TMtYpZMdmewM9OIzQyFEelVEtg",
    authDomain: "qoutes-f231d.firebaseapp.com",
    databaseURL: "https://qoutes-f231d.firebaseio.com",
    projectId: "qoutes-f231d",
    storageBucket: "qoutes-f231d.appspot.com",
    messagingSenderId: "346335915720",
    appId: "1:346335915720:web:de33b4188f8f45e2b83ffd",
    measurementId: "G-YZ3FYSZF5D"
  });

export default app

