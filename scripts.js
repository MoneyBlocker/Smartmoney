// Configuration de Firebase
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialiser Firebase
firebase.initializeApp(firebaseConfig);

document.getElementById('login-form').addEventListener('submit', login);
document.getElementById('register-form').addEventListener('submit', register);
document.getElementById('forgot-password-form').addEventListener('submit', resetPassword);

function login(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Connexion réussie
            console.log('Connecté:', userCredential.user);
        })
        .catch(error => {
            console.error('Erreur de connexion:', error);
        });
}

function register(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (password !== confirmPassword) {
        alert('Les mots de passe ne correspondent pas.');
        return;
    }

    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // Inscription réussie
            console.log('Inscrit:', userCredential.user);
        })
        .catch(error => {
            console.error('Erreur d\'inscription:', error);
        });
}

function resetPassword(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;

    firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
            alert('Email de réinitialisation envoyé.');
        })
        .catch(error => {
            console.error('Erreur de réinitialisation:', error);
        });
}
