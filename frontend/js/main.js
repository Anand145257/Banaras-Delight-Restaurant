// ═══════════════════════════════════════════════════════════
// Banaras Delight — Main JavaScript
// ═══════════════════════════════════════════════════════════

const API_BASE = 'http://localhost:5000/api/v1';

// ── Loader ──────────────────────────────────────────────────
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = '0';
      setTimeout(() => {
        loader.style.display = 'none';
        initAnimations();
      }, 600);
    }, 800);
  } else {
    initAnimations();
  }
});

// ── GSAP Animations ─────────────────────────────────────────
function initAnimations() {
  if (typeof gsap === 'undefined') return;

  // Hero animations
  const heroTitle = document.getElementById('hero-title');
  const heroSubtitle = document.getElementById('hero-subtitle');
  const heroCta = document.getElementById('hero-cta');

  if (heroTitle) {
    gsap.to(heroTitle, { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' });
  }
  if (heroSubtitle) {
    gsap.to(heroSubtitle, { opacity: 1, y: 0, duration: 1.2, delay: 0.3, ease: 'power3.out' });
  }
  if (heroCta) {
    gsap.to(heroCta, { opacity: 1, y: 0, duration: 1, delay: 0.6, ease: 'power2.out' });
  }

  // ScrollTrigger animations for sections
  if (typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Animate elements with data-animate attribute
    document.querySelectorAll('[data-animate]').forEach((el, i) => {
      const animType = el.getAttribute('data-animate');
      const delay = parseFloat(el.getAttribute('data-delay') || 0);

      let fromVars = { opacity: 0 };
      if (animType === 'fade-up') fromVars.y = 40;
      if (animType === 'fade-down') fromVars.y = -40;
      if (animType === 'fade-left') fromVars.x = -40;
      if (animType === 'fade-right') fromVars.x = 40;
      if (animType === 'zoom-in') fromVars.scale = 0.9;

      gsap.from(el, {
        ...fromVars,
        duration: 0.8,
        delay: delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        }
      });
    });
  }

  // Animated counters
  document.querySelectorAll('[data-counter]').forEach(el => {
    const target = parseInt(el.getAttribute('data-counter'));
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';

    if (typeof ScrollTrigger !== 'undefined') {
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        onEnter: () => animateCounter(el, target, prefix, suffix),
        once: true,
      });
    } else {
      animateCounter(el, target, prefix, suffix);
    }
  });
}

function animateCounter(el, target, prefix, suffix) {
  let current = 0;
  const step = Math.ceil(target / 60);
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = prefix + current.toLocaleString() + suffix;
  }, 30);
}

// ── Navbar Scroll Effect ────────────────────────────────────
const navbar = document.getElementById('navbar');
if (navbar) {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('shadow-2xl', 'py-2', 'bg-black/90');
      navbar.classList.remove('py-3', 'bg-dark-bg/60');
    } else {
      navbar.classList.add('py-3', 'bg-dark-bg/60');
      navbar.classList.remove('shadow-2xl', 'py-2', 'bg-black/90');
    }
  });
}

// ── Mobile Menu Toggle ──────────────────────────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileMenuClose = document.getElementById('mobile-menu-close');

function openMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.remove('translate-x-full');
    mobileMenu.classList.add('translate-x-0');
    document.body.style.overflow = 'hidden';
  }
}

function closeMobileMenu() {
  if (mobileMenu) {
    mobileMenu.classList.add('translate-x-full');
    mobileMenu.classList.remove('translate-x-0');
    document.body.style.overflow = '';
  }
}

if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', openMobileMenu);
}
if (mobileMenuClose) {
  mobileMenuClose.addEventListener('click', closeMobileMenu);
}

// Close mobile menu when clicking a link
if (mobileMenu) {
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });
}

// ── Active Nav Link ─────────────────────────────────────────
const currentPage = window.location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('nav a, #mobile-menu a').forEach(link => {
  const href = link.getAttribute('href');
  if (href === currentPage) {
    link.classList.add('text-gold');
    link.classList.remove('text-gray-300', 'text-gray-200');
  }
});

// ── Cart Count Update ───────────────────────────────────────
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('tgw_cart')) || [];
  document.querySelectorAll('#cart-count, .cart-count').forEach(el => {
    const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
    el.textContent = totalItems;
    if (totalItems > 0) {
      el.classList.remove('hidden');
    }
  });
}

// Initialize cart count on every page
updateCartCount();

// ── Global Image Error Handler ──────────────────────────────
document.addEventListener('error', (e) => {
  if (e.target.tagName === 'IMG') {
    e.target.src = 'https://placehold.co/600x400/1a1a1a/e9b824?text=Image+Unavailable';
    e.target.classList.add('opacity-60');
  }
}, true);

// ── Smooth Scroll ───────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
