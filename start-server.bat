@echo off
echo Starting web server for Museum Alat Musik...
echo.
echo Option 1: Using Python
python -m http.server 8000
echo.
echo Option 2: Using PHP (if Python fails)
php -S localhost:8000
echo.
echo If both fail, please use XAMPP:
echo 1. Start Apache in XAMPP Control Panel
echo 2. Open http://localhost/Kemenbud in your browser
echo.
pause