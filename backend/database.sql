-- Database setup for Sound of Borobudur
-- Create database
CREATE DATABASE IF NOT EXISTS kemenbud_instruments CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE kemenbud_instruments;

-- Create instruments table
CREATE TABLE IF NOT EXISTS instruments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_id VARCHAR(255) NOT NULL COMMENT 'Indonesian name',
    name_en VARCHAR(255) NOT NULL COMMENT 'English name',
    name_ja VARCHAR(255) NOT NULL COMMENT 'Japanese name',
    description_id TEXT NOT NULL COMMENT 'Indonesian description',
    description_en TEXT NOT NULL COMMENT 'English description',
    description_ja TEXT NOT NULL COMMENT 'Japanese description',
    main_image VARCHAR(255) DEFAULT NULL COMMENT 'Main image filename',
    audio_file VARCHAR(255) DEFAULT NULL COMMENT 'Audio file filename',
    additional_images JSON DEFAULT NULL COMMENT 'Additional images as JSON array',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert sample data
INSERT INTO instruments (name_id, name_en, name_ja, description_id, description_en, description_ja, main_image, audio_file) VALUES
('Gamelan', 'Gamelan', 'ガムラン', 
 'Gamelan adalah ansambel musik tradisional Jawa, Sunda, dan Bali di Indonesia yang terdiri dari instrumen perkusi seperti metalofon, xilofon, drum, dan gong.',
 'Gamelan is a traditional ensemble music of Java, Sunda, and Bali in Indonesia, made up predominantly of percussive instruments such as metallophones, xylophones, drums, and gongs.',
 'ガムランは、インドネシアのジャワ、スンダ、バリの伝統的なアンサンブル音楽で、主にメタロフォン、木琴、ドラム、ゴングなどの打楽器で構成されています。',
 'gamelan-main.svg', NULL),

('Angklung', 'Angklung', 'アンクルン',
 'Angklung adalah alat musik multitonal (bernada ganda) yang secara tradisional berkembang dalam masyarakat Sunda di Jawa Barat.',
 'Angklung is a multitonal (double-pitched) musical instrument that traditionally developed in Sundanese society in West Java.',
 'アンクルンは、西ジャワのスンダ社会で伝統的に発達した多音階（二重音程）の楽器です。',
 'angklung-main.svg', NULL),

('Sasando', 'Sasando', 'ササンド',
 'Sasando adalah alat musik petik tradisional yang berasal dari pulau Rote, Nusa Tenggara Timur.',
 'Sasando is a traditional plucked string instrument from Rote Island, East Nusa Tenggara.',
 'ササンドは、東ヌサ・トゥンガラ州ロテ島の伝統的な撥弦楽器です。',
 'sasando-main.svg', NULL),

('Suling', 'Suling', 'スリン',
 'Suling adalah alat musik tiup tradisional Indonesia yang terbuat dari bambu dengan lubang-lubang nada.',
 'Suling is a traditional Indonesian wind instrument made from bamboo with tone holes.',
 'スリンは、音孔のある竹で作られたインドネシアの伝統的な管楽器です。',
 'suling-main.svg', NULL);

-- Create admin users table (optional for future use)
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Insert default admin user (password: admin123)
INSERT INTO admin_users (username, password_hash, email) VALUES
('admin', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 'admin@soundofborobudur.com');

-- Create activity log table (optional for future use)
CREATE TABLE IF NOT EXISTS activity_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action VARCHAR(100) NOT NULL,
    table_name VARCHAR(50),
    record_id INT,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE SET NULL
);

-- Show tables
SHOW TABLES;