// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or default to light mode
const currentTheme = localStorage.getItem('theme') || 'light';
body.setAttribute('data-theme', currentTheme);

// Update theme toggle icon
function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
        icon.className = 'fas fa-sun';
    } else {
        icon.className = 'fas fa-moon';
    }
}

if (themeToggle) {
    updateThemeIcon(currentTheme);
    // Theme toggle event listener
    themeToggle.addEventListener('click', () => {
        const currentTheme = body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// Mobile Navigation Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.querySelector('.nav-menu');

if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// Skills Progress Animation
function animateSkills() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        // In static version, style width is often inline, but this supports data-attributes too
        if (width) bar.style.width = width;
    });
}

// Scroll Animation
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('animated');
        }
    });
}

// Intersection Observer for animations
const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            // Animate skills when skills section comes into view
            if (entry.target.id === 'skills') {
                setTimeout(animateSkills, 300);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.skill-category, .project-card, .experience-item, .education-item, .about-content, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('animate-on-scroll');
        observer.observe(el);
    });
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Enhanced Notification System
function showNotification(title, message, type = 'info', duration = 4000) {
    const overlay = document.getElementById('notificationOverlay');
    const icon = document.getElementById('notificationIcon');
    const iconClass = document.getElementById('notificationIconClass');
    const titleEl = document.getElementById('notificationTitle');
    const messageEl = document.getElementById('notificationMessage');

    if (!overlay) return;

    titleEl.textContent = title;
    messageEl.textContent = message;

    const notificationTypes = {
        success: { icon: 'fa-check-circle', class: 'success' },
        error: { icon: 'fa-exclamation-circle', class: 'error' },
        warning: { icon: 'fa-exclamation-triangle', class: 'warning' },
        info: { icon: 'fa-info-circle', class: 'info' }
    };

    const notificationType = notificationTypes[type] || notificationTypes.info;

    iconClass.className = `fas ${notificationType.icon}`;
    icon.className = `notification-icon ${notificationType.class}`;
    overlay.classList.add('show');

    if (duration && duration > 0) {
        setTimeout(() => { hideNotification(); }, duration);
    }
}

function hideNotification() {
    const overlay = document.getElementById('notificationOverlay');
    if (overlay) overlay.classList.remove('show');
}

// Close notification handlers
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.getElementById('notificationClose');
    if (closeBtn) closeBtn.addEventListener('click', hideNotification);

    const overlay = document.getElementById('notificationOverlay');
    if (overlay) {
        overlay.addEventListener('click', (e) => { if (e.target === overlay) hideNotification(); });
    }
});

// Navbar scroll effect
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');
if (navbar) {
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (scrollTop > lastScrollTop && scrollTop > 100) { navbar.style.transform = 'translateY(-100%)'; }
        else { navbar.style.transform = 'translateY(0)'; }
        lastScrollTop = scrollTop;
    });
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.particles');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Typing effect for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

document.addEventListener('DOMContentLoaded', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => { typeWriter(heroTitle, originalText, 50); }, 1000);
    }
});

// Add loading animation
window.addEventListener('load', () => { document.body.classList.add('loaded'); });

// Inject loading styles dynamically
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body { opacity: 0; transition: opacity 0.5s ease; }
    body.loaded { opacity: 1; }
    .navbar { transition: transform 0.3s ease; }
`;
document.head.appendChild(loadingStyles);

// Inject mobile menu styles dynamically
const mobileMenuStyles = document.createElement('style');
mobileMenuStyles.textContent = `
    @media (max-width: 768px) {
        .nav-menu { position: fixed; top: 70px; left: -100%; width: 100%; height: calc(100vh - 70px); background: var(--bg-primary); flex-direction: column; justify-content: flex-start; align-items: center; padding-top: 2rem; transition: left 0.3s ease; box-shadow: var(--shadow-large); }
        .nav-menu.active { left: 0; }
        .nav-menu .nav-link { margin: 1rem 0; font-size: 1.2rem; }
        .hamburger.active span:nth-child(1) { transform: rotate(-45deg) translate(-5px, 6px); }
        .hamburger.active span:nth-child(2) { opacity: 0; }
        .hamburger.active span:nth-child(3) { transform: rotate(45deg) translate(-5px, -6px); }
    }
`;
document.head.appendChild(mobileMenuStyles);
// Contact Form Handling (Google Sheets Integration)
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 1. Get the submit button to show loading state
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // 2. Prepare data
        const formData = new FormData(this);
        
        // PASTE YOUR GOOGLE SCRIPT URL BELOW
        const scriptURL = 'https://script.google.com/macros/s/AKfycbyeOCs9_ZbZhxLljEq2uC6beZmVFspw-lOzmDYYmfiKXOT3vLVzogCIIR7i02s1H9kGZg/exec';

        // 3. Send to Google Sheets
        fetch(scriptURL, {
            method: 'POST',
            body: formData
        })
        .then(response => {
            // Google Scripts returns a 200 OK even on some errors, so we assume success if we get here
            showNotification('Success!', 'Message sent successfully!', 'success');
            this.reset(); // Clear the form
        })
        .catch(error => {
            console.error('Error!', error.message);
            showNotification('Error!', 'Something went wrong. Please try again.', 'error');
        })
        .finally(() => {
            // 4. Reset button state
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
    });
}
// Project card micro-interactions
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => { card.style.transform = 'translateY(-10px) scale(1.02)'; });
        card.addEventListener('mouseleave', () => { card.style.transform = 'translateY(0) scale(1)'; });
    });

    // Button ripple effect
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('click', function (e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            ripple.style.cssText = `position: absolute; width: ${size}px; height: ${size}px; left: ${x}px; top: ${y}px; background: rgba(255, 255, 255, 0.3); border-radius: 50%; transform: scale(0); animation: ripple 0.6s linear; pointer-events: none;`;
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            setTimeout(() => { ripple.remove(); }, 600);
        });
    });
    const rippleStyles = document.createElement('style');
    rippleStyles.textContent = `@keyframes ripple { to { transform: scale(4); opacity: 0; } }`;
    document.head.appendChild(rippleStyles);
});