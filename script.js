document.addEventListener('DOMContentLoaded', () => {

  /* Mobile nav toggle */
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mainNav.classList.remove('open'));
    });
  }

  /* Investment simulator */
  const amountInput = document.getElementById('amount');
  const yearsInput = document.getElementById('years');
  const rateInput = document.getElementById('rate');
  const amountValue = document.getElementById('amountValue');
  const yearsValue = document.getElementById('yearsValue');
  const rateValue = document.getElementById('rateValue');
  const resultValue = document.getElementById('resultValue');

  const formatEUR = n => Math.round(n).toLocaleString('fr-FR');

  function updateSimulator() {
    const amount = Number(amountInput.value);
    const years = Number(yearsInput.value);
    const rate = Number(rateInput.value) / 100;

    amountValue.textContent = formatEUR(amount);
    yearsValue.textContent = years;
    rateValue.textContent = rateInput.value;

    const finalCapital = amount * Math.pow(1 + rate, years);
    resultValue.textContent = `${formatEUR(finalCapital)} €`;
  }

  [amountInput, yearsInput, rateInput].forEach(input => {
    if (input) input.addEventListener('input', updateSimulator);
  });
  if (amountInput) updateSimulator();

  /* Animated stats counters */
  const counters = document.querySelectorAll('.stat strong[data-count]');
  const animateCounter = el => {
    const target = Number(el.getAttribute('data-count'));
    const duration = 1400;
    const start = performance.now();
    const step = now => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(target * eased).toLocaleString('fr-FR');
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if ('IntersectionObserver' in window && counters.length) {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach(c => observer.observe(c));
  } else {
    counters.forEach(c => { c.textContent = c.getAttribute('data-count'); });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(openItem => {
        openItem.classList.remove('open');
        openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      if (!isOpen) {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });

  /* Contact form (demo only, no backend) */
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  if (contactForm) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();
      formNote.textContent = 'Merci ! Un conseiller vous contactera très prochainement.';
      contactForm.reset();
    });
  }

  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      input.value = '';
      input.placeholder = 'Merci pour votre inscription !';
    });
  }

  /* Back to top button */
  const backToTop = document.getElementById('backToTop');
  if (backToTop) {
    window.addEventListener('scroll', () => {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
