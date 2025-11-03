// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
   hamburger.classList.toggle('active');
   navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
   hamburger.classList.remove('active');
   navMenu.classList.remove('active');
}));

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

// Navbar background change on scroll
window.addEventListener('scroll', () => {
   const navbar = document.querySelector('.navbar');
   if (window.scrollY > 100) {
      navbar.style.background = 'rgba(255, 255, 255, 0.98)';
      navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
   } else {
      navbar.style.background = 'rgba(255, 255, 255, 0.95)';
      navbar.style.boxShadow = 'none';
   }
});

// Contact form handling with Formspree
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
   contactForm.addEventListener('submit', function (e) {
      // Get form data
      const formData = new FormData(this);
      const name = formData.get('name');
      const email = formData.get('email');
      const subject = formData.get('subject');
      const message = formData.get('message');

      // Simple validation
      if (!name || !email || !subject || !message) {
         e.preventDefault();
         showNotification('Please fill in all fields', 'error');
         return;
      }

      if (!isValidEmail(email)) {
         e.preventDefault();
         showNotification('Please enter a valid email address', 'error');
         return;
      }

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;

      // Formspree will handle the submission
      // We'll show success message after form submission
      setTimeout(() => {
         showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
         this.reset();
         submitBtn.textContent = originalText;
         submitBtn.disabled = false;
      }, 1000);
   });
}

// Email validation function
function isValidEmail(email) {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
   // Remove existing notifications
   const existingNotification = document.querySelector('.notification');
   if (existingNotification) {
      existingNotification.remove();
   }

   // Create notification element
   const notification = document.createElement('div');
   notification.className = `notification notification-${type}`;
   notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-message">${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

   // Add styles
   notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
    `;

   // Add to page
   document.body.appendChild(notification);

   // Animate in
   setTimeout(() => {
      notification.style.transform = 'translateX(0)';
   }, 100);

   // Close button functionality
   const closeBtn = notification.querySelector('.notification-close');
   closeBtn.addEventListener('click', () => {
      notification.style.transform = 'translateX(100%)';
      setTimeout(() => notification.remove(), 300);
   });

   // Auto remove after 5 seconds
   setTimeout(() => {
      if (notification.parentNode) {
         notification.style.transform = 'translateX(100%)';
         setTimeout(() => notification.remove(), 300);
      }
   }, 5000);
}

// Enhanced Intersection Observer for scroll animations
const observerOptions = {
   threshold: 0.15,
   rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.classList.add('animate');
         observer.unobserve(entry.target);
      }
   });
}, observerOptions);

// Initialize scroll animations on page load
document.addEventListener('DOMContentLoaded', () => {
   // Add animation classes to elements
   const projectCards = document.querySelectorAll('.project-card');
   projectCards.forEach((card, index) => {
      card.classList.add('fade-in-up');
      card.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(card);
   });

   const skillItems = document.querySelectorAll('.skill-item');
   skillItems.forEach((item, index) => {
      item.classList.add('fade-in-scale');
      item.style.transitionDelay = `${index * 0.05}s`;
      observer.observe(item);
   });

   const certificationCards = document.querySelectorAll('.certification-card');
   certificationCards.forEach((card, index) => {
      card.classList.add('fade-in-up');
      card.style.transitionDelay = `${index * 0.15}s`;
      observer.observe(card);
   });

   const stats = document.querySelectorAll('.stat');
   stats.forEach((stat, index) => {
      stat.classList.add('fade-in-scale');
      stat.style.transitionDelay = `${index * 0.1}s`;
      observer.observe(stat);
   });

   // Animate section titles
   const sectionTitles = document.querySelectorAll('.section-title');
   sectionTitles.forEach(title => {
      title.classList.add('fade-in-down');
      observer.observe(title);
   });

   // Animate hero content
   const heroContent = document.querySelector('.hero-content');
   if (heroContent) {
      heroContent.classList.add('fade-in-left');
      setTimeout(() => heroContent.classList.add('animate'), 100);
   }

   const heroImage = document.querySelector('.hero-image');
   if (heroImage) {
      heroImage.classList.add('fade-in-right');
      setTimeout(() => heroImage.classList.add('animate'), 200);
   }
});

// Number counter animation for stats
function animateCounter(element, target, hasPlus = false, duration = 2000) {
   const start = 0;
   const increment = target / (duration / 16);
   let current = start;

   const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
         element.textContent = target + (hasPlus ? '+' : '');
         clearInterval(timer);
      } else {
         element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
      }
   }, 16);
}

// Observe stats for counter animation
const statsObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         const statNumber = entry.target.querySelector('h3');
         if (statNumber && !statNumber.classList.contains('counted')) {
            statNumber.classList.add('counted');
            const originalText = statNumber.textContent;
            const hasPlus = originalText.includes('+');
            const target = parseInt(originalText);
            if (!isNaN(target)) {
               animateCounter(statNumber, target, hasPlus);
            }
         }
         statsObserver.unobserve(entry.target);
      }
   });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
   statsObserver.observe(stat);
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

// Initialize typing effect when page loads
window.addEventListener('load', () => {
   const heroTitle = document.querySelector('.hero-title');
   if (heroTitle) {
      const originalText = heroTitle.textContent;
      typeWriter(heroTitle, originalText, 50);
   }
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
   const scrolled = window.pageYOffset;
   const hero = document.querySelector('.hero');
   if (hero) {
      const rate = scrolled * -0.5;
      hero.style.transform = `translateY(${rate}px)`;
   }
});

// Add loading animation
window.addEventListener('load', () => {
   document.body.classList.add('loaded');
});

// Add CSS for loading state
const loadingStyles = document.createElement('style');
loadingStyles.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 50px;
        height: 50px;
        border: 3px solid rgba(255, 255, 255, 0.3);
        border-top: 3px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(loadingStyles);

// Add hover effects for project cards
document.querySelectorAll('.project-card').forEach(card => {
   card.addEventListener('mouseenter', function () {
      this.style.transform = 'translateY(-10px) scale(1.02)';
   });

   card.addEventListener('mouseleave', function () {
      this.style.transform = 'translateY(0) scale(1)';
   });
});

// Add click effects for buttons
document.querySelectorAll('.btn').forEach(button => {
   button.addEventListener('click', function (e) {
      // Create ripple effect
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255, 255, 255, 0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
   });
});

// Add ripple animation
const rippleStyles = document.createElement('style');
rippleStyles.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyles); 