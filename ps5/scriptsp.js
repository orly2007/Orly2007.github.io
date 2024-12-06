// Mettre à jour le compteur de produits dans le panier
function updateCartQuantity() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cartQuantity').textContent = cart.length;
}

// Ajouter un produit au panier
function addToCart() {
    const productName = document.querySelector('.product-details h2').textContent;
    const productPrice = parseFloat(document.getElementById('base-price').textContent.replace('à partir de ', '').replace('€', '').trim());
    const productImage = document.getElementById('phoneImage').src;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push({ name: productName, price: productPrice, image: productImage });

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartQuantity();
    alert(`${productName} a été ajouté au panier.`);
}

// Afficher les produits dans la page panier
function displayCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartList = document.getElementById('cart-list');
    const totalAmountEl = document.getElementById('total-amount');
    let totalAmount = 0;

    cartList.innerHTML = '';

    if (cart.length === 0) {
        cartList.innerHTML = '<li>Votre panier est vide.</li>';
        totalAmountEl.textContent = '0.00';
        return;
    }

    cart.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div>
                <img src="${item.image}" alt="${item.name}" style="width: 70px; margin-right: 10px;">
                <span>${item.name}</span>
                <span>${item.price.toFixed(2)} €</span>
            </div>
        `;
        cartList.appendChild(li);
        totalAmount += item.price;
    });

    totalAmountEl.textContent = totalAmount.toFixed(2);
}

// Ouvrir la modale de commande
function openOrderModal() {
    document.getElementById('order-modal').style.display = 'flex';
}

// Fermer la modale de commande
function closeOrderModal() {
    document.getElementById('order-modal').style.display = 'none';
}

// Gestion de la soumission du formulaire de commande
function handleOrderSubmission(event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const address = document.getElementById('address').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();

    if (name && address && email && phone) {
        alert(`Merci ${name}, votre commande a été confirmée !`);
        localStorage.removeItem('cart'); // Vider le panier
        closeOrderModal();
        window.location.href = 'index.html'; // Redirection vers la page d'accueil
    } else {
        alert('Veuillez remplir tous les champs.');
    }
}

// Initialisation
document.addEventListener('DOMContentLoaded', () => {
    updateCartQuantity();
    if (document.getElementById('cart-list')) {
        displayCartItems();
    }

    // Attacher les événements pour la modale
    const orderButton = document.getElementById('checkout-button');
    if (orderButton) {
        orderButton.addEventListener('click', openOrderModal);
    }

    const orderForm = document.getElementById('order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', handleOrderSubmission);
    }
});

