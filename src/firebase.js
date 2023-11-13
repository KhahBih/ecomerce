import * as firebase from 'firebase'

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAPSfrnmFq5c_L2q2bUCuIvqhcU1J-yKG4",
    authDomain: "ecomerce-9e665.firebaseapp.com",
    projectId: "ecomerce-9e665",
    storageBucket: "ecomerce-9e665.appspot.com",
    messagingSenderId: "969142555071",
    appId: "1:969142555071:web:516a1be39b7e2643d8110a"
  };
  
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.googleAuthProvider()