function addCustomer() {
    const customerName = document.getElementById('custname').value;
    const customerContact = document.getElementById('custcont').value;
    const newCust = [
        customerName,
        customerContact
    ];
    window.customer.push(newCust);
    console.log("Customer added : " + newCust);
    console.log(window.customer);
}
function addCustomerByParam(cn,cc) {
    
    const newCust = [
        cn,
        cc
    ];
    window.customer.push(newCust);
    console.log("Customer added : " + newCust);
    console.log(window.customer);
}

function searchCustomer() {
    const searchName = document.getElementById('nameToSearch').value;
    const customer = window.customer.find(cust => cust[1] === searchName) || window.customer.find(cust => cust[0] === searchName);
    console.log(customer);

    if (customer) {
        const tbc = document.getElementById('tableContainer');
        tbc.innerHTML = ''; // Clear previous content

        // Create table head
        const thead = document.createElement('thead');
        thead.innerHTML = `
            <tr>
                <th>Customer Name &nbsp;&nbsp;&nbsp;|</th>
                <th>&nbsp;&nbsp;&nbsp; Customer Contact Number</th>
            </tr>
        `;
        tbc.appendChild(thead);

        // Create table body
        const tbody = document.createElement('tbody');
        tbody.innerHTML = `
            <tr>
                <td>${customer[0]}</td>
                <td>${customer[1]}</td>
            </tr>
        `;

        tbc.appendChild(tbody); // Append tbody to the table container
    } else {
        const tbc = document.getElementById('tableContainer');
        tbc.innerHTML = '<center><h4>No Results Found</h4></center>';
    }
}

function viewCustomers() {
    const tbc = document.getElementById('tblc');
    tbc.innerHTML = ''; // Clear previous content


    // Create table head
    const thead = document.createElement('thead');
    thead.innerHTML = `
        <tr>
            <th>Customer Name &nbsp;&nbsp;&nbsp;|</th>
            <th>&nbsp;&nbsp;&nbsp; Customer Contact Number</th>
        </tr>
    `;
    tbc.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');

    if (window.customer.length === 0) {
        tbc.innerHTML = '<center><h4>No Results Found</h4></center>';
    } else {
        for (let i = 0; i < window.customer.length; i++) {
            const customer = window.customer[i];
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${customer[0]}</td>
                <td>${customer[1]}</td>
            `;
            tbody.appendChild(row); // Append each row to tbody
        }
    }

    tbc.appendChild(tbody); // Append tbody to the table container
}