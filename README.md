# Sound of Borobudur - UI/UX Design Documentation

## Overview
Interactive exhibition website showcasing traditional Indonesian musical instruments with immersive Borobudur temple experience.

## Container Sizes & Layout Specifications

### 🖥️ Desktop (1200px and above)

#### Main Layout
- **Viewport**: Full screen (100vw × 100vh)
- **Background**: Linear gradient overlay on full viewport
- **Main Container**: No max-width restriction

#### Header Components
- **Main Title Container**: 
  - Position: Fixed, centered horizontally
  - Top offset: 50px
  - Transform: translateX(-50%)
  - Z-index: 1000

- **Title Text (H1)**:
  - Font size: 2rem
  - Letter spacing: 3px
  - Margin: 0

- **Subtitle Text (P)**:
  - Font size: 0.8rem
  - Letter spacing: 1.5px
  - Margin: 2px 0 0 0

- **Language Toggle**:
  - Position: Fixed top-left
  - Top: 10px, Left: 20px
  - Button size: Auto padding (6px 10px)
  - Gap between buttons: 8px

#### Interactive Elements
- **Borobudur Image Container**:
  - Max width: 800px
  - Max height: 600px
  - Border radius: 15px
  - Border: 3px solid rgba(212, 175, 55, 0.4)

- **Spotlight Points**:
  - Size: 30px × 30px
  - Border radius: 50% (circular)
  - Border: 1px solid #d4af37
  - Hover scale: 1.2
  - Active scale: 1.3
  - Zoomed scale: 1.5

#### Cards & Modals
- **Cards Container**:
  - Height: 250px
  - Padding: 30px
  - Margin: 0 40px
  - Gap: 20px (carousel mode)

- **Instrument Card**:
  - Min width: 350px
  - Height: 190px
  - Padding: 30px
  - Border radius: 15px
  - Border: 2px solid rgba(212, 175, 55, 0.4)

- **Modal Content**:
  - Max width: 800px
  - Width: 95%
  - Max height: 90vh
  - Padding: 30px
  - Border radius: 20px
  - Border: 3px solid rgba(212, 175, 55, 0.8)

- **Modal Body Grid**:
  - Grid: 1fr 1fr (two columns)
  - Gap: 50px
  - Padding: 50px

#### Slider Components
- **Slider Card**:
  - Width: 320px
  - Height: 220px
  - Padding: 30px
  - Border radius: 15px

- **Navigation Buttons**:
  - Size: 55px × 55px
  - Border radius: 12px
  - Border: 2px solid rgba(212, 175, 55, 0.5)

### 📱 Tablet Portrait (768px - 1024px)

#### Header Adjustments
- **Title Text (H1)**:
  - Font size: 1.8rem
  - Letter spacing: 2px

- **Subtitle Text (P)**:
  - Font size: 0.75rem

- **Language Toggle**:
  - Top: 15px, Left: 15px
  - Button padding: 8px 12px
  - Font size: 0.9rem

#### Interactive Elements
- **Borobudur Container**:
  - Max width: 90%
  - Centered with auto margins

- **Spotlight Points**:
  - Size: 20px × 20px

#### Cards & Layout
- **Cards Container**:
  - Height: 200px
  - Padding: 20px
  - Margin: 0 20px

- **Instrument Card**:
  - Min width: 280px
  - Height: 160px
  - Padding: 20px

- **Card Title**:
  - Font size: 1.3rem
  - Margin bottom: 12px

- **Card Description**:
  - Font size: 15px
  - Min height: 70px
  - Line height: 1.6

#### Modal Adjustments
- **Modal Main Image**:
  - Height: 250px

- **Modal Body Grid**:
  - Grid: 1fr 1fr
  - Gap: 30px
  - Padding: 30px

#### Slider Adjustments
- **Slider Card**:
  - Min width: 260px
  - Height: 180px
  - Padding: 20px

### 🖥️ Tablet Landscape (1024px - 1200px)

#### Header
- **Title Text (H1)**:
  - Font size: 2.1rem
  - Letter spacing: 2.5px

#### Interactive Elements
- **Borobudur Container**:
  - Max width: 90%

- **Spotlight Points**:
  - Size: 25px × 25px

#### Cards & Layout
- **Cards Container**:
  - Height: 210px
  - Padding: 22px
  - Margin: 0 25px

- **Instrument Card**:
  - Min width: 300px
  - Height: 165px
  - Padding: 22px

- **Card Title**:
  - Font size: 1.35rem

#### Modal & Slider
- **Modal Body Grid**:
  - Gap: 35px
  - Padding: 35px

- **Slider Card**:
  - Min width: 280px
  - Height: 190px
  - Padding: 22px

### 📱 Mobile (max-width: 768px)

#### Header Mobile
- **Title Text (H1)**:
  - Font size: 1.5rem
  - Letter spacing: 1px

- **Subtitle Text (P)**:
  - Font size: 0.7rem

