document.addEventListener('DOMContentLoaded', () => {
    console.log('Morning Brief website loaded successfully!');

    // Get the form and input elements
    const signupForm = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');

    // Event listener for form submission
    signupForm.addEventListener('submit', (e) => {
        // Prevent the default form submission
        e.preventDefault();

        // Simple front-end validation
        if(emailInput.value === '' || passwordInput.value === '') {
            alert('Please fill in both email and password.');
            return;
        }

        // If you have a backend to handle the signup, you might use fetch to POST the data
        // This is just an example URL and you would replace it with your actual endpoint
        const endpoint = 'https://bdnwog.github.io/MorningBrief/signup';
        const formData = {
            email: emailInput.value,
            password: passwordInput.value
        };

        fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
            // Handle success, perhaps redirecting to a new page or clearing the form
            // window.location.href = '/thank-you.html'; // Redirect to a new page
            signupForm.reset(); // Clear the form
        })
        .catch((error) => {
            console.error('Error:', error);
            // Handle errors, such as displaying a message to the user
        });
    });
});
