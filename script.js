/**
 * CAPI Technologies - Main Application Controller
 * Handles interactive experiences:
 * - Animated Hero Particle Canvas
 * - Light & Dark Theme Switcher (Navbar Companion Toggle)
 * - 3D Fanned Card Deck Layout & Grid View Mode Switcher
 * - Craft Tradition Filtering & 3D Flippable Cards
 * - Reliability Principle Rail Laser & Spotlight Tracking
 * - Smooth Telemetry Rolling Number Counters
 * - Future Direction Milestone Filtering
 * - Contact Modal & Email Clipboard Helpers
 */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initNavbarScroll();
  initMobileNav();
  initActiveNavHighlight();
  initHeroCanvas();
  initThemeController();
  initCraftViewAndDeck();
  initPrincipleRailInteractive();
  initStatCounters();
  initFutureFilters();
  initRetroTelevision();
  initContactModal();
  initEmailCopy();
  initSurveyCards();
  initScrollReveal();
});

/* ==========================================================================
   1. NAVBAR SCROLL & MOBILE MENU CONTROLLERS
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
  const toggleBtn = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!toggleBtn || !mobileMenu) return;

  toggleBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });

  // Close on nav link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });
}

function initActiveNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
            link.classList.add('text-[#0066FF]', 'dark:text-blue-400');
          } else {
            link.classList.remove('active');
            link.classList.remove('text-[#0066FF]', 'dark:text-blue-400');
          }
        });
      }
    });
  }, { rootMargin: '-30% 0px -60% 0px' });

  sections.forEach(section => observer.observe(section));
}

/* ==========================================================================
   2. HERO INTERACTIVE PARTICLE CANVAS
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function resize() {
    const parent = canvas.parentElement || document.getElementById('overview');
    if (!parent) return;
    width = canvas.width = parent.offsetWidth;
    height = canvas.height = parent.offsetHeight;
  }

  window.addEventListener('resize', resize, { passive: true });
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
      this.radius = Math.random() * 2 + 1.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      const isDark = document.documentElement.classList.contains('dark');
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? 'rgba(56, 189, 248, 0.45)' : 'rgba(0, 102, 255, 0.35)';
      ctx.fill();
    }
  }

  const particleCount = Math.min(38, Math.max(16, Math.floor(width / 35)));
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    if (prefersReducedMotion) return;
    ctx.clearRect(0, 0, width, height);

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 125) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          const isDark = document.documentElement.classList.contains('dark');
          const alpha = 0.2 * (1 - dist / 125);
          ctx.strokeStyle = isDark ? `rgba(56, 189, 248, ${alpha})` : `rgba(0, 102, 255, ${alpha})`;
          ctx.lineWidth = 0.8;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   3. THEME CONTROLLER (Light & Dark Theme Switcher)
   ========================================================================== */
function initThemeController() {
  const navToggle = document.getElementById('nav-theme-toggle');

  // Realistic mechanical toggle switch sound via Web Audio API
  function playSwitchClick() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(36, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {}
  }

  function updateTooltip(isDark) {
    if (navToggle) {
      navToggle.setAttribute('title', isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme');
    }
  }

  function applyTheme(theme, playSound = false) {
    const isDark = theme === 'dark';
    
    if (isDark) {
      document.documentElement.classList.add('dark');
      try { localStorage.setItem('capi-theme', 'dark'); } catch(e) {}
    } else {
      document.documentElement.classList.remove('dark');
      try { localStorage.setItem('capi-theme', 'light'); } catch(e) {}
    }

    updateTooltip(isDark);

    if (playSound) {
      playSwitchClick();
    }
  }

  function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    applyTheme(isDark ? 'light' : 'dark', true);
  }

  // Load saved preference (defaults to light mode)
  try {
    const savedTheme = localStorage.getItem('capi-theme');
    if (savedTheme) {
      applyTheme(savedTheme, false);
    } else {
      applyTheme('light', false);
    }
  } catch(e) {
    applyTheme('light', false);
  }

  // Click on Navbar theme toggle button
  if (navToggle) {
    navToggle.addEventListener('click', toggleTheme);
  }
}

