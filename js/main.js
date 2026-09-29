document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  document.querySelectorAll('video[muted]').forEach(function (video) {
    video.addEventListener('volumechange', function () {
      if (!video.muted) video.muted = true;
    });
  });

  var contactForm = document.getElementById('contact-form');
  var statusEl = document.getElementById('form-status');
  if (contactForm && statusEl) {
    var isSpanish = document.documentElement.lang === 'es';
    var messages = {
      sending: isSpanish ? 'Enviando...' : 'Sending...',
      success: isSpanish
        ? '¡Gracias! Su solicitud fue enviada. Le responderemos dentro de un día hábil.'
        : "Thanks! Your request was sent. We'll get back to you within one business day.",
      error: isSpanish
        ? 'Algo salió mal. Por favor llámenos al (725) 710-5199 o intente de nuevo.'
        : 'Something went wrong. Please call us at (725) 710-5199 or try again.'
    };

    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      statusEl.hidden = false;
      statusEl.className = 'form-status';
      statusEl.textContent = messages.sending;

      fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          statusEl.className = 'form-status form-status-success';
          statusEl.textContent = messages.success;
          contactForm.reset();
        } else {
          statusEl.className = 'form-status form-status-error';
          statusEl.textContent = messages.error;
        }
      }).catch(function () {
        statusEl.className = 'form-status form-status-error';
        statusEl.textContent = messages.error;
      }).finally(function () {
        submitBtn.disabled = false;
      });
    });
  }
});
