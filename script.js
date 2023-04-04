const candyForm = document.querySelector('#candy-form');
const candyTable = document.querySelector('#candy-table tbody');
const remainingQuantity = document.querySelector('#remaining-quantity');

let totalQuantity = 0;

candyForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const candyName = document.querySelector('#candy-name').value;
    const candyDesc = document.querySelector('#candy-desc').value;
    const candyPrice = document.querySelector('#candy-price').value;
    const candyQuantity = document.querySelector('#candy-quantity').value;

    const candyData = {
        name: candyName,
        description: candyDesc,
        price: candyPrice,
        quantity: candyQuantity
    };

    // Send data to backend
    try {
        const response = await fetch('https://crudcrud.com/api/f648c6ed2d1f42d3a2a7852fe1d8629d/candies', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(candyData)
        });
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }

    // Add data to table
    const candyRow = candyTable.insertRow();
    candyRow.innerHTML = `
        <td>${candyName}</td>
        <td>${candyDesc}</td>
        <td>${candyPrice}</td>
        <td>${candyQuantity}</td>
    `;
    candyForm.reset();

    // Update total quantity
    totalQuantity += parseInt(candyQuantity);
    remainingQuantity.textContent = `Total quantity remaining: ${totalQuantity}`;
});

// Get data from backend
async function getData() {
    try {
        const response = await fetch('https://crudcrud.com/api/f648c6ed2d1f42d3a2a7852fe1d8629d/candies');
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error(error);
    }
}

// Call the getData function to fetch data from the backend
getData();
