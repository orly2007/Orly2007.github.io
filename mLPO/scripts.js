function updateColor(color) {
    var phoneImage = document.getElementById('phoneImage');
    var colorMap = {
        'vert alpin': 'photo/iphone-vert-alpin.jpg',
        'bleu alpin': 'photo/iphone-bleu-alpin.jpg',
        'graphite': 'photo/iphone-graphite.jpg',
        'or': 'photo/iphone-or.jpg',
        'argent': 'photo/iphone-argent.jpg'
    };
    phoneImage.src = colorMap[color];
}

function updatePrice() {
    const basePrice = 551.12;
    const storagePrices = {
        '128gb': 0,
        '256gb': 100,
        '512gb': 200,
        '1000gb': 400
    };
    const conditionPrices = {
        'correct': -50,
        'very_good': 0,
        'perfect': 50,
        'premium': 100
    };
    const storageSelect = document.querySelector('.storage-options .active').getAttribute('data-value');
    const conditionSelect = document.querySelector('.condition-options .active').getAttribute('data-value');
    const storagePrice = storagePrices[storageSelect];
    const conditionPrice = conditionPrices[conditionSelect];
    const totalPrice = basePrice + storagePrice + conditionPrice;
    document.getElementById('base-price').textContent = 'à partir de ' + totalPrice.toFixed(2) + '€';
}

document.querySelectorAll('.storage-options button').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.storage-options .active').forEach(active => active.classList.remove('active'));
        this.classList.add('active');
        updatePrice();
    });
});

document.querySelectorAll('.condition-options button').forEach(button => {
    button.addEventListener('click', function () {
        document.querySelectorAll('.condition-options .active').forEach(active => active.classList.remove('active'));
        this.classList.add('active');
        updatePrice();
    });
});
