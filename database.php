<?php
// Database configuration for Sound of Borobudur
$host = 'localhost';
$dbname = 'sob';
$username = 'root';
$password = '';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}

// Function to get all instruments
function getAllInstruments($pdo)
{
    $stmt = $pdo->query("SELECT * FROM instruments ORDER BY id");
    return $stmt->fetchAll();
}

// Function to get instrument by ID
function getInstrumentById($pdo, $id)
{
    $stmt = $pdo->prepare("SELECT * FROM instruments WHERE id = ?");
    $stmt->execute([$id]);
    return $stmt->fetch();
}

// Function to get instrument by name
function getInstrumentByName($pdo, $name)
{
    $stmt = $pdo->prepare("SELECT * FROM instruments WHERE name_id = ? OR name_en = ? OR name_ja = ?");
    $stmt->execute([$name, $name, $name]);
    return $stmt->fetch();
}

// Function to get spotlight mapping
function getSpotlightMapping($pdo)
{
    $instruments = getAllInstruments($pdo);
    $mapping = [];
    $spotCount = 1;

    foreach ($instruments as $instrument) {
        $mapping['spot-' . $spotCount] = $instrument['name_en'];
        $spotCount++;
    }

    return $mapping;
}
