// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Add smooth scrolling to all nav links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Navbar background change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Fade-in animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Add fade-in class to elements and observe them
    const elementsToAnimate = document.querySelectorAll('.card, .program-card, .perk-item, .mentor-content, .cta-content');
    elementsToAnimate.forEach(element => {
        element.classList.add('fade-in');
        observer.observe(element);
    });

    // Program card toggle functionality
    const programCards = document.querySelectorAll('.program-card');
    console.log('Found program cards:', programCards.length); // Debug log
    
    programCards.forEach((card, index) => {
        const header = card.querySelector('.program-header');
        console.log(`Setting up card ${index + 1}:`, header); // Debug log
        
        header.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Card clicked:', index + 1); // Debug log
            
            // Close other open cards
            programCards.forEach(otherCard => {
                if (otherCard !== card && otherCard.classList.contains('active')) {
                    otherCard.classList.remove('active');
                }
            });
            
            // Toggle current card
            card.classList.toggle('active');
            console.log('Card active state:', card.classList.contains('active')); // Debug log
        });
    });

    // Button hover effects
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Add loading animation to hero section
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0';
        heroContent.style.transform = 'translateY(50px)';
        
        setTimeout(() => {
            heroContent.style.transition = 'all 1s ease';
            heroContent.style.opacity = '1';
            heroContent.style.transform = 'translateY(0)';
        }, 300);
    }

    // Parallax effect for hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });

    // Add click tracking for CTA buttons
    ctaButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Add a subtle click animation
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-2px) scale(1.05)';
            }, 150);
        });
    });

    // Mobile menu toggle with animated hamburger
    function createMobileMenu() {
        const navContainer = document.querySelector('.nav-container');
        const navMenu = document.querySelector('.nav-menu');
        
        // Create mobile menu button with animated hamburger
        const mobileMenuBtn = document.createElement('button');
        mobileMenuBtn.className = 'mobile-menu-btn';
        mobileMenuBtn.innerHTML = `
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        `;
        
        // Toggle mobile menu with animation
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            navMenu.classList.toggle('mobile-active');
            mobileMenuBtn.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        navMenu.addEventListener('click', function(e) {
            if (e.target.classList.contains('nav-link')) {
                navMenu.classList.remove('mobile-active');
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navContainer.contains(e.target) && navMenu.classList.contains('mobile-active')) {
                navMenu.classList.remove('mobile-active');
                mobileMenuBtn.classList.remove('active');
            }
        });
        
        navContainer.appendChild(mobileMenuBtn);
    }
    
    // Initialize mobile menu
    createMobileMenu();
});

