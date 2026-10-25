/* ============================================================
   Mohammed Faizan — Portfolio interactions
   ============================================================ */
(function () {
  'use strict';

  var nav = document.getElementById('nav');
  var navLinks = document.getElementById('navLinks');
  var navToggle = document.getElementById('navToggle');

  /* ---- Theme toggle (dark / light) ---- */
  var themeToggle = document.getElementById('themeToggle');
  function setThemeLabel() {
    var current = document.documentElement.getAttribute('data-theme') || 'dark';
    if (themeToggle) {
      themeToggle.setAttribute('aria-label',
        current === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
      themeToggle.setAttribute('title',
        current === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
    }
  }
  setThemeLabel();
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = (document.documentElement.getAttribute('data-theme') === 'light') ? 'dark' : 'light';
      document.documentElement.setAttribute('data-theme', next);
      try { localStorage.setItem('theme', next); } catch (e) {}
      setThemeLabel();
    });
  }

  /* ---- Year in footer ---- */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- Nav background on scroll ---- */
  function onScroll() {
    if (window.scrollY > 24) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu toggle ---- */
  function closeMenu() {
    navLinks.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  }
  navToggle.addEventListener('click', function () {
    var open = navLinks.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  navLinks.addEventListener('click', function (e) {
    if (e.target.tagName === 'A') closeMenu();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* ---- Scroll reveal ---- */
  var reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    reveals.forEach(function (el, i) {
      // subtle stagger for grouped items
      el.style.transitionDelay = ((i % 5) * 60) + 'ms';
      io.observe(el);
    });
  } else {
    reveals.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---- Active nav link via section observer ---- */
  var sections = document.querySelectorAll('main section[id], #top');
  var linkMap = {};
  navLinks.querySelectorAll('a[href^="#"]').forEach(function (a) {
    linkMap[a.getAttribute('href').slice(1)] = a;
  });
  if ('IntersectionObserver' in window) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var id = entry.target.id;
        if (entry.isIntersecting && linkMap[id]) {
          Object.keys(linkMap).forEach(function (k) { linkMap[k].classList.remove('is-active'); });
          linkMap[id].classList.add('is-active');
        }
      });
    }, { threshold: 0.4, rootMargin: '-20% 0px -55% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  /* ---- Count-up stats ---- */
  var counters = document.querySelectorAll('.stat__num[data-count]');
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1100, start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = prefix + Math.round(target * eased) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animateCount(entry.target); cio.unobserve(entry.target); }
      });
    }, { threshold: 0.6 });
    counters.forEach(function (c) { cio.observe(c); });
  }
})();
