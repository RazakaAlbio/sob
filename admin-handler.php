<?php
// Admin Handler for Sound of Borobudur
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE');
header('Access-Control-Allow-Headers: Content-Type');

// Capture any output that might interfere with JSON
ob_start();

try {
    require_once 'database.php';
} catch (Exception $e) {
    ob_clean();
    echo json_encode([
        'success' => false,
        'message' => 'Database connection failed: ' . $e->getMessage()
    ]);
    exit;
}

// Handle different actions
$action = $_GET['action'] ?? $_POST['action'] ?? 'add';

try {
    switch ($action) {
        case 'add':
            handleAddInstrument();
            break;
        case 'get_instruments':
            handleGetInstruments();
            break;
        case 'delete':
            handleDeleteInstrument();
            break;
        case 'update':
            handleUpdateInstrument();
            break;
        default:
            throw new Exception('Invalid action');
    }
} catch (Exception $e) {
    ob_clean();
    echo json_encode([
        'success' => false,
        'message' => $e->getMessage()
    ]);
    exit;
}

function handleAddInstrument() {
    global $pdo;
    
    // Validate required fields
    $required_fields = ['name_id', 'name_en', 'name_ja', 'description_id', 'description_en', 'description_ja'];
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Field $field is required");
        }
    }
    
    // Validate file uploads
    if (!isset($_FILES['main_image']) || $_FILES['main_image']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Main image is required');
    }
    
    if (!isset($_FILES['audio_file']) || $_FILES['audio_file']['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('Audio file is required');
    }
    
    // Create upload directories if they don't exist
    $upload_dirs = ['assets', 'assets/audio'];
    foreach ($upload_dirs as $dir) {
        if (!is_dir($dir)) {
            mkdir($dir, 0755, true);
        }
    }
    
    // Handle main image upload
    $main_image_path = handleFileUpload($_FILES['main_image'], 'assets/', ['svg', 'png', 'jpg', 'jpeg']);
    
    // Handle audio file upload
    $audio_file_path = handleFileUpload($_FILES['audio_file'], 'assets/audio/', ['mp3', 'wav', 'ogg']);
    
    // Handle additional images upload
    $additional_images = [];
    if (isset($_FILES['additional_images']) && is_array($_FILES['additional_images']['name'])) {
        for ($i = 0; $i < count($_FILES['additional_images']['name']); $i++) {
            if ($_FILES['additional_images']['error'][$i] === UPLOAD_ERR_OK) {
                $file = [
                    'name' => $_FILES['additional_images']['name'][$i],
                    'type' => $_FILES['additional_images']['type'][$i],
                    'tmp_name' => $_FILES['additional_images']['tmp_name'][$i],
                    'error' => $_FILES['additional_images']['error'][$i],
                    'size' => $_FILES['additional_images']['size'][$i]
                ];
                $additional_images[] = handleFileUpload($file, 'assets/', ['png', 'jpg', 'jpeg']);
            }
        }
    }
    
    // Insert into database
    $sql = "INSERT INTO instruments (name_id, name_en, name_ja, description_id, description_en, description_ja, main_image, additional_images, audio_file) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $pdo->prepare($sql);
    $result = $stmt->execute([
        $_POST['name_id'],
        $_POST['name_en'],
        $_POST['name_ja'],
        $_POST['description_id'],
        $_POST['description_en'],
        $_POST['description_ja'],
        $main_image_path,
        json_encode($additional_images),
        $audio_file_path
    ]);
    
    if ($result) {
        echo json_encode([
            'success' => true,
            'message' => 'Instrument added successfully',
            'id' => $pdo->lastInsertId()
        ]);
    } else {
        throw new Exception('Failed to insert instrument into database');
    }
}

function handleGetInstruments() {
    global $pdo;
    
    try {
        $instruments = getAllInstruments($pdo);
        
        ob_clean();
        echo json_encode([
            'success' => true,
            'instruments' => $instruments
        ]);
        exit;
    } catch (Exception $e) {
        ob_clean();
        echo json_encode([
            'success' => false,
            'message' => 'Failed to get instruments: ' . $e->getMessage()
        ]);
        exit;
    }
}

function handleDeleteInstrument() {
    global $pdo;
    
    if (empty($_POST['id'])) {
        throw new Exception('Instrument ID is required');
    }
    
    $id = (int)$_POST['id'];
    
    // Get instrument data before deletion to remove files
    $instrument = getInstrumentById($pdo, $id);
    if (!$instrument) {
        throw new Exception('Instrument not found');
    }
    
    // Delete from database
    $stmt = $pdo->prepare("DELETE FROM instruments WHERE id = ?");
    $result = $stmt->execute([$id]);
    
    if ($result) {
        // Remove files
        if (file_exists($instrument['main_image'])) {
            unlink($instrument['main_image']);
        }
        
        if (file_exists($instrument['audio_file'])) {
            unlink($instrument['audio_file']);
        }
        
        // Remove additional images
        if ($instrument['additional_images']) {
            $additional_images = json_decode($instrument['additional_images'], true);
            if (is_array($additional_images)) {
                foreach ($additional_images as $image_path) {
                    if (file_exists($image_path)) {
                        unlink($image_path);
                    }
                }
            }
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Instrument deleted successfully'
        ]);
    } else {
        throw new Exception('Failed to delete instrument');
    }
}

