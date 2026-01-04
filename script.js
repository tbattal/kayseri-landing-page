/**
 * KAYSERI LANDING PAGE - JAVASCRIPT
 * Smooth interactions and animations
 */

// ============================================
// DOM Elements
// ============================================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// ============================================
// Navbar scroll effect
// ============================================
let lastScroll = 0;

function handleScroll() {
    const currentScroll = window.pageYOffset;

    // Add/remove scrolled class
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
}

// ============================================
// Mobile menu toggle
// ============================================
function toggleMenu() {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');

    // Animate hamburger
    const spans = navToggle.querySelectorAll('span');
    if (navToggle.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translateY(6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translateY(-6px)';
    } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
}

// ============================================
// Close mobile menu when clicking a link
// ============================================
function closeMenu() {
    if (window.innerWidth <= 1024) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');

        const spans = navToggle.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
    }
}

// ============================================
// Smooth scroll for anchor links
// ============================================
function smoothScroll(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
        const offsetTop = targetElement.offsetTop - 80;
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    }

    closeMenu();
}

// ============================================
// Intersection Observer for animations
// ============================================
function setupIntersectionObserver() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements
    const animatedElements = document.querySelectorAll(
        '.about-card, .timeline-item, .sector-card, .cuisine-card, .place-card, .university-card, .culture-feature'
    );

    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        observer.observe(el);
    });
}

// ============================================
// Add animation styles dynamically
// ============================================
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .animate-in {
            animation: fadeInUp 0.6s ease forwards;
        }

        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Active nav link based on scroll position
// ============================================
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// ============================================
// Add active link styles
// ============================================
function addActiveLinkStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .nav-link.active {
            color: var(--color-primary) !important;
        }
        .nav-link.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(style);
}

// ============================================
// Parallax effect for hero section
// ============================================
function handleParallax() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-content');
    const mountains = document.querySelector('.mountain-silhouette');

    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.3}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight);
    }

    if (mountains && scrolled < window.innerHeight) {
        mountains.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
}

// ============================================
// Initialize
// ============================================
function init() {
    // Event listeners
    window.addEventListener('scroll', () => {
        handleScroll();
        updateActiveNavLink();
        handleParallax();
    });

    navToggle.addEventListener('click', toggleMenu);
    navLinks.forEach(link => link.addEventListener('click', smoothScroll));

    // Initial setup
    addAnimationStyles();
    addActiveLinkStyles();
    setupIntersectionObserver();
    handleScroll();
}

// Run when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// ============================================
// Reveal animation on page load
// ============================================
window.addEventListener('load', () => {
    document.body.classList.add('loaded');

    const loadStyle = document.createElement('style');
    loadStyle.textContent = `
        body {
            opacity: 0;
            transition: opacity 0.5s ease;
        }
        body.loaded {
            opacity: 1;
        }
    `;
    document.head.appendChild(loadStyle);
});