- **Language Toggle**:
  - Top: 10px, Left: 10px
  - Gap: 5px
  - Button padding: 5px 8px
  - Font size: 0.8rem

#### Interactive Elements Mobile
- **Spotlight Points**:
  - Size: 45px × 45px (larger for touch)

#### Cards Mobile
- **Cards Container**:
  - Height: 180px
  - Padding: 15px
  - Margin: 0 10px

- **Instrument Card**:
  - Min width: 220px
  - Height: 130px
  - Padding: 15px

- **Card Title**:
  - Font size: 1.1rem
  - Margin bottom: 8px

- **Card Description**:
  - Font size: 13px
  - Min height: 50px

- **Action Button**:
  - Padding: 8px 16px
  - Font size: 12px

#### Modal Mobile
- **Modal Body Grid**:
  - Grid: 1fr (single column)
  - Gap: 20px
  - Padding: 20px

- **Modal Main Image**:
  - Height: 200px

- **Additional Images**:
  - Size: 80px × 80px

#### Slider Mobile
- **Slider Card**:
  - Min width: 200px
  - Height: 150px
  - Padding: 15px

- **Slider Card Title**:
  - Font size: 1rem
  - Margin bottom: 8px

- **Slider Card Description**:
  - Font size: 12px
  - Min height: 40px

## 🎨 Touch Device Optimizations

### Minimum Touch Targets (44px × 44px)
- Language buttons
- Action buttons (Start Adventure, Back, Play)
- Close buttons
- Navigation buttons (min 50px × 50px)
- Additional image thumbnails (min 60px × 60px)

### Enhanced Touch Areas
- **Spotlight Points**: Minimum 40px × 40px on touch devices
- **All Interactive Elements**: Minimum 44px touch target

## 🎯 Design Guidelines for Figma

### Breakpoint Strategy
1. **Mobile First**: Start with 375px width
2. **Tablet Portrait**: 768px - 1024px
3. **Tablet Landscape**: 1024px - 1200px
4. **Desktop**: 1200px and above

### Grid System
- **Desktop**: 2-column grid for modal content
- **Tablet**: 2-column grid maintained
- **Mobile**: Single column layout

### Spacing Scale
- **Large**: 50px (desktop modal padding)
- **Medium**: 30px (desktop card padding)
- **Small**: 20px (tablet padding)
- **XSmall**: 15px (mobile padding)

### Component Scaling
- **Cards**: Scale down proportionally across breakpoints
- **Typography**: Responsive font sizes with maintained hierarchy
- **Interactive Elements**: Larger on mobile for touch accessibility

### Color Palette
- **Primary Gold**: #d4af37
- **Secondary Gold**: #b8860b
- **Accent Gold**: #ffd700
- **Background Dark**: #2c1810
- **Background Medium**: #4a3728
- **Text Light**: #f4e4c1

### Border Radius Standards
- **Cards**: 15px
- **Modals**: 20px
- **Buttons**: 8px - 20px (varies by component)
- **Circular Elements**: 50%

## 📐 Figma Frame Recommendations

### Desktop Frames
- **1920 × 1080** (Full HD)
- **1440 × 900** (MacBook Pro)
- **1366 × 768** (Common laptop)

### Tablet Frames
- **1024 × 768** (iPad Landscape)
- **768 × 1024** (iPad Portrait)
- **834 × 1194** (iPad Pro Portrait)

### Mobile Frames
- **375 × 667** (iPhone SE/8)
- **390 × 844** (iPhone 12/13)
- **414 × 896** (iPhone 11 Pro Max)

## 🔧 Technical Notes

### CSS Units Used
- **rem**: For scalable typography
- **px**: For precise borders and fixed elements
- **vh/vw**: For full viewport layouts
- **%**: For responsive widths

### Animation Specifications
- **Transition Duration**: 0.3s - 0.8s
- **Easing**: cubic-bezier(0.4, 0, 0.2, 1)
- **Transform Origin**: Center for scaling
- **Backdrop Filter**: blur(10px - 15px)

### Z-Index Hierarchy
- **Background**: 0
- **Content**: 1-10
- **Spotlights**: 10
- **Navigation**: 15-20
- **Modals**: 100-1000
- **Fixed Headers**: 1000+

## 📋 Admin Panel Specifications

### Admin Interface Components
- **Navigation Tabs**: Full width, responsive
- **Form Containers**: Max width with centered alignment
- **Input Fields**: Standard form sizing with proper spacing
- **File Upload Areas**: Drag & drop zones with preview
- **Data Tables**: Responsive with horizontal scroll on mobile
- **Action Buttons**: Consistent sizing and spacing

### Admin Modal Sizes
- **Standard Modal**: 600px max width
- **Large Modal**: 800px max width for detailed forms
- **Mobile Modal**: Full width with padding

This documentation provides comprehensive sizing information for creating pixel-perfect designs in Figma that will translate accurately to the final implementation.