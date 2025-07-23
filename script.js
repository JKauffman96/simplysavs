// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            // Get form elements
            const submitBtn = contactForm.querySelector('.submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const successMessage = document.getElementById('success-message');
            const errorMessage = document.getElementById('error-message');
            
            // Show loading state
            if (btnText && btnLoading) {
                btnText.style.display = 'none';
                btnLoading.style.display = 'inline';
            }
            submitBtn.disabled = true;
            
            // Hide previous messages
            if (successMessage) successMessage.style.display = 'none';
            if (errorMessage) errorMessage.style.display = 'none';
            
            // Collect form data
            const formData = {
                name: contactForm.name.value.trim(),
                email: contactForm.email.value.trim(),
                phone: contactForm.phone.value.trim() || 'Not provided',
                subject: contactForm.subject.value,
                message: contactForm.message.value.trim()
            };
            
            // Validate required fields
            if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                showError('Please fill in all required fields.');
                resetButton();
                return;
            }
            
            // Validate email format
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(formData.email)) {
                showError('Please enter a valid email address.');
                resetButton();
                return;
            }
            
            // Send email using EmailJS
            emailjs.send('service_oprs9kp', 'template_ii6rqhg', formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    showSuccess();
                    contactForm.reset();
                }, function(error) {
                    console.log('FAILED...', error);
                    showError('Sorry, there was an error sending your message. Please try again or contact me directly.');
                })
                .finally(function() {
                    resetButton();
                });
        });
        
        function showSuccess() {
            const successMessage = document.getElementById('success-message');
            if (successMessage) {
                successMessage.style.display = 'block';
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        function showError(message) {
            const errorMessage = document.getElementById('error-message');
            if (errorMessage) {
                errorMessage.querySelector('p').textContent = message;
                errorMessage.style.display = 'block';
                errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
        
        function resetButton() {
            const submitBtn = contactForm.querySelector('.submitBtn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            
            if (btnText && btnLoading) {
                btnText.style.display = 'inline';
                btnLoading.style.display = 'none';
            }
            submitBtn.disabled = false;
        }
    }
    
    // Additional form enhancements
    
    // Auto-resize textarea
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        messageTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
        });
    }
    
    // Enhanced form validation with real-time feedback
    const formInputs = document.querySelectorAll('#contactForm input, #contactForm select, #contactForm textarea');
    formInputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
    
    function validateField(event) {
        const field = event.target;
        const value = field.value.trim();
        
        // Remove any existing error styling
        clearFieldError(event);
        
        // Check required fields
        if (field.hasAttribute('required') && !value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                showFieldError(field, 'Please enter a valid email address');
                return false;
            }
        }
        
        // Phone validation (if provided)
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\+]?[\d\s\-\(\)]{10,}$/;
            if (!phoneRegex.test(value)) {
                showFieldError(field, 'Please enter a valid phone number');
                return false;
            }
        }
        
        return true;
    }
    
    function showFieldError(field, message) {
        field.style.borderColor = '#dc3545';
        field.style.boxShadow = '0 0 0 3px rgba(220, 53, 69, 0.1)';
        
        // Add error message if it doesn't exist
        let errorMsg = field.parentNode.querySelector('.field-error');
        if (!errorMsg) {
            errorMsg = document.createElement('div');
            errorMsg.className = 'field-error';
            errorMsg.style.color = '#dc3545';
            errorMsg.style.fontSize = '0.875rem';
            errorMsg.style.marginTop = '0.25rem';
            field.parentNode.appendChild(errorMsg);
        }
        errorMsg.textContent = message;
    }
    
    function clearFieldError(event) {
        const field = event.target;
        field.style.borderColor = '';
        field.style.boxShadow = '';
        
        // Remove error message
        const errorMsg = field.parentNode.querySelector('.field-error');
        if (errorMsg) {
            errorMsg.remove();
        }
    }
            // Mobile menu toggle
        function toggleMobileMenu() {
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.toggle('active');
        }

        // Mobile dropdown toggle
        document.addEventListener('DOMContentLoaded', function() {
            const dropdownLinks = document.querySelectorAll('.has-dropdown');
            
            dropdownLinks.forEach(link => {
                link.addEventListener('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        const parentItem = this.parentElement;
                        parentItem.classList.toggle('dropdown-active');
                    }
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                const navMenu = document.getElementById('navMenu');
                const mobileToggle = document.querySelector('.mobile-toggle');
                
                if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                    navMenu.classList.remove('active');
                }
            });
        });

        // Close dropdowns when clicking outside (desktop)
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.nav-item')) {
                const activeDropdowns = document.querySelectorAll('.nav-item.dropdown-active');
                activeDropdowns.forEach(item => {
                    item.classList.remove('dropdown-active');
                });
            }
        });
});