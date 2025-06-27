// Admin Panel JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin panel
    initializeAdmin();
    loadInstruments();
});

function initializeAdmin() {
    // Setup form event listeners
    const instrumentForm = document.getElementById('instrumentForm');
    if (instrumentForm) {
        instrumentForm.addEventListener('submit', handleFormSubmit);
    }

    // Setup file input previews
    setupFilePreview('main_image', 'main_image_preview', 'image');
    setupFilePreview('additional_images', 'additional_images_preview', 'images');
    setupFilePreview('audio_file', 'audio_preview', 'audio');
}

function showSection(sectionId) {
    // Hide all sections
    const sections = document.querySelectorAll('.admin-section');
    sections.forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }

    // Load instruments if manage section is selected
    if (sectionId === 'manage-instruments') {
        loadInstruments();
    }
}

function setupFilePreview(inputId, previewId, type) {
    const input = document.getElementById(inputId);
    const preview = document.getElementById(previewId);

    if (!input || !preview) return;

    input.addEventListener('change', function(e) {
        preview.innerHTML = '';
        const files = e.target.files;

        if (files.length === 0) {
            preview.innerHTML = '<div class="file-info">No file selected</div>';
            return;
        }

        Array.from(files).forEach(file => {
            const fileInfo = document.createElement('div');
            fileInfo.className = 'file-info';

            if (type === 'image' || type === 'images') {
                if (file.type.startsWith('image/')) {
                    const img = document.createElement('img');
                    img.src = URL.createObjectURL(file);
                    img.onload = () => URL.revokeObjectURL(img.src);
                    preview.appendChild(img);
                }
                fileInfo.textContent = `${file.name} (${formatFileSize(file.size)})`;
            } else if (type === 'audio') {
                if (file.type.startsWith('audio/')) {
                    const audio = document.createElement('audio');
                    audio.controls = true;
                    audio.src = URL.createObjectURL(file);
                    preview.appendChild(audio);
                }
                fileInfo.textContent = `${file.name} (${formatFileSize(file.size)})`;
            }

            preview.appendChild(fileInfo);
        });
    });
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const editId = e.target.dataset.editId;
    
    // Check if this is an update or add operation
    if (editId) {
        formData.append('action', 'update');
        formData.append('id', editId);
        showMessage('Updating instrument...', 'info');
    } else {
        formData.append('action', 'add');
        showMessage('Adding instrument...', 'info');
    }
    
    // Send data to server
    fetch('admin-handler.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            if (editId) {
                showMessage('Instrument updated successfully!', 'success');
                // Reset form to add mode
                resetFormToAddMode();
            } else {
                showMessage('Instrument added successfully!', 'success');
            }
            e.target.reset();
            // Clear previews
            document.getElementById('main_image_preview').innerHTML = '';
            document.getElementById('additional_images_preview').innerHTML = '';
            document.getElementById('audio_preview').innerHTML = '';
            // Reload instruments list if on manage page
            loadInstruments();
        } else {
            showMessage('Error: ' + data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const action = editId ? 'updating' : 'adding';
        showMessage(`An error occurred while ${action} the instrument.`, 'error');
    });
}

function resetFormToAddMode() {
    const form = document.getElementById('instrumentForm');
    delete form.dataset.editId;
    
    // Reset form title and button text
    document.querySelector('#add-instrument h2').textContent = 'Add New Instrument';
    document.querySelector('#instrumentForm button[type="submit"]').textContent = 'Add Instrument';
}

