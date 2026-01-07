<?php
// Database credentials
$host = "localhost"; // Adjust with your actual server host
$dbUsername = "s989k827"; // Replace with your database username
$dbPassword = "h989b827"; // Replace with your database password
$dbName = "s989k827"; // Replace with your database name

// Establish a MySQL database connection
$mysqli = new mysqli($host, $dbUsername, $dbPassword, $dbName);

// Check connection
if ($mysqli->connect_error) {
    die("Connection failed: " . $mysqli->connect_error);
}

// Retrieving form data
$productName = $_POST['productName'] ?? '';
$warehouseCity = $_POST['warehouseCity'] ?? '';
$minQuantity = $_POST['minQuantity'] ?? '';
$maxQuantity = $_POST['maxQuantity'] ?? '';
$minPrice = $_POST['minPrice'] ?? '';
$maxPrice = $_POST['maxPrice'] ?? '';

// Check if all fields are empty
$allFieldsEmpty = empty($productName) && empty($warehouseCity) && empty($minQuantity) && empty($maxQuantity) && empty($minPrice) && empty($maxPrice);

if ($allFieldsEmpty) {
    // If all fields are empty, select all products
    $query = "SELECT * FROM products";
    $stmt = $mysqli->prepare($query);
} else {
    // Building the query dynamically
    $query = "SELECT * FROM products WHERE 1=1";
    $params = [];
    $types = '';

    if (!empty($productName)) {
        $query .= " AND BINARY pname LIKE ?";
        $params[] = '%' . $mysqli->real_escape_string($productName) . '%';
        $types .= 's';
    }

    if (!empty($warehouseCity)) {
        $query .= " AND BINARY city LIKE ?";
        $params[] = '%' . $mysqli->real_escape_string($warehouseCity) . '%';
        $types .= 's';
    }

    if ($minQuantity !== '') {
        $query .= " AND quantity >= ?";
        $params[] = (int)$minQuantity;
        $types .= 'i';
    }

    if ($maxQuantity !== '') {
        $query .= " AND quantity <= ?";
        $params[] = (int)$maxQuantity;
        $types .= 'i';
    }

    if ($minPrice !== '') {
        $query .= " AND price >= ?";
        $params[] = (float)$minPrice;
        $types .= 'd';
    }

    if ($maxPrice !== '') {
        $query .= " AND price <= ?";
        $params[] = (float)$maxPrice;
        $types .= 'd';
    }

    // Preparing the statement
    $stmt = $mysqli->prepare($query);

    // Binding parameters dynamically
    if (!empty($types)) {
        $stmt->bind_param($types, ...$params);
    }
}

// Executing the query
$stmt->execute();

// Getting the result
$result = $stmt->get_result();

// Fetching and returning the results
$searchResults = [];
while ($row = $result->fetch_assoc()) {
    array_push($searchResults, $row);
}

// Closing the statement and connection
$stmt->close();
$mysqli->close();

// Sending the response back as JSON
echo json_encode($searchResults);
?>
