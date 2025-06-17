<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

require_once 'database.php';

try {
    // Get all instruments from database
    $instruments = getAllInstruments($pdo);
    
    // Format data for JavaScript
    $instrumentsData = [];
    $spotlightMapping = [];
    $spotlightPositions = [
        ['top' => '30%', 'left' => '25%'],
        ['top' => '45%', 'left' => '40%'],
        ['top' => '35%', 'left' => '60%'],
        ['top' => '50%', 'left' => '75%'],
        ['top' => '25%', 'left' => '50%'],
        ['top' => '40%', 'left' => '15%'],
        ['top' => '55%', 'left' => '85%'],
        ['top' => '20%', 'left' => '70%']
    ];
    
    $spotCount = 1;
    foreach ($instruments as $instrument) {
        $instrumentKey = strtolower($instrument['name_en']);
        
        // Format instrument data
        $instrumentsData[$instrumentKey] = [
            'id' => $instrument['id'],
            'name' => [
                'id' => $instrument['name_id'],
                'en' => $instrument['name_en'],
                'ja' => $instrument['name_ja']
            ],
            'description' => [
                'id' => $instrument['description_id'],
                'en' => $instrument['description_en'],
                'ja' => $instrument['description_ja']
            ],
            'mainImage' => $instrument['main_image'],
            'additionalImages' => json_decode($instrument['additional_images'], true) ?: [],
            'audioFile' => $instrument['audio_file']
        ];
        
        // Create spotlight mapping
        $spotlightMapping['spot-' . $spotCount] = $instrumentKey;
        $spotCount++;
    }
    
    // Return data as JSON
    echo json_encode([
        'success' => true,
        'instrumentsData' => $instrumentsData,
        'spotlightMapping' => $spotlightMapping,
        'spotlightPositions' => array_slice($spotlightPositions, 0, count($instruments)),
        'totalInstruments' => count($instruments)
    ]);
    
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage()
    ]);
}
?>