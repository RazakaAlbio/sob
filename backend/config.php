<?php
// Database configuration
$host = 'localhost';
$dbname = 'dbo';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die('Database connection failed: ' . $e->getMessage());
}

// Application settings
define('UPLOAD_MAX_SIZE', 10 * 1024 * 1024); // 10MB
define('ALLOWED_IMAGE_TYPES', ['jpg', 'jpeg', 'png', 'gif', 'svg']);
define('ALLOWED_AUDIO_TYPES', ['mp3', 'wav', 'ogg', 'm4a']);

// Paths
define('ASSETS_PATH', '../assets/');
define('IMAGES_PATH', ASSETS_PATH . 'images/');
define('AUDIO_PATH', ASSETS_PATH . 'audio/');
