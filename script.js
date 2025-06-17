// Global variables
let currentLanguage = 'en';
let currentAudio = null;
let isPlaying = false;

// DOM Elements
const languageButtons = document.querySelectorAll('.lang-btn');
const spotlights = document.querySelectorAll('.spotlight');
const cardsContainer = document.getElementById('cardsContainer');
const modal = document.getElementById('instrumentModal');
const closeModal = document.getElementById('closeModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalMainImage = document.getElementById('modalMainImage');
const additionalImages = document.getElementById('additionalImages');
const playBtn = document.getElementById('playBtn');
const instrumentAudio = document.getElementById('instrumentAudio');
const playText = document.querySelector('.play-text');
const playIcon = document.querySelector('.play-icon');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeLanguage();
    loadInstrumentsFromDatabase();
    initializeModal();
    initializeAudio();
    initializeKeyboardNavigation();
});

// Initialize keyboard navigation
function initializeKeyboardNavigation() {
    document.addEventListener('keydown', function(e) {
        if (!isSliderActive) return;
        
        switch(e.key) {
            case 'ArrowLeft':
                e.preventDefault();
                previousSlide();
                break;
            case 'ArrowRight':
                e.preventDefault();
                nextSlide();
                break;
            case 'Escape':
                e.preventDefault();
                hideInstrumentCards();
                break;
        }
    });
}

// Load instruments from database
function loadInstrumentsFromDatabase() {
    fetch('get_instruments.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Update global variables with database data
                window.instrumentsData = data.instrumentsData;
                window.spotlightMapping = data.spotlightMapping;
                
                // Create spotlights dynamically
                createDynamicSpotlights(data.spotlightPositions, data.spotlightMapping);
                
                // Initialize spotlights after creation
                initializeSpotlights();
                
                console.log('Instruments loaded from database:', data.totalInstruments);
            } else {
                console.error('Failed to load instruments:', data.error);
                // Fallback to static data
                initializeSpotlights();
            }
        })
        .catch(error => {
            console.error('Error loading instruments:', error);
            // Fallback to static data
            initializeSpotlights();
        });
}

// Create spotlights dynamically based on database data
function createDynamicSpotlights(positions, mapping) {
    const borobudurContainer = document.querySelector('.borobudur-container');
    
    // Remove existing spotlights
    const existingSpotlights = borobudurContainer.querySelectorAll('.spotlight');
    existingSpotlights.forEach(spotlight => spotlight.remove());
    
    // Create new spotlights
    let spotIndex = 1;
    positions.forEach((position, index) => {
        const spotlight = document.createElement('div');
        spotlight.className = `spotlight spot-${spotIndex}`;
        spotlight.style.top = position.top;
        spotlight.style.left = position.left;
        
        const instrumentKey = mapping[`spot-${spotIndex}`];
        if (instrumentKey) {
            spotlight.setAttribute('data-instrument', instrumentKey);
        }
        
        borobudurContainer.appendChild(spotlight);
        spotIndex++;
    });
    
    // Update spotlights variable
    window.spotlights = document.querySelectorAll('.spotlight');
}

// Language Management
function initializeLanguage() {
    languageButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            changeLanguage(lang);
        });
    });
}

function changeLanguage(lang) {
    currentLanguage = lang;
    
    // Update language buttons
    languageButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-lang') === lang) {
            btn.classList.add('active');
        }
    });
    
    // Update UI texts
    updateUITexts();
    
    // Update cards if visible
    if (cardsContainer.classList.contains('show')) {
        updateCardsLanguage();
    }
    
    // Update modal if open
    if (modal.classList.contains('show')) {
        updateModalLanguage();
    }
}

function getCurrentLanguage() {
    return currentLanguage;
}

