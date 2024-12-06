document.addEventListener('DOMContentLoaded', () => {
    // Écouter les clics sur les boutons "Ajouter au panier"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productElement = e.target.closest('.product-item');
            const productId = productElement.getAttribute('data-id');
            const productName = productElement.querySelector('h3').textContent;
            const productPrice = parseFloat(productElement.querySelector('p').textContent.replace('$', '').trim());
            const productImage = productElement.querySelector('img').src;

            addProductToCart(productId, productName, productPrice, productImage);
        });
    });
});

// Fonction pour ajouter un produit au panier
function addProductToCart(id, name, price, image) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Vérifier si le produit est déjà dans le panier
    const existingProductIndex = cart.findIndex(item => item.id === id);
    
    if (existingProductIndex === -1) {
        // Ajouter un nouveau produit
        cart.push({ id, name, price, image });
    } else {
        // Le produit existe déjà, vous pouvez choisir d'augmenter la quantité ou ne rien faire
        alert('Ce produit est déjà dans votre panier.');
    }

    // Sauvegarder le panier dans le localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Mettre à jour la quantité dans la page panier
    updateCartQuantity();
}

// Fonction pour mettre à jour la quantité de produits dans le panier
function updateCartQuantity() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    document.getElementById('cartQuantity').textContent = cart.length;
}
