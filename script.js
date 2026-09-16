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
  initRoadmapInteractive();
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

/* ==========================================================================
   8. INTERACTIVE ROADMAP & TECHNICAL SPECS MODAL CONTROLLER
   ========================================================================== */
const ROADMAP_DATA = {
  'phase-1': {
    phase: 'PHASE 01',
    status: 'ACTIVE STAGE',
    statusClass: 'bg-blue-50 text-[#0066FF] border-blue-200',
    title: 'MVP Core Validation & Orchestration SLA',
    description: 'Validating our core deterministic LLM pipeline, prompt engineering validation rules, and measuring sub-second handler response times under stress tests.',
    quarter: 'Q1 2025 (In Progress)',
    sla: 'Sub-second handler latency (< 450ms tested, P95 at 580ms)',
    deliverables: [
      '✓ Deterministic Prompt Engineering validation schema rules engine',
      '✓ Sub-second handler SLA verification across Claude 3.5 and OpenAI models',
      '✓ Baseline streaming token-throughput latency profiling',
      '⚡ Multi-turn session payload benchmark matrix'
    ],
    codeLang: 'JSON Schema (FastAPI Handler)',
    codeSnippet: `// CAPI Phase 01 Handler Core Definition
{
  "pipeline_id": "capi-orch-v1-core",
  "routing_policy": "latency_first",
  "validation": {
    "strict_schema": true,
    "max_input_tokens": 8192,
    "sla_threshold_ms": 450
  },
  "primary_model": "claude-3-5-sonnet-20241022",
  "deterministic_guardrails": [
    "json_mode_enforced",
    "prompt_injection_filter",
    "token_budget_cap"
  ]
}`
  },
  'phase-2': {
    phase: 'PHASE 02',
    status: 'IN ACTIVE DESIGN',
    statusClass: 'bg-blue-50 text-[#0066FF] border-blue-200',
    title: 'Enterprise Router & Multi-Model Dynamic Failover',
    description: 'Building an intelligent traffic routing layer that automatically hedges latency spikes, routes between Claude 3.5, OpenAI o1, and DeepSeek, and manages token budgets.',
    quarter: 'Q2 2025 (Design & Benchmark)',
    sla: 'Failover transition latency < 120ms with 0% dropped packets',
    deliverables: [
      '⚡ Multi-model automated failover circuit breaker (Anthropic & OpenAI)',
      '⚡ Redis 7 distributed token bucket rate limiter & quota manager',
      '○ Real-time P99 latency telemetry and anomaly alerts dashboard',
      '○ Semantic prompt caching layer for 40% cost reduction'
    ],
    codeLang: 'TypeScript / JSON Router Config',
    codeSnippet: `// CAPI Phase 02 Enterprise Router Config
export interface RouterPolicy {
  circuitBreaker: {
    failureThreshold: 3;
    recoveryTimeoutMs: 5000;
  };
  hedging: {
    backupDispatchMs: 350; // dispatch backup if primary stalls
    backupModel: "openai/o1-mini";
  };
  tokenBudgeting: {
    maxCostPerQueryUSD: 0.04;
    redisSlidingWindowSec: 60;
  };
}`
  },
  'phase-3': {
    phase: 'PHASE 03',
    status: 'PLANNED ARCHITECTURE',
    statusClass: 'bg-slate-100 text-slate-700 border-slate-200',
    title: 'SaaS SDK & Asynchronous Event Connectors',
    description: 'Providing client libraries for TypeScript/Python and out-of-the-box database connectors to Supabase, PostgreSQL, and webhook event dispatchers.',
    quarter: 'Q3 2025 (Target)',
    sla: 'Webhook retry deliverability guarantee with exponential backoff',
    deliverables: [
      '○ @capi-techno/node and capi-python official client SDKs',
      '○ Native Postgres & Supabase pgvector RAG memory connector',
      '○ High-concurrency webhook dispatcher with HMAC signatures',
      '○ Exportable JSON execution recipes and workflow templates'
    ],
    codeLang: 'TypeScript SDK Example',
    codeSnippet: `// CAPI Phase 03 Client SDK Usage Example
import { CapiClient } from '@capi-techno/sdk';

const capi = new CapiClient({
  apiKey: process.env.CAPI_SECRET_KEY,
  environment: 'production'
});

const result = await capi.orchestrate({
  task: 'document_summary_and_extraction',
  input: rawDocumentPayload,
  timeoutMs: 3000,
  webhook: 'https://api.company.com/webhooks/capi'
});`
  },
  'phase-4': {
    phase: 'PHASE 04',
    status: 'HORIZON / LAUNCH',
    statusClass: 'bg-slate-100 text-slate-700 border-slate-200',
    title: 'Public Platform Launch & Enterprise Multi-Tenancy',
    description: 'Opening the full CAPI platform to developers and enterprises globally with multi-tenant organizational spaces, SLA contracts, and distributed Edge API nodes.',
    quarter: 'Q4 2025 (Production Release)',
    sla: '99.9% Uptime Production SLA Guarantee with Financial Backing',
    deliverables: [
      '○ Multi-tenant SaaS workspace portal with team RBAC and SAML/SSO',
      '○ Automated tiered subscription & token usage metering portal',
      '○ Worldwide edge deployment on distributed Kubernetes clusters',
      '○ Enterprise SOC2 compliance and end-to-end payload encryption'
    ],
    codeLang: 'YAML Kubernetes / Edge Spec',
    codeSnippet: `apiVersion: capi.techno/v1
kind: TenantClusterSpec
metadata:
  name: enterprise-tenant-prod
spec:
  rbacPolicy: EnterpriseSSO
  highAvailability:
    regions: ["us-east-1", "eu-central-1", "ap-southeast-1"]
    minReplicas: 6
    targetSLA: "99.9%"
  security:
    encryptionAtRest: AES-256-GCM
    auditLogging: true`
  }
};