/* ==========================================================================
   4. CRAFT DISPLAY VIEW OPTIONS & 3D FANNED DECK INTERACTION
   ========================================================================== */
function initCraftViewAndDeck() {
  const container = document.querySelector('.card-hand-container');
  const cardWrappers = document.querySelectorAll('.card-wrapper');
  const viewDeckBtn = document.getElementById('view-mode-deck');
  const viewGridBtn = document.getElementById('view-mode-grid');
  const craftFilterBtns = document.querySelectorAll('.craft-filter-btn');

  if (!container || !cardWrappers.length) return;

  // ─── A. View Mode Switcher (Deck vs Grid) ─────────────────────────────
  function setViewMode(mode) {
    // Reset any flipped/active card when switching modes
    cardWrappers.forEach(w => {
      w.classList.remove('is-active');
      const c = w.querySelector('.use-case-card');
      if (c) c.classList.remove('is-flipped');
    });
    container.classList.remove('has-active');

    if (mode === 'grid') {
      container.classList.add('grid-mode');
      if (viewGridBtn) {
        viewGridBtn.classList.add('active');
        viewGridBtn.setAttribute('aria-pressed', 'true');
      }
      if (viewDeckBtn) {
        viewDeckBtn.classList.remove('active');
        viewDeckBtn.setAttribute('aria-pressed', 'false');
      }
    } else {
      container.classList.remove('grid-mode');
      if (viewDeckBtn) {
        viewDeckBtn.classList.add('active');
        viewDeckBtn.setAttribute('aria-pressed', 'true');
      }
      if (viewGridBtn) {
        viewGridBtn.classList.remove('active');
        viewGridBtn.setAttribute('aria-pressed', 'false');
      }
    }
  }

  if (viewDeckBtn) {
    viewDeckBtn.addEventListener('click', () => setViewMode('deck'));
  }
  if (viewGridBtn) {
    viewGridBtn.addEventListener('click', () => setViewMode('grid'));
  }

  // ─── B. Category Filter Buttons ────────────────────────────────────────
  craftFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      craftFilterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-craft-filter') || 'all';

      cardWrappers.forEach(wrapper => {
        const cat = wrapper.getAttribute('data-category');
        if (filter === 'all' || cat === filter) {
          wrapper.classList.remove('filtered-out');
        } else {
          wrapper.classList.add('filtered-out');
        }
      });

      // If user filters to 1 card in deck mode, switch to grid mode cleanly
      const visibleCount = Array.from(cardWrappers).filter(w => !w.classList.contains('filtered-out')).length;
      if (visibleCount <= 2 && !container.classList.contains('grid-mode')) {
        // keep fanned or centered
      }
    });
  });

  // ─── C. 3D Card Draw & Flip Events ────────────────────────────────────
  cardWrappers.forEach(wrapper => {
    const card = wrapper.querySelector('.use-case-card');
    const putBackBtn = wrapper.querySelector('.put-back-btn');

    // Click card to draw into center & flip in 3D
    wrapper.addEventListener('click', (e) => {
      // Don't draw if user clicks put-back button or a modal trigger
      if (e.target.closest('.put-back-btn') || e.target.closest('a') || e.target.closest('button')) {
        return;
      }

      const isActive = wrapper.classList.contains('is-active');

      // Reset all other cards
      cardWrappers.forEach(w => {
        w.classList.remove('is-active');
        const c = w.querySelector('.use-case-card');
        if (c) c.classList.remove('is-flipped');
      });

      if (!isActive) {
        wrapper.classList.add('is-active');
        if (card) card.classList.add('is-flipped');
        container.classList.add('has-active');
      } else {
        container.classList.remove('has-active');
      }
    });

    // Put Back button returns card to deck
    if (putBackBtn) {
      putBackBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        wrapper.classList.remove('is-active');
        if (card) card.classList.remove('is-flipped');
        container.classList.remove('has-active');
      });
    }
  });

  // Click outside craft section returns active card
  document.addEventListener('click', (e) => {
    if (!e.target.closest('#craft') && !e.target.closest('#contact-modal')) {
      cardWrappers.forEach(w => {
        w.classList.remove('is-active');
        const c = w.querySelector('.use-case-card');
        if (c) c.classList.remove('is-flipped');
      });
      container.classList.remove('has-active');
    }
  });
}

