
function goBack() {
    window.history.back();
}

function reDirect(pageUrl) {
    window.location.href = `${pageUrl}`;
}


function openDivs(pageUrl, divId) {
    window.location.href = pageUrl + '?show=' + divId;
}



function Low() {
    const lowtbl = document.getElementById("tblForLow");
    lowtbl.innerHTML = ''; // Clear previous content

    const lowbtn = document.getElementById('lowstk');

    // Create table head
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th><center>Food ID</center></th>
            <th><center>Food Name</center></th>
            <th><center>Stock</center></th>
            <th></th>
        </tr>
    `;
    lowtbl.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    // Collect all low stock items from different categories
    const categories = [
        { items: window.burgers, label: 'Burger' },
        { items: window.submarines, label: 'Submarine' },
        { items: window.chicken, label: 'Chicken' },
        { items: window.fry, label: 'Fry' },
        { items: window.bev, label: 'Beverage' },
        { items: window.pasta, label: 'Pasta' }
    ];

    // Initialize counter
    let lowStockCount = 0;

    categories.forEach(category => {
        const lowStockItems = category.items.filter(item => parseInt(item.stock) < 10);

        lowStockItems.forEach(item => {
            lowStockCount++; // Increment counter
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><center>${item.foodId}</center></td>
                <td><center>${item.foodName}</center></td>
                <td><center>${item.stock}</center></td>
                <td><center><input type='number'><button class='btn btn-outline-success'>ReStock</button></center></td>
            `;
            tbody.appendChild(row);
        });
    });

    if (lowStockCount === 0) {
        // If there are no low stock items, display a message
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No Low Stock Items</td></tr>';
    }

    lowtbl.appendChild(tbody); // Append tbody to the table

    // Display the count on the button
    let countSpan = lowbtn.querySelector('.low-stock-count');
    if (!countSpan) {
        countSpan = document.createElement('span');
        countSpan.className = 'low-stock-count';
        lowbtn.appendChild(countSpan);
    }
    countSpan.innerText = lowStockCount > 0 ? lowStockCount : '';

    // Display the count message at the top of the table
    const countMessage = document.createElement('p');
    countMessage.innerHTML = `<strong>Total Low Stock Items: ${lowStockCount}</strong>`;
    lowtbl.prepend(countMessage); // Add the count message at the top
}


function Exp() {
    const exptbl = document.getElementById("tblForExp");
    exptbl.innerHTML = ''; // Clear previous content

    const expbtn = document.getElementById('expstk'); // The button for expired items

    // Create table head
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th><center>Food ID</center></th>
            <th><center>Food Name</center></th>
            <th><center>Expiry Date</center></th>
            <th></th>
        </tr>
    `;
    exptbl.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    // Collect all expired items from different categories
    const categories = [
        { items: window.burgers, label: 'Burger' },
        { items: window.submarines, label: 'Submarine' },
        { items: window.chicken, label: 'Chicken' },
        { items: window.fry, label: 'Fry' },
        { items: window.bev, label: 'Beverage' },
        { items: window.pasta, label: 'Pasta' }
    ];

    // Initialize counter
    let expiredItemCount = 0;
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format

    categories.forEach(category => {
        const expiredItems = category.items.filter(item => item.exp < currentDate);

        expiredItems.forEach(item => {
            expiredItemCount++; // Increment counter
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><center>${item.foodId}</center></td>
                <td><center>${item.foodName}</center></td>
                <td><center>${item.exp}</center></td>
                <td><center><button class='btn btn-outline-danger'>Remove</button></center></td>
            `;
            tbody.appendChild(row);
        });
    });

    if (expiredItemCount === 0) {
        // If there are no expired items, display a message
        tbody.innerHTML = '<tr><td colspan="4" style="text-align: center;">No Expired Items</td></tr>';
    }

    exptbl.appendChild(tbody); // Append tbody to the table

    // Display the count on the button
    let countSpan1 = expbtn.querySelector('.expired-count');
    if (!countSpan1) {
        countSpan1 = document.createElement('span');
        countSpan1.className = 'expired-count';
        expbtn.appendChild(countSpan1);
    }
    countSpan1.innerText = expiredItemCount > 0 ? expiredItemCount : '0';


    // Display the count message at the top of the table
    const countMessage = document.createElement('p');
    countMessage.innerHTML = `<strong>Total Expired Items: ${expiredItemCount}</strong>`;
    console.log(expiredItemCount);
    exptbl.prepend(countMessage); // Add the count message at the top
}

function reStock() {

    const id = document.getElementById('restkid').value;
    const cont = document.getElementById('num').value;

    const allItems = [
        ...window.burgers,
        ...window.submarines,
        ...window.fry,
        ...window.pasta,
        ...window.chicken,
        ...window.bev
    ];

    // Search for the item with the matching foodId
    const item = allItems.find(item => item.foodId === id);

    // If the item is found, update the stock
    if (item) {
        let x = item.stock;
        item.stock = x+cont;
        console.log(`Stock updated for ${item.foodName} (${item.foodId}) to ${item.stock}.`);
    } else {
        console.log("Item not found.");
    }

}