function updateUITexts() {
    // Update main title and subtitle
    const mainTitle = document.getElementById('mainTitle');
    const mainSubtitle = document.getElementById('mainSubtitle');
    if (mainTitle && uiText[currentLanguage]) {
        mainTitle.textContent = uiText[currentLanguage].mainTitle;
    }
    if (mainSubtitle && uiText[currentLanguage]) {
        mainSubtitle.textContent = uiText[currentLanguage].mainSubtitle;
    }
    
    // Update slider language if active
    if (isSliderActive) {
        updateSliderLanguage();
    }
    
    // Update title and subtitle (legacy support)
    const titleElement = document.querySelector('h1, .title');
    const subtitleElement = document.querySelector('.subtitle');
    
    if (titleElement && uiText[currentLanguage]) {
        titleElement.textContent = uiText[currentLanguage].title;
    }
    if (subtitleElement && uiText[currentLanguage]) {
        subtitleElement.textContent = uiText[currentLanguage].subtitle;
    }
    
    // Update play button text
    const playTextElement = document.querySelector('.play-text');
    if (playTextElement && uiText[currentLanguage]) {
        playTextElement.textContent = uiText[currentLanguage].play;
    }
    
    // Update card texts if visible
    const startBtn = document.getElementById('startAdventureBtn');
    if (startBtn && uiText[currentLanguage]) {
        startBtn.textContent = uiText[currentLanguage].startAdventure;
    }
    
    const backBtn = document.getElementById('backBtn');
    if (backBtn && uiText[currentLanguage]) {
        backBtn.textContent = uiText[currentLanguage].back;
    }
    
    const browseBtn = document.getElementById('browseOthersBtn');
    if (browseBtn && uiText[currentLanguage]) {
        browseBtn.textContent = uiText[currentLanguage].browseOthers;
    }
    
    // Update card content if instrument is currently displayed
    if (window.currentInstrument) {
        const cardTitle = document.getElementById('cardTitle');
        const cardDescription = document.getElementById('cardDescription');
        const modalTitle = document.getElementById('modalTitle');
        const modalDescription = document.getElementById('modalDescription');
        
        if (cardTitle && window.currentInstrument.name) {
            cardTitle.textContent = window.currentInstrument.name[currentLanguage];
        }
        if (cardDescription && window.currentInstrument.description) {
            cardDescription.textContent = window.currentInstrument.description[currentLanguage];
        }
        if (modalTitle && window.currentInstrument.name) {
            modalTitle.textContent = window.currentInstrument.name[currentLanguage];
        }
        if (modalDescription && window.currentInstrument.description) {
            modalDescription.textContent = window.currentInstrument.description[currentLanguage];
        }
    }
}

// Spotlight Management
function initializeSpotlights() {
    const currentSpotlights = window.spotlights || document.querySelectorAll('.spotlight');
    const currentMapping = window.spotlightMapping || spotlightMapping;
    
    currentSpotlights.forEach(spotlight => {
        spotlight.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            
            const spotClass = Array.from(spotlight.classList).find(cls => cls.startsWith('spot-'));
            console.log('Clicked spotlight:', spotClass);
            
            if (currentMapping && currentMapping[spotClass]) {
                const instrumentId = currentMapping[spotClass];
                console.log('Instrument ID:', instrumentId);
                
                // Add zoom effect to clicked spotlight
                currentSpotlights.forEach(s => {
                    s.classList.remove('active-spotlight');
                    s.classList.remove('zoomed-spotlight');
                });
                
                spotlight.classList.add('active-spotlight');
                spotlight.classList.add('zoomed-spotlight');
                
                showInstrumentCards(instrumentId);
            } else {
                console.error('No mapping found for:', spotClass);
                console.log('Available mappings:', currentMapping);
            }
        });
        
        // Add hover effect
        spotlight.addEventListener('mouseenter', () => {
            if (!spotlight.classList.contains('active-spotlight')) {
                spotlight.style.transform = 'scale(1.3)';
            }
        });
        
        spotlight.addEventListener('mouseleave', () => {
            if (!spotlight.classList.contains('active-spotlight')) {
                spotlight.style.transform = 'scale(1)';
            }
        });
    });
}

// Global slider state
let currentSliderIndex = 0;
let sliderInstruments = [];
let isSliderActive = false;

// Cards Management - New Slider Implementation
function showInstrumentCards(instrumentId) {
    console.log('showInstrumentCards called with:', instrumentId);
    
    // Use database data if available, otherwise fallback to static data
    const currentInstrumentsData = window.instrumentsData || instrumentsData;
    
    if (currentInstrumentsData && currentInstrumentsData[instrumentId]) {
        // Activate split screen mode
        activateSplitScreen();
        
        // Initialize slider with all instruments
        initializeSlider(currentInstrumentsData, instrumentId);
        
        // Store current state
        window.currentInstrument = currentInstrumentsData[instrumentId];
        window.currentSpotlight = instrumentId;
        isSliderActive = true;
    } else {
        console.error('Instrument not found:', instrumentId);
        console.log('Available instruments:', Object.keys(currentInstrumentsData || {}));
        console.log('Current instruments data:', currentInstrumentsData);
    }
}

