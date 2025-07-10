# Sound of Borobudur - Interactive Musical Instrument Exhibition

Sebuah aplikasi web interaktif yang menampilkan pameran alat musik tradisional Indonesia dengan desain yang dioptimalkan untuk tablet dan mendukung multi-bahasa.

## 📁 Struktur Proyek

```
Kemenbud/
├── 📁 public/                    # Frontend utama
│   └── index.html                # Halaman utama aplikasi
├── 📁 admin/                     # Panel administrasi
│   └── index.html                # Interface admin
├── 📁 backend/                   # Server-side logic
│   ├── config.php                # Konfigurasi database
│   ├── admin-handler.php         # API handler untuk admin
│   ├── get-instruments.php       # API untuk mengambil data instrumen
│   └── database.sql              # Setup database
├── 📁 assets/                    # Aset statis
│   ├── 📁 css/                   # Stylesheet
│   │   ├── styles.css            # Style utama aplikasi
│   │   └── admin-styles.css      # Style panel admin
│   ├── 📁 js/                    # JavaScript files
│   │   ├── script.js             # Logic utama aplikasi
│   │   ├── admin-script.js       # Logic panel admin
│   │   └── data.js               # Data instrumen (fallback)
│   ├── 📁 images/                # Gambar dan ikon
│   │   ├── borobudur-bg.svg      # Background Borobudur
│   │   ├── gamelan-main.svg      # Ilustrasi Gamelan
│   │   ├── angklung-main.svg     # Ilustrasi Angklung
│   │   ├── sasando-main.svg      # Ilustrasi Sasando
│   │   └── suling-main.svg       # Ilustrasi Suling
│   └── 📁 audio/                 # File audio instrumen
│       └── placeholder.txt       # Placeholder untuk file audio
├── database.sql                  # SQL setup (legacy)
├── start-server.bat             # Batch file untuk memulai server
└── README.md                     # Dokumentasi proyek
```

## 🚀 Cara Menjalankan

### Prasyarat
- XAMPP atau server web dengan PHP 7.4+
- MySQL/MariaDB
- Browser modern (Chrome, Firefox, Safari, Edge)

### Setup Database
1. Buka phpMyAdmin atau MySQL client
2. Import file `backend/database.sql`
3. Sesuaikan konfigurasi database di `backend/config.php`

### Menjalankan Aplikasi
1. Pastikan XAMPP Apache dan MySQL sudah berjalan
2. Akses aplikasi utama: `http://localhost/Kemenbud/public/`
3. Akses panel admin: `http://localhost/Kemenbud/admin/`

## 🎯 Fitur Utama

### Aplikasi Utama (`/public/`)
- **Landing Page Interaktif**: Tampilan utama dengan background Borobudur
- **Koleksi Instrumen**: Showcase 4+ alat musik tradisional Indonesia
- **Multi-bahasa**: Dukungan Bahasa Indonesia, English, dan Japanese
- **Interface Responsif**: Dioptimalkan untuk tablet (768px-1024px)
- **Audio Player**: Pemutaran suara instrumen (jika tersedia)
- **Modal Detail**: Informasi lengkap setiap instrumen
- **Slider Carousel**: Navigasi antar instrumen yang smooth

### Panel Admin (`/admin/`)
- **Dashboard**: Statistik dan overview sistem
- **Manajemen Instrumen**: CRUD operations untuk data instrumen
- **Upload Media**: Upload gambar dan file audio
- **Multi-bahasa**: Input dalam 3 bahasa sekaligus
- **Preview Real-time**: Preview gambar dan audio sebelum save

## 🎨 Spesifikasi UI/UX untuk Designer

### Breakpoints Utama
- **Desktop**: 1200px ke atas
- **Tablet Landscape**: 1024px - 1200px
- **Tablet Portrait**: 768px - 1024px
- **Mobile**: 768px ke bawah

### Container Dimensions

