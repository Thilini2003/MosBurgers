function displayOrders(orders) {
    const tableBody = document.getElementById('tbdy');
    tableBody.innerHTML = ''; // Clear the previous table rows

    // Filter out orders with any undefined fields
    const validOrders = orders.filter(order => {
        return order.customerName !== undefined &&
               order.customerContact !== undefined &&
               order.totalG !== undefined &&
               order.dateTime !== undefined;
    });

    // Append each valid order as a new table row
    validOrders.forEach(order => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><center>${order.customerName}</center></td>
            <td><center>${order.customerContact}</center></td>
            <td><center>Rs. ${order.totalG}</center></td>
            <td><center>${order.dateTime}</center></td>
        `;
        tableBody.appendChild(row);
    });

    // If there are no valid orders, you might want to display a message
    if (validOrders.length === 0) {
        const row = document.createElement('tr');
        row.innerHTML = `<td colspan="4"><center>No valid orders to display.</center></td>`;
        tableBody.appendChild(row);
    }
}

// Sorting: Newest to Oldest (default)
function defaultView() {
    const sortedOrders = [...window.orders].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    displayOrders(sortedOrders);
}

// Sorting: Oldest to Newest
function oldToNew() {
    const sortedOrders = [...window.orders].sort((a, b) => new Date(a.dateTime) - new Date(b.dateTime));
    displayOrders(sortedOrders);
}

// Sorting: Descending by Value
function valueOrder() {
    const sortedOrders = [...window.orders].sort((a, b) => b.totalG - a.totalG); // Make sure you're using totalG here
    displayOrders(sortedOrders);
}