function initRoadmapInteractive() {
  // 1. Filter Tabs Interactivity
  const filterBtns = document.querySelectorAll('.roadmap-filter-btn');
  const phaseCards = document.querySelectorAll('.roadmap-phase-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Toggle active styling
      const themeStyles = {
        'all': { activeBg: 'bg-white/20 text-white', inactiveBg: 'bg-slate-100 border border-slate-200 text-slate-600' },
        'active': { activeBg: 'bg-white/20 text-white', inactiveBg: 'bg-sky-50 border border-sky-200 text-sky-500' },
        'in-design': { activeBg: 'bg-white/20 text-white', inactiveBg: 'bg-blue-50 border border-blue-200 text-[#0066FF]' },
        'upcoming': { activeBg: 'bg-white/20 text-white', inactiveBg: 'bg-emerald-50 border border-emerald-200 text-emerald-500' }
      };

      filterBtns.forEach(b => {
        const bFilter = b.dataset.filter;
        b.classList.remove('active', 'bg-[#0066FF]', 'text-white', 'border-blue-500');
        b.classList.add('bg-white', 'text-slate-700', 'border-slate-200');
        const iconBox = b.querySelector('.filter-icon-box');
        if (iconBox && themeStyles[bFilter]) {
          iconBox.className = `filter-icon-box w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 shadow-2xs transition-colors ${themeStyles[bFilter].inactiveBg}`;
        }
      });
      btn.classList.add('active', 'bg-[#0066FF]', 'text-white', 'border-blue-500');
      btn.classList.remove('bg-white', 'text-slate-700', 'border-slate-200');
      const activeIconBox = btn.querySelector('.filter-icon-box');
      if (activeIconBox && themeStyles[filter]) {
        activeIconBox.className = `filter-icon-box w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors ${themeStyles[filter].activeBg}`;
      }

      // Filter cards
      phaseCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter || (filter === 'upcoming' && category === 'upcoming')) {
          card.classList.remove('filtered-out');
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  // 2. Upvote Interactive Counters with LocalStorage persistence
  const savedUpvotes = JSON.parse(localStorage.getItem('capi_roadmap_upvotes') || '{}');
  const upvoteBtns = document.querySelectorAll('.roadmap-upvote-btn');

  upvoteBtns.forEach(btn => {
    const phaseKey = btn.dataset.phaseKey;
    const countEl = btn.querySelector('.upvote-count');
    let baseCount = parseInt(countEl.textContent, 10);

    if (savedUpvotes[phaseKey]) {
      btn.classList.add('upvoted');
      countEl.textContent = baseCount + 1;
    }

    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isUpvoted = btn.classList.contains('upvoted');
      let currentVal = parseInt(countEl.textContent, 10);

      btn.classList.add('upvote-animate');
      setTimeout(() => btn.classList.remove('upvote-animate'), 400);

      if (isUpvoted) {
        btn.classList.remove('upvoted');
        countEl.textContent = currentVal - 1;
        delete savedUpvotes[phaseKey];
        showToast('Feedback updated: vote withdrawn.');
      } else {
        btn.classList.add('upvoted');
        countEl.textContent = currentVal + 1;
        savedUpvotes[phaseKey] = true;
        const phaseTitle = btn.closest('.roadmap-phase-card')?.querySelector('h3')?.textContent || 'Milestone';
        showToast(`🚀 Upvoted ${phaseTitle}! Your feedback has been recorded.`);
      }
      localStorage.setItem('capi_roadmap_upvotes', JSON.stringify(savedUpvotes));
    });
  });

  // 3. Technical Specs Deep Dive Modal
  const modal = document.getElementById('roadmap-modal');
  const closeBtn = document.getElementById('close-roadmap-modal');
  const closeBottomBtn = document.getElementById('modal-close-bottom-btn');
  const requestAccessBtn = document.getElementById('modal-request-access-btn');
  const specsBtns = document.querySelectorAll('.roadmap-specs-btn');

  if (!modal) return;

  const openModalForPhase = (phaseId) => {
    const data = ROADMAP_DATA[phaseId];
    if (!data) return;

    // Populate Modal Content
    document.getElementById('modal-phase-badge').textContent = data.phase;
    const statusBadge = document.getElementById('modal-status-badge');
    statusBadge.textContent = data.status;
    statusBadge.className = `text-[10px] font-mono font-bold border px-2 py-0.5 rounded ${data.statusClass}`;

    document.getElementById('modal-phase-title').textContent = data.title;
    document.getElementById('modal-phase-desc').textContent = data.description;
    document.getElementById('modal-target-quarter').textContent = data.quarter;
    document.getElementById('modal-sla-target').textContent = data.sla;
    document.getElementById('modal-code-lang').textContent = data.codeLang;
    document.getElementById('modal-code-preview').textContent = data.codeSnippet;

    const listEl = document.getElementById('modal-deliverables-list');
    listEl.innerHTML = '';
    data.deliverables.forEach(item => {
      const li = document.createElement('li');
      li.className = 'flex items-start gap-2 text-slate-800';
      li.textContent = item;
      listEl.appendChild(li);
    });

    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  };

  specsBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const phaseId = btn.dataset.phaseId;
      openModalForPhase(phaseId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  if (closeBottomBtn) closeBottomBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  // Connect "Request Early Access" button to contact modal
  if (requestAccessBtn) {
    requestAccessBtn.addEventListener('click', () => {
      closeModal();
      const contactModal = document.getElementById('contact-modal');
      if (contactModal) {
        contactModal.classList.remove('hidden');
        contactModal.classList.add('flex');
        const selectEl = contactModal.querySelector('select');
        if (selectEl) {
          selectEl.value = 'Early SaaS MVP Access';
        }
      }
    });
  }
}
