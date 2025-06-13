// Utility functions for the e-commerce website

// DOM utility functions
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Create element with attributes and content
const createElement = (tag, attributes = {}, content = '') => {
    const element = document.createElement(tag);
    
    Object.entries(attributes).forEach(([key, value]) => {
        if (key === 'className') {
            element.className = value;
        } else if (key === 'innerHTML') {
            element.innerHTML = value;
        } else {
            element.setAttribute(key, value);
        }
    });
    
    if (content) {
        element.textContent = content;
    }
    
    return element;
};

// Format currency
const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
};

// Format rating stars
const formatRating = (rating, maxRating = 5) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    const emptyStars = maxRating - fullStars - (hasHalfStar ? 1 : 0);
    
    let starsHTML = '';
    
    // Full stars
    for (let i = 0; i < fullStars; i++) {
        starsHTML += '<span class="product-card__star">★</span>';
    }
    
    // Half star
    if (hasHalfStar) {
        starsHTML += '<span class="product-card__star">☆</span>';
    }
    
    // Empty stars
    for (let i = 0; i < emptyStars; i++) {
        starsHTML += '<span class="product-card__star product-card__star--empty">☆</span>';
    }
    
    return starsHTML;
};

// Debounce function for search and scroll events
const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

// Throttle function for scroll events
const throttle = (func, limit) => {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
};

// Local storage utilities
const storage = {
    get: (key) => {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : null;
        } catch (error) {
            console.error('Error getting from localStorage:', error);
            return null;
        }
    },
    
    set: (key, value) => {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error('Error setting to localStorage:', error);
            return false;
        }
    },
    
    remove: (key) => {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error('Error removing from localStorage:', error);
            return false;
        }
    }
};

// Animation utilities
const animateElement = (element, animationClass, duration = 600) => {
    return new Promise((resolve) => {
        element.classList.add(animationClass);
        
        setTimeout(() => {
            element.classList.remove(animationClass);
            resolve();
        }, duration);
    });
};

// Smooth scroll to element
const scrollToElement = (element, offset = 0) => {
    const elementPosition = element.offsetTop - offset;
    
    window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
    });
};

// Check if element is in viewport
const isInViewport = (element) => {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};

// Lazy loading for images
const lazyLoadImages = () => {
    const images = $$('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
};

// Generate unique ID
const generateId = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
};

// Validate email
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Show notification
const showNotification = (message, type = 'success', duration = 3000) => {
    const notification = createElement('div', {
        className: `notification notification--${type}`
    });
    
    const iconMap = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    
    notification.innerHTML = `
        <div class="notification__content">
            <div class="notification__icon">${iconMap[type] || iconMap.info}</div>
            <div class="notification__text">
                <div class="notification__message">${message}</div>
            </div>
            <button class="notification__close">×</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Show notification
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto hide
    const hideTimeout = setTimeout(() => {
        hideNotification(notification);
    }, duration);
    
    // Manual close
    notification.querySelector('.notification__close').addEventListener('click', () => {
        clearTimeout(hideTimeout);
        hideNotification(notification);
    });
};

const hideNotification = (notification) => {
    notification.classList.remove('show');
    setTimeout(() => {
        if (notification.parentNode) {
            notification.parentNode.removeChild(notification);
        }
    }, 300);
};

// Performance optimization utilities
const optimizeImages = () => {
    const images = $$('img');
    
    images.forEach(img => {
        // Add loading="lazy" for native lazy loading
        if (!img.hasAttribute('loading')) {
            img.setAttribute('loading', 'lazy');
        }
        
        // Add error handling
        img.addEventListener('error', function() {
            this.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=';
        });
    });
};

// Preload critical resources
const preloadCriticalResources = () => {
    const criticalImages = [
        'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg',
        'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg',
        'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg'
    ];
    
    criticalImages.forEach(src => {
        const link = createElement('link', {
            rel: 'preload',
            as: 'image',
            href: src
        });
        document.head.appendChild(link);
    });
};

// Initialize performance optimizations
const initPerformanceOptimizations = () => {
    // Optimize images
    optimizeImages();
    
    // Preload critical resources
    preloadCriticalResources();
    
    // Initialize lazy loading
    if ('IntersectionObserver' in window) {
        lazyLoadImages();
    }
    
    // Minimize reflows and repaints
    document.addEventListener('DOMContentLoaded', () => {
        // Batch DOM operations
        const fragment = document.createDocumentFragment();
        // Use fragment for multiple DOM insertions
    });
};

// Export utilities
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        $,
        $$,
        createElement,
        formatCurrency,
        formatRating,
        debounce,
        throttle,
        storage,
        animateElement,
        scrollToElement,
        isInViewport,
        lazyLoadImages,
        generateId,
        isValidEmail,
        showNotification,
        hideNotification,
        optimizeImages,
        preloadCriticalResources,
        initPerformanceOptimizations
    };
}