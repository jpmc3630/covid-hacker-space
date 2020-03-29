  import firebase from 'firebase';
  
  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyC3B-cvfyULAA7Jmt2A-1xy6ooYvcPbaEk",
    authDomain: "rps-multiplayer-26ddc.firebaseapp.com",
    databaseURL: "https://rps-multiplayer-26ddc.firebaseio.com",
    projectId: "rps-multiplayer-26ddc",
    storageBucket: "rps-multiplayer-26ddc.appspot.com",
    messagingSenderId: "760105777171",
    appId: "1:760105777171:web:7ac972cb5408a6689627e6",
    measurementId: "G-3TNJ21W323"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
  export default firebase;
  