// Activate split screen layout
function activateSplitScreen() {
    const leftPanel = document.getElementById('leftPanel');
    const rightPanel = document.getElementById('rightPanel');
    const mainTitle = document.querySelector('.main-title');
    
    leftPanel.classList.add('split-mode');
    rightPanel.classList.add('active');
    mainTitle.classList.add('split-mode');
}

// Deactivate split screen layout
function deactivateSplitScreen() {
    const leftPanel = document.getElementById('leftPanel');
    const rightPanel = document.getElementById('rightPanel');
    const mainTitle = document.querySelector('.main-title');
    
    leftPanel.classList.remove('split-mode');
    rightPanel.classList.remove('active');
    mainTitle.classList.remove('split-mode');
    isSliderActive = false;
}

// Initialize slider with instruments
function initializeSlider(instrumentsData, selectedInstrumentId) {
    const cardsSlider = document.getElementById('cardsSlider');
    const sliderIndicators = document.getElementById('sliderIndicators');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    // Convert instruments data to array
    sliderInstruments = Object.values(instrumentsData);
    
    // Find the index of selected instrument
    currentSliderIndex = sliderInstruments.findIndex(inst => inst.id === selectedInstrumentId);
    if (currentSliderIndex === -1) currentSliderIndex = 0;
    
    // Clear existing content
    cardsSlider.innerHTML = '';
    sliderIndicators.innerHTML = '';
    
    // Create slider cards
    sliderInstruments.forEach((instrument, index) => {
        const card = createSliderCard(instrument, index);
        cardsSlider.appendChild(card);
        
        // Create indicator
        const indicator = document.createElement('div');
        indicator.className = 'indicator';
        if (index === currentSliderIndex) indicator.classList.add('active');
        indicator.onclick = () => goToSlide(index);
        sliderIndicators.appendChild(indicator);
    });
    
    // Setup navigation buttons
    const closeBtn = document.getElementById('sliderCloseBtn');
    
    prevBtn.onclick = () => previousSlide();
    nextBtn.onclick = () => nextSlide();
    closeBtn.addEventListener('click', hideInstrumentCards);
    
    // Update slider display
    updateSliderDisplay();
    
    // Sync spotlight
    syncSpotlightWithSlider();
}

// Create individual slider card
function createSliderCard(instrument, index) {
    const currentLang = getCurrentLanguage();
    const card = document.createElement('div');
    card.className = 'slider-card';
    card.setAttribute('data-index', index);
    card.setAttribute('data-instrument', instrument.id);
    
    card.innerHTML = `
        <img src="${instrument.mainImage}" alt="${instrument.name[currentLang]}" class="slider-card-image">
        <h3 class="slider-card-title">${instrument.name[currentLang]}</h3>
        <p class="slider-card-description">${instrument.description[currentLang]}</p>
        <button class="start-adventure-btn" onclick="showInstrumentDetail(sliderInstruments[${index}])">
            ${uiText[currentLang].startAdventure}
        </button>
    `;
    
    return card;
}

// Update slider display
function updateSliderDisplay() {
    const cards = document.querySelectorAll('.slider-card');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    cards.forEach((card, index) => {
        card.classList.remove('active', 'prev', 'next');
        
        if (index === currentSliderIndex) {
            card.classList.add('active');
        } else if (index === currentSliderIndex - 1) {
            card.classList.add('prev');
        } else if (index === currentSliderIndex + 1) {
            card.classList.add('next');
        }
    });
    
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSliderIndex);
    });
    
    // Update navigation buttons
    prevBtn.disabled = currentSliderIndex === 0;
    nextBtn.disabled = currentSliderIndex === sliderInstruments.length - 1;
}

// Navigation functions
function nextSlide() {
    if (currentSliderIndex < sliderInstruments.length - 1) {
        currentSliderIndex++;
        updateSliderDisplay();
        syncSpotlightWithSlider();
        updateSliderLanguage();
    }
}

function previousSlide() {
    if (currentSliderIndex > 0) {
        currentSliderIndex--;
        updateSliderDisplay();
        syncSpotlightWithSlider();
        updateSliderLanguage();
    }
}

function goToSlide(index) {
    if (index >= 0 && index < sliderInstruments.length) {
        currentSliderIndex = index;
        updateSliderDisplay();
        syncSpotlightWithSlider();
        updateSliderLanguage();
    }
}

