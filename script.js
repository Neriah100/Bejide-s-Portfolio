const navToggle = document.getElementById('nav-toggle');
const navLinks = document.querySelector('.nav-links');

navToggle.addEventListener('click', () => {
    // 1. Get the current state first 
    const currentState = navToggle.getAttribute('aria-expanded') === 'true';

    // 2. Flip the state for screen readers
    navToggle.setAttribute('aria-expanded', !currentState);

    // Toggle the 'active' class to show/hide the links
    navLinks.classList.toggle('active');  
});
// Close mobile menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    navToggle.setAttribute('aria-expanded', 'false');
});  
  });  
// ===== Smooth Scroll for Anchor Links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== Active Nav Link Highlight on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav-links a');

const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const id = entry.target.getAttribute('id');
            navAnchors.forEach(a => {
                a.classList.toggle('active-link', a.getAttribute('href') === `#${id}`);
            });
        }
    });
}, { threshold: 0.4 });

sections.forEach(section => navObserver.observe(section));

// ===== Scroll-Reveal for Project & Skill Cards =====
const revealTargets = document.querySelectorAll('.project-card, .skill-card');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            revealObserver.unobserve(entry.target); // animate once only
        }
    });
}, { threshold: 0.2 });

revealTargets.forEach(target => revealObserver.observe(target));

// ===== Dynamic Footer Year =====
document.getElementById('current-year').textContent = new Date().getFullYear();  