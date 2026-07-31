// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// ===== Scroll reveal =====
const animatedEls = document.querySelectorAll('[data-animate]');

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  animatedEls.forEach(el => observer.observe(el));
} else {
  animatedEls.forEach(el => el.classList.add('in-view'));
}

// ===== Contact form =====
const form = document.getElementById('growthForm');
const status = document.getElementById('formStatus');

form.addEventListener('submit', async (e) => {
  // If the form still points at the placeholder Formspree ID, don't attempt
  // a real network submission — just tell the developer what to fix.
  if (form.action.includes('YOUR_FORM_ID')) {
    e.preventDefault();
    status.textContent = 'Form endpoint not configured yet — see README for setup (Formspree / Web3Forms).';
    status.className = 'form-status err';
    return;
  }

  e.preventDefault();
  status.textContent = 'Sending...';
  status.className = 'form-status';

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      status.textContent = "Thanks — we'll be in touch within 24 hours.";
      status.className = 'form-status ok';
      form.reset();
    } else {
      throw new Error('Submission failed');
    }
  } catch (err) {
    status.textContent = 'Something went wrong. Please email us directly instead.';
    status.className = 'form-status err';
  }
});
