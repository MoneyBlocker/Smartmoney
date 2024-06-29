// Smooth Scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Menu toggle for mobile view
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

navLinksItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

const apiKey = '73b4597599d74b9c536784a1'; // Remplacez par votre clé API ExchangeRate-API

// Charger les devises disponibles à partir de l'API
async function loadCurrencies() {
    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
        const data = await response.json();

        // Vérifier si les données sont disponibles
        if (data && data.conversion_rates) {
            const currencySelects = document.querySelectorAll('#from-currency, #to-currency');
            const currencies = Object.keys(data.conversion_rates);

            currencies.forEach(currency => {
                const option = document.createElement('option');
                option.value = currency;
                option.textContent = currency;
                currencySelects.forEach(select => select.appendChild(option.cloneNode(true)));
            });

            // Ajouter spécifiquement le franc congolais s'il n'est pas déjà inclus
            if (!currencies.includes('CDF')) {
                const cdfOption = document.createElement('option');
                cdfOption.value = 'CDF';
                cdfOption.textContent = 'CDF';
                currencySelects.forEach(select => select.appendChild(cdfOption.cloneNode(true)));
            }

            // Définir une devise par défaut pour chaque sélecteur
            document.getElementById('from-currency').value = 'CDF';
            document.getElementById('to-currency').value = 'USD';
        } else {
            console.error('Unable to fetch currency data:', data);
            alert('Une erreur est survenue lors du chargement des devises. Veuillez réessayer.');
        }
    } catch (error) {
        console.error('Error loading currencies:', error);
        alert('Une erreur est survenue lors du chargement des devises. Veuillez réessayer.');
    }
}

// Convertir la devise
async function convertCurrency() {
    const amount = document.getElementById('amount').value;
    const fromCurrency = document.getElementById('from-currency').value;
    const toCurrency = document.getElementById('to-currency').value;

    if (amount === '' || fromCurrency === '' || toCurrency === '') {
        alert('Veuillez remplir tous les champs.');
        return;
    }

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`);
        const data = await response.json();
        const conversionResult = document.getElementById('conversion-result');

        conversionResult.textContent = `${amount} ${fromCurrency} = ${data.conversion_result} ${toCurrency}`;
    } catch (error) {
        console.error('Error converting currency:', error);
        alert('Une erreur est survenue lors de la conversion. Veuillez réessayer.');
    }
}

// Charger les devises lors du chargement de la page
window.addEventListener('load', loadCurrencies);