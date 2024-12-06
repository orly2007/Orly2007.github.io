function updateColor(color) {
    var phoneImage = document.getElementById('phoneImage');
    var colorMap = {
        'Mauve': 'photo_s23/mauve.jpg',
        'Noir': 'photo_s23/noir.jpg',
        'vert': 'photo_s23/vert.jpg',
        'Beige': 'photo_s23/belge.jpg' // Corrected the typo from 'belge' to 'beige'
    };
    if (colorMap[color]) {
        phoneImage.src = colorMap[color];
    } else {
        console.error('Color not found in colorMap');
    }
}

function updatePrice() {
    const basePrice = 699.99; // Adjusted base price for the product
    const storagePrices = {
        '128gb': 0,     // No additional cost for base storage option
        '256gb': 100,   // Logical upgrade price for higher storage
    };
    const conditionPrices = {
        'correct': -50,    // Discount for lesser condition
        'very_good': 0,    // No additional cost for very good condition
        'perfect': 50,     // Additional cost for perfect condition
        'premium': 100     // Higher additional cost for premium condition
    };
    const storageSelect = document.querySelector('.storage-options .active')?.getAttribute('data-value');
    const conditionSelect = document.querySelector('.condition-options .active')?.getAttribute('data-value');
    
    if (storageSelect && conditionSelect) {
        const storagePrice = storagePrices[storageSelect];
        const conditionPrice = conditionPrices[conditionSelect];
        const totalPrice = basePrice + storagePrice + conditionPrice;
        document.getElementById('base-price').textContent = 'à partir de ' + totalPrice.toFixed(2) + '€';
    } else {
        document.getElementById('base-price').textContent = 'à partir de ' + basePrice.toFixed(2) + '€';
        console.error('Storage or condition not selected');
    }
}

// Adding event listeners for storage and condition options
document.querySelectorAll('.storage-options button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.storage-options .active').forEach(active => active.classList.remove('active'));
        this.classList.add('active');
        updatePrice();
    });
});

document.querySelectorAll('.condition-options button').forEach(button => {
    button.addEventListener('click', function() {
        document.querySelectorAll('.condition-options .active').forEach(active => active.classList.remove('active'));
        this.classList.add('active');
        updatePrice();
    });
});