/* ==========================================================================
   5. RELIABILITY PRINCIPLE RAIL LASER & SPOTLIGHT CONSOLE
   ========================================================================== */
function initPrincipleRailInteractive() {
  const consoleEl = document.querySelector('.reliability-console');
  if (!consoleEl) return;

  const laserBeam = consoleEl.querySelector('.reliability-laser-beam');
  const stages = consoleEl.querySelectorAll('.reliability-stage');

  // Spotlight mousemove tracking inside the console
  consoleEl.addEventListener('mousemove', (e) => {
    const rect = consoleEl.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    consoleEl.style.setProperty('--mouse-x', `${x}px`);
    consoleEl.style.setProperty('--mouse-y', `${y}px`);

    if (laserBeam) {
      const beamX = Math.max(0, Math.min(rect.width - 140, x - 70));
      laserBeam.style.left = `${beamX}px`;
      laserBeam.style.opacity = '1';
    }
  });

  consoleEl.addEventListener('mouseleave', () => {
    if (laserBeam) {
      laserBeam.style.opacity = '0.4';
    }
  });

  // Reveal stages sequentially on scroll into view
  if (stages.length) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stages.forEach((stage, idx) => {
            setTimeout(() => {
              stage.classList.add('is-revealed');
            }, idx * 90);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(consoleEl);
  }
}

/* ==========================================================================
   6. ROLLING TELEMETRY STATS COUNTER ANIMATION
   ========================================================================== */
function initStatCounters() {
  const counterEls = document.querySelectorAll('.counter-val');
  if (!counterEls.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const animateCounter = (el) => {
    const target = parseFloat(el.getAttribute('data-target')) || 0;
    const decimals = parseInt(el.getAttribute('data-decimals') || '0', 10);
    const prefix = el.getAttribute('data-prefix') || '';
    const suffix = el.getAttribute('data-suffix') || '';

    if (prefersReducedMotion) {
      el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      return;
    }

    const duration = 1400; // ms
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const current = target * easeProgress;

      el.textContent = `${prefix}${current.toFixed(decimals)}${suffix}`;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = `${prefix}${target.toFixed(decimals)}${suffix}`;
      }
    }

    requestAnimationFrame(update);
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        counterEls.forEach((counter) => animateCounter(counter));
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  const metricsSection = document.getElementById('metrics');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   7. FUTURE DIRECTION MILESTONE FILTERING
   ========================================================================== */
function initFutureFilters() {
  const filterBtns = document.querySelectorAll('.future-filter-btn');
  const futureCards = document.querySelectorAll('.future-card');
  if (!filterBtns.length || !futureCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-future-filter') || 'all';

      futureCards.forEach(card => {
        const phase = card.getAttribute('data-phase');
        if (filter === 'all' || phase === filter) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });
}

/* ==========================================================================
   8. CONTACT MODAL & CLIPBOARD HELPERS
   ========================================================================== */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  const openBtns = document.querySelectorAll('.open-contact-modal');
  const closeBtns = document.querySelectorAll('.close-contact-modal, #close-modal-btn');
  const form = document.getElementById('contact-form');

  if (!modal) return;

  const openModal = (e) => {
    if (e) e.preventDefault();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    const firstInput = modal.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 60);
  };

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  openBtns.forEach(btn => btn.addEventListener('click', openModal));
  closeBtns.forEach(btn => btn.addEventListener('click', closeModal));

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      const nameInput = document.getElementById('contact-name');
      const emailInput = document.getElementById('contact-email');
      const topicInput = document.getElementById('contact-topic');
      const msgInput = document.getElementById('contact-msg');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const topicText = topicInput ? topicInput.options[topicInput.selectedIndex].text : 'General Inquiry';
      const msg = msgInput ? msgInput.value.trim() : '';

      const originalText = submitBtn ? submitBtn.innerHTML : 'Send Message ➔';
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span class="inline-flex items-center gap-2">
            <svg class="animate-spin w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Connecting...</span>
          </span>`;
      }

      // Automatically dispatch message directly to capitechnoteam@gmail.com
      const payload = {
        name: name,
        email: email,
        category: topicText,
        message: msg,
        _subject: `New CAPI Inquiry: [${topicText}] from ${name}`,
        _template: 'table'
      };

      try {
        const response = await fetch('https://formsubmit.co/ajax/capitechnoteam@gmail.com', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json().catch(() => ({}));

        if (response.ok && (result.success === 'true' || result.success === true)) {
          closeModal();
          showToast('Message sent directly to capitechnoteam@gmail.com!');
          form.reset();
        } else {
          // Reliable fallback to mailto draft if external service requires initial activation
          fallbackMailto(topicText, name, email, msg);
        }
      } catch (err) {
        // Fallback to client mailto if offline or blocked
        fallbackMailto(topicText, name, email, msg);
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalText;
        }
      }
    });
  }
}

function fallbackMailto(topicText, name, email, msg) {
  const modal = document.getElementById('contact-modal');
  if (modal) modal.classList.remove('active');
  document.body.style.overflow = '';
  showToast('Opening email client for capitechnoteam@gmail.com...');
  const mailSubject = encodeURIComponent(`CAPI Inquiry: ${topicText} - ${name}`);
  const mailBody = encodeURIComponent(
    `Hello CAPI Technologies Team,\n\n${msg}\n\n---\nSender Name: ${name}\nSender Email: ${email}\nInquiry Category: ${topicText}`
  );
  window.location.href = `mailto:capitechnoteam@gmail.com?subject=${mailSubject}&body=${mailBody}`;
  const form = document.getElementById('contact-form');
  if (form) form.reset();
}

function initEmailCopy() {
  const copyBtn = document.getElementById('copy-email-btn');
  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'capitechnoteam@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied official team email: ${email}`);
    }).catch(() => {
      showToast(`Team email: ${email}`);
    });
  });
}

