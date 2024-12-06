// Calculer le total de la commande (panier + frais de livraison)
const SHIPPING_COST = 20;

function updateOrderTotal() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalElement = document.getElementById('order-total');

    // Calculer le total des articles dans le panier
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Ajouter les frais de livraison
    total += SHIPPING_COST;

    // Afficher le total formaté
    totalElement.textContent = formatCurrency(total);
}

// Fonction pour afficher les prix au format monétaire
function formatCurrency(amount) {
    return amount.toLocaleString('fr-FR', { style: 'currency', currency: 'EUR' });
}

// Fonction de soumission de commande
function handleOrderSubmission(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    if (name && address && email && phone) {
        alert(`Merci ${name}, de votre confiance ! Votre commande est en cours, et nous mettons tout en œuvre pour vous offrir la meilleure expérience.`);
        localStorage.removeItem('cart'); // Réinitialiser le panier
        window.location.href = 'produits.html'; // Rediriger vers la page d'accueil
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

// Fonction pour afficher ou masquer les champs de paiement selon la méthode choisie
function togglePaymentFields() {
    const paymentMethod = document.getElementById('payment-method').value;
    document.getElementById('credit-card-info').style.display = 'none';
    document.getElementById('paypal-info').style.display = 'none';
    document.getElementById('bank-transfer-info').style.display = 'none';

    document.querySelectorAll('#credit-card-info input, #paypal-info input, #bank-transfer-info input')
        .forEach(input => input.required = false);

    if (paymentMethod === 'credit-card') {
        document.getElementById('credit-card-info').style.display = 'block';
        document.querySelectorAll('#credit-card-info input').forEach(input => input.required = true);
    } else if (paymentMethod === 'paypal') {
        document.getElementById('paypal-info').style.display = 'block';
        document.querySelector('#paypal-email').required = true;
    } else if (paymentMethod === 'bank-transfer') {
        document.getElementById('bank-transfer-info').style.display = 'block';
        document.querySelector('#bank-account').required = true;
    }
}


// Fonction pour annuler la commande et revenir au panier
function cancelOrder() {
    if (confirm('Voulez-vous annuler la commande ?')) {
        window.location.href = 'panier.html'; // Retour au panier
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    updateOrderTotal(); // Mettre à jour le total au chargement de la page
});
