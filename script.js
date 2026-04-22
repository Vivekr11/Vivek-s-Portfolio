// ── Preloader ──────────────────────────────────────────
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
        // trigger hero animations after preloader
        document.querySelectorAll('.hero .reveal-fade, .hero .reveal-up, .hero .reveal-left, .hero .reveal-right, .hero .reveal-scale').forEach((el, i) => {
            setTimeout(() => el.classList.add('in'), i * 120);
        });
    }, 1300);
});

// ── Custom Cursor ───────────────────────────────────────
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');
if (cursor && follower) {
    let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;
    document.addEventListener('mousemove', e => {
        mouseX = e.clientX; mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top = mouseY + 'px';
    });
    function animateFollower() {
        followerX += (mouseX - followerX) * 0.12;
        followerY += (mouseY - followerY) * 0.12;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';
        requestAnimationFrame(animateFollower);
    }
    animateFollower();
    document.querySelectorAll('a, button, .tag, .edu-card, .contact-card, .skill-block').forEach(el => {
        el.addEventListener('mouseenter', () => follower.classList.add('hovering'));
        el.addEventListener('mouseleave', () => follower.classList.remove('hovering'));
    });
}

// ── Navbar scroll effect ────────────────────────────────
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 30);
    updateActiveNav();
});

// ── Hamburger mobile menu ───────────────────────────────
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
    document.body.style.overflow = mobileMenu.classList.contains('open') ? 'hidden' : '';
});
document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// ── Active nav link on scroll ───────────────────────────
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 120;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const link = document.querySelector(`.nav-link[data-section="${id}"]`);
        if (link) {
            link.classList.toggle('active', scrollPos >= top && scrollPos < top + height);
        }
    });
}

// ── Smooth scroll for all anchor links ─────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ── Scroll reveal ───────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });

document.querySelectorAll('.reveal-fade, .reveal-up, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
    // Skip hero elements — they're handled after preloader
    if (!el.closest('.hero')) revealObserver.observe(el);
});

// ── Typed text effect ──────────────────────────────────
const roles = ['B.Tech CSE Student', 'Web Developer', 'Problem Solver', 'Tech Enthusiast'];
const typedEl = document.getElementById('typed');
let roleIndex = 0, charIndex = 0, isDeleting = false;

function type() {
    const current = roles[roleIndex];
    if (isDeleting) {
        typedEl.textContent = current.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedEl.textContent = current.substring(0, charIndex + 1);
        charIndex++;
    }
    let speed = isDeleting ? 60 : 100;
    if (!isDeleting && charIndex === current.length) {
        speed = 2000;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 400;
    }
    setTimeout(type, speed);
}
type();
