// ==================== CURSOR ====================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

(function animateCursor() {
    followerX += (mouseX - followerX) * 0.1;
    followerY += (mouseY - followerY) * 0.1;
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';
    requestAnimationFrame(animateCursor);
})();

// Scale cursor on interactive elements
document.querySelectorAll('a, button, .skill-pill, .project-card, .cert-badge, .edu-card, .about-chips span').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(2)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        cursorFollower.style.borderColor = 'rgba(0,217,255,0.8)';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.transform = 'translate(-50%, -50%) scale(1)';
        cursorFollower.style.borderColor = 'rgba(0,217,255,0.5)';
    });
});

// ==================== NAVBAR ====================
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}, { passive: true });

// ==================== MOBILE MENU ====================
const menuToggle = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

menuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
});

document.querySelectorAll('.mob-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });
});

// ==================== TYPED TEXT ====================
const phrases = ['Software Developer', 'Python Developer', 'Problem Solver', 'Java Enthusiast', 'Web Developer'];
let phraseIdx = 0, charIdx = 0, deleting = false;
const typedEl = document.getElementById('typedText');

function typeLoop() {
    if (!typedEl) return;
    const current = phrases[phraseIdx];

    if (!deleting) {
        typedEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            deleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
    } else {
        typedEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            deleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
        }
    }

    setTimeout(typeLoop, deleting ? 55 : 90);
}

setTimeout(typeLoop, 800);

// ==================== SMOOTH SCROLL ====================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (href === '#') return;
        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ==================== SCROLL REVEAL ====================
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, entry.target.dataset.delay || 0);
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.edu-card, .project-card, .cert-badge, .skill-pill, .gpa-chip, .about-chips span, .clink, .hstat').forEach((el, i) => {
    el.classList.add('reveal');
    el.dataset.delay = (i % 4) * 80;
    revealObserver.observe(el);
});

// ==================== STAT COUNTERS ====================
const statNumbers = document.querySelectorAll('.hstat-n[data-target]');

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const el = entry.target;
            const target = parseFloat(el.dataset.target);
            const decimals = parseInt(el.dataset.decimal || '0');
            const duration = 1600;
            const start = performance.now();

            function update(now) {
                const progress = Math.min((now - start) / duration, 1);
                const ease = 1 - Math.pow(1 - progress, 3);
                const current = target * ease;
                el.textContent = decimals > 0 ? current.toFixed(decimals) : Math.floor(current);
                if (progress < 1) requestAnimationFrame(update);
                else el.textContent = decimals > 0 ? target.toFixed(decimals) : target;
            }

            requestAnimationFrame(update);
            counterObserver.unobserve(el);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(el => counterObserver.observe(el));

// ==================== SKILL BARS ====================
const skillBarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.querySelectorAll('.sbar-fill').forEach(fill => {
                fill.classList.add('animated');
            });
            entry.target.querySelectorAll('.ep-fill').forEach(fill => {
                fill.classList.add('animated');
            });
            skillBarObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.skills-bar-visual, .edu-progress').forEach(el => {
    skillBarObserver.observe(el);
});

// ==================== PARALLAX ORBS ====================
const orbs = document.querySelectorAll('.orb');

window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    orbs.forEach((orb, i) => {
        const speed = (i + 1) * 12;
        orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
}, { passive: true });

// ==================== FOOTER YEAR ====================
const footerYear = document.getElementById('footerYear');
if (footerYear) footerYear.textContent = new Date().getFullYear();

// ==================== EASTER EGG ====================
let logoClicks = 0;
const navLogo = document.querySelector('.nav-logo');
if (navLogo) {
    navLogo.addEventListener('click', () => {
        logoClicks++;
        if (logoClicks === 5) {
            alert('🎉 You found the easter egg! Thanks for exploring!');
            logoClicks = 0;
        }
    });
}

// ==================== CONSOLE STAMP ====================
console.log('%c⚡ Biswajit Kundu — Portfolio', 'color:#00d9ff;font-size:18px;font-weight:bold;');
console.log('%c📬 biswajitkundu2005@gmail.com', 'color:#7c3aed;font-size:13px;');
console.log('%c🤝 Open for internships & collaborations!', 'color:#0066ff;font-size:13px;');