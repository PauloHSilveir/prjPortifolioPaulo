/**
 * Portfolio Script
 * Enhanced interactivity and user experience
 */

// ===================================
// DOM Ready
// ===================================
document.addEventListener('DOMContentLoaded', function() {
  initThemeToggle();
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initNavbarScroll();
  initFormValidation();
});

// ===================================
// THEME TOGGLE
// ===================================
function initThemeToggle() {
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  if (!themeToggle) return;

  // Check for saved theme preference or default to system preference
  const isDark = localStorage.getItem('theme') === 'dark' || 
                 (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  
  if (isDark) {
    html.classList.add('dark');
  } else {
    html.classList.remove('dark');
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    html.classList.toggle('dark');
    localStorage.setItem('theme', html.classList.contains('dark') ? 'dark' : 'light');
  });

  // Listen for system preference changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      if (e.matches) {
        html.classList.add('dark');
      } else {
        html.classList.remove('dark');
      }
    }
  });
}

// ===================================
// MOBILE MENU
// ===================================
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (!mobileMenuBtn || !mobileMenu) return;

  // Toggle menu
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    mobileMenu.classList.toggle('hidden');
    updateMenuIcon();
  });

  // Close menu when link is clicked
  const mobileLinks = mobileMenu.querySelectorAll('a');
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
      updateMenuIcon();
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      mobileMenu.classList.add('hidden');
      updateMenuIcon();
    }
  });
}

function updateMenuIcon() {
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const icon = mobileMenuBtn.querySelector('i');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenu.classList.contains('hidden')) {
    icon.classList.remove('fa-times');
    icon.classList.add('fa-bars');
  } else {
    icon.classList.remove('fa-bars');
    icon.classList.add('fa-times');
  }
}

// ===================================
// SMOOTH SCROLL
// ===================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ===================================
// SCROLL ANIMATIONS
// ===================================
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add animation class
        entry.target.classList.add('animate-fade-in');
        
        // Optional: add delay for child elements
        const children = entry.target.querySelectorAll('[data-animate]');
        children.forEach((child, index) => {
          setTimeout(() => {
            child.classList.add('animate-slide-up');
          }, index * 100);
        });
        
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe all sections
  document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
  });
}

// ===================================
// NAVBAR SCROLL EFFECT
// ===================================
function initNavbarScroll() {
  const navbar = document.querySelector('nav');
  if (!navbar) return;

  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    if (scrollTop > 100) {
      navbar.classList.add('shadow-md');
    } else {
      navbar.classList.remove('shadow-md');
    }

    lastScrollTop = scrollTop;
  });
}

// ===================================
// FORM VALIDATION
// ===================================
function initFormValidation() {
  // Email validation utility
  window.validateEmail = function(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  // Phone validation utility
  window.validatePhone = function(phone) {
    const re = /^[\d\s\-\(\)\+]+$/;
    return re.test(phone) && phone.replace(/\D/g, '').length >= 10;
  };
}

// ===================================
// UTILITY FUNCTIONS
// ===================================

// Get element or multiple elements
function $(selector) {
  const elements = document.querySelectorAll(selector);
  return elements.length === 1 ? elements[0] : elements;
}

// Add class
function addClass(element, className) {
  if (element && element.classList) {
    element.classList.add(className);
  }
}

// Remove class
function removeClass(element, className) {
  if (element && element.classList) {
    element.classList.remove(className);
  }
}

// Toggle class
function toggleClass(element, className) {
  if (element && element.classList) {
    element.classList.toggle(className);
  }
}

// Has class
function hasClass(element, className) {
  if (element && element.classList) {
    return element.classList.contains(className);
  }
  return false;
}

// ===================================
// PERFORMANCE UTILITIES
// ===================================

// Debounce function
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Throttle function
function throttle(func, limit) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// ===================================
// ACCESSIBILITY ENHANCEMENTS
// ===================================

// Add keyboard support for custom buttons
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      updateMenuIcon();
    }
  }
});

// Skip to main content link
function addSkipLink() {
  const skipLink = document.createElement('a');
  skipLink.href = '#main';
  skipLink.className = 'sr-only focus:not-sr-only';
  skipLink.textContent = 'Skip to main content';
  document.body.insertBefore(skipLink, document.body.firstChild);
}

// Enhanced console logging (dev only)
if (process?.env?.NODE_ENV === 'development') {
  console.log('%cPortfolio Loaded ✨', 'color: #0066cc; font-size: 16px; font-weight: bold;');
}

// Export functions for external use
window.portfolioUtils = {
  $,
  addClass,
  removeClass,
  toggleClass,
  hasClass,
  debounce,
  throttle,
  validateEmail: window.validateEmail,
  validatePhone: window.validatePhone
};
