let cart = [];

function showProducts() {
    window.location.href = "produits.html";
}

function showProductDetails(name, image, price, condition) {
    localStorage.setItem('productDetails', JSON.stringify({ name, image, price, condition }));
    window.location.href = "product-details.html";
}

function addToCart() {
    const productDetails = JSON.parse(localStorage.getItem('productDetails'));
    cart.push(productDetails);
    updateCartDisplay();
    alert(`${productDetails.name} a été ajouté au panier.`);
}

function showCart() {
    window.location.href = "panier.html";
}

function updateCartDisplay() {
    const cartList = document.getElementById('cart-list');
    cartList.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.name} - ${item.price}`;
        cartList.appendChild(li);
        total += parseFloat(item.price.replace('€', ''));
    });
    document.getElementById('total-amount').innerText = total + '€';
}

function showOrderForm() {
    window.location.href = "commande.html";
}

function sendOrderDetails(event) {
    event.preventDefault();
    const name = document.getElementById('customerName').value;
    const email = document.getElementById('customerEmail').value;
    const address = document.getElementById('customerAddress').value;

    alert(`Commande envoyée !\nNom: ${name}\nEmail: ${email}\nAdresse: ${address}`);

    document.getElementById('orderDetails').reset();
    cart = [];
    window.location.href = "index.html";
}
