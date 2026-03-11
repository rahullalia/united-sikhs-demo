/* ============================================
   UNITED SIKHS Demo Website
   App JavaScript: All Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  initPageLoadTransition();
  initHeroEntrance();
  initTypewriter();
  initScrollReveal();
  initNavbarScrollSpy();
  initMobileNav();
  initAccordion();
  initNumberTickers();
  initMagicCards();
  initPartnerMarqueeText();
  initHeroCarousel();
  initScrollProgress();
  initEnhancedReveals();
  initMagicCardGradient();
  initHeroParallax();
  init3DCardTilt();
  initTextSplitAnimation();
  initImageClipReveal();
  initSmoothSectionTransitions();
  initShineBorders();
});

/* ===== HERO ENTRANCE ANIMATION ===== */
function initHeroEntrance() {
  const badge = document.querySelector('.hero-badge');
  const h1 = document.querySelector('.hero h1');
  const typewriterLine = document.querySelector('.hero-typewriter-line');
  const desc = document.querySelector('.hero-description');
  const actions = document.querySelector('.hero .hero-actions');
  const heroImage = document.querySelector('.hero-image-wrap');

  const elements = [badge, h1, typewriterLine, desc, actions, heroImage];

  elements.forEach((el, i) => {
    if (!el) return;
    setTimeout(() => {
      el.style.transition = 'opacity 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94), transform 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0) scale(1)';
    }, 300 + i * 150);
  });
}

/* ===== TYPEWRITER EFFECT ===== */
function initTypewriter() {
  const el = document.getElementById('typewriter');
  if (!el) return;

  const texts = [
    'Sikh Aid: Relief Worldwide',
    'Civil Rights & Justice',
    'Education & Empowerment',
    'Disaster Relief & Recovery',
    'Seva for All'
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let displayText = '';

  const speed = 60;
  const deleteSpeed = 35;
  const waitTime = 2200;

  function tick() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      displayText = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      displayText = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    el.textContent = displayText;

    let delay = isDeleting ? deleteSpeed : speed;

    if (!isDeleting && charIndex === currentText.length) {
      delay = waitTime;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      delay = 400;
    }

    setTimeout(tick, delay);
  }

  // Start after hero entrance
  setTimeout(tick, 1200);
}

/* ===== SCROLL REVEAL (IntersectionObserver) ===== */
function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  reveals.forEach(el => observer.observe(el));
}

/* ===== NAVBAR SCROLL-SPY ===== */
function initNavbarScrollSpy() {
  const navHeader = document.getElementById('navHeader');
  const navLinks = document.querySelectorAll('.nav-link[data-section]');
  const sections = [];

  navLinks.forEach(link => {
    const sectionId = link.dataset.section;
    const section = document.getElementById(sectionId);
    if (section) sections.push({ link, section });
  });

  // Scroll handler for navbar background
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scrollY = window.scrollY;

        // Nav header background on scroll
        if (scrollY > 80) {
          navHeader.classList.add('scrolled');
        } else {
          navHeader.classList.remove('scrolled');
        }

        // Active section detection
        let activeSection = null;
        for (const s of sections) {
          const rect = s.section.getBoundingClientRect();
          if (rect.top <= 200) {
            activeSection = s;
          }
        }

        navLinks.forEach(l => l.classList.remove('active'));
        if (activeSection) {
          activeSection.link.classList.add('active');
        }

        ticking = false;
      });
      ticking = true;
    }
  });

  // Smooth scroll on click
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const sectionId = link.dataset.section;
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ===== MOBILE NAV (Hamburger) ===== */
function initMobileNav() {
  const hamburger = document.getElementById('navHamburger');
  const navbar = document.getElementById('navbar');
  if (!hamburger || !navbar) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navbar.classList.toggle('open');
    document.body.style.overflow = navbar.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when a nav link is clicked
  navbar.querySelectorAll('.nav-link, .nav-donate').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navbar.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ===== FAQ ACCORDION ===== */
function initAccordion() {
  const items = document.querySelectorAll('.accordion-item');

  items.forEach(item => {
    const trigger = item.querySelector('.accordion-trigger');
    const content = item.querySelector('.accordion-content');
    const inner = item.querySelector('.accordion-content-inner');

    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all
      items.forEach(other => {
        other.classList.remove('open');
        const otherContent = other.querySelector('.accordion-content');
        otherContent.style.maxHeight = '0';
        other.querySelector('.accordion-trigger').setAttribute('aria-expanded', 'false');
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('open');
        content.style.maxHeight = inner.scrollHeight + 20 + 'px';
        trigger.setAttribute('aria-expanded', 'true');
      }
    });
  });
}

