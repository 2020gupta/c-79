import firebase from 'firebase'
require('@firebase/firestore')
var firebaseConfig = {
    apiKey: "AIzaSyAEgTtV0O3lSMFp3wwXgeswyjBEAXfX_2Q",
    authDomain: "booksanta-cfa91.firebaseapp.com",
    projectId: "booksanta-cfa91",
    storageBucket: "booksanta-cfa91.appspot.com",
    messagingSenderId: "938970194440",
    appId: "1:938970194440:web:c828cfc201f88d5ece27bd"
  };
  firebase.initializeApp(firebaseConfig);
  export default firebase.firestore()