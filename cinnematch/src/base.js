import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/auth'

/**
 * Firebase integration 
 */
const app = firebase.initializeApp({
    apiKey: "AIzaSyAH88mM00rcTUQQVx7Viw0ZzRpNqg5BGdE",
    authDomain: "cinnematch-7a4a1.firebaseapp.com",
    databaseURL: "https://cinnematch-7a4a1.firebaseio.com",
    projectId: "cinnematch-7a4a1",
    storageBucket: "",
    messagingSenderId: "609915360106"
})

// github auth
export const githubAuthProvider = new firebase.auth.GithubAuthProvider();
// google auth
export const googleProvider = new firebase.auth.GoogleAuthProvider()
export const auth = app.auth()
export default Rebase.createClass(app.database())