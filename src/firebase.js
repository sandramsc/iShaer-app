import firebase from 'firebase';

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDWcDHEjINMbkgGyc09pkjJENUDQaFGnvo",
    authDomain: "ishaer-app.firebaseapp.com",
    projectId: "ishaer-app",
    storageBucket: "ishaer-app.appspot.com",
    messagingSenderId: "987866143691",
    appId: "1:987866143691:web:b8493223e0ec758bceb44e",
    measurementId: "G-0K03LPZH93"
  })
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();

  export { db, auth, storage};