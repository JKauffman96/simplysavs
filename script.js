document.addEventListener('DOMContentLoaded', function() {
    // Greeting button functionality (for other pages)
    const greetButton = document.getElementById('greetButton');
    const messageDiv = document.getElementById('message');

    if (greetButton && messageDiv) {
        greetButton.addEventListener('click', function() {
            const name = prompt('What is your name?');
            if (name) {
                messageDiv.innerHTML = '<h3>Hello, ' + name + '! Welcome to my website.</h3>';
                messageDiv.style.color = '#007bff';
            }
        });
    }

    // Contact form functionality
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        // Initialize EmailJS
        emailjs.init('GdLF-HEnPPUxu9-wp');

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoading = submitBtn.querySelector('.btn-loading');
            const successMessage = document.getElementById('success-message');
            const errorMessage = document.getElementById('error-message');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoading.style.display = 'inline';
            submitBtn.disabled = true;
            
            // Hide previous messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Collect form data
            const formData = {
                name: contactForm.name.value,
                email: contactForm.email.value,
                phone: contactForm.phone.value,
                subject: contactForm.subject.value,
                message: contactForm.message.value
            };
            
            // Send email using EmailJS
            emailjs.send('service_oprs9kp', 'template_ii6rqhg', formData)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    
                    // Show success message
                    successMessage.style.display = 'block';
                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    
                    // Reset form
                    contactForm.reset();
                    
                }, function(error) {
                    console.log('FAILED...', error);
                    
                    // Show error message
                    errorMessage.style.display = 'block';
                    errorMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                })
                .finally(function() {
                    // Reset button state
                    btnText.style.display = 'inline';
                    btnLoading.style.display = 'none';
                    submitBtn.disabled = false;
                });
        });
    }
});