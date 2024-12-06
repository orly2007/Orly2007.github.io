function updateColor(color) {
    var phoneImage = document.getElementById('phoneImage');
    var colorMap = {
        'bleu': 'Ps5bleu(2).jpg',
        'black': 'ps5black.jpg',
        'spiderman': 'ps5 spiderman.jpg',
        'white': 'ps5balnc.jpg',
        'red': 'Ps5rouge2.jpg'
    };
    if (colorMap[color]) {
        phoneImage.src = colorMap[color];
    } else {
        console.error('Color not found in colorMap');
    }
}

function updatePrice() {
    const basePrice = 499.99; // Adjusted base price for PS5 Slim
    const storagePrices = {
        '600gb': 50,
        '1000gb': 100
    };
    const conditionPrices = {
        'correct': -50,
        'very_good': 0,
        'perfect': 50,
        'premium': 100
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

