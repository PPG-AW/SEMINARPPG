const header = document.getElementById('siteHeader');
const links = [...document.querySelectorAll('.nav-link')];
const indicator = document.getElementById('navIndicator');
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('navLinks');

function moveIndicator(link) {
  if (!link || innerWidth <= 900) return;
  indicator.style.width = `${link.offsetWidth}px`;
  indicator.style.left = `${link.offsetLeft}px`;
}
function setActive(id) {
  const active = links.find(a => a.getAttribute('href') === `#${id}`);
  if (!active) return;
  links.forEach(a => a.classList.toggle('active', a === active));
  moveIndicator(active);
}
addEventListener('load', () => moveIndicator(document.querySelector('.nav-link.active')));
addEventListener('resize', () => moveIndicator(document.querySelector('.nav-link.active')));
addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 40), {passive:true});

const sections = document.querySelectorAll('.observe-section');
const sectionObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => { if (entry.isIntersecting) setActive(entry.target.id); });
}, { rootMargin: '-35% 0px -55% 0px', threshold: 0 });
sections.forEach(s => sectionObserver.observe(s));

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add('visible'); revealObserver.unobserve(entry.target); }
  });
}, {threshold:.08});
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  toggle.classList.toggle('open', open);
  toggle.setAttribute('aria-expanded', open);
});
links.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); toggle.classList.remove('open'); toggle.setAttribute('aria-expanded','false');
}));

const parallaxItems = document.querySelectorAll('[data-speed]');
let ticking = false;
function parallax() {
  if (scrollY < innerHeight * 1.2 && !matchMedia('(prefers-reduced-motion: reduce)').matches) {
    parallaxItems.forEach(el => {
      const y = scrollY * Number(el.dataset.speed);
      el.style.translate = `0 ${y}px`;
    });
  }
  ticking = false;
}
addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(parallax); ticking = true; } }, {passive:true});
