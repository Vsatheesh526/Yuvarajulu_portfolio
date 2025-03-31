// Typing animation (unchanged)
const typingElement = document.getElementById('typing');
const typingTexts = [
    "Technical Analyst@Oracle",
    "Hyperion Developer",
    "Data Engineering Associate"
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 150;

function type() {
    const currentText = typingTexts[textIndex];
    
    if (isDeleting) {
        typingElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 75;
    } else {
        typingElement.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 150;
    }

    if (!isDeleting && charIndex === currentText.length) {
        typingSpeed = 1000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % typingTexts.length;
        typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
}

// Tab functionality (unchanged)
function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    document.querySelectorAll('.tab').forEach(tab => tab.classList.remove('active'));
    document.getElementById(tabId).classList.add('active');
    event.currentTarget.classList.add('active');
}

// Main DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize typing animation
    type();

    // Education cards hover effect (unchanged)
    const educationCards = document.querySelectorAll('.education-card');
    educationCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Project cards (unchanged)
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('click', function() {
            // Add animation/expand functionality here if needed
        });
    });

    // Contact form - UPDATED VERSION
    const form = document.getElementById('contactForm');
    if (form) {
        const successMessage = document.getElementById('successMessage');
        const sendAnotherBtn = document.getElementById('sendAnother');
        
        form.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = form.querySelector('.submit-btn');
            const originalBtnText = submitBtn.querySelector('span').textContent;
            
            try {
                // Show loading state
                submitBtn.querySelector('span').textContent = 'Sending...';
                submitBtn.disabled = true;
                
                // Send form data
                const formData = new FormData(form);
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    // Show success message
                    form.style.display = 'none';
                    successMessage.style.display = 'block';
                    form.reset();
                    
                    // Reset floating labels
                    document.querySelectorAll('.floating-label label').forEach(label => {
                        label.style.transform = '';
                        label.style.fontSize = '';
                        label.style.color = '';
                    });
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                console.error('Form error:', error);
                alert('Error sending message. Please try again.');
            } finally {
                submitBtn.querySelector('span').textContent = originalBtnText;
                submitBtn.disabled = false;
            }
        });
        
        // Send another message
        if (sendAnotherBtn) {
            sendAnotherBtn.addEventListener('click', function() {
                form.style.display = 'block';
                successMessage.style.display = 'none';
            });
        }
        
        // Floating labels
        document.querySelectorAll('.floating-label input, .floating-label textarea').forEach(input => {
            input.addEventListener('focus', function() {
                const label = this.previousElementSibling;
                label.style.transform = 'translateY(-20px)';
                label.style.fontSize = '0.8rem';
                label.style.color = '#4361ee';
            });
            
            input.addEventListener('blur', function() {
                if (!this.value) {
                    const label = this.previousElementSibling;
                    label.style.transform = '';
                    label.style.fontSize = '';
                    label.style.color = '';
                }
            });
        });
    }

    // Slider functionality (unchanged)
    const slider = document.querySelector('.slider');
    if (slider) {
        const slides = document.querySelectorAll('.slide');
        const dots = document.querySelectorAll('.slider-dot');
        const prevBtn = document.querySelector('.prev');
        const nextBtn = document.querySelector('.next');
        
        let currentIndex = 0;
        const slideCount = slides.length;
        
        function updateSlider() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % slideCount;
            updateSlider();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + slideCount) % slideCount;
            updateSlider();
        }
        
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentIndex = index;
                updateSlider();
            });
        });
        
        if (nextBtn) nextBtn.addEventListener('click', nextSlide);
        if (prevBtn) prevBtn.addEventListener('click', prevSlide);
        
        let slideInterval = setInterval(nextSlide, 8000);
        
        slider.addEventListener('mouseenter', () => {
            clearInterval(slideInterval);
        });
        
        slider.addEventListener('mouseleave', () => {
            slideInterval = setInterval(nextSlide, 8000);
        });
        
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') nextSlide();
            else if (e.key === 'ArrowLeft') prevSlide();
        });
        
        let touchStartX = 0;
        let touchEndX = 0;
        
        slider.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, {passive: true});
        
        slider.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchEndX < touchStartX - 50) nextSlide();
            if (touchEndX > touchStartX + 50) prevSlide();
        }, {passive: true});
    }
});

document.addEventListener('DOMContentLoaded', function() {
    // Show loader immediately
    const loaderWrapper = document.querySelector('.loader-wrapper');
    
    // Hide loader when everything is loaded
    window.addEventListener('load', function() {
      // Add slight delay for better UX (optional)
      setTimeout(function() {
        loaderWrapper.classList.add('hidden');
        
        // Remove from DOM after animation completes
        setTimeout(function() {
          loaderWrapper.remove();
        }, 500); // Match this with your CSS transition time
      }, 500); // Adjust this delay as needed
    });
  });