#### Header Components
- **Main Title**: 
  - Desktop: `font-size: 4rem`, `max-width: 800px`
  - Tablet: `font-size: 3rem`, `max-width: 600px`
  - Mobile: `font-size: 2rem`, `max-width: 90%`

- **Language Toggle**: 
  - Container: `gap: 15px`
  - Buttons: `min-width: 120px`, `height: 50px`
  - Mobile: `min-width: 100px`, `height: 45px`

#### Interactive Elements
- **Spotlight Effect**: `300px × 300px` (desktop), `250px × 250px` (tablet)
- **Cards Container**: Full viewport dengan `backdrop-filter: blur(10px)`
- **Instrument Cards**: 
  - Desktop: `400px × 500px`
  - Tablet: `350px × 450px`
  - Mobile: `300px × 400px`

#### Modal Components
- **Modal Content**: 
  - Desktop: `max-width: 800px`
  - Tablet: `max-width: 90vw`
  - Mobile: `max-width: 95vw`

#### Slider Components
- **Slider Container**: Full viewport height
- **Slider Cards**: 
  - Desktop: `350px × 450px`
  - Tablet: `300px × 400px`
  - Mobile: `280px × 380px`

### Design Guidelines untuk Figma

#### Frame Recommendations
- **Desktop Frame**: 1440px × 900px
- **Tablet Landscape**: 1024px × 768px
- **Tablet Portrait**: 768px × 1024px
- **Mobile Frame**: 375px × 812px

#### Grid System
- **Desktop**: 12-column grid, 80px gutters
- **Tablet**: 8-column grid, 60px gutters
- **Mobile**: 4-column grid, 20px gutters

#### Spacing Scale
- **XS**: 8px
- **SM**: 16px
- **MD**: 24px
- **LG**: 32px
- **XL**: 48px
- **XXL**: 64px

#### Color Palette
- **Primary**: Warm earth tones (browns, golds)
- **Secondary**: Traditional Indonesian colors
- **Accent**: Highlight colors for interactive elements
- **Background**: Gradient overlays with transparency

#### Border Radius
- **Cards**: 15px
- **Buttons**: 25px
- **Modal**: 20px
- **Images**: 10px

## 🔧 Technical Notes

### CSS Architecture
- **Units**: Menggunakan `rem` untuk typography, `px` untuk borders
- **Flexbox**: Layout utama menggunakan flexbox
- **CSS Grid**: Untuk layout kompleks di admin panel
- **Custom Properties**: CSS variables untuk konsistensi warna

### JavaScript Architecture
- **Vanilla JS**: Tidak menggunakan framework eksternal
- **Modular**: Fungsi terpisah untuk setiap fitur
- **Event-driven**: Event listeners untuk interaksi user
- **Async/Await**: Untuk API calls

### Database Schema
- **instruments**: Tabel utama untuk data instrumen
- **admin_users**: Tabel untuk autentikasi admin (opsional)
- **activity_logs**: Log aktivitas sistem (opsional)

### API Endpoints
- `GET /backend/get-instruments.php` - Mengambil semua instrumen
- `POST /backend/admin-handler.php?action=add_instrument` - Tambah instrumen
- `POST /backend/admin-handler.php?action=update_instrument` - Update instrumen
- `POST /backend/admin-handler.php?action=delete_instrument` - Hapus instrumen
- `GET /backend/admin-handler.php?action=get_instruments` - Admin: ambil instrumen

## 📱 Browser Support
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## 🔒 Security Features
- Input validation dan sanitization
- File upload restrictions
- SQL injection protection (PDO prepared statements)
- XSS protection
- CORS headers configuration

## 📄 License
Project ini dikembangkan untuk Kementerian Pendidikan dan Kebudayaan Indonesia.

---

**Catatan**: Struktur folder ini telah diorganisir untuk memisahkan frontend, backend, admin, dan assets agar lebih mudah dalam maintenance dan development.