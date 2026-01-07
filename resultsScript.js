document.addEventListener('DOMContentLoaded', function() {
    const results = JSON.parse(sessionStorage.getItem('searchResults'));
    console.log("Results from sessionStorage: ", results); // Debugging log

    if (!results || results.length === 0) {
        console.error('No results found or empty data.');
        return;
    }

    const tableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];

    results.forEach(product => {
        let row = tableBody.insertRow();
        row.insertCell(0).innerText = product.pid;
        row.insertCell(1).innerText = product.pname;
        row.insertCell(2).innerText = product.city;
        row.insertCell(3).innerText = product.quantity;
        row.insertCell(4).innerText = product.price;
    });
});