function showToast(message) {
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.remove('opacity-0', 'pointer-events-none');
  toast.classList.add('opacity-100');

  setTimeout(() => {
    toast.classList.remove('opacity-100');
    toast.classList.add('opacity-0', 'pointer-events-none');
  }, 3500);
}


/* ==========================================================================
   9. VINTAGE RETRO CRT TELEVISION 4-CHANNEL CONTROLLER
   ========================================================================== */
function initRetroTelevision() {
  const channelKnob = document.getElementById('tv-channel-knob');
  const tuneKnob = document.getElementById('tv-tune-knob');
  const tvGif = document.getElementById('tv-screen-gif');
  const channelLabel = document.getElementById('tv-channel-label');
  const tickerText = document.getElementById('tv-ticker-text');
  const crtStatic = document.getElementById('crt-static');
  const presetBtns = document.querySelectorAll('.tv-channel-preset');

  if (!tvGif) return;

  const tvChannels = [
    {
      id: 1,
      title: 'CH 01  CERAMICS',
      gif: 'assests/Blue Husky’s Pottery.gif',
      alt: 'CAPI Craft Mascot - Ceramics & Pottery Artistry',
      ticker: '✦ THE ART OF THE MAKER ✦ CERAMICS & CLAY ARTISTRY ✦ AUTHENTIC PROVENANCE ✦ TRADITIONAL CREATORS ✦'
    },
    {
      id: 2,
      title: 'CH 02  TEXTILES',
      gif: 'assests/Blue Husky Tailor.gif',
      alt: 'CAPI Craft Mascot - Heritage Textiles & Tailoring',
      ticker: '✦ THE ART OF THE MAKER ✦ HERITAGE TEXTILES & TAILORING ✦ GLOBAL DISCOVERY ✦ MASTER WEAVERS ✦'
    },
    {
      id: 3,
      title: 'CH 03  WOODCRAFT',
      gif: 'assests/Blue Foxy Woodworking.gif',
      alt: 'CAPI Craft Mascot - Fine Woodcraft & Joinery',
      ticker: '✦ THE ART OF THE MAKER ✦ FINE WOODCRAFT & JOINERY ✦ ENDURING HERITAGE ✦ MINDFUL CREATION ✦'
    },
    {
      id: 4,
      title: 'CH 04  PAINTING',
      gif: 'assests/Blue Husky’s Painting.gif',
      alt: 'CAPI Craft Mascot - Traditional Art & Painting',
      ticker: '✦ THE ART OF THE MAKER ✦ TRADITIONAL ART & PAINTING ✦ CULTURAL HERITAGE ✦ DIGITAL PATHWAYS ✦'
    }
  ];

  let currentChannel = 1;
  let knobRotation = 0;
  let tuneAngle = 0;

  // Mechanical switch audio click via Web Audio API
  function playKnobClick(freq = 240) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 0.035);
      
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.035);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.035);
    } catch (e) {}
  }

  function setChannel(channelId) {
    const channel = tvChannels.find(c => c.id === channelId) || tvChannels[0];
    currentChannel = channel.id;

    // Rotate knob to correspond to 4 channel positions (0°, 90°, 180°, 270°)
    knobRotation = (channel.id - 1) * 90;
    if (channelKnob) {
      channelKnob.style.transform = `rotate(${knobRotation}deg)`;
    }

    playKnobClick(240 + channel.id * 30);

    // Momentary CRT Static Noise Flash on channel switch
    if (crtStatic) {
      crtStatic.classList.add('active');
      setTimeout(() => {
        crtStatic.classList.remove('active');
      }, 140);
    }

    // Update Mascot GIF
    tvGif.src = channel.gif;
    tvGif.alt = channel.alt;

    // Update Realistic Green Phosphor OSD Label (No green dot)
    if (channelLabel) {
      channelLabel.textContent = channel.title;
    }

    // Update Bottom Marquee Chyron
    if (tickerText) {
      tickerText.innerHTML = `<span>${channel.ticker}</span>`;
    }

    // Update Preset Buttons Active State
    presetBtns.forEach(btn => {
      const btnCh = parseInt(btn.getAttribute('data-tv-channel'), 10);
      if (btnCh === currentChannel) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });
  }

  // Rotary Knob Click: cycle to next channel
  if (channelKnob) {
    channelKnob.addEventListener('click', () => {
      const nextChannel = (currentChannel % 4) + 1;
      setChannel(nextChannel);
    });
  }

  // Preset Buttons: direct channel jump
  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const ch = parseInt(btn.getAttribute('data-tv-channel'), 10);
      if (ch && ch !== currentChannel) {
        setChannel(ch);
      }
    });
  });

  // Fine Tuning Knob Click
  if (tuneKnob) {
    tuneKnob.addEventListener('click', () => {
      tuneAngle += 45;
      tuneKnob.style.transform = `rotate(${tuneAngle}deg)`;
      playKnobClick(400);

      if (crtStatic) {
        crtStatic.classList.add('active');
        setTimeout(() => crtStatic.classList.remove('active'), 80);
      }
    });
  }
}

