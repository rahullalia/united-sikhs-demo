/* ============================================
   ICHRA Landing Page - App Interactivity
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    initScrollRevel();
    initNavbarScrollSpy();
    initMobileNav();
    init3DCardTilt();
    initVideoPlayer();
    initHeroParallax();
    initLightbox();
});

/* ===== HERO PARALLAX ===== */
function initHeroParallax() {
    const heroSplicer = document.getElementById('heroSplicer');
    if (!heroSplicer) return;

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        if (scrollY > window.innerHeight) return;
        heroSplicer.style.transform = `translateY(${scrollY * 0.25}px)`;
    }, { passive: true });
}

/* ===== SCROLL REVEAL (IntersectionObserver) ===== */
function initScrollRevel() {
    const reveals = document.querySelectorAll('.reveal, .reveal-blur');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
}

/* ===== NAVBAR SCROLL ===== */
function initNavbarScrollSpy() {
    const header = document.getElementById('navHeader');
    if (!header) return;
    window.addEventListener('scroll', () => {
        if (window.scrollY > 80) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

/* ===== MOBILE NAV ===== */
function initMobileNav() {
    const hamburger = document.getElementById('navHamburger');
    const navbar = document.getElementById('navbar');
    if (!hamburger || !navbar) return;

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navbar.classList.toggle('open');
        document.body.style.overflow = navbar.classList.contains('open') ? 'hidden' : '';
    });

    navbar.querySelectorAll('.nav-link, .nav-donate').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('open');
            navbar.classList.remove('open');
            document.body.style.overflow = '';
        });
    });
}

/* ===== 3D CARD TILT ===== */
function init3DCardTilt() {
    const cards = document.querySelectorAll('.bento-card, .thumb-card');
    cards.forEach(card => {
        card.style.transformStyle = 'preserve-3d';
        card.style.willChange = 'transform';

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -3; // Subtle tilt for bento
            const rotateY = ((x - centerX) / centerX) * 3;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transition = 'transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            setTimeout(() => { card.style.transition = ''; }, 500);
        });
    });
}

/* ===== CUSTOM VIDEO PLAYER LOGIC ===== */
function initVideoPlayer() {
    const overlay = document.getElementById('videoOverlay');
    const video = document.getElementById('mainVideo');
    const poster = document.getElementById('videoPoster');

    if (!overlay || !video || !poster) return;

    overlay.addEventListener('click', () => {
        overlay.style.display = 'none';
        poster.style.display = 'none';
        video.style.display = 'block';
        video.play();
    });

    video.addEventListener('pause', () => {
        if (!video.seeking) {
            // Optional: Show overlay again when paused
            // overlay.style.display = 'flex';
        }
    });
}

/* ===== LIGHTBOX MODAL ===== */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    // Select both Our Work photos and Video Archive thumbnails
    const galleryImgs = document.querySelectorAll('.gallery-img, .thumb-card img');

    if (!lightbox || !lightboxImg || !lightboxClose) return;

    galleryImgs.forEach(img => {
        img.style.cursor = 'zoom-in'; // Indicate it can be expanded
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        });
    });

    lightboxClose.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });

    // Close when clicking outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            lightbox.classList.remove('active');
        }
    });
}
