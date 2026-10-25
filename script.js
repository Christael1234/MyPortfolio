const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

function setMenu(open) {
   hamburger.classList.toggle('active', open);
   navMenu.classList.toggle('active', open);
   hamburger.setAttribute('aria-expanded', open);
   hamburger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

hamburger.addEventListener('click', () => {
   setMenu(!navMenu.classList.contains('active'));
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
   link.addEventListener('click', () => setMenu(false));
});

// Navbar shadow on scroll
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
   nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// Highlight the nav link for the section in view
const navLinks = document.querySelectorAll('.nav-menu .nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
         });
      }
   });
}, { rootMargin: '-45% 0px -50% 0px' });

document.querySelectorAll('main section[id]').forEach(section => sectionObserver.observe(section));

// Scroll reveal, staggered within each grid
const revealObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.classList.add('in');
         revealObserver.unobserve(entry.target);
      }
   });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.bento').forEach(grid => {
   grid.querySelectorAll('.reveal').forEach((el, index) => {
      el.style.setProperty('--delay', `${Math.min(index * 0.08, 0.4)}s`);
   });
});

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Cursor-following glow on tiles
if (!prefersReducedMotion && window.matchMedia('(hover: hover)').matches) {
   document.querySelectorAll('.tile').forEach(tile => {
      tile.addEventListener('pointermove', (e) => {
         const rect = tile.getBoundingClientRect();
         tile.style.setProperty('--mx', `${e.clientX - rect.left}px`);
         tile.style.setProperty('--my', `${e.clientY - rect.top}px`);
      });
   });
}

// Number counter animation for stats
function animateCounter(element, target, duration = 1600) {
   if (prefersReducedMotion) {
      element.textContent = target;
      return;
   }

   const start = performance.now();

   function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(tick);
   }

   requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         animateCounter(entry.target, parseInt(entry.target.dataset.count, 10));
         statsObserver.unobserve(entry.target);
      }
   });
}, { threshold: 0.6 });

document.querySelectorAll('.stat-num').forEach(stat => statsObserver.observe(stat));

// Live local time in Abuja
const localTime = document.querySelector('.local-time');
if (localTime) {
   const timeFormat = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'Africa/Lagos'
   });
   const updateTime = () => {
      localTime.textContent = `${timeFormat.format(new Date())} WAT`;
   };
   updateTime();
   setInterval(updateTime, 30000);
}

// Footer year
const year = document.querySelector('.year');
if (year) year.textContent = new Date().getFullYear();

// Copy email to clipboard
const emailCopy = document.querySelector('.email-copy');
if (emailCopy) {
   emailCopy.addEventListener('click', async () => {
      const email = emailCopy.dataset.email;
      try {
         await navigator.clipboard.writeText(email);
         emailCopy.classList.add('copied');
         emailCopy.querySelector('i').className = 'fas fa-check';
         showNotification('Email copied to clipboard', 'success');
         setTimeout(() => {
            emailCopy.classList.remove('copied');
            emailCopy.querySelector('i').className = 'far fa-copy';
         }, 2000);
      } catch {
         window.location.href = `mailto:${email}`;
      }
   });
}

// Contact form handling with Formspree
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
   contactForm.addEventListener('submit', async function (e) {
      e.preventDefault();

      const formData = new FormData(this);
      const email = formData.get('email');

      if (!isValidEmail(email)) {
         showNotification('Please enter a valid email address', 'error');
         return;
      }

      const submitBtn = this.querySelector('button[type="submit"]');
      const label = submitBtn.querySelector('span');
      const originalText = label.textContent;
      label.textContent = 'Sending...';
      submitBtn.disabled = true;

      try {
         const response = await fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: { Accept: 'application/json' }
         });

         if (!response.ok) throw new Error('Request failed');

         showNotification('Message sent! I\'ll get back to you soon.', 'success');
         this.reset();
      } catch {
         showNotification('Something went wrong. Please email me directly instead.', 'error');
      } finally {
         label.textContent = originalText;
         submitBtn.disabled = false;
      }
   });
}

// Email validation function
function isValidEmail(email) {
   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
   document.querySelector('.notification')?.remove();

   const notification = document.createElement('div');
   notification.className = `notification notification-${type}`;
   notification.setAttribute('role', 'status');

   const text = document.createElement('span');
   text.textContent = message;

   const closeBtn = document.createElement('button');
   closeBtn.className = 'notification-close';
   closeBtn.setAttribute('aria-label', 'Dismiss');
   closeBtn.innerHTML = '&times;';

   notification.append(text, closeBtn);
   document.body.appendChild(notification);
   requestAnimationFrame(() => notification.classList.add('show'));

   const dismiss = () => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 500);
   };

   closeBtn.addEventListener('click', dismiss);
   setTimeout(dismiss, 5000);
}
