// Main application functionality
class LuxeStoreApp {
    constructor() {
        this.header = $('#header');
        this.navMenu = $('#nav-menu');
        this.navToggle = $('#nav-toggle');
        this.navLinks = $$('.nav__link');
        this.backToTopBtn = $('#back-to-top');
        this.contactForm = $('#contact-form');
        this.loadingScreen = $('#loading-screen');
        
        this.init();
    }
    
    init() {
        this.initializeApp();
        this.bindEvents();
        this.initScrollEffects();
        this.initPerformanceOptimizations();
        this.initAccessibility();
    }
    
    initializeApp() {
        // Hide loading screen after content is loaded
        window.addEventListener('load', () => {
            setTimeout(() => {
                this.loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    this.loadingScreen.style.display = 'none';
                }, 500);
            }, 1000);
        });
        
        // Initialize performance optimizations
        initPerformanceOptimizations();
        
        // Set active navigation link based on current section
        this.updateActiveNavLink();
    }
    
    bindEvents() {
        // Mobile navigation toggle
        this.navToggle.addEventListener('click', () => {
            this.toggleMobileMenu();
        });
        
        // Navigation links smooth scrolling
        this.navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = $(targetId);
                
                if (targetSection) {
                    this.scrollToSection(targetSection);
                    this.closeMobileMenu();
                }
            });
        });
        
        // Back to top button
        this.backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
        
        // Contact form submission
        this.contactForm.addEventListener('submit', (e) => {
            this.handleContactForm(e);
        });
        
        // Hero CTA buttons
        $('.hero__cta').addEventListener('click', () => {
            const productsSection = $('#products');
            this.scrollToSection(productsSection);
        });
        
        $('.hero__explore').addEventListener('click', () => {
            const categoriesSection = $('#categories');
            this.scrollToSection(categoriesSection);
        });
        
        // Window resize handler
        window.addEventListener('resize', throttle(() => {
            this.handleResize();
        }, 250));
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardNavigation(e);
        });
    }
    
    initScrollEffects() {
        // Header scroll effect
        window.addEventListener('scroll', throttle(() => {
            this.handleScroll();
        }, 16));
        
        // Intersection Observer for animations
        this.initIntersectionObserver();
    }
    
    handleScroll() {
        const scrollY = window.scrollY;
        
        // Header background on scroll
        if (scrollY > 50) {
            this.header.classList.add('scrolled');
        } else {
            this.header.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (scrollY > 500) {
            this.backToTopBtn.classList.add('visible');
        } else {
            this.backToTopBtn.classList.remove('visible');
        }
        
        // Update active navigation link
        this.updateActiveNavLink();
    }
    
    updateActiveNavLink() {
        const sections = $$('section[id]');
        const scrollPosition = window.scrollY + 100;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                this.navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    toggleMobileMenu() {
        this.navMenu.classList.toggle('active');
        this.navToggle.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (this.navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
    
    closeMobileMenu() {
        this.navMenu.classList.remove('active');
        this.navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    scrollToSection(section) {
        const headerHeight = this.header.offsetHeight;
        const sectionTop = section.offsetTop - headerHeight - 20;
        
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
    }
    
    handleContactForm(e) {
        e.preventDefault();
        
        const formData = new FormData(e.target);
        const name = formData.get('name') || e.target.querySelector('input[type="text"]').value;
        const email = formData.get('email') || e.target.querySelector('input[type="email"]').value;
        const message = formData.get('message') || e.target.querySelector('textarea').value;
        
        // Validate form
        if (!name.trim()) {
            showNotification('Please enter your name', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        if (!message.trim()) {
            showNotification('Please enter your message', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('Sending message...', 'info');
        
        setTimeout(() => {
            showNotification('Thank you for your message! We\'ll get back to you soon.', 'success');
            e.target.reset();
        }, 2000);
    }
    
    handleResize() {
        // Close mobile menu on resize to desktop
        if (window.innerWidth > 768) {
            this.closeMobileMenu();
        }
        
        // Recalculate scroll positions
        this.updateActiveNavLink();
    }
    
    handleKeyboardNavigation(e) {
        // Close modals with Escape key
        if (e.key === 'Escape') {
            // Close mobile menu
            if (this.navMenu.classList.contains('active')) {
                this.closeMobileMenu();
            }
        }
        
        // Navigate with arrow keys when focus is on navigation
        if (e.target.closest('.nav__list')) {
            const currentIndex = Array.from(this.navLinks).indexOf(document.activeElement);
            
            if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                const nextIndex = (currentIndex + 1) % this.navLinks.length;
                this.navLinks[nextIndex].focus();
            } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                const prevIndex = currentIndex === 0 ? this.navLinks.length - 1 : currentIndex - 1;
                this.navLinks[prevIndex].focus();
            }
        }
    }
    
    initIntersectionObserver() {
        // Animate elements when they come into view
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    
                    // Add animation class based on element type
                    if (element.classList.contains('hero__content')) {
                        element.classList.add('animate-fade-in-left');
                    } else if (element.classList.contains('hero__image')) {
                        element.classList.add('animate-fade-in-right');
                    } else if (element.classList.contains('category-card')) {
                        element.classList.add('animate-fade-in-up');
                    } else if (element.classList.contains('about__text')) {
                        element.classList.add('animate-fade-in-left');
                    } else if (element.classList.contains('about__image')) {
                        element.classList.add('animate-fade-in-right');
                    } else {
                        element.classList.add('animate-fade-in-up');
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        // Observe elements for animation
        const elementsToAnimate = $$('.hero__content, .hero__image, .category-card, .about__text, .about__image, .contact__form, .contact__info');
        elementsToAnimate.forEach(element => {
            observer.observe(element);
        });
    }
    
    initPerformanceOptimizations() {
        // Preload critical resources
        this.preloadCriticalResources();
        
        // Optimize images
        this.optimizeImages();
        
        // Initialize service worker for caching (if supported)
        this.initServiceWorker();
        
        // Minimize layout thrashing
        this.optimizeAnimations();
    }
    
    preloadCriticalResources() {
        const criticalImages = [
            'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
            'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg'
        ];
        
        criticalImages.forEach(src => {
            const link = createElement('link', {
                rel: 'preload',
                as: 'image',
                href: src
            });
            document.head.appendChild(link);
        });
    }
    
    optimizeImages() {
        const images = $$('img');
        
        images.forEach(img => {
            // Add loading="lazy" for native lazy loading
            if (!img.hasAttribute('loading')) {
                img.setAttribute('loading', 'lazy');
            }
            
            // Add error handling
            img.addEventListener('error', function() {
                this.style.display = 'none';
                console.warn('Failed to load image:', this.src);
            });
        });
    }
    
    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('SW registered: ', registration);
                    })
                    .catch(registrationError => {
                        console.log('SW registration failed: ', registrationError);
                    });
            });
        }
    }
    
    optimizeAnimations() {
        // Use CSS transforms instead of changing layout properties
        // Batch DOM reads and writes
        // Use requestAnimationFrame for smooth animations
        
        const animatedElements = $$('[class*="animate-"]');
        animatedElements.forEach(element => {
            element.style.willChange = 'transform, opacity';
        });
    }
    
    initAccessibility() {
        // Add skip link for keyboard navigation
        this.addSkipLink();
        
        // Improve focus management
        this.improveFocusManagement();
        
        // Add ARIA labels where needed
        this.addAriaLabels();
        
        // Handle reduced motion preferences
        this.handleReducedMotion();
    }
    
    addSkipLink() {
        const skipLink = createElement('a', {
            href: '#main',
            className: 'skip-link',
            innerHTML: 'Skip to main content'
        });
        
        document.body.insertBefore(skipLink, document.body.firstChild);
    }
    
    improveFocusManagement() {
        // Ensure all interactive elements are focusable
        const interactiveElements = $$('button, a, input, textarea, select');
        
        interactiveElements.forEach(element => {
            if (!element.hasAttribute('tabindex') && element.disabled) {
                element.setAttribute('tabindex', '-1');
            }
        });
        
        // Add focus indicators
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Tab') {
                document.body.classList.add('keyboard-navigation');
            }
        });
        
        document.addEventListener('mousedown', () => {
            document.body.classList.remove('keyboard-navigation');
        });
    }
    
    addAriaLabels() {
        // Add ARIA labels to buttons without text
        const iconButtons = $$('button:not([aria-label])');
        
        iconButtons.forEach(button => {
            const icon = button.textContent.trim();
            if (icon === '🔍') {
                button.setAttribute('aria-label', 'Search products');
            } else if (icon === '🛒') {
                button.setAttribute('aria-label', 'View shopping cart');
            } else if (icon === '×') {
                button.setAttribute('aria-label', 'Close');
            }
        });
    }
    
    handleReducedMotion() {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        
        if (prefersReducedMotion.matches) {
            // Disable animations for users who prefer reduced motion
            const style = createElement('style');
            style.textContent = `
                *, *::before, *::after {
                    animation-duration: 0.01ms !important;
                    animation-iteration-count: 1 !important;
                    transition-duration: 0.01ms !important;
                    scroll-behavior: auto !important;
                }
            `;
            document.head.appendChild(style);
        }
    }
}

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const app = new LuxeStoreApp();
    
    // Global error handling
    window.addEventListener('error', (e) => {
        console.error('Global error:', e.error);
        showNotification('Something went wrong. Please refresh the page.', 'error');
    });
    
    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', (e) => {
        console.error('Unhandled promise rejection:', e.reason);
        e.preventDefault();
    });
});

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = LuxeStoreApp;
}