

const initTimeline = () => {
  const list = document.querySelector('.timeline-list');
  if (!list) return;


  list.addEventListener('click', (e) => {
    const btn = e.target.closest('button[data-timeline]');
    if (!btn) return;

    const item = btn.closest('.timeline-item');
    const body = item.querySelector('.timeline-body');
    const isExpanded = item.getAttribute('aria-expanded') === 'true';


    list.querySelectorAll('.timeline-item').forEach(el => {
      el.setAttribute('aria-expanded', 'false');
      const b = el.querySelector('.timeline-body');
      if (b) b.style.maxHeight = '0';
    });


    if (!isExpanded) {
      item.setAttribute('aria-expanded', 'true');
      body.style.maxHeight = body.scrollHeight + 'px';
    }
  });
};

const initScrollReveal = () => {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
};
