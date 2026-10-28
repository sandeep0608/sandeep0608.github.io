/* =============================================================
   Sandeep Tharakaram — site behaviour
   1) Calendly link  2) Scroll reveal  3) Sticky-nav shadow
   4) Contact form -> your endpoint (Google Sheets / n8n / Formspree)
   ============================================================= */

/* STEP 1 — your Calendly scheduling link (used by every "Book a call" button). */
var CALENDLY_URL = "https://calendly.com/tstsandeep/30min";

/* STEP 2 — paste your form endpoint URL (Google Apps Script / n8n / Formspree). See README. */
var LEAD_ENDPOINT = "https://script.google.com/macros/s/AKfycbxgHh0mO59A8SptDJmf8TsuyqIJc6TBIzhOpE3W8gPiWdvaGecu6vfisdCToVQO1jZw/exec";

(function () {
  document.documentElement.classList.add('js'); // enables reveal animations

  document.addEventListener('DOMContentLoaded', function () {
    var yr = document.getElementById('yr');
    if (yr) yr.textContent = new Date().getFullYear();

    // --- Calendly: point every .js-calendly link at your URL ---
    document.querySelectorAll('.js-calendly').forEach(function (a) { a.href = CALENDLY_URL; });

    // --- Scroll reveal ---
    var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var items = document.querySelectorAll('.reveal');
    if (reduce || !('IntersectionObserver' in window)) {
      items.forEach(function (el) { el.classList.add('in'); });
    } else {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
        });
      }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
      items.forEach(function (el) { io.observe(el); });
      requestAnimationFrame(function () {
        items.forEach(function (el) {
          if (el.getBoundingClientRect().top < window.innerHeight * 0.92) el.classList.add('in');
        });
      });
    }

    // --- Sticky nav shadow ---
    var nav = document.querySelector('.nav');
    if (nav) {
      var onScroll = function () { nav.classList.toggle('scrolled', window.scrollY > 8); };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
    }

    // --- Contact form ---
    var form = document.getElementById('leadForm');
    if (!form) return;
    var msg = document.getElementById('formMsg');
    var btn = document.getElementById('submitBtn');

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      msg.className = 'formmsg'; msg.textContent = '';

      if (document.getElementById('hp').value) { showOk(); return; } // honeypot

      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        phone: form.phone.value.trim(),
        message: form.message.value.trim(),
        page: location.href
      };

      if (!data.name || !data.email || !data.message) {
        msg.className = 'formmsg err';
        msg.textContent = 'Please add your name, email, and a short message.';
        return;
      }
      if (!LEAD_ENDPOINT) {
        msg.className = 'formmsg err';
        msg.textContent = 'Form not connected yet — add your endpoint URL in js/main.js (see README). Meanwhile, email tstsandeep@gmail.com.';
        return;
      }

      btn.disabled = true; var original = btn.textContent; btn.textContent = 'Sending…';
      fetch(LEAD_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(data)
      })
      .then(function () { showOk(); form.reset(); })
      .catch(function () {
        msg.className = 'formmsg err';
        msg.textContent = 'Something went wrong — please email tstsandeep@gmail.com directly.';
      })
      .finally(function () { btn.disabled = false; btn.textContent = original; });
    });

    function showOk() {
      msg.className = 'formmsg ok';
      msg.textContent = "Thanks — your enquiry is in. I'll reply within a day.";
    }
  });
})();
