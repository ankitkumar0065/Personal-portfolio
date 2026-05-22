const cursor = document.getElementById('cursor');
const ring = document.getElementById('cursor-ring');
let mx = 0, my = 0, rx = 0, ry = 0;
document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
(function animateCursor() {
  rx += (mx - rx) * 0.12;
  ry += (my - ry) * 0.12;
  cursor.style.left = mx + 'px'; cursor.style.top = my + 'px';
  ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
  requestAnimationFrame(animateCursor);
})();
document.querySelectorAll('a, button, .skill-tag, .project-card, .exp-card, .edu-card, .cert-card').forEach(el => {
  el.addEventListener('mouseenter', () => document.body.classList.add('cursor-expand'));
  el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-expand'));
});

/* ===== PARTICLES ===== */
const canvas = document.getElementById('particle-canvas');
const ctx = canvas.getContext('2d');
let W, H, particles = [];
function resize() { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; }
window.addEventListener('resize', resize); resize();
const COLS = ['rgba(0,229,255,', 'rgba(124,58,237,', 'rgba(255,45,120,'];
for (let i = 0; i < 80; i++) {
  particles.push({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    vx: (Math.random() - 0.5) * 0.3,
    vy: (Math.random() - 0.5) * 0.3,
    r: Math.random() * 1.5 + 0.3,
    col: COLS[Math.floor(Math.random() * COLS.length)],
    o: Math.random() * 0.5 + 0.1
  });
}
function drawParticles() {
  ctx.clearRect(0, 0, W, H);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy;
    if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
    if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
    ctx.fillStyle = p.col + p.o + ')';
    ctx.fill();
  });
  // Draw connecting lines
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 100) {
        ctx.beginPath();
        ctx.strokeStyle = `rgba(0,229,255,${0.05 * (1 - dist/100)})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
  requestAnimationFrame(drawParticles);
}
drawParticles();

/* ===== TYPING EFFECT ===== */
const roles = ['AI Automation Developer', 'RAG Pipeline Engineer', 'Voice Agent Builder', 'n8n Workflow Architect', 'Multi-Agent Systems Dev'];
let ri = 0, ci = 0, del = false;
const typedEl = document.getElementById('typed-text');
function type() {
  const current = roles[ri];
  if (!del) {
    typedEl.textContent = current.slice(0, ci + 1); ci++;
    if (ci === current.length) { del = true; setTimeout(type, 1800); return; }
  } else {
    typedEl.textContent = current.slice(0, ci - 1); ci--;
    if (ci === 0) { del = false; ri = (ri + 1) % roles.length; }
  }
  setTimeout(type, del ? 45 : 80);
}
type();

/* ===== SCROLL FADE IN ===== */
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* ===== NAV TOGGLE ===== */
function toggleNav() {
  const navLinks = document.getElementById('nav-links');
  const hamburger = document.getElementById('hamburger');
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
}

/* ===== CONTACT FORM SUBMISSION ===== */
const contactForm = document.querySelector('.contact-form');
const successPopup = document.getElementById('success-popup');

if (contactForm && successPopup) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Show popup
    successPopup.classList.add('show');
    
    // Clear form
    contactForm.reset();
    
    // Hide popup after 5 seconds
    setTimeout(() => {
      successPopup.classList.remove('show');
    }, 5000);
  });
}

/* ===== THEME TOGGLE ===== */
function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'light' ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
}

// Load saved theme
const savedTheme = localStorage.getItem('theme') || 'dark';
document.documentElement.setAttribute('data-theme', savedTheme);

document.querySelectorAll('.nav-links a').forEach(a => a.addEventListener('click', () => {
  document.getElementById('nav-links').classList.remove('open');
  document.getElementById('hamburger').classList.remove('active');
  document.body.style.overflow = '';
}));

/* ===== YEAR ===== */
document.getElementById('year').textContent = new Date().getFullYear();

/* ===== NAV SHRINK ON SCROLL ===== */
window.addEventListener('scroll', () => {
  document.getElementById('navbar').style.padding = window.scrollY > 40 ? '10px 0' : '18px 0';
});
