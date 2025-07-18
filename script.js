


document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('greetButton');
    const messageDiv = document.getElementById('message');

    button.addEventListener('click', function() {
        const name = prompt('what is your name?');
        messageDiv.innerHTML = '<h3>Hello, ' + name + '! Welcome to my website.</h3>';
        messageDiv.style.color = '#007bff';

         <script src="https://cdnjs.cloudflare.com/ajax/libs/emailjs/3.2.0/email.min.js">
    
        // Initialize EmailJS
        (function() {
            emailjs.init('GdLF-HEnPPUxu9-wp'); // Replace with your EmailJS public key
       

        // Form submission handler

        document.getElementById('contactForm').addEventListener('submit', function(event) {
            event.preventDefault();
            
            const submitBtn = document.getElementById('submitBtn');
            const successMessage = document.getElementById('successMessage');
            const errorMessage = document.getElementById('errorMessage');
            
            // Hide previous messages
            successMessage.style.display = 'none';
            errorMessage.style.display = 'none';
            
            // Disable button and show loading state
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            // Collect form data
            const templateParams = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Send email using EmailJS
            emailjs.send('service_oprs9kp', 'template_ii6rqhg', templateParams)
                .then(function(response) {
                    console.log('SUCCESS!', response.status, response.text);
                    successMessage.style.display = 'block';
                    document.getElementById('contactForm').reset();
                    
                    // Scroll to success message
                    successMessage.scrollIntoView({ behavior: 'smooth' });
                }, function(error) {
                    console.log('FAILED...', error);
                    errorMessage.style.display = 'block';
                    
                    // Scroll to error message
                    errorMessage.scrollIntoView({ behavior: 'smooth' });
                })
                .finally(function() {
                    // Re-enable button
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Send Email';
                });
        });
    </script>

    });
});
