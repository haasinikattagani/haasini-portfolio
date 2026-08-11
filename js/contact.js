const initContact = () => {
  const form = document.getElementById('contact-form');
  if (!form) return;

  const success = document.getElementById('form-success');

  const fields = {
    name:    { el: document.getElementById('f-name'),    msg: document.getElementById('e-name'),    validate: v => v.trim().length >= 2 },
    email:   { el: document.getElementById('f-email'),   msg: document.getElementById('e-email'),   validate: v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) },
    subject: { el: document.getElementById('f-subject'), msg: document.getElementById('e-subject'), validate: v => v.trim().length >= 3 },
    message: { el: document.getElementById('f-message'), msg: document.getElementById('e-message'), validate: v => v.trim().length >= 10 },
  };

  const validateField = (key) => {
    const { el, msg, validate } = fields[key];
    const ok = validate(el.value);
    el.classList.toggle('error', !ok);
    msg.classList.toggle('visible', !ok);
    return ok;
  };


  Object.keys(fields).forEach(key => {
    fields[key].el.addEventListener('blur', () => validateField(key));
    fields[key].el.addEventListener('input', () => {
      if (fields[key].el.classList.contains('error')) validateField(key);
    });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const allValid = Object.keys(fields).map(validateField).every(Boolean);
    if (!allValid) return;

    form.style.display = 'none';
    success.classList.add('visible');
  });
};