// Global function for smooth scrolling to sections
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Modal functions
function openReservationModal() {
    const modal = document.getElementById('reservationModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeReservationModal() {
    const modal = document.getElementById('reservationModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const reservationModal = document.getElementById('reservationModal');
    const calendarModal = document.getElementById('calendarModal');
    if (event.target === reservationModal) {
        closeReservationModal();
    }
    if (event.target === calendarModal) {
        closeCalendarModal();
    }
}

// Scroll to Program Overview section
function scrollToJoinNow() {
    const programSection = document.querySelector('.program-overview');
    if (programSection) {
        programSection.scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Calendar modal functions
function openCalendarModal() {
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeCalendarModal() {
    const modal = document.getElementById('calendarModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    // Reset form
    document.getElementById('bookingForm').style.display = 'none';
    document.getElementById('demoBookingForm').reset();
    // Clear selected time slots
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
}

// Time slot selection
function selectTimeSlot(date, time) {
    // Clear previous selections
    document.querySelectorAll('.time-slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Select current slot
    event.target.classList.add('selected');
    
    // Show booking form
    const bookingForm = document.getElementById('bookingForm');
    const selectedTime = document.getElementById('selectedTime');
    
    // Format the selected time
    let timeText = '';
    let dateText = '';
    
    switch(date) {
        case 'today':
            dateText = 'Today';
            break;
        case 'tomorrow':
            dateText = 'Tomorrow';
            break;
        case 'week':
            dateText = 'This Week';
            break;
    }
    
    timeText = event.target.textContent;
    
    selectedTime.innerHTML = `
        <h5>Selected Time</h5>
        <p><strong>${dateText}</strong> - ${timeText}</p>
    `;
    
    bookingForm.style.display = 'block';
    bookingForm.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// FAQ Toggle functionality
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Toggle current item
    if (!isActive) {
        faqItem.classList.add('active');
    }
}

// Countdown Timer functionality
function initializeCountdown() {
    // Get or set the end time in localStorage
    let endTime = localStorage.getItem('countdownEndTime');
    
    if (!endTime) {
        // Set end time to 4 days from now
        endTime = new Date().getTime() + (4 * 24 * 60 * 60 * 1000);
        localStorage.setItem('countdownEndTime', endTime);
    } else {
        endTime = parseInt(endTime);
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = endTime - now;
        
        if (distance < 0) {
            // Timer has ended, reset to 4 days
            endTime = new Date().getTime() + (4 * 24 * 60 * 60 * 1000);
            localStorage.setItem('countdownEndTime', endTime);
            updateCountdown();
            return;
        }
        
        // Calculate time units
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        // Update the display
        const daysElement = document.getElementById('days');
        const hoursElement = document.getElementById('hours');
        const minutesElement = document.getElementById('minutes');
        const secondsElement = document.getElementById('seconds');
        
        if (daysElement) daysElement.textContent = days;
        if (hoursElement) hoursElement.textContent = hours.toString().padStart(2, '0');
        if (minutesElement) minutesElement.textContent = minutes.toString().padStart(2, '0');
        if (secondsElement) secondsElement.textContent = seconds.toString().padStart(2, '0');
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

// Demo booking form submission
document.addEventListener('DOMContentLoaded', function() {
    const demoForm = document.getElementById('demoBookingForm');
    if (demoForm) {
        demoForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(demoForm);
            const data = Object.fromEntries(formData);
            
            // Show loading state
            const submitBtn = demoForm.querySelector('.btn-primary');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Booking...';
            submitBtn.disabled = true;
            
            // Simulate booking process
            setTimeout(() => {
                alert('Demo consultation booked successfully! You will receive a confirmation email with meeting details shortly.');
                closeCalendarModal();
                demoForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }
});

// Crypto payment functionality
document.addEventListener('DOMContentLoaded', function() {
    const paymentMethods = document.querySelectorAll('input[name="paymentMethod"]');
    const cryptoAmount = document.getElementById('cryptoAmount');
    
    // Mock crypto prices (in USD)
    const cryptoPrices = {
        bitcoin: 45000,
        ethereum: 2800,
        usdt: 1,
        stellar: 0.12
    };
    
    const usdAmount = 497;
    
    function updateCryptoAmount() {
        const selectedMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (selectedMethod) {
            const crypto = selectedMethod.value;
            const price = cryptoPrices[crypto];
            const amount = (usdAmount / price).toFixed(6);
            
            let symbol = '';
            switch(crypto) {
                case 'bitcoin':
                    symbol = '₿';
                    break;
                case 'ethereum':
                    symbol = 'Ξ';
                    break;
                case 'usdt':
                    symbol = '₮';
                    break;
                case 'stellar':
                    symbol = '★';
                    break;
            }
            
            cryptoAmount.innerHTML = `<span class="crypto-price">${amount} ${symbol}</span>`;
        }
    }
    
    paymentMethods.forEach(method => {
        method.addEventListener('change', updateCryptoAmount);
    });
    
    // Form submission
    const form = document.getElementById('reservationForm');
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Show loading state
        const submitBtn = form.querySelector('.btn-primary');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Processing...';
        submitBtn.disabled = true;
        
        // Simulate payment processing
        setTimeout(() => {
            alert('Reservation successful! You will receive a confirmation email shortly with payment instructions.');
            closeReservationModal();
            form.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
});

// Global function for toggling program cards (removed - handled by event listeners)

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        }
        
        // Start typing effect after a delay
        setTimeout(typeWriter, 500);
    }

    // Add counter animation to mentor stats
    const stats = document.querySelectorAll('.stat-number');
    const animateCounters = () => {
        stats.forEach(stat => {
            const target = parseInt(stat.textContent.replace(/[^\d]/g, ''));
            const suffix = stat.textContent.replace(/[\d]/g, '');
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current) + suffix;
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target + suffix;
                }
            };
            
            updateCounter();
        });
    };

    // Trigger counter animation when mentor section is visible
    const mentorSection = document.querySelector('.about-mentor');
    if (mentorSection) {
        const mentorObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    mentorObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        mentorObserver.observe(mentorSection);
    }
    
    // Initialize countdown timer
    initializeCountdown();
    
    // Initialize testimonials carousel
    initializeTestimonials();
});

// Testimonials carousel functionality
function initializeTestimonials() {
    const track = document.getElementById('testimonialsTrack');
    if (!track) return;
    
    // Clone the testimonials for seamless infinite scroll
    const testimonials = track.innerHTML;
    track.innerHTML = testimonials + testimonials;
    
    // Reset animation when it completes
    track.addEventListener('animationiteration', function() {
        // The animation will automatically loop due to infinite property
    });
}
