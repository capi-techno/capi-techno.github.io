/**
 * CAPI Technologies - Official Company Website
 * High-End Corporate Scripts, Brand Experience & Interactive Theme Controller
 */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initNavbarScroll();
  initMobileNav();
  initActiveNavHighlight();
  initContactModal();
  initEmailCopy();
  initThemeController();
});

/* ==========================================================================
   1. REFINED BRAND SPLASH SCREEN & LOADER
   ========================================================================== */
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  const skipBtn = document.getElementById('skip-splash');

  if (!splash) return;

  document.body.style.overflow = 'hidden';
  initChevronLoader();

  let finished = false;
  const finishSplash = () => {
    if (finished) return;
    finished = true;
    splash.classList.add('fade-out');
    document.body.style.overflow = '';
    setTimeout(() => {
      splash.style.display = 'none';
    }, 600);
  };

  if (skipBtn) {
    skipBtn.addEventListener('click', finishSplash);
  }

  // Auto finish splash after completion (~2.2s)
  setTimeout(() => {
    finishSplash();
  }, 2300);
}

function initChevronLoader() {
  const container = document.getElementById('chevron-bar');
  const msgEl = document.getElementById('splash-status-msg');
  const detailEl = document.getElementById('splash-status-detail');

  if (!container) return;

  const totalChevrons = 36;
  container.innerHTML = '';
  const chevronEls = [];

  for (let i = 0; i < totalChevrons; i++) {
    const span = document.createElement('span');
    span.className = 'chevron';
    span.textContent = '❯';
    container.appendChild(span);
    chevronEls.push(span);
  }

  const stages = [
    { targetRatio: 0.28, msg: "Honoring Traditional Craft", detail: "Preserving Living Heritage" },
    { targetRatio: 0.58, msg: "Connecting Cultural Heritage", detail: "Opening Global Horizons" },
    { targetRatio: 0.88, msg: "Empowering Independent Creators", detail: "Human-Centered Digital Bridges" },
    { targetRatio: 1.00, msg: "Welcome to CAPI Technologies", detail: "Meaningful Digital Opportunities" }
  ];

  let currentStep = 0;
  const timer = setInterval(() => {
    currentStep++;
    const ratio = currentStep / totalChevrons;

    chevronEls.forEach((el, idx) => {
      if (idx < currentStep - 1) {
        el.className = 'chevron active';
      } else if (idx === currentStep - 1) {
        el.className = 'chevron lead';
      } else {
        el.className = 'chevron';
      }
    });

    for (let st of stages) {
      if (ratio <= st.targetRatio || st.targetRatio === 1.0) {
        if (msgEl) msgEl.textContent = st.msg;
        if (detailEl) detailEl.textContent = st.detail;
        break;
      }
    }

    if (currentStep >= totalChevrons) {
      clearInterval(timer);
    }
  }, 50);
}

/* ==========================================================================
   2. NAVBAR SCROLL DYNAMICS & ACTIVE LINK HIGHLIGHTING
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('header.navbar');
  if (!navbar) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

function initMobileNav() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-nav');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    menu.classList.toggle('hidden');
  });

  // Close mobile nav when clicking any link inside it
  const links = menu.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
    });
  });
}

function initActiveNavHighlight() {
  const navLinks = document.querySelectorAll('header.navbar nav a.nav-link');
  const sections = document.querySelectorAll('section[id]');
  if (!navLinks.length || !sections.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          const href = link.getAttribute('href');
          if (href === '#' + id) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, {
    rootMargin: '-20% 0px -70% 0px'
  });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   3. CONTACT MODAL & INTERACTIVE INQUIRIES
   ========================================================================== */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  const closeBtn = document.getElementById('close-modal-btn');
  const openButtons = document.querySelectorAll('.open-contact-modal');
  const form = document.getElementById('contact-form');

  if (!modal) return;

  const openModal = () => {
    modal.classList.remove('opacity-0', 'pointer-events-none');
    modal.querySelector('.modal-card')?.classList.remove('scale-95');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('opacity-0', 'pointer-events-none');
    modal.querySelector('.modal-card')?.classList.add('scale-95');
    document.body.style.overflow = '';
  };

  openButtons.forEach(btn => btn.addEventListener('click', openModal));
  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  // Close modal when clicking on backdrop
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  // Escape key closes modal
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('pointer-events-none')) {
      closeModal();
    }
  });

  // Handle Form Submission
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name')?.value || 'Friend';
      closeModal();
      showToast(`Thank you, ${name}! We have received your inquiry and will connect soon.`);
      form.reset();
    });
  }
}

/* ==========================================================================
   4. EMAIL COPY BUTTON & TOAST FEEDBACK
   ========================================================================== */
function initEmailCopy() {
  const btn = document.getElementById('copy-email-btn');
  const textEl = document.getElementById('copy-email-text');
  if (!btn) return;

  const email = 'contact@capi-techno.com';

  btn.addEventListener('click', async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(email);
      } else {
        const input = document.createElement('input');
        input.value = email;
        document.body.appendChild(input);
        input.select();
        document.execCommand('copy');
        document.body.removeChild(input);
      }

      if (textEl) textEl.textContent = 'Email Copied!';
      showToast('Copied contact@capi-techno.com to clipboard');

      setTimeout(() => {
        if (textEl) textEl.textContent = 'Copy Company Email';
      }, 2500);
    } catch (err) {
      showToast('Company Email: contact@capi-techno.com');
    }
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const textEl = document.getElementById('toast-text');
  if (!toast || !textEl) return;

  textEl.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');

  setTimeout(() => {
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 3500);
}