/* ==========================================================================
   10. REFINED INTRO / SPLASH SCREEN CONTROLLER
   Features Blue Husky intro GIF as the central loading character (No CAPI logo)
   ========================================================================== */
function initSplashScreen() {
  const splash = document.getElementById('splash-screen');
  const progressBar = document.getElementById('splash-progress-bar');
  const percentEl = document.getElementById('splash-percent');
  const skipBtn = document.getElementById('splash-skip-btn');

  if (!splash) return;

  // Lock scroll during splash
  document.body.classList.add('splash-active');
  document.body.style.overflow = 'hidden';

  let isDismissed = false;

  function dismissSplash() {
    if (isDismissed) return;
    isDismissed = true;

    // Smooth fade out & unlock scroll
    splash.classList.add('splash-hidden');
    document.body.classList.remove('splash-active');
    document.body.style.overflow = '';

    // Remove from layout after fade animation completes
    setTimeout(() => {
      splash.style.display = 'none';
    }, 600);
  }

  // Smooth simulated progress from 0% to 100% over ~1.8 seconds
  const totalDuration = 1800; // ms
  const startTime = performance.now();

  function updateProgress(currentTime) {
    if (isDismissed) return;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / totalDuration, 1);

    // Ease-out curve for natural deceleration towards 100%
    const eased = 1 - Math.pow(1 - progress, 2);
    const percent = Math.round(eased * 100);

    if (progressBar) {
      progressBar.style.width = `${percent}%`;
    }
    if (percentEl) {
      percentEl.textContent = `${percent}%`;
    }

    if (progress < 1) {
      requestAnimationFrame(updateProgress);
    } else {
      // Hold 100% state for 140ms then smoothly dismiss
      setTimeout(dismissSplash, 140);
    }
  }

  requestAnimationFrame(updateProgress);

  // Skip button click
  if (skipBtn) {
    skipBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      dismissSplash();
    });
  }

  // Allow clicking anywhere on splash to enter immediately
  splash.addEventListener('click', () => {
    dismissSplash();
  });

  // Keyboard shortcuts (Escape, Enter, Space) to skip
  window.addEventListener('keydown', (e) => {
    if (!isDismissed && (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ')) {
      dismissSplash();
    }
  }, { once: true });
}

