<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

require_once 'config.php';

try {
    $action = $_GET['action'] ?? '';
    
    switch ($action) {
        case 'get_instruments':
            handleGetInstruments();
            break;
        case 'add_instrument':
            handleAddInstrument();
            break;
        case 'update_instrument':
            handleUpdateInstrument();
            break;
        case 'delete_instrument':
            handleDeleteInstrument();
            break;
        case 'upload_file':
            handleFileUpload();
            break;
        default:
            echo json_encode(['success' => false, 'message' => 'Invalid action']);
            exit;
    }
} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Server error: ' . $e->getMessage()]);
    exit;
}

function handleGetInstruments() {
    global $pdo;
    
    try {
        $stmt = $pdo->query("SELECT * FROM instruments ORDER BY id DESC");
        $instruments = $stmt->fetchAll(PDO::FETCH_ASSOC);
        
        echo json_encode(['success' => true, 'data' => $instruments]);
        exit;
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
        exit;
    }
}

function handleAddInstrument() {
    global $pdo;
    
    try {
        $name_id = $_POST['name_id'] ?? '';
        $name_en = $_POST['name_en'] ?? '';
        $name_ja = $_POST['name_ja'] ?? '';
        $description_id = $_POST['description_id'] ?? '';
        $description_en = $_POST['description_en'] ?? '';
        $description_ja = $_POST['description_ja'] ?? '';
        
        // Handle file uploads
        $main_image = handleSingleFileUpload('main_image', 'images');
        $audio_file = handleSingleFileUpload('audio_file', 'audio');
        $additional_images = handleMultipleFileUpload('additional_images', 'images');
        
        $stmt = $pdo->prepare("
            INSERT INTO instruments (name_id, name_en, name_ja, description_id, description_en, description_ja, main_image, audio_file, additional_images) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ");
        
        $stmt->execute([
            $name_id, $name_en, $name_ja, 
            $description_id, $description_en, $description_ja,
            $main_image, $audio_file, json_encode($additional_images)
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Instrument added successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function handleUpdateInstrument() {
    global $pdo;
    
    try {
        $id = $_POST['id'] ?? '';
        $name_id = $_POST['name_id'] ?? '';
        $name_en = $_POST['name_en'] ?? '';
        $name_ja = $_POST['name_ja'] ?? '';
        $description_id = $_POST['description_id'] ?? '';
        $description_en = $_POST['description_en'] ?? '';
        $description_ja = $_POST['description_ja'] ?? '';
        
        // Get current instrument data
        $stmt = $pdo->prepare("SELECT * FROM instruments WHERE id = ?");
        $stmt->execute([$id]);
        $current = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if (!$current) {
            echo json_encode(['success' => false, 'message' => 'Instrument not found']);
            return;
        }
        
        // Handle file uploads (keep existing if no new file uploaded)
        $main_image = handleSingleFileUpload('main_image', 'images') ?: $current['main_image'];
        $audio_file = handleSingleFileUpload('audio_file', 'audio') ?: $current['audio_file'];
        $additional_images = handleMultipleFileUpload('additional_images', 'images');
        if (empty($additional_images)) {
            $additional_images = json_decode($current['additional_images'], true) ?: [];
        }
        
        $stmt = $pdo->prepare("
            UPDATE instruments 
            SET name_id = ?, name_en = ?, name_ja = ?, description_id = ?, description_en = ?, description_ja = ?, 
                main_image = ?, audio_file = ?, additional_images = ?
            WHERE id = ?
        ");
        
        $stmt->execute([
            $name_id, $name_en, $name_ja, 
            $description_id, $description_en, $description_ja,
            $main_image, $audio_file, json_encode($additional_images), $id
        ]);
        
        echo json_encode(['success' => true, 'message' => 'Instrument updated successfully']);
        exit;
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function handleDeleteInstrument() {
    global $pdo;
    
    try {
        $id = $_POST['id'] ?? $_GET['id'] ?? '';
        
        if (empty($id)) {
            echo json_encode(['success' => false, 'message' => 'ID is required']);
            return;
        }
        
        // Get instrument data to delete associated files
        $stmt = $pdo->prepare("SELECT * FROM instruments WHERE id = ?");
        $stmt->execute([$id]);
        $instrument = $stmt->fetch(PDO::FETCH_ASSOC);
        
        if ($instrument) {
            // Delete associated files
            if ($instrument['main_image'] && file_exists('../assets/images/' . $instrument['main_image'])) {
                unlink('../assets/images/' . $instrument['main_image']);
            }
            if ($instrument['audio_file'] && file_exists('../assets/audio/' . $instrument['audio_file'])) {
                unlink('../assets/audio/' . $instrument['audio_file']);
            }
            
            $additional_images = json_decode($instrument['additional_images'], true);
            if ($additional_images) {
                foreach ($additional_images as $image) {
                    if (file_exists('../assets/images/' . $image)) {
                        unlink('../assets/images/' . $image);
                    }
                }
            }
        }
        
        $stmt = $pdo->prepare("DELETE FROM instruments WHERE id = ?");
        $stmt->execute([$id]);
        
        echo json_encode(['success' => true, 'message' => 'Instrument deleted successfully']);
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
}

function handleSingleFileUpload($fieldName, $folder) {
    if (!isset($_FILES[$fieldName]) || $_FILES[$fieldName]['error'] !== UPLOAD_ERR_OK) {
        return null;
    }
    
    $file = $_FILES[$fieldName];
    $uploadDir = "../assets/{$folder}/";
    
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    $fileExtension = pathinfo($file['name'], PATHINFO_EXTENSION);
    $fileName = uniqid() . '.' . $fileExtension;
    $uploadPath = $uploadDir . $fileName;
    
    if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
        return $fileName;
    }
    
    return null;
}

function handleMultipleFileUpload($fieldName, $folder) {
    if (!isset($_FILES[$fieldName]) || !is_array($_FILES[$fieldName]['name'])) {
        return [];
    }
    
    $files = $_FILES[$fieldName];
    $uploadDir = "../assets/{$folder}/";
    $uploadedFiles = [];
    
    if (!is_dir($uploadDir)) {
        mkdir($uploadDir, 0755, true);
    }
    
    for ($i = 0; $i < count($files['name']); $i++) {
        if ($files['error'][$i] === UPLOAD_ERR_OK) {
            $fileExtension = pathinfo($files['name'][$i], PATHINFO_EXTENSION);
            $fileName = uniqid() . '.' . $fileExtension;
            $uploadPath = $uploadDir . $fileName;
            
            if (move_uploaded_file($files['tmp_name'][$i], $uploadPath)) {
                $uploadedFiles[] = $fileName;
            }
        }
    }
    
    return $uploadedFiles;
}

function handleFileUpload() {
    $folder = $_POST['folder'] ?? 'images';
    $allowedFolders = ['images', 'audio'];
    
    if (!in_array($folder, $allowedFolders)) {
        echo json_encode(['success' => false, 'message' => 'Invalid folder']);
        return;
    }
    
    if (isset($_FILES['file'])) {
        $fileName = handleSingleFileUpload('file', $folder);
        if ($fileName) {
            echo json_encode(['success' => true, 'filename' => $fileName]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Upload failed']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'No file uploaded']);
    }
}
?>