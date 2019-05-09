const FirebaseModule = require("firebase");
const firebaseConfig = require("../constants/firebase");

const {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket,
  messagingSenderId
} = firebaseConfig;

let firebaseInitialized = false;
if (apiKey && authDomain && databaseURL && storageBucket && messagingSenderId) {
  FirebaseModule.initializeApp({
    apiKey,
    authDomain,
    databaseURL,
    storageBucket,
    messagingSenderId
  });

  firebaseInitialized = true;
}

module.exports.FirebaseRef = firebaseInitialized
  ? FirebaseModule.database().ref()
  : null;
module.exports.Firebase = firebaseInitialized ? FirebaseModule : null;
