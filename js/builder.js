// Resume Builder - Builder Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const builderNav = document.querySelector('.builder-nav');
    const navItems = document.querySelectorAll('.builder-nav li');
    const sections = document.querySelectorAll('.builder-section');
    const nextButtons = document.querySelectorAll('.next-section');
    const prevButtons = document.querySelectorAll('.prev-section');
    const progressBar = document.getElementById('form-progress');
    const previewBtn = document.getElementById('preview-btn');
    const previewModal = document.getElementById('preview-modal');
    const closePreview = document.querySelector('.close-preview');
    const continueEditing = document.getElementById('continue-editing');
    const exportPdfBtn = document.getElementById('export-pdf');
    const exportDocxBtn = document.getElementById('export-docx');
    const saveBtn = document.getElementById('save-btn');
    const templateItems = document.querySelectorAll('.template-item');
    const resumePreview = document.getElementById('resume-preview');
    const mobileResumePreview = document.getElementById('mobile-resume-preview');
    
    // State
    let currentSection = 0;
    let selectedTemplate = null;
    let resumeData = {
        template: '',
        personal: {},
        education: [],
        experience: [],
        skills: [],
        projects: [],
        languages: [],
        certificates: [],
        custom: []
    };
    
    // Load resume data from localStorage if exists
    const loadSavedData = () => {
        const savedData = localStorage.getItem('resumeData');
        if (savedData) {
            try {
                resumeData = JSON.parse(savedData);
                updateFormWithSavedData();
                
                // If template was selected, show it
                if (resumeData.template) {
                    const templateEl = document.querySelector(`.template-item[data-template="${resumeData.template}"]`);
                    if (templateEl) {
                        selectTemplate(templateEl);
                    }
                }
            } catch (e) {
                console.error('Error loading saved data:', e);
            }
        }
    };
    
    // Update form fields with saved data
    const updateFormWithSavedData = () => {
        // Personal info
        if (resumeData.personal) {
            for (const key in resumeData.personal) {
                const input = document.getElementById(key);
                if (input) {
                    input.value = resumeData.personal[key];
                }
            }
        }
        
        // For arrays of data (education, experience, etc.)
        // This would be implemented in a more complete version
    };
    
    // Save form data
    const saveFormData = () => {
        // Save personal info
        resumeData.personal = {
            'full-name': document.getElementById('full-name')?.value || '',
            'job-title': document.getElementById('job-title')?.value || '',
            'location': document.getElementById('location')?.value || '',
            'email': document.getElementById('email')?.value || '',
            'phone': document.getElementById('phone')?.value || '',
            'linkedin': document.getElementById('linkedin')?.value || '',
            'website': document.getElementById('website')?.value || '',
            'summary': document.getElementById('summary')?.value || ''
        };
        
        // For arrays of data (education, experience, etc.)
        // This would be implemented in a more complete version
        
        // Save to localStorage
        localStorage.setItem('resumeData', JSON.stringify(resumeData));
        
        // Show save confirmation
        showNotification('Resume data saved successfully!');
    };
    
    // Show a notification
    const showNotification = (message, type = 'success') => {
        // Remove existing notification if any
        const existingNotification = document.querySelector('.notification');
        if (existingNotification) {
            existingNotification.remove();
        }
        
        // Create notification element
        const notification = document.createElement('div');
        notification.classList.add('notification', type);
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Show with animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 10);
        
        // Auto-hide after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    };
    
    // Update progress bar
    const updateProgress = () => {
        const totalSections = navItems.length;
        const progress = ((currentSection + 1) / totalSections) * 100;
        progressBar.style.width = `${progress}%`;
    };
    
    // Navigate to a specific section
    const navigateToSection = (index) => {
        // Hide all sections
        sections.forEach(section => {
            section.classList.remove('active');
        });
        
        // Show target section
        if (sections[index]) {
            sections[index].classList.add('active');
            currentSection = index;
            updateProgress();
            
            // Update nav items
            navItems.forEach((item, i) => {
                item.classList.remove('active');
                if (i < currentSection) {
                    item.classList.add('completed');
                } else if (i === currentSection) {
                    item.classList.add('active');
                    item.classList.remove('completed');
                } else {
                    item.classList.remove('completed');
                }
            });
            
            // Scroll to top of section
            sections[index].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };
    
    // Select a template
    const selectTemplate = (templateItem) => {
        // Remove selected class from all templates
        templateItems.forEach(item => {
            item.classList.remove('selected');
        });
        
        // Add selected class to clicked template
        templateItem.classList.add('selected');
        
        // Get template name and save to state
        selectedTemplate = templateItem.getAttribute('data-template');
        resumeData.template = selectedTemplate;
        
        // Update resume preview
        updateResumePreview();
    };
    
    // Update resume preview
    const updateResumePreview = () => {
        if (!selectedTemplate) {
            resumePreview.innerHTML = `
                <div class="resume-loading">
                    <p>Select a template to preview your resume</p>
                </div>
            `;
            return;
        }
        
        // In a full implementation, this would render the actual resume template
        // with the user's data. For now, we'll show a placeholder.
        resumePreview.innerHTML = `
            <div style="padding: 30px; color: #333;">
                <h2 style="color: #333; margin-bottom: 10px;">
                    ${resumeData.personal['full-name'] || 'Your Name'}
                </h2>
                <p style="color: #666; margin-bottom: 20px;">
                    ${resumeData.personal['job-title'] || 'Your Job Title'}
                </p>
                <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
                <p style="color: #666; font-style: italic;">
                    ${resumeData.personal['summary'] || 'Your professional summary will appear here...'}
                </p>
                <div style="margin-top: 30px; text-align: center; color: #999;">
                    <p>Template: ${selectedTemplate.charAt(0).toUpperCase() + selectedTemplate.slice(1)}</p>
                    <p>Continue adding your information<br>to see it reflected here.</p>
                </div>
            </div>
        `;
        
        // Update mobile preview as well
        if (mobileResumePreview) {
            mobileResumePreview.innerHTML = resumePreview.innerHTML;
        }
    };
    
    // Event Listeners
    
    // Template selection
    templateItems.forEach(item => {
        item.addEventListener('click', () => {
            selectTemplate(item);
        });
    });
    
    // Next button
    nextButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Save current section data
            saveFormData();
            
            // Navigate to next section
            navigateToSection(currentSection + 1);
        });
    });
    
    // Previous button
    prevButtons.forEach(button => {
        button.addEventListener('click', () => {
            navigateToSection(currentSection - 1);
        });
    });
    
    // Sidebar navigation
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            navigateToSection(index);
        });
    });
    
    // Preview button (mobile)
    if (previewBtn) {
        previewBtn.addEventListener('click', () => {
            // Update mobile preview
            if (mobileResumePreview) {
                mobileResumePreview.innerHTML = resumePreview.innerHTML;
            }
            
            // Show preview modal
            previewModal.style.display = 'block';
        });
    }
    
    // Close preview modal
    if (closePreview) {
        closePreview.addEventListener('click', () => {
            previewModal.style.display = 'none';
        });
    }
    
    // Continue editing button
    if (continueEditing) {
        continueEditing.addEventListener('click', () => {
            previewModal.style.display = 'none';
        });
    }
    
    // Export buttons
    if (exportPdfBtn) {
        exportPdfBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a complete implementation, this would generate a PDF
            showNotification('PDF export would be implemented here!');
        });
    }
    
    if (exportDocxBtn) {
        exportDocxBtn.addEventListener('click', (e) => {
            e.preventDefault();
            // In a complete implementation, this would generate a DOCX file
            showNotification('Word document export would be implemented here!');
        });
    }
    
    // Save button
    if (saveBtn) {
        saveBtn.addEventListener('click', () => {
            saveFormData();
        });
    }
    
    // Add notification styles dynamically
    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        .notification {
            position: fixed;
            bottom: 20px;
            right: 20px;
            padding: 15px 25px;
            border-radius: var(--radius-md);
            background-color: var(--success-color);
            color: white;
            box-shadow: var(--shadow-lg);
            z-index: 1000;
            transform: translateY(100px);
            opacity: 0;
            transition: transform 0.3s ease, opacity 0.3s ease;
        }
        
        .notification.error {
            background-color: var(--error-color);
        }
        
        .notification.warning {
            background-color: var(--warning-color);
        }
        
        .notification.show {
            transform: translateY(0);
            opacity: 1;
        }
    `;
    document.head.appendChild(notificationStyles);
    
    // Initialize
    updateProgress();
    loadSavedData();
}); 