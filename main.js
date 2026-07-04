/* ============================================
   SHREE GAJANAN CONSTRUCTION — main.js
   ============================================ */

/* -----------------------------------------------
   1. STICKY HEADER — adds shadow on scroll
----------------------------------------------- */
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* -----------------------------------------------
   2. MOBILE MENU — hamburger open/close
----------------------------------------------- */
const hamburger = document.querySelector('.header__hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileOverlay = document.querySelector('.mobile-menu-overlay');
const mobileClose = document.querySelector('.mobile-menu__close');

function openMenu() {
  mobileMenu.classList.add('open');
  mobileOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  mobileMenu.classList.remove('open');
  mobileOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger) hamburger.addEventListener('click', openMenu);
if (mobileClose) mobileClose.addEventListener('click', closeMenu);
if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

/* -----------------------------------------------
   3. SCROLL REVEAL — fade in sections on scroll
----------------------------------------------- */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* -----------------------------------------------
   4. PORTFOLIO FILTER — show/hide by category
----------------------------------------------- */
const filterButtons = document.querySelectorAll('.filter-btn');
const portfolioItems = document.querySelectorAll('.portfolio-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {

    // Mark clicked button as active
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portfolioItems.forEach(item => {
      if (filter === 'all' || item.dataset.category === filter) {
        item.removeAttribute('data-hidden');
      } else {
        item.setAttribute('data-hidden', 'true');
      }
    });
  });
});

/* -----------------------------------------------
   5. CONTACT FORM — friendly confirmation message
   (no backend yet — plug in your email service here later)
----------------------------------------------- */
const contactForm = document.querySelector('.contact-form');
const formStatus = document.querySelector('.form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('[name="name"]').value.trim();
    const email = contactForm.querySelector('[name="email"]').value.trim();
    const message = contactForm.querySelector('[name="message"]').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = 'Please fill in your name, email, and message before sending.';
      formStatus.className = 'form-status error';
      return;
    }

    // ↓ PLUG IN YOUR EMAIL SERVICE HERE LATER (e.g. Formspree, EmailJS)
    formStatus.textContent = 'Thank you, ' + name + '! We have received your message and will be in touch shortly.';
    formStatus.className = 'form-status success';
    contactForm.reset();
  });
}

/* -----------------------------------------------
   6. ACTIVE NAV LINK — highlights current page
----------------------------------------------- */
const navLinks = document.querySelectorAll('.header__nav-links a');
const currentPage = window.location.pathname.split('/').pop() || 'index.html';

navLinks.forEach(link => {
  const linkPage = link.getAttribute('href');
  if (linkPage === currentPage) {
    link.classList.add('active');
  }
});