-- Database: dob (Database of Borobudur)
CREATE DATABASE IF NOT EXISTS dob CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE dob;

-- Table: instruments
CREATE TABLE IF NOT EXISTS instruments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name_id VARCHAR(100) NOT NULL,
    name_en VARCHAR(100) NOT NULL,
    name_ja VARCHAR(100) NOT NULL,
    description_id TEXT NOT NULL,
    description_en TEXT NOT NULL,
    description_ja TEXT NOT NULL,
    main_image VARCHAR(255) NOT NULL,
    additional_images JSON,
    audio_file VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert sample data
INSERT INTO instruments (name_id, name_en, name_ja, description_id, description_en, description_ja, main_image, additional_images, audio_file) VALUES
('Gamelan', 'Gamelan', 'ガムラン', 
 'Gamelan adalah ansambel musik tradisional Jawa yang terdiri dari berbagai instrumen perkusi seperti gong, kenong, dan saron.',
 'Gamelan is a traditional Javanese musical ensemble consisting of various percussion instruments such as gongs, kenong, and saron.',
 'ガムランは、ゴング、クノン、サロンなどの様々な打楽器で構成されるジャワの伝統的な音楽アンサンブルです。',
 'assets/gamelan-main.svg',
 '["assets/gamelan-1.jpg", "assets/gamelan-2.jpg"]',
 'assets/audio/gamelan.mp3'),

('Angklung', 'Angklung', 'アンクルン',
 'Angklung adalah alat musik tradisional Indonesia yang terbuat dari bambu dan dimainkan dengan cara digoyangkan.',
 'Angklung is a traditional Indonesian musical instrument made of bamboo and played by shaking.',
 'アンクルンは竹で作られたインドネシアの伝統楽器で、振って演奏します。',
 'assets/angklung-main.svg',
 '["assets/angklung-1.jpg", "assets/angklung-2.jpg"]',
 'assets/audio/angklung.mp3'),

('Sasando', 'Sasando', 'ササンド',
 'Sasando adalah alat musik petik tradisional dari Nusa Tenggara Timur yang terbuat dari daun lontar.',
 'Sasando is a traditional plucked string instrument from East Nusa Tenggara made from lontar leaves.',
 'ササンドは東ヌサトゥンガラ州の伝統的な弦楽器で、ロンタル椰子の葉で作られています。',
 'assets/sasando-main.svg',
 '["assets/sasando-1.jpg", "assets/sasando-2.jpg"]',
 'assets/audio/sasando.mp3'),

('Kendang', 'Kendang', 'クンダン',
 'Kendang adalah alat musik perkusi tradisional Indonesia yang dimainkan dengan tangan dan berfungsi sebagai pengatur irama.',
 'Kendang is a traditional Indonesian percussion instrument played with hands and serves as a rhythm regulator.',
 'クンダンは手で演奏するインドネシアの伝統的な打楽器で、リズムを調整する役割を果たします。',
 'assets/kendang-main.svg',
 '["assets/kendang-1.jpg", "assets/kendang-2.jpg"]',
 'assets/audio/kendang.mp3'),

('Suling', 'Suling', 'スリン',
 'Suling adalah alat musik tiup tradisional Indonesia yang terbuat dari bambu dan menghasilkan suara yang merdu.',
 'Suling is a traditional Indonesian wind instrument made of bamboo that produces melodious sounds.',
 'スリンは竹で作られたインドネシアの伝統的な管楽器で、美しい音色を奏でます。',
 'assets/suling-main.svg',
 '["assets/suling-1.jpg", "assets/suling-2.jpg"]',
 'assets/audio/suling.mp3');

-- Create index for better performance
CREATE INDEX idx_instruments_name_en ON instruments(name_en);
CREATE INDEX idx_instruments_name_id ON instruments(name_id);
CREATE INDEX idx_instruments_name_ja ON instruments(name_ja);