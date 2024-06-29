 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 const firebaseConfig = {
   apiKey: "AIzaSyBDoJ4K3yQab7UKdSf84a_oVNUo1EQSOHE",
   authDomain: "smartmoney-887d6.firebaseapp.com",
   projectId: "smartmoney-887d6",
   storageBucket: "smartmoney-887d6.appspot.com",
   messagingSenderId: "864830380499",
   appId: "1:864830380499:web:1641324c1831db38117726"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);


// Initialisation de l'input téléphone avec intl-tel-input
const phoneInputField = document.querySelector("#phone");
const phoneInput = window.intlTelInput(phoneInputField, {
    initialCountry: "cd",
    onlyCountries: ["cd"],
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// Basculer entre email et téléphone pour la page Mot de passe oublié
const toggleInputBtn = document.querySelector('.toggle-input-btn');
const emailInput = document.getElementById('email');
const phoneInputContainer = document.querySelector('.iti');

const label = document.getElementById('label');

if (toggleInputBtn) { // Vérifie si le bouton existe (pour la page Mot de passe oublié)
    toggleInputBtn.addEventListener('click', function() {
        if (emailInput.classList.contains('d-none')) {
            emailInput.classList.remove('d-none');
            emailInput.required = true;
            phoneInputField.classList.add('d-none');
            phoneInputField.required = false;
            toggleInputBtn.innerHTML = '<i class="fas fa-phone"></i>';
            phoneInputContainer.classList.add('d-none');
            label.textContent = "Email";
            
        } else {
            emailInput.classList.add('d-none');
            emailInput.required = false;
            phoneInputField.classList.remove('d-none');
            phoneInputField.required = true;
            toggleInputBtn.innerHTML = '<i class="fas fa-envelope"></i>';
            phoneInputContainer.classList.remove('d-none');
            label.textContent = "Numéro de téléphone";
    
        }
    });
}

// Chargement des provinces et villes pour la page d'Inscription
const regionSelect = document.getElementById('region');
const citySelect = document.getElementById('city');

const provincesData = [
    { name: 'Lualaba', cities: ['Kolwezi'] },
    { name: 'Haut-Katanga', cities: ['Lubumbashi', 'Likasi', 'Kolwezi'] }
    // Ajoutez les autres provinces avec leurs villes respectives
    // Exemple:
    // { name: 'Haut-Katanga', cities: ['Lubumbashi', 'Likasi', 'Kolwezi'] },
];

// Fonction pour charger les options de la région et des villes en fonction de la province sélectionnée
function populateCities() {
    const selectedProvince = provincesData.find(province => province.name === regionSelect.value);
    citySelect.innerHTML = '';
    if (selectedProvince) {
        selectedProvince.cities.forEach(city => {
            const option = document.createElement('option');
            option.textContent = city;
            citySelect.appendChild(option);
        });
    }
}

// Écouteur d'événement pour charger les villes lorsque la région (province) est changée
if (regionSelect) { // Vérifie si le sélecteur existe (pour la page d'Inscription)
    regionSelect.addEventListener('change', populateCities);

    // Initialisation des options pour la région (province)
    provincesData.forEach(province => {
        const option = document.createElement('option');
        option.textContent = province.name;
        regionSelect.appendChild(option);
    });

    // Appel initial pour charger les villes de la première province par défaut
    populateCities();
}

// Soumission du formulaire de connexion
const loginForm = document.getElementById('login-form');

if (loginForm) { // Vérifie si le formulaire existe (pour la page de Connexion)
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = emailInput.classList.contains('d-none') ? null : emailInput.value;
        const phone = phoneInputField.classList.contains('d-none') ? null : phoneInput.getNumber();
        const password = document.getElementById('password').value;

        if (email) {
            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(userCredential => {
                    // Connexion réussie
                    console.log('Connecté:', userCredential.user);
                })
                .catch(error => {
                    console.error('Erreur de connexion:', error);
                });
        } else if (phone) {
            // Vous devrez implémenter la logique de connexion par téléphone ici
            alert('Connexion par téléphone non implémentée.');
        }
    });
}