// Sync spotlight with current slider card
function syncSpotlightWithSlider() {
    if (!isSliderActive || !sliderInstruments[currentSliderIndex]) return;
    
    const currentInstrument = sliderInstruments[currentSliderIndex];
    const spotlights = document.querySelectorAll('.spotlight');
    const currentMapping = window.spotlightMapping || spotlightMapping;
    
    // Remove active class from all spotlights
    spotlights.forEach(spotlight => {
        spotlight.classList.remove('active-spotlight');
        spotlight.classList.remove('zoomed-spotlight');
    });
    
    // Find and highlight the corresponding spotlight
    const currentInstrumentKey = currentInstrument.id; // This should be the instrument key like 'gamelan'
    
    for (const [spotClass, instrumentKey] of Object.entries(currentMapping)) {
        if (instrumentKey === currentInstrumentKey) {
            const spotlight = document.querySelector(`.${spotClass}`);
            if (spotlight) {
                spotlight.classList.add('active-spotlight');
                spotlight.classList.add('zoomed-spotlight');
                // Add pulsing effect
                spotlight.style.animation = 'ancientPulse 2s infinite';
                console.log(`Synced spotlight ${spotClass} with instrument ${instrumentKey}`);
            }
            break;
        }
    }
    
    // Debug output
    console.log('Current instrument key:', currentInstrumentKey);
    console.log('Available mappings:', currentMapping);
    console.log('Slider instruments:', sliderInstruments);
}

// Update slider language when language changes
function updateSliderLanguage() {
    if (!isSliderActive) return;
    
    const currentLang = getCurrentLanguage();
    const cards = document.querySelectorAll('.slider-card');
    
    cards.forEach((card, index) => {
        const instrument = sliderInstruments[index];
        if (instrument) {
            const title = card.querySelector('.slider-card-title');
            const description = card.querySelector('.slider-card-description');
            const button = card.querySelector('.start-adventure-btn');
            
            if (title) title.textContent = instrument.name[currentLang];
            if (description) description.textContent = instrument.description[currentLang];
            if (button) button.textContent = uiText[currentLang].startAdventure;
        }
    });
}

// Show instrument detail modal
function showInstrumentDetail(instrument) {
    const modal = document.getElementById('instrumentModal');
    const currentLang = getCurrentLanguage();
    
    console.log('Showing instrument detail for:', instrument);
    
    // Update modal content
    document.getElementById('modalTitle').textContent = instrument.name[currentLang];
    
    // Use description or fullDescription, whichever is available
    const description = instrument.fullDescription || instrument.description;
    if (description && description[currentLang]) {
        document.getElementById('modalDescription').textContent = description[currentLang];
    }
    
    document.getElementById('modalMainImage').src = instrument.mainImage;
    
    // Update additional images
    const additionalImagesContainer = document.querySelector('.additional-images');
    if (additionalImagesContainer) {
        additionalImagesContainer.innerHTML = '';
        
        if (instrument.additionalImages && instrument.additionalImages.length > 0) {
            instrument.additionalImages.forEach(imageSrc => {
                const img = document.createElement('img');
                img.src = imageSrc;
                img.onclick = () => {
                    document.getElementById('modalMainImage').src = imageSrc;
                };
                additionalImagesContainer.appendChild(img);
            });
        }
    }
    
    // Update audio source
    const instrumentAudio = document.getElementById('instrumentAudio');
    if (instrumentAudio && instrument.audio) {
        const source = instrumentAudio.querySelector('source');
        if (source) {
            source.src = instrument.audio;
            instrumentAudio.load();
        }
    }
    
    // Add browse other instruments button
    let browseBtn = document.getElementById('browseOtherBtn');
    const playBtn = document.getElementById('playBtn');
    if (!browseBtn && playBtn && playBtn.parentNode) {
        browseBtn = document.createElement('button');
        browseBtn.id = 'browseOtherBtn';
        browseBtn.className = 'start-adventure-btn';
        browseBtn.style.marginLeft = '15px';
        playBtn.parentNode.appendChild(browseBtn);
    }
    
    if (browseBtn) {
        browseBtn.textContent = uiText[currentLang].browseOthers || 
                               (currentLang === 'id' ? 'Jelajahi Lainnya' : 
                                currentLang === 'en' ? 'Browse Others' : 
                                '他を探索');
        browseBtn.onclick = () => {
            modal.classList.remove('show');
            // Return to slider if it was active, otherwise show all instruments
            if (isSliderActive) {
                // Modal is hidden, slider remains active
            } else {
                // Show all instruments in slider mode
                const currentInstrumentsData = window.instrumentsData || instrumentsData;
                const firstInstrumentId = Object.keys(currentInstrumentsData)[0];
                showInstrumentCards(firstInstrumentId);
            }
        };
    }
    
    // Hide main title when modal opens
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.classList.add('hidden');
    }
    
    // Show modal
    modal.classList.add('show');
    
    // Store current instrument
    window.currentInstrument = instrument;
}

