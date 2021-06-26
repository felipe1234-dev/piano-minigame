<?php
$db = [
    $_ENV["DB_HOST"],
    $_ENV["DB_USER"],
    $_ENV["DB_PASS"],
    $_ENV["DB_NAME"]
];

$conn = new mysqli( ...$db );

// Check connection. - Checar conexão.
if ($conn->connect_error) {
    die("Connection failed: {$conn->connect_error}");
}

// Change character set to utf8mb4 
if (!$conn->set_charset("utf8mb4")) {
    die("Error loading character set utf8mb4: {$conn->error}");
} 