function loadInstruments() {
    const instrumentsList = document.getElementById('instrumentsList');
    if (!instrumentsList) return;

    // Show loading
    instrumentsList.innerHTML = '<div class="file-info">Loading instruments...</div>';

    fetch('admin-handler.php?action=get_instruments')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(text => {
            console.log('Raw response:', text); // Debug log
            if (!text.trim()) {
                throw new Error('Empty response from server');
            }
            try {
                const data = JSON.parse(text);
                if (data.success) {
                    displayInstruments(data.instruments);
                } else {
                    instrumentsList.innerHTML = '<div class="file-info">Error loading instruments: ' + data.message + '</div>';
                }
            } catch (parseError) {
                console.error('JSON parse error:', parseError);
                console.error('Response text:', text);
                instrumentsList.innerHTML = '<div class="file-info">Invalid response from server. Check console for details.</div>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            instrumentsList.innerHTML = '<div class="file-info">Error loading instruments: ' + error.message + '</div>';
        });
}

function displayInstruments(instruments) {
    const instrumentsList = document.getElementById('instrumentsList');
    
    // Store instruments data globally for edit functionality
    window.currentInstruments = instruments;
    
    if (instruments.length === 0) {
        instrumentsList.innerHTML = '<div class="file-info">No instruments found.</div>';
        return;
    }

    instrumentsList.innerHTML = '';

    instruments.forEach(instrument => {
        const card = document.createElement('div');
        card.className = 'instrument-card';
        
        const additionalImages = instrument.additional_images ? JSON.parse(instrument.additional_images) : [];
        
        card.innerHTML = `
            <img src="${instrument.main_image}" alt="${instrument.name_en}" onerror="this.style.display='none'">
            <h3>${instrument.name_en}</h3>
            <p><strong>ID:</strong> ${instrument.name_id}</p>
            <p><strong>Japanese:</strong> ${instrument.name_ja}</p>
            <p><strong>Description (EN):</strong> ${instrument.description_en.substring(0, 100)}...</p>
            <p><strong>Additional Images:</strong> ${additionalImages.length} files</p>
            <p><strong>Audio:</strong> ${instrument.audio_file}</p>
            <p><strong>Created:</strong> ${new Date(instrument.created_at).toLocaleDateString()}</p>
            <div class="card-actions">
                <button class="btn btn-secondary btn-small" onclick="editInstrument(${instrument.id})">Edit</button>
                <button class="btn btn-danger btn-small" onclick="deleteInstrument(${instrument.id}, '${instrument.name_en}')">Delete</button>
            </div>
        `;
        
        instrumentsList.appendChild(card);
    });
}

function editInstrument(id) {
    // Find the instrument data
    const instruments = window.currentInstruments || [];
    const instrument = instruments.find(inst => inst.id == id);
    
    if (!instrument) {
        showMessage('Instrument not found', 'error');
        return;
    }
    
    // Switch to add instrument section and populate form
    showSection('add-instrument');
    
    // Populate form fields
    document.getElementById('instrumentNameId').value = instrument.name_id;
    document.getElementById('instrumentNameEn').value = instrument.name_en;
    document.getElementById('instrumentNameJa').value = instrument.name_ja;
    document.getElementById('instrumentDescId').value = instrument.description_id;
    document.getElementById('instrumentDescEn').value = instrument.description_en;
    document.getElementById('instrumentDescJa').value = instrument.description_ja;
    
    // Store the ID for update
    document.getElementById('instrumentForm').dataset.editId = id;
    
    // Change form title and button text
    document.querySelector('#add-instrument h2').textContent = 'Edit Instrument';
    document.querySelector('#instrumentForm button[type="submit"]').textContent = 'Update Instrument';
    
    showMessage('Editing instrument: ' + instrument.name_en, 'info');
}

function deleteInstrument(id, name) {
    if (!confirm(`Are you sure you want to delete "${name}"? This action cannot be undone.`)) {
        return;
    }

    showMessage('Deleting instrument...', 'info');

    fetch('admin-handler.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `action=delete&id=${id}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showMessage('Instrument deleted successfully!', 'success');
            loadInstruments();
        } else {
            showMessage('Error: ' + data.message, 'error');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showMessage('An error occurred while deleting the instrument.', 'error');
    });
}

function showMessage(message, type = 'info') {
    const container = document.getElementById('messageContainer');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    container.appendChild(messageDiv);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    }, 5000);
    
    // Remove on click
    messageDiv.addEventListener('click', () => {
        if (messageDiv.parentNode) {
            messageDiv.parentNode.removeChild(messageDiv);
        }
    });
}

// Utility function to validate form data
function validateForm(formData) {
    const required = ['name_id', 'name_en', 'name_ja', 'description_id', 'description_en', 'description_ja'];
    
    for (let field of required) {
        if (!formData.get(field) || formData.get(field).trim() === '') {
            return { valid: false, message: `${field.replace('_', ' ')} is required.` };
        }
    }
    
    // Check file uploads
    if (!formData.get('main_image') || formData.get('main_image').size === 0) {
        return { valid: false, message: 'Main image is required.' };
    }
    
    if (!formData.get('audio_file') || formData.get('audio_file').size === 0) {
        return { valid: false, message: 'Audio file is required.' };
    }
    
    return { valid: true };
}