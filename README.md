# Museum Alat Musik - Pameran Interaktif

Sebuah aplikasi web interaktif untuk pameran alat musik tradisional Indonesia di museum, dirancang khusus untuk tablet dengan antarmuka yang menarik dan informatif.

## Fitur Utama

### 🎵 Landing Page Interaktif
- Background Candi Borobudur yang indah
- Sistem spotlight dengan animasi pulse
- 5 titik spotlight yang dapat diklik untuk menampilkan alat musik

### 🎼 Koleksi Alat Musik
- **Gamelan** - Ensemble musik tradisional Jawa
- **Angklung** - Alat musik bambu dari Sunda
- **Sasando** - Alat musik petik dari Nusa Tenggara Timur
- **Kendang** - Alat musik perkusi tradisional
- **Suling** - Alat musik tiup dari bambu

### 🌐 Multi-Bahasa
- **Indonesia** - Bahasa utama
- **English** - Bahasa Inggris
- **Japanese (日本語)** - Bahasa Jepang

### 📱 Antarmuka Responsif
- Dioptimalkan untuk tablet
- Cards yang dapat digeser (swipeable)
- Modal detail dengan gambar dan audio
- Animasi smooth dan transisi yang menarik

### 🔊 Fitur Audio
- Tombol play/pause untuk mendengarkan suara alat musik
- Kontrol audio yang mudah digunakan
- Audio placeholder (perlu diganti dengan file audio asli)

## Struktur Project

```
Kemenbud/
├── index.html          # File HTML utama
├── styles.css          # Stylesheet dengan animasi dan responsive design
├── script.js           # JavaScript untuk interaksi dan fungsionalitas
├── data.js             # Database alat musik dengan multi-bahasa
├── assets/             # Folder untuk aset
│   ├── borobudur-bg.svg    # Background Candi Borobudur
│   ├── gamelan-main.svg    # Gambar Gamelan
│   ├── angklung-main.svg   # Gambar Angklung
│   ├── sasando-main.svg    # Gambar Sasando
│   ├── kendang-main.svg    # Gambar Kendang
│   ├── suling-main.svg     # Gambar Suling
│   └── audio/              # Folder untuk file audio
│       └── placeholder.txt # Placeholder untuk file audio
└── README.md           # Dokumentasi project
```

## Teknologi yang Digunakan

- **HTML5** - Struktur halaman
- **CSS3** - Styling dengan gradient, animasi, dan responsive design
- **Vanilla JavaScript** - Interaksi tanpa framework
- **SVG** - Gambar vektor untuk kualitas tinggi

## Cara Menjalankan

1. **Menggunakan XAMPP:**
   - Pastikan XAMPP sudah terinstall
   - Copy folder project ke `c:\xampp\htdocs\Kemenbud`
   - Jalankan Apache di XAMPP Control Panel
   - Buka browser dan akses `http://localhost/Kemenbud`

2. **Menggunakan Live Server:**
   - Buka folder project di VS Code
   - Install extension "Live Server"
   - Klik kanan pada `index.html` dan pilih "Open with Live Server"

## Cara Penggunaan

1. **Navigasi Utama:**
   - Klik titik spotlight pada gambar Candi Borobudur
   - Cards alat musik akan muncul di bagian bawah

2. **Melihat Detail:**
   - Klik pada card alat musik untuk membuka modal detail
   - Modal berisi informasi lengkap, gambar, dan kontrol audio

3. **Mengganti Bahasa:**
   - Gunakan tombol toggle bahasa di pojok kanan atas
   - Pilih antara ID (Indonesia), EN (English), atau JP (Japanese)

4. **Memutar Audio:**
   - Klik tombol "Putar Suara" di modal detail
   - Audio akan diputar (saat ini menggunakan placeholder)

## Kustomisasi

### Mengganti Gambar
- Ganti file SVG di folder `assets/` dengan gambar asli alat musik
- Update path di file `data.js` jika menggunakan format berbeda

### Menambah Audio
- Tambahkan file audio (.mp3) ke folder `assets/audio/`
- Update path audio di file `data.js`

### Menambah Alat Musik
1. Tambahkan data baru di `data.js` dalam object `instrumentsData`
2. Tambahkan mapping spotlight di `spotlightMapping`
3. Tambahkan spotlight baru di HTML dengan class `spotlight spot-X`

### Menambah Bahasa
1. Tambahkan kode bahasa baru di setiap object dalam `data.js`
2. Tambahkan tombol bahasa baru di HTML
3. Update fungsi `changeLanguage()` di `script.js`

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Catatan Pengembangan

- Gambar saat ini menggunakan SVG placeholder yang dibuat khusus
- File audio menggunakan placeholder dan perlu diganti dengan rekaman asli
- Design dioptimalkan untuk tablet dengan resolusi 1024x768 atau lebih tinggi
- Semua animasi menggunakan CSS3 untuk performa yang optimal

## Lisensi

Project ini dibuat untuk keperluan museum dan edukasi. Silakan gunakan dan modifikasi sesuai kebutuhan.

---

**Dibuat dengan ❤️ untuk Museum Alat Musik Indonesia**