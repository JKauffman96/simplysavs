document.addEventListener('DOMContentLoaded', function() {
    const button = document.getElementById('greetButton');
    const messageDiv = document.getElementById('message');

    button.addEventListener('click', function() {
        const name = prompt('what is your name?');
        messageDiv.innerHTML = '<h3>Hello, ' + name + '! Welcome to my website.</h3>';
        messageDiv.style.color = '#007bff';

    });
});