function createInstrumentCard(instrument) {
    const card = document.createElement('div');
    card.className = 'instrument-card';
    card.setAttribute('data-instrument', instrument.id);
    
    card.innerHTML = `
        <img src="${instrument.mainImage}" alt="${instrument.name[currentLanguage]}" class="card-image">
        <div class="card-info">
            <div class="card-title">${instrument.name[currentLanguage]}</div>
            <div class="card-description">${instrument.shortDescription[currentLanguage]}</div>
        </div>
    `;
    
    card.addEventListener('click', () => {
        showInstrumentModal(instrument);
    });
    
    return card;
}

function updateCardsLanguage() {
    const cards = cardsContainer.querySelectorAll('.instrument-card');
    cards.forEach(card => {
        const instrumentId = card.getAttribute('data-instrument');
        const instrument = instrumentsData[instrumentId];
        
        if (instrument) {
            const title = card.querySelector('.card-title');
            const description = card.querySelector('.card-description');
            const image = card.querySelector('.card-image');
            
            title.textContent = instrument.name[currentLanguage];
            description.textContent = instrument.shortDescription[currentLanguage];
            image.alt = instrument.name[currentLanguage];
        }
    });
}

// Modal Management
function initializeModal() {
    closeModal.addEventListener('click', hideInstrumentModal);
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            hideInstrumentModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('show')) {
            hideInstrumentModal();
        }
    });
}

function showInstrumentModal(instrument) {
    modalTitle.textContent = instrument.name[currentLanguage];
    modalDescription.textContent = instrument.description[currentLanguage];
    modalMainImage.src = instrument.mainImage;
    modalMainImage.alt = instrument.name[currentLanguage];
    
    // Load additional images
    additionalImages.innerHTML = '';
    instrument.additionalImages.forEach(imageSrc => {
        const img = document.createElement('img');
        img.src = imageSrc;
        img.alt = instrument.name[currentLanguage];
        img.addEventListener('click', () => {
            modalMainImage.src = imageSrc;
        });
        additionalImages.appendChild(img);
    });
    
    // Set audio source
    instrumentAudio.src = instrument.audio;
    
    // Reset audio state
    resetAudioState();
    
    // Hide main title when modal opens
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.classList.add('hidden');
    }
    
    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
}

function hideInstrumentModal() {
    modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    
    // Show main title when modal closes
    const mainTitle = document.querySelector('.main-title');
    if (mainTitle) {
        mainTitle.classList.remove('hidden');
    }
    
    // Stop audio if playing
    if (currentAudio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
    }
    resetAudioState();
}

function updateModalLanguage() {
    // Find current instrument from modal title
    const currentInstrument = Object.values(instrumentsData).find(instrument => 
        Object.values(instrument.name).includes(modalTitle.textContent)
    );
    
    if (currentInstrument) {
        modalTitle.textContent = currentInstrument.name[currentLanguage];
        modalDescription.textContent = currentInstrument.description[currentLanguage];
        modalMainImage.alt = currentInstrument.name[currentLanguage];
        
        // Update additional images alt text
        const additionalImgs = additionalImages.querySelectorAll('img');
        additionalImgs.forEach(img => {
            img.alt = currentInstrument.name[currentLanguage];
        });
    }
}

// Audio Management
function initializeAudio() {
    playBtn.addEventListener('click', toggleAudio);
    
    instrumentAudio.addEventListener('ended', () => {
        resetAudioState();
    });
    
    instrumentAudio.addEventListener('error', () => {
        console.log('Audio failed to load');
        resetAudioState();
    });
}

function toggleAudio() {
    if (isPlaying) {
        pauseAudio();
    } else {
        playAudio();
    }
}

function playAudio() {
    if (currentAudio && currentAudio !== instrumentAudio) {
        currentAudio.pause();
    }
    
    currentAudio = instrumentAudio;
    
    instrumentAudio.play().then(() => {
        isPlaying = true;
        updatePlayButton();
    }).catch(error => {
        console.log('Audio play failed:', error);
        resetAudioState();
    });
}

function pauseAudio() {
    if (instrumentAudio) {
        instrumentAudio.pause();
    }
    isPlaying = false;
    updatePlayButton();
}

