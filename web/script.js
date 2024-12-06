let cart = [];

function addToCart(product, price) {
    cart.push({ product, price });
    alert(`${product} a été ajouté au panier.`);
}
