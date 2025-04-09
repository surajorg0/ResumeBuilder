// Resume Builder - Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const authButtons = document.querySelector('.auth-buttons');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            authButtons.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            if (this.getAttribute('href') !== "#") {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Header height offset
                        behavior: 'smooth'
                    });
                }
                
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    authButtons.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Add scroll class to header for background change
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Template preview functionality (simple modal)
    const previewButtons = document.querySelectorAll('.template-actions .btn-secondary');
    
    previewButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const templateCard = button.closest('.template-card');
            const templateImage = templateCard.querySelector('img').src;
            const templateName = templateCard.querySelector('h3').textContent;
            
            // Create modal
            const modal = document.createElement('div');
            modal.classList.add('modal');
            
            modal.innerHTML = `
                <div class="modal-content">
                    <span class="close-modal">&times;</span>
                    <h3>${templateName} Template</h3>
                    <div class="modal-image">
                        <img src="${templateImage}" alt="${templateName} Template">
                    </div>
                    <div class="modal-footer">
                        <a href="builder.html?template=${templateName.toLowerCase()}" class="btn btn-primary">Use This Template</a>
                    </div>
                </div>
            `;
            
            document.body.appendChild(modal);
            
            // Prevent body scrolling when modal is open
            document.body.style.overflow = 'hidden';
            
            // Close modal functionality
            const closeModal = modal.querySelector('.close-modal');
            closeModal.addEventListener('click', () => {
                document.body.removeChild(modal);
                document.body.style.overflow = 'auto';
            });
            
            // Close modal when clicking outside
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    document.body.removeChild(modal);
                    document.body.style.overflow = 'auto';
                }
            });
        });
    });

    // Auto-add CSS for modals
    if (!document.querySelector('#modal-styles')) {
        const modalStyles = document.createElement('style');
        modalStyles.id = 'modal-styles';
        modalStyles.textContent = `
            .modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                opacity: 0;
                animation: fadeIn 0.3s ease forwards;
            }
            
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            
            .modal-content {
                background-color: var(--bg-dark);
                border-radius: var(--radius-lg);
                width: 90%;
                max-width: 700px;
                max-height: 90vh;
                overflow-y: auto;
                position: relative;
                padding: var(--spacing-xl);
                box-shadow: var(--shadow-lg);
                border: 1px solid rgba(255, 255, 255, 0.1);
                transform: translateY(20px);
                animation: slideIn 0.3s ease forwards;
            }
            
            @keyframes slideIn {
                from { transform: translateY(20px); }
                to { transform: translateY(0); }
            }
            
            .close-modal {
                position: absolute;
                top: var(--spacing-md);
                right: var(--spacing-md);
                font-size: 1.5rem;
                color: var(--text-muted);
                cursor: pointer;
                transition: color var(--transition-fast);
            }
            
            .close-modal:hover {
                color: var(--text-white);
            }
            
            .modal-image {
                margin: var(--spacing-md) 0;
                border-radius: var(--radius-md);
                overflow: hidden;
            }
            
            .modal-image img {
                width: 100%;
                height: auto;
                display: block;
            }
            
            .modal-footer {
                margin-top: var(--spacing-lg);
                display: flex;
                justify-content: center;
            }
        `;
        document.head.appendChild(modalStyles);
    }

    // Animation on scroll effect for elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.feature-card, .template-card, .stats-card, .testimonial-card');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.classList.add('animate');
            }
        });
    };
    
    // Add CSS for animations
    if (!document.querySelector('#animation-styles')) {
        const animationStyles = document.createElement('style');
        animationStyles.id = 'animation-styles';
        animationStyles.textContent = `
            .feature-card, .template-card, .stats-card, .testimonial-card {
                opacity: 0;
                transform: translateY(20px);
                transition: opacity 0.6s ease, transform 0.6s ease;
            }
            
            .feature-card.animate, .template-card.animate, .stats-card.animate, .testimonial-card.animate {
                opacity: 1;
                transform: translateY(0);
            }
        `;
        document.head.appendChild(animationStyles);
    }
    
    // Run animation on scroll
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on page load
}); 