function handleUpdateInstrument() {
    global $pdo;
    
    // Validate required fields
    if (empty($_POST['id'])) {
        throw new Exception('Instrument ID is required');
    }
    
    $id = (int)$_POST['id'];
    
    // Get existing instrument
    $existing = getInstrumentById($pdo, $id);
    if (!$existing) {
        throw new Exception('Instrument not found');
    }
    
    $required_fields = ['name_id', 'name_en', 'name_ja', 'description_id', 'description_en', 'description_ja'];
    foreach ($required_fields as $field) {
        if (empty($_POST[$field])) {
            throw new Exception("Field $field is required");
        }
    }
    
    // Handle file uploads (optional for update)
    $main_image = $existing['main_image'];
    $additional_images = $existing['additional_images'];
    $audio_file = $existing['audio_file'];
    
    // Update main image if provided
    if (isset($_FILES['main_image']) && $_FILES['main_image']['error'] === UPLOAD_ERR_OK) {
        $main_image = handleFileUpload($_FILES['main_image'], 'assets/', ['jpg', 'jpeg', 'png', 'svg']);
        // Delete old image if different
        if ($existing['main_image'] !== $main_image && file_exists($existing['main_image'])) {
            unlink($existing['main_image']);
        }
    }
    
    // Update additional images if provided
    if (isset($_FILES['additional_images']) && !empty($_FILES['additional_images']['name'][0])) {
        $uploaded_images = [];
        for ($i = 0; $i < count($_FILES['additional_images']['name']); $i++) {
            if ($_FILES['additional_images']['error'][$i] === UPLOAD_ERR_OK) {
                $file = [
                    'name' => $_FILES['additional_images']['name'][$i],
                    'type' => $_FILES['additional_images']['type'][$i],
                    'tmp_name' => $_FILES['additional_images']['tmp_name'][$i],
                    'error' => $_FILES['additional_images']['error'][$i],
                    'size' => $_FILES['additional_images']['size'][$i]
                ];
                $uploaded_images[] = handleFileUpload($file, 'assets/', ['jpg', 'jpeg', 'png']);
            }
        }
        if (!empty($uploaded_images)) {
            $additional_images = json_encode($uploaded_images);
            // Delete old images
            $old_images = json_decode($existing['additional_images'], true);
            if ($old_images) {
                foreach ($old_images as $old_image) {
                    if (file_exists($old_image)) {
                        unlink($old_image);
                    }
                }
            }
        }
    }
    
    // Update audio file if provided
    if (isset($_FILES['audio_file']) && $_FILES['audio_file']['error'] === UPLOAD_ERR_OK) {
        $audio_file = handleFileUpload($_FILES['audio_file'], 'assets/audio/', ['mp3', 'wav', 'ogg']);
        // Delete old audio if different
        if ($existing['audio_file'] !== $audio_file && file_exists($existing['audio_file'])) {
            unlink($existing['audio_file']);
        }
    }
    
    // Update database
    $stmt = $pdo->prepare("
        UPDATE instruments SET 
        name_id = ?, name_en = ?, name_ja = ?,
        description_id = ?, description_en = ?, description_ja = ?,
        main_image = ?, additional_images = ?, audio_file = ?,
        updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    ");
    
    $result = $stmt->execute([
        $_POST['name_id'], $_POST['name_en'], $_POST['name_ja'],
        $_POST['description_id'], $_POST['description_en'], $_POST['description_ja'],
        $main_image, $additional_images, $audio_file, $id
    ]);
    
    if ($result) {
        ob_clean();
        echo json_encode([
            'success' => true,
            'message' => 'Instrument updated successfully'
        ]);
        exit;
    } else {
        throw new Exception('Failed to update instrument');
    }
}

function handleFileUpload($file, $upload_dir, $allowed_extensions) {
    // Validate file
    if ($file['error'] !== UPLOAD_ERR_OK) {
        throw new Exception('File upload error: ' . $file['error']);
    }
    
    // Check file size (max 10MB)
    if ($file['size'] > 10 * 1024 * 1024) {
        throw new Exception('File size too large. Maximum 10MB allowed.');
    }
    
    // Get file extension
    $file_extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
    
    // Validate extension
    if (!in_array($file_extension, $allowed_extensions)) {
        throw new Exception('Invalid file type. Allowed: ' . implode(', ', $allowed_extensions));
    }
    
    // Generate unique filename
    $filename = uniqid() . '_' . time() . '.' . $file_extension;
    $file_path = $upload_dir . $filename;
    
    // Move uploaded file
    if (!move_uploaded_file($file['tmp_name'], $file_path)) {
        throw new Exception('Failed to move uploaded file');
    }
    
    return $file_path;
}

// Additional helper functions
function sanitizeFilename($filename) {
    // Remove special characters and spaces
    $filename = preg_replace('/[^a-zA-Z0-9._-]/', '_', $filename);
    return $filename;
}

function validateImageFile($file_path) {
    $allowed_types = ['image/jpeg', 'image/png', 'image/svg+xml'];
    $file_info = finfo_open(FILEINFO_MIME_TYPE);
    $mime_type = finfo_file($file_info, $file_path);
    finfo_close($file_info);
    
    return in_array($mime_type, $allowed_types);
}

function validateAudioFile($file_path) {
    $allowed_types = ['audio/mpeg', 'audio/wav', 'audio/ogg'];
    $file_info = finfo_open(FILEINFO_MIME_TYPE);
    $mime_type = finfo_file($file_info, $file_path);
    finfo_close($file_info);
    
    return in_array($mime_type, $allowed_types);
}
?>