/* ==========================================================================
   14. SCROLL REVEAL CONTROLLER
   - Lightweight IntersectionObserver for viewport entry
   - Staggered reveals (heading -> paragraph -> cards)
   - Triggers once per page load and maintains visibility
   - Respects prefers-reduced-motion and provides focus-within / JS-free fallback
   ========================================================================== */
function initScrollReveal() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealElements = document.querySelectorAll('.reveal-item');

  if (!revealElements.length) return;

  // If user prefers reduced motion or browser does not support IntersectionObserver, reveal immediately
  if (prefersReducedMotion || !('IntersectionObserver' in window)) {
    revealElements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  // Enable animation mode on root element
  document.documentElement.classList.add('js-reveal');

  // Early trigger threshold: rootMargin triggers when element enters lower 10% of viewport
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.08
  });

  revealElements.forEach(el => {
    observer.observe(el);

    // Ensure keyboard focus immediately reveals content
    el.addEventListener('focusin', () => {
      el.classList.add('is-visible');
      observer.unobserve(el);
    }, { passive: true });
  });
}

/* ==========================================================================
   10. INTERACTIVE 3D PERSPECTIVE FOR SURVEY FOX PAW CARDS
   ========================================================================== */
function initSurveyCards() {
  const interactiveItems = document.querySelectorAll('.fox-paw-card');
  if (!interactiveItems.length) return;

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReduced) return;

  interactiveItems.forEach(item => {
    let bounds = null;
    let rafId = null;

    const updateBounds = () => {
      bounds = item.getBoundingClientRect();
    };

    item.addEventListener('mouseenter', updateBounds, { passive: true });

    item.addEventListener('mousemove', (e) => {
      if (!bounds) updateBounds();
      const mouseX = e.clientX - bounds.left;
      const mouseY = e.clientY - bounds.top;

      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const normX = (mouseX / bounds.width - 0.5) * 2; // -1 to 1
        const normY = (mouseY / bounds.height - 0.5) * 2; // -1 to 1

        const tiltX = -normY * 3.0; // Restrained, elegant 3.0deg max
        const tiltY = normX * 3.0;

        item.style.transform = `perspective(1000px) rotateX(${tiltX.toFixed(2)}deg) rotateY(${tiltY.toFixed(2)}deg) translateZ(2px)`;
      });
    }, { passive: true });

    item.addEventListener('mouseleave', () => {
      if (rafId) cancelAnimationFrame(rafId);
      item.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
      bounds = null;
    });
  });
}