/* ===== NUMBER TICKERS ===== */
function initNumberTickers() {
  const tickers = document.querySelectorAll('.number-ticker');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateTicker(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  tickers.forEach(el => observer.observe(el));
}

function animateTicker(el) {
  const target = parseInt(el.dataset.target, 10);
  const suffix = el.dataset.suffix || '';
  const duration = 2000;
  const start = performance.now();

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutExpo(progress);
    const current = Math.floor(eased * target);

    el.textContent = current.toLocaleString('en-US') + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = target.toLocaleString('en-US') + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* ===== MAGIC CARD HOVER (Mouse Follow) ===== */
function initMagicCards() {
  const cards = document.querySelectorAll('.program-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', x + 'px');
      card.style.setProperty('--mouse-y', y + 'px');
    });
  });
}

/* ===== HERO CAROUSEL ===== */
function initHeroCarousel() {
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (slides.length === 0) return;

  let current = 0;
  let interval;

  function goTo(index) {
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = index;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
  }

  function next() {
    goTo((current + 1) % slides.length);
  }

  function startAutoPlay() {
    interval = setInterval(next, 4000);
  }

  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      clearInterval(interval);
      goTo(parseInt(dot.dataset.slide, 10));
      startAutoPlay();
    });
  });

  startAutoPlay();
}

/* ===== PARTNER MARQUEE: Style text items ===== */
function initPartnerMarqueeText() {
  const items = document.querySelectorAll('.partner-text');
  items.forEach(item => {
    item.style.cssText = `
      flex-shrink: 0;
      padding: 12px 32px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.06);
      border-radius: 9999px;
      font-size: 0.85rem;
      font-weight: 500;
      color: var(--text-muted);
      white-space: nowrap;
      transition: all 0.3s ease;
    `;
    item.addEventListener('mouseenter', () => {
      item.style.borderColor = 'rgba(255, 111, 0, 0.2)';
      item.style.color = 'var(--text-secondary)';
      item.style.background = 'rgba(255, 111, 0, 0.05)';
    });
    item.addEventListener('mouseleave', () => {
      item.style.borderColor = 'rgba(255,255,255,0.06)';
      item.style.color = 'var(--text-muted)';
      item.style.background = 'rgba(255,255,255,0.03)';
    });
  });
}

/* ===== SCROLL PROGRESS BAR (inspired by timeline.jsx) ===== */
function initScrollProgress() {
  // Create progress bar element
  const bar = document.createElement('div');
  bar.className = 'scroll-progress';
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    bar.style.width = progress + '%';
  }, { passive: true });
}

/* ===== ENHANCED SCROLL REVEALS (inspired by textAnimate.tsx) ===== */
function initEnhancedReveals() {
  const elements = document.querySelectorAll('.reveal-blur, .reveal-scale, .reveal-left, .reveal-right, .counter-reveal');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(el => observer.observe(el));
}

/* ===== MAGIC CARD MOUSE GRADIENT (adapted from magicCard.tsx) ===== */
function initMagicCardGradient() {
  const cards = document.querySelectorAll('.magic-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mouse-x', (e.clientX - rect.left) + 'px');
      card.style.setProperty('--mouse-y', (e.clientY - rect.top) + 'px');
    });
  });
}

/* ===== HERO PARALLAX ===== */
function initHeroParallax() {
  const heroImage = document.querySelector('.hero-image-wrap');
  const heroText = document.querySelector('.hero-text');
  if (!heroImage) return;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > window.innerHeight) return;
    const rate = scrollY * 0.15;
    heroImage.style.transform = `translateY(${rate}px) scale(${1 - scrollY * 0.0002})`;
    if (heroText) {
      heroText.style.transform = `translateY(${scrollY * 0.08}px)`;
      heroText.style.opacity = Math.max(0, 1 - scrollY * 0.0015);
    }
  }, { passive: true });
}

/* ===== PAGE LOAD TRANSITION ===== */
function initPageLoadTransition() {
  const curtain = document.createElement('div');
  curtain.style.cssText = `
    position: fixed; inset: 0; z-index: 99999;
    background: linear-gradient(135deg, #FFF8F0, #FFFFFF);
    display: flex; align-items: center; justify-content: center;
    transition: opacity 0.6s ease, transform 0.6s ease;
  `;
  const logoEl = document.createElement('img');
  logoEl.src = 'images/logo-lockup.png';
  logoEl.style.cssText = `
    height: 48px; opacity: 0; transform: scale(0.8);
    transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
  `;
  curtain.appendChild(logoEl);
  document.body.prepend(curtain);

  requestAnimationFrame(() => {
    logoEl.style.opacity = '1';
    logoEl.style.transform = 'scale(1)';
  });

  setTimeout(() => {
    curtain.style.opacity = '0';
    curtain.style.transform = 'scale(1.05)';
    setTimeout(() => curtain.remove(), 600);
  }, 800);
}

/* ===== 3D CARD TILT (adapted from magicCard.tsx perspective) ===== */
function init3DCardTilt() {
  const cards = document.querySelectorAll('.vertical-card, .article-card, .testimonial-card');
  cards.forEach(card => {
    card.style.transformStyle = 'preserve-3d';
    card.style.willChange = 'transform';

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;
      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0) translateY(0) scale(1)';
      setTimeout(() => { card.style.transition = ''; }, 500);
    });
  });
}

