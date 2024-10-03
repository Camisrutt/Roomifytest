// login.js
//Import firebase modules
import { 
    auth,
    db,
} from 'https://camisrutt.github.io/Roomifytest/Root/assets/js/firebase-init.js';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
  } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js';
import {
    getFirestore,
    doc,
    setDoc,
  } from 'https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js';

document.getElementById('login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    // Get user info
    const email = document.querySelector('input[name="username"]').value;
    const password = document.querySelector('input[name="password"]').value;

    // Sign in existing user
    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            // User signed in
            const user = userCredential.user;
            alert('User logged in successfully!');
            // Redirect to profile dashboard
            window.location.href = 'profile-dash.html';
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.error('Error:', errorMessage);
            alert(errorMessage);
        });
});