/* ==========================================================================
   5. HANGING LIGHT BULB & DUAL THEME CONTROLLER
   - Real-world bulb pulling cord & mechanical switch audio
   - Default: Light Theme, Toggle: Dark Theme
   - Dynamically aligned with navbar theme toggle icon
   ========================================================================== */
function initThemeController() {
  const pullCord = document.getElementById('lamp-pull-cord');
  const bulbEnvelope = document.getElementById('bulb-glass-envelope');
  const bulbFilament = document.getElementById('bulb-filament');
  const lampSvg = document.getElementById('lamp-svg');
  const navToggle = document.getElementById('nav-theme-toggle');

  // Realistic mechanical toggle switch sound via Web Audio API
  function playSwitchClick() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(180, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(30, ctx.currentTime + 0.035);
      
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch (e) {}
  }

  function updateTooltip(isDark) {
    if (lampSvg) {
      lampSvg.setAttribute('title', isDark ? 'Click bulb or pull cord to switch to Light Theme' : 'Click bulb or pull cord to switch to Dark Theme');
    }
  }

  function applyTheme(theme, animateCord = false) {
    const isDark = theme === 'dark';
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('capi-theme', 'dark'); } catch(e) {}
    } else {
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem('capi-theme', 'light'); } catch(e) {}
    }

    updateTooltip(isDark);

    if (animateCord && pullCord) {
      playSwitchClick();
      pullCord.classList.remove('spring-back');
      pullCord.classList.add('is-pulled');
      
      setTimeout(() => {
        pullCord.classList.remove('is-pulled');
        pullCord.classList.add('spring-back');
      }, 140);

      setTimeout(() => {
        pullCord.classList.remove('spring-back');
      }, 550);
    }
  }

  function toggleTheme(animate = true) {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    applyTheme(isCurrentlyDark ? 'light' : 'dark', animate);
  }

  // Load saved preference (defaults to light mode)
  try {
    const saved = localStorage.getItem('capi-theme');
    if (saved === 'dark') {
      applyTheme('dark', false);
    } else {
      applyTheme('light', false);
    }
  } catch (e) {
    applyTheme('light', false);
  }

  // Event Listeners for Pull Cord
  if (pullCord) {
    pullCord.addEventListener('click', (e) => {
      e.stopPropagation();
      toggleTheme(true);
    });

    // Touch / Drag pull cord support
    let startY = 0;
    let isDragging = false;

    pullCord.addEventListener('pointerdown', (e) => {
      startY = e.clientY;
      isDragging = true;
      try { pullCord.setPointerCapture(e.pointerId); } catch(err) {}
    });

    pullCord.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      const deltaY = e.clientY - startY;
      if (deltaY > 3) {
        pullCord.style.transform = `translateY(${Math.min(deltaY, 14)}px)`;
      }
    });

    const finishDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      const deltaY = e.clientY - startY;
      pullCord.style.transform = '';
      if (deltaY > 5) {
        toggleTheme(true);
      }
    };

    pullCord.addEventListener('pointerup', finishDrag);
    pullCord.addEventListener('pointercancel', finishDrag);
  }

  // Click on Bulb envelope or filament toggles theme with pull animation
  if (bulbEnvelope) {
    bulbEnvelope.addEventListener('click', () => toggleTheme(true));
  }
  if (bulbFilament) {
    bulbFilament.addEventListener('click', () => toggleTheme(true));
  }

  // Click on any part of the exposed lower bulb to toggle theme
  if (lampSvg) {
    lampSvg.addEventListener('click', (e) => {
      if (!e.target.closest('#lamp-pull-cord')) {
        toggleTheme(true);
      }
    });
  }

  // Click on Navbar companion toggle button
  if (navToggle) {
    navToggle.addEventListener('click', () => toggleTheme(true));
  }

  // Dynamic pixel-perfect alignment of the hanging light bulb under navbar theme toggle icon
  function alignLampWithNavToggle() {
    const toggleBtn = document.getElementById('nav-theme-toggle');
    const lampContainer = document.getElementById('hanging-lamp-container');
    const lampSvg = document.getElementById('lamp-svg');
    const navbar = document.querySelector('header.navbar');
    const overview = document.getElementById('overview');
    if (!toggleBtn || !lampContainer || !lampSvg || !navbar || !overview) return;

    const toggleRect = toggleBtn.getBoundingClientRect();
    const overviewRect = overview.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();
    const svgRect = lampSvg.getBoundingClientRect();

    // The horizontal center of toggleBtn relative to overview's left edge
    const centerX = (toggleRect.left + toggleRect.width / 2) - overviewRect.left;
    lampContainer.style.left = `${centerX}px`;
    lampContainer.style.right = 'auto';
    // Center the bulb body (located at x=24 of 54 in viewBox, approx 44.4%)
    lampContainer.style.transform = 'translateX(-44.4%)';

    // Position vertically so the navbar bottom border bisects the upper bulb neck (approx 52% down SVG)
    // Only update idealTop when near top of page to prevent displacement during scrolling
    if (window.scrollY < 20) {
      const svgHeight = svgRect.height || (window.innerWidth >= 640 ? 128 : 112);
      const idealTop = Math.max(0, Math.round(navRect.height - svgHeight * 0.52));
      lampContainer.style.top = `${idealTop}px`;
    }
  }

  // Run alignment immediately on load, resize, and font ready
  alignLampWithNavToggle();
  window.addEventListener('resize', alignLampWithNavToggle);
  window.addEventListener('orientationchange', alignLampWithNavToggle);
  window.addEventListener('load', alignLampWithNavToggle);
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(alignLampWithNavToggle);
  }
}