function resetAudioState() {
    isPlaying = false;
    currentAudio = null;
    updatePlayButton();
}

function updatePlayButton() {
    if (isPlaying) {
        playIcon.textContent = '⏸';
        playText.textContent = uiText[currentLanguage].pause || 'Pause';
        playBtn.style.background = 'linear-gradient(45deg, #f4e4c1, #d4af37)';
    } else {
        playIcon.textContent = '▶';
        playText.textContent = uiText[currentLanguage].play;
        playBtn.style.background = 'linear-gradient(45deg, #d4af37, #f4e4c1)';
    }
}

// Utility Functions
function hideCards() {
    cardsContainer.classList.remove('show');
}

// Hide instrument cards
function hideInstrumentCards() {
    // Deactivate split screen mode
    deactivateSplitScreen();
    
    // Clear slider state
    currentSliderIndex = 0;
    sliderInstruments = [];
    
    // Remove active spotlight highlighting and zoom
    const spotlights = document.querySelectorAll('.spotlight');
    spotlights.forEach(spotlight => {
        spotlight.classList.remove('active-spotlight');
        spotlight.classList.remove('zoomed-spotlight');
        spotlight.style.animation = 'cyberpulse 2s infinite'; // Reset to default animation
    });
    
    // Legacy support
    const cardsContainer = document.getElementById('cardsContainer');
    if (cardsContainer) {
        cardsContainer.classList.remove('show');
        cardsContainer.classList.remove('carousel-mode');
    }
}

// Show carousel mode for browsing other instruments
function showCarouselMode() {
    const cardsContainer = document.getElementById('cardsContainer');
    const instrumentCard = document.getElementById('instrumentCard');
    
    // Clear existing content
    cardsContainer.innerHTML = '';
    
    // Add carousel mode class
    cardsContainer.classList.add('carousel-mode');
    
    // Create cards for all instruments
    const allSpotlights = Object.keys(spotlightInstruments);
    allSpotlights.forEach((spotlightId, index) => {
        const instrument = spotlightInstruments[spotlightId];
        const card = createCarouselCard(instrument, spotlightId);
        cardsContainer.appendChild(card);
        
        // Mark current instrument as active
        if (spotlightId === window.currentSpotlight) {
            card.classList.add('active');
        }
    });
    
    // Add swipe functionality
    addSwipeListeners(cardsContainer);
}

// Create carousel card
function createCarouselCard(instrument, spotlightId) {
    const currentLang = getCurrentLanguage();
    const card = document.createElement('div');
    card.className = 'instrument-card carousel-mode';
    card.dataset.spotlightId = spotlightId;
    
    card.innerHTML = `
        <img src="${instrument.mainImage}" alt="${instrument.name[currentLang]}" class="card-image">
        <div class="card-info">
            <h3 class="card-title">${instrument.name[currentLang]}</h3>
            <p class="card-description">${instrument.description[currentLang]}</p>
        </div>
    `;
    
    // Add click event
    card.onclick = () => {
        window.currentInstrument = instrument;
        window.currentSpotlight = spotlightId;
        showInstrumentDetail(instrument);
    };
    
    return card;
}

// Add swipe functionality
function addSwipeListeners(container) {
    let startX = 0;
    let scrollLeft = 0;
    
    container.addEventListener('mousedown', (e) => {
        startX = e.pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
        container.style.cursor = 'grabbing';
    });
    
    container.addEventListener('mouseleave', () => {
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mouseup', () => {
        container.style.cursor = 'grab';
    });
    
    container.addEventListener('mousemove', (e) => {
        if (startX === 0) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
    
    // Touch events for mobile
    container.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - container.offsetLeft;
        scrollLeft = container.scrollLeft;
    });
    
    container.addEventListener('touchmove', (e) => {
        if (startX === 0) return;
        const x = e.touches[0].pageX - container.offsetLeft;
        const walk = (x - startX) * 2;
        container.scrollLeft = scrollLeft - walk;
    });
}

// Click outside cards to hide them
document.addEventListener('click', (e) => {
    if (!cardsContainer.contains(e.target) && 
        !Array.from(spotlights).some(spot => spot.contains(e.target)) &&
        cardsContainer.classList.contains('show')) {
        setTimeout(() => {
            hideCards();
        }, 100);
    }
});

// Prevent cards from hiding when clicking inside
cardsContainer.addEventListener('click', (e) => {
    e.stopPropagation();
});