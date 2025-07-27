// Custom Cursor
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');

document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
    cursorFollower.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`;
});

// Navigation
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navbar = document.querySelector('.navbar');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            
            // Animate skill bars
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
        }
    });
}, observerOptions);

// Observe sections for animations
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Animate skill bars
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        setTimeout(() => {
            bar.style.width = width;
        }, 200);
    });
}

// Parallax effect for floating shapes
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const shapes = document.querySelectorAll('.shape');
    
    shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5;
        shape.style.transform = `translateY(${scrolled * speed}px)`;
    });
});

// Form submission
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const subject = contactForm.querySelectorAll('input[type="text"]')[1].value;
        const message = contactForm.querySelector('textarea').value;
        
        // Simple validation
        if (name && email && subject && message) {
            // Simulate form submission
            const submitBtn = contactForm.querySelector('.btn');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.style.opacity = '0.7';
            
            setTimeout(() => {
                submitBtn.textContent = 'Message Sent!';
                submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    submitBtn.style.opacity = '';
                    contactForm.reset();
                }, 2000);
            }, 1500);
        } else {
            alert('Please fill in all fields.');
        }
    });
}

// Add loading animation to page
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Typing effect for hero code
function typeCode() {
    const codeLines = document.querySelectorAll('.code-line');
    codeLines.forEach((line, index) => {
        setTimeout(() => {
            line.style.opacity = '1';
        }, (index + 1) * 200);
    });
}

// Initialize typing effect when hero is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            setTimeout(typeCode, 1000);
            heroObserver.unobserve(entry.target);
        }
    });
});

const heroSection = document.querySelector('.hero');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// Add hover effects to interactive elements
document.querySelectorAll('.btn, .social-link, .contact-item, .skill-category').forEach(element => {
    element.addEventListener('mouseenter', () => {
        cursor.style.transform += ' scale(1.5)';
        cursor.style.borderColor = '#8b5cf6';
    });
    
    element.addEventListener('mouseleave', () => {
        cursor.style.transform = cursor.style.transform.replace(' scale(1.5)', '');
        cursor.style.borderColor = '#6366f1';
    });
});

// Tech orbit tooltips
document.querySelectorAll('.tech-icon').forEach(icon => {
    icon.addEventListener('mouseenter', (e) => {
        const tech = e.target.closest('.tech-icon').getAttribute('data-tech');
        if (tech) {
            const tooltip = document.createElement('div');
            tooltip.className = 'tech-tooltip';
            tooltip.textContent = tech;
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 5px 10px;
                border-radius: 5px;
                font-size: 12px;
                pointer-events: none;
                z-index: 1000;
                transform: translate(-50%, -100%);
                margin-top: -10px;
            `;
            
            e.target.closest('.tech-icon').appendChild(tooltip);
        }
    });
    
    icon.addEventListener('mouseleave', (e) => {
        const tooltip = e.target.closest('.tech-icon').querySelector('.tech-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    });
});

// Disable custom cursor on mobile
if (window.innerWidth <= 768) {
    cursor.style.display = 'none';
    cursorFollower.style.display = 'none';
}