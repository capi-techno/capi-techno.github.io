/* ==========================================================================
   CAPI Technologies - Interactive Engine Script
   - Splash Loader Controller
   - Hero Node Connection Canvas (Unstructured -> Structured Concept)
   - Interactive LLM Pipeline Simulator with Streaming Typing Effect
   - Benchmark Metric Counter Animations
   - Contact Modal & Copy Email Toast
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initNavbarScroll();
  initHeroCanvas();
  initUseCasesObserver();
  initStatCounters();
  initContactModal();
});

/* ==========================================================================
   1. SPLASH SCREEN CONTROLLER
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
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      splash.style.display = 'none';
    }, 700);
  };

  if (skipBtn) {
    skipBtn.addEventListener('click', finishSplash);
  }

  // Auto finish splash when chevron diagnostic loader completes (~2.8s)
  setTimeout(() => {
    finishSplash();
  }, 2800);
}

function initChevronLoader() {
  const container = document.getElementById('chevron-bar');
  const msgEl = document.getElementById('splash-status-msg');
  const detailEl = document.getElementById('splash-status-detail');

  if (!container) return;

  const totalChevrons = 42;
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
    { targetRatio: 0.25, msg: "Initializing CAPI Engine", detail: "Connecting Nodes" },
    { targetRatio: 0.55, msg: "Measuring Latency", detail: "20 packets verified" },
    { targetRatio: 0.85, msg: "Validating LLM Pipelines", detail: "Claude & OpenAI API" },
    { targetRatio: 1.00, msg: "System Ready", detail: "Sub-Second SLA" }
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
      if (ratio <= st.targetRatio || st.targetRatio === 1.00) {
        if (msgEl) msgEl.textContent = st.msg;
        if (detailEl) detailEl.textContent = st.detail;
        break;
      }
    }

    if (currentStep >= totalChevrons) {
      clearInterval(timer);
    }
  }, 65);
}

/* ==========================================================================
   2. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('header.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. HERO NODE CANVAS (Unstructured -> Structured Data Particles Concept)
   ========================================================================== */
function initHeroCanvas() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function resize() {
    width = canvas.width = canvas.parentElement.offsetWidth;
    height = canvas.height = canvas.parentElement.offsetHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.8;
      this.vy = (Math.random() - 0.5) * 0.8;
      this.radius = Math.random() * 2 + 1.5;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(0, 102, 255, 0.4)';
      ctx.fill();
    }
  }

  for (let i = 0; i < 35; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    // Draw connecting lines between close particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 102, 255, ${0.15 * (1 - dist / 130)})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(animate);
  }

  animate();
}

/* ==========================================================================
   4. USE CASES & WHY CAPI SECTION ANIMATION OBSERVER
   ========================================================================== */
function initUseCasesObserver() {
  const cards = document.querySelectorAll('.use-case-card, .why-capi-card');
  if (!cards.length) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (prefersReducedMotion) {
    cards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'none';
    });
    return;
  }

  // Set initial state for animated entrance
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(16px)';
    card.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
  });

  const sectionEl = document.getElementById('use-cases');
  if (!sectionEl) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        cards.forEach((card, idx) => {
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, idx * 80);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  // Card Draw & Flip Event Listeners for Fanned Playing Cards
  const cardHandContainer = document.querySelector('.card-hand-container');
  const cardWrappers = document.querySelectorAll('.card-wrapper');

  if (cardHandContainer && cardWrappers.length) {
    cardWrappers.forEach(wrapper => {
      const card = wrapper.querySelector('.use-case-card');

      wrapper.addEventListener('click', (e) => {
        // Don't flip if user clicks contact modal link on back face
        if (e.target.closest('.open-contact-modal')) return;

        const isActive = wrapper.classList.contains('is-active');

        // Reset all wrappers & cards first
        cardWrappers.forEach(w => {
          w.classList.remove('is-active');
          const c = w.querySelector('.use-case-card');
          if (c) c.classList.remove('is-flipped');
        });

        if (!isActive) {
          wrapper.classList.add('is-active');
          if (card) card.classList.add('is-flipped');
          cardHandContainer.classList.add('has-active');
        } else {
          cardHandContainer.classList.remove('has-active');
        }
      });
    });

    // Close active card when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('#use-cases')) {
        cardWrappers.forEach(w => {
          w.classList.remove('is-active');
          const c = w.querySelector('.use-case-card');
          if (c) c.classList.remove('is-flipped');
        });
        cardHandContainer.classList.remove('has-active');
      }
    });
  }

  observer.observe(sectionEl);
}

/* ==========================================================================
   5. STAT COUNTERS ANIMATION ON SCROLL
   ========================================================================== */
function initStatCounters() {
  const counters = document.querySelectorAll('.counter-val');
  if (!counters.length) return;

  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseFloat(counter.dataset.target);
          const prefix = counter.dataset.prefix || '';
          const suffix = counter.dataset.suffix || '';
          const decimals = parseInt(counter.dataset.decimals || '0');
          let start = 0;
          const duration = 1500;
          const stepTime = 20;
          const steps = duration / stepTime;
          const increment = target / steps;

          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              counter.textContent = prefix + target.toFixed(decimals) + suffix;
              clearInterval(timer);
            } else {
              counter.textContent = prefix + start.toFixed(decimals) + suffix;
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('statistics');
  if (statsSection) observer.observe(statsSection);
}

/* ==========================================================================
   6. CONTACT MODAL & TOAST NOTIFICATIONS
   ========================================================================== */
function initContactModal() {
  const modal = document.getElementById('contact-modal');
  const openBtns = document.querySelectorAll('.open-contact-modal');
  const closeBtns = document.querySelectorAll('.close-contact-modal');
  const copyEmailBtn = document.getElementById('copy-email-btn');

  openBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
      }
    });
  });

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  });

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('contact@capi-techno.com').then(() => {
        showToast('📋 Contact email copied to clipboard!');
      }).catch(() => {
        showToast('contact@capi-techno.com');
      });
    });
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('🚀 Message received! The CAPI team will get back to you shortly.');
      if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
      contactForm.reset();
    });
  }
}

function showToast(message) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg class="w-5 h-5 text-blue-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
    </svg>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3200);
}
