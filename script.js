// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navigation background change on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.style.backgroundColor = '#fff';
        header.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';
    } else {
        header.style.backgroundColor = 'transparent';
        header.style.boxShadow = 'none';
    }
});

// Contact form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        // Add your form submission logic here
        alert('Thank you for your message! We will get back to you soon.');
        contactForm.reset();
    });
}

// Add animation on scroll
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    section.classList.add('hidden');
    observer.observe(section);
});


// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('enquiry-form');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        // Create a loading state
        const submitButton = form.querySelector('.submit-button');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;
        
        // Get form data
        const formData = new FormData(form);
        const formDataObject = {};
        
        // Convert FormData to JSON object
        formData.forEach((value, key) => {
            formDataObject[key] = value;
        });
        
        try {
            // Send POST request to the server
            const response = await fetch('http://localhost:3000/form', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formDataObject)
            });
            
            const data = await response.json();
            
            // Show success message
            alert('Form submitted successfully!');
            
            // Reset form
            form.reset();
            
        } catch (error) {
            // Handle errors
            console.error('Error:', error);
            alert('There was an error submitting the form. Please try again.');
            
        } finally {
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
        }
    });
});