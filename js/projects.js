const initProjectFilter = () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const clearBtn = document.querySelector('.filter-clear');
  const cards = document.querySelectorAll('.project-card[data-tags]');

  if (!filterBtns.length || !cards.length) return;

  let activeTags = new Set();

  const params = new URLSearchParams(window.location.search);
  const urlTags = params.get('tags');
  if (urlTags) {
    urlTags.split(',').forEach(t => { if (t) activeTags.add(t); });
  }

  const applyFilter = () => {
    filterBtns.forEach(btn => {
      const tag = btn.dataset.tag;
      btn.classList.toggle('active', activeTags.has(tag));
      btn.setAttribute('aria-pressed', String(activeTags.has(tag)));
    });

    cards.forEach(card => {
      const cardTags = card.dataset.tags.split(',').map(t => t.trim());
      const show = activeTags.size === 0 || [...activeTags].every(t => cardTags.includes(t));
      card.classList.toggle('hidden', !show);
    });

    if (clearBtn) clearBtn.classList.toggle('visible', activeTags.size > 0);

    const newParams = new URLSearchParams();
    if (activeTags.size > 0) newParams.set('tags', [...activeTags].join(','));
    const newUrl = newParams.toString()
      ? `${window.location.pathname}?${newParams}`
      : window.location.pathname;
    history.pushState({ tags: [...activeTags] }, '', newUrl);
  };

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;
      if (activeTags.has(tag)) {
        activeTags.delete(tag);
      } else {
        activeTags.add(tag);
      }
      applyFilter();
    });
  });

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      activeTags.clear();
      applyFilter();
    });
  }

  window.addEventListener('popstate', (e) => {
    activeTags = new Set(e.state?.tags || []);
    applyFilter();
  });

  applyFilter();
};
