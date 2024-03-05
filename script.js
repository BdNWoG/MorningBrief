document.addEventListener('DOMContentLoaded', () => {
    console.log('Morning Brief website loaded successfully!');

    // Get the form and input element
    const signupForm = document.getElementById('signupForm');
    const emailInput = document.getElementById('email');

    // Event listener for form submission
    signupForm.addEventListener('submit', async (e) => {
        e.preventDefault(); // Prevent the default form submission

        if (emailInput.value === '') {
            alert('Please fill in your email.');
            return;
        }

        // Replace 'https://your-backend-domain.com/signup' with your actual backend endpoint
        const endpoint = 'https://morning-brief-1mbx6ad58-billy-gaos-projects.vercel.app/signup'; 
        const formData = {
            email: emailInput.value
        };

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Signup failed');

            // Show success message
            alert('Thank you for signing up!');
            signupForm.reset(); // Clear the form
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    });
});