/* ===== TEXT SPLIT ANIMATION (inspired by textAnimate.tsx) ===== */
function initTextSplitAnimation() {
  const headings = document.querySelectorAll('.section-title');
  headings.forEach(heading => {
    if (heading.closest('.hero')) return; // Skip hero titles
    const text = heading.innerHTML;
    // Don't re-split if already processed
    if (heading.dataset.split === 'true') return;
    heading.dataset.split = 'true';

    // Split words (keep HTML tags like <br>)
    const words = text.split(/\s+/);
    heading.innerHTML = words.map((word, i) => {
      if (word.includes('<br') || word.includes('/>')) return word;
      return `<span class="split-word" style="display:inline-block;opacity:0;transform:translateY(20px) rotateX(40deg);transition:all 0.5s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.06}s;">${word}</span>`;
    }).join(' ');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const words = entry.target.querySelectorAll('.split-word');
          words.forEach(w => {
            w.style.opacity = '1';
            w.style.transform = 'translateY(0) rotateX(0)';
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    observer.observe(heading);
  });
}

/* ===== IMAGE CLIP-PATH REVEAL (disabled - caused visibility issues) ===== */
function initImageClipReveal() {
  // Intentionally empty — clip-path was hiding images
}

/* ===== SMOOTH SECTION SCROLL TRANSITIONS ===== */
function initSmoothSectionTransitions() {
  const sections = document.querySelectorAll('.section');
  sections.forEach(section => {
    section.style.transition = 'opacity 0.3s ease';
  });

  // Add scroll-linked opacity for sections further from viewport center
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      const vh = window.innerHeight;
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const sectionCenter = rect.top + rect.height / 2;
        const distFromCenter = Math.abs(sectionCenter - vh / 2);
        const maxDist = vh;
        const opacity = Math.max(0.7, 1 - (distFromCenter / maxDist) * 0.3);
        section.style.opacity = opacity;
      });
      ticking = false;
    });
  }, { passive: true });
}

/* ===== CUSTOM CURSOR ===== */
function initCustomCursor() {
  // Only on non-touch devices
  if ('ontouchstart' in window) return;

  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed; width: 20px; height: 20px;
    border: 2px solid rgba(230, 81, 0, 0.4);
    border-radius: 50%; pointer-events: none;
    z-index: 99998; transition: transform 0.15s ease, width 0.2s, height 0.2s, border-color 0.2s;
    transform: translate(-50%, -50%);
    mix-blend-mode: difference;
  `;
  document.body.appendChild(cursor);

  const dot = document.createElement('div');
  dot.style.cssText = `
    position: fixed; width: 6px; height: 6px;
    background: var(--saffron); border-radius: 50%;
    pointer-events: none; z-index: 99998;
    transform: translate(-50%, -50%);
    transition: transform 0.08s ease;
  `;
  document.body.appendChild(dot);

  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    dot.style.left = e.clientX + 'px';
    dot.style.top = e.clientY + 'px';
  });

  // Enlarge on interactive elements
  document.querySelectorAll('a, button, .vertical-card, .article-card, .carousel-dot').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.width = '40px';
      cursor.style.height = '40px';
      cursor.style.borderColor = 'rgba(230, 81, 0, 0.6)';
      dot.style.transform = 'translate(-50%, -50%) scale(1.5)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.width = '20px';
      cursor.style.height = '20px';
      cursor.style.borderColor = 'rgba(230, 81, 0, 0.4)';
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
    });
  });

  // Hide default cursor on body
  document.body.style.cursor = 'none';
  document.querySelectorAll('a, button').forEach(el => { el.style.cursor = 'none'; });
}

/* ===== SHINE BORDER ANIMATION (adapted from shineBorder.tsx) ===== */
function initShineBorders() {
  const cards = document.querySelectorAll('.stat-card');
  cards.forEach(card => {
    card.style.position = 'relative';
    card.style.overflow = 'hidden';

    const shine = document.createElement('div');
    shine.style.cssText = `
      position: absolute; top: -50%; left: -50%;
      width: 200%; height: 200%;
      background: conic-gradient(from 0deg, transparent 0deg, rgba(230, 81, 0, 0.15) 60deg, transparent 120deg);
      animation: shineSpin 3s linear infinite;
      pointer-events: none;
    `;
    card.prepend(shine);

    // Add inner bg to mask the shine
    const inner = document.createElement('div');
    inner.style.cssText = `
      position: absolute; inset: 2px;
      background: var(--navy);
      border-radius: inherit;
      z-index: 1;
    `;
    card.prepend(inner);

    // Move content above mask
    Array.from(card.children).forEach(child => {
      if (child !== shine && child !== inner) {
        child.style.position = 'relative';
        child.style.zIndex = '2';
      }
    });
  });

  // Add the keyframe if not already added
  if (!document.getElementById('shine-keyframe')) {
    const style = document.createElement('style');
    style.id = 'shine-keyframe';
    style.textContent = `@keyframes shineSpin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
  }
}
