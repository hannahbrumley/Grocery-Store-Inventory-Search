document.getElementById('productSearchForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const productName = document.getElementById('productName').value.trim();
    const warehouseCity = document.getElementById('warehouseCity').value.trim();
    const minQuantity = document.getElementById('minQuantity').value;
    const maxQuantity = document.getElementById('maxQuantity').value;
    const minPrice = document.getElementById('minPrice').value;
    const maxPrice = document.getElementById('maxPrice').value;

    console.log("Form Data: ", { productName, warehouseCity, minQuantity, maxQuantity, minPrice, maxPrice }); // Debugging log

    const formData = new URLSearchParams({
        productName,
        warehouseCity,
        minQuantity,
        maxQuantity,
        minPrice,
        maxPrice
    });

    // Store form data in session storage
    sessionStorage.setItem('productName', productName);
    sessionStorage.setItem('warehouseCity', warehouseCity);
    sessionStorage.setItem('minQuantity', minQuantity);
    sessionStorage.setItem('maxQuantity', maxQuantity);
    sessionStorage.setItem('minPrice', minPrice);
    sessionStorage.setItem('maxPrice', maxPrice);

    fetch('search.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log("Response Data: ", data); // Debugging log
        sessionStorage.setItem('searchResults', JSON.stringify(data));
        window.location.href = 'results.html'; 
    })
    .catch(error => {
        console.error('Error:', error);
    });
});

// Pre-fill form fields from session storage on page load
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('productName').value = sessionStorage.getItem('productName') || '';
    document.getElementById('warehouseCity').value = sessionStorage.getItem('warehouseCity') || '';
    document.getElementById('minQuantity').value = sessionStorage.getItem('minQuantity') || '';
    document.getElementById('maxQuantity').value = sessionStorage.getItem('maxQuantity') || '';
    document.getElementById('minPrice').value = sessionStorage.getItem('minPrice') || '';
    document.getElementById('maxPrice').value = sessionStorage.getItem('maxPrice') || '';
});

// Clear form and session storage
function clearForm() {
    document.getElementById('productSearchForm').reset();
    sessionStorage.removeItem('productName');
    sessionStorage.removeItem('warehouseCity');
    sessionStorage.removeItem('minQuantity');
    sessionStorage.removeItem('maxQuantity');
    sessionStorage.removeItem('minPrice');
    sessionStorage.removeItem('maxPrice');
}
