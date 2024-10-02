document.addEventListener('DOMContentLoaded', () => {
    // Check if the array is already available in localStorage
    if (!localStorage.getItem('items')) {
        localStorage.setItem('items', JSON.stringify(window.frys));
    }
    displayData3();
});

// Function to check if an image exists
function checkImage(src, callback) {
    const img = new Image();
    img.onload = () => callback(true);
    img.onerror = () => callback(false);
    img.src = src;
}

// Function to get valid image source
function getImageSrc(item, callback) {
    const baseSrc = "foodImages/" + item.foodId;
    const extensions = ['.jpeg', '.jpg', '.png'];

    let i = 0;
    function tryNext() {
        if (i < extensions.length) {
            const src = baseSrc + extensions[i];
            checkImage(src, (exists) => {
                if (exists) {
                    callback(src);
                } else {
                    i++;
                    tryNext();
                }
            });
        } else {
            // Default fallback image
            callback('foodImages/default.jpg');
        }
    }

    tryNext();
}

// Function to display data
function displayData3() {
    const container = document.getElementById('data-container3');
    if (!container) {
        console.error('Container not found!');
        return;
    }

    const items = JSON.parse(localStorage.getItem('fries'));
    console.log('Items to display:', items);
    container.innerHTML = '';

    items.forEach((item) => {
        if (item.type === "fries") {
            getImageSrc(item, (imgSrc) => {
                const card = document.createElement('div');
                card.className = 'col';
                card.innerHTML = `
                    <div class="card foodcard" style="width: 18rem; background:rgba(253, 253, 253, 0.755);">
                        <img src="${imgSrc}" class="card-img-top" style="height:20vh;" alt="${item.foodName}">
                        <div class="card-body">
                            <h6 class="card-title" style="font-weight:700;">${item.foodName}&nbsp|&nbsp${item.foodId}</h6>
                            <p class="card-text">Rs.${item.price}</p>
                            <p class="card-text">Discount: ${item.discount}%</p>
                            <input type="number" id="numberInput-${item.foodId}" class="number-input" value="1" min="1">
                            <button class="btn btn-success" onclick="addToCart1('${item.foodId}', ${item.price}, ${item.discount})">Add to cart</button>
                        </div>
                    </div>
                `;
                container.appendChild(card);
            });
        }
    });
}

// Function to add an item to the cart
function addToCart1(foodId, price, discount) {
    const items = JSON.parse(localStorage.getItem('fries'));
    const foodIds = JSON.parse(localStorage.getItem('foodIds'));

    const index = foodIds.indexOf(foodId);
    if (index === -1) {
        console.error('Food ID not found:', foodId);
        return;
    }

    const item = items[index];
    const quantityInput = document.getElementById(`numberInput-${foodId}`);
    const quantity = parseInt(quantityInput.value, 10);

    if (quantity <= 0) {
        alert('Please enter a quantity greater than 0.');
        return;
    }

    const cartTable = document.querySelector('#cart tbody');

    // Check if the item already exists in the cart
    let existingRow = cartTable.querySelector(`tr[data-id="${foodId}"]`);
    if (existingRow) {
        let quantityCell = existingRow.querySelector('.qty');
        let ttCell = existingRow.querySelector('.ttl');
        let currentQuantity = parseInt(quantityCell.textContent, 10);
        let newQty = currentQuantity + quantity;
        quantityCell.textContent = newQty;
        let discountedPrice = price - (price * discount / 100);
        ttCell.textContent = `Rs.${(discountedPrice * newQty).toFixed(2)}`;
        updateCartTotal();
        return;
    }

    // Create a new row for the item
    const row = document.createElement('tr');
    row.setAttribute('data-id', foodId);
    let discountedPrice = price - (price * discount / 100);
    row.innerHTML = `
        <td><center>${foodId}</center></td>
        <td class="qty"><center>${quantity}</center></td>
        <td><center>Rs.${price}</center></td>
        <td><center>${discount}%</center></td>
        <td class="ttl"><center>Rs.${(discountedPrice * quantity).toFixed(2)}</center></td>
        
    `;
    cartTable.appendChild(row);

    updateCartTotal();
}

// Function to update cart total
function updateCartTotal() {
    const cartTable = document.querySelector('#cart tbody');
    let total = 0;

    cartTable.querySelectorAll('tr').forEach(row => {
        const quantity = parseInt(row.querySelector('.qty').textContent, 10);
        const price = parseFloat(row.querySelector('td:nth-child(3)').textContent.replace('Rs.', ''));
        const discount = parseFloat(row.querySelector('td:nth-child(4)').textContent.replace('%', ''));
        const discountedPrice = price - (price * discount / 100);
        total += quantity * discountedPrice;

        // Update ttl cell correctly
        let ttlCell = row.querySelector('.ttl');
        ttlCell.textContent = `Rs.${(quantity * discountedPrice).toFixed(2)}`;
    });

    document.getElementById('totalSpan').textContent = `Rs.${total.toFixed(2)}`;
}
