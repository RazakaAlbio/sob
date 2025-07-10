<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'config.php';

try {
    $stmt = $pdo->query("SELECT * FROM instruments ORDER BY id ASC");
    $instruments = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Process additional_images field
    foreach ($instruments as &$instrument) {
        if ($instrument['additional_images']) {
            $instrument['additional_images'] = json_decode($instrument['additional_images'], true);
        } else {
            $instrument['additional_images'] = [];
        }
    }
    
    // Create spotlight mapping and positions for the frontend
    $spotlightMapping = [
        'spot-1' => 'gamelan',
        'spot-2' => 'angklung', 
        'spot-3' => 'sasando',
        'spot-4' => 'kendang',
        'spot-5' => 'suling'
    ];
    
    $spotlightPositions = [
        ['top' => '25%', 'left' => '20%'],
        ['top' => '35%', 'left' => '45%'],
        ['top' => '50%', 'left' => '70%'],
        ['top' => '65%', 'left' => '30%'],
        ['top' => '75%', 'left' => '55%']
    ];
    
    echo json_encode([
        'success' => true,
        'instrumentsData' => $instruments,
        'spotlightMapping' => $spotlightMapping,
        'spotlightPositions' => $spotlightPositions,
        'totalInstruments' => count($instruments)
    ]);
    
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Server error: ' . $e->getMessage()
    ]);
}
?>