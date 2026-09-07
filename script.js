/* ==========================================================================
   CAPI Technologies - Interactive Engine Script
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initSplashScreen();
  initNavbarScroll();
  initPipelineSimulator();
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

  // Prevent scroll during splash
  document.body.style.overflow = 'hidden';

  const finishSplash = () => {
    splash.classList.add('fade-out');
    document.body.style.overflow = 'auto';
    setTimeout(() => {
      splash.style.display = 'none';
    }, 800);
  };

  // Skip button click
  if (skipBtn) {
    skipBtn.addEventListener('click', finishSplash);
  }

  // Auto transition after loading progress bar completes (~2.5s)
  setTimeout(() => {
    finishSplash();
  }, 2600);
}

/* ==========================================================================
   2. NAVBAR SCROLL EFFECT
   ========================================================================== */
function initNavbarScroll() {
  const navbar = document.querySelector('header.navbar');
  if (!navbar) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}

/* ==========================================================================
   3. INTERACTIVE LLM PIPELINE SIMULATOR
   ========================================================================== */
const PIPELINE_DEMOS = {
  support: {
    title: "Support Ticket Ingestion",
    rawInput: `Help! My payment failed for sub_id #9421 on 2026-09-06. 
Charged $149 twice instead of once! Contact me at alex@enterprise.io ASAP. Urgent billing glitch.`,
    contextEval: {
      type: "Billing Escalation",
      urgency: "HIGH",
      extractedEntities: ["sub_id: 9421", "duplicate_charge: $149", "email: alex@enterprise.io"]
    },
    orchestration: "Anthropic Claude 3.5 Sonnet Router",
    latency: "382ms",
    structuredOutput: {
      "status": "success",
      "ticket_id": "TCK-88294",
      "category": "BILLING_DUPLICATE_CHARGE",
      "urgency_score": 0.94,
      "customer": {
        "email": "alex@enterprise.io",
        "subscription_id": "sub_id_9421"
      },
      "action_required": "INITIATE_REFUND_AUDIT",
      "estimated_refund": 149.00,
      "confidence": 0.998
    }
  },
  financial: {
    title: "Unstructured Invoice Analysis",
    rawInput: `INVOICE #INV-2026-88
Vendor: Global Cloud Corp (TAX: US99481)
Items: 
- 10x Enterprise Compute Nodes @ $450/mo = $4,500
- 1x Security Firewall Suite = $1,200
Total Due: $5,700 by Oct 1, 2026`,
    contextEval: {
      type: "Accounts Payable Parsing",
      urgency: "MEDIUM",
      extractedEntities: ["Vendor: Global Cloud Corp", "Total: $5,700", "DueDate: 2026-10-01"]
    },
    orchestration: "OpenAI GPT-4o JSON Mode Engine",
    latency: "415ms",
    structuredOutput: {
      "invoice_number": "INV-2026-88",
      "vendor_name": "Global Cloud Corp",
      "tax_id": "US99481",
      "currency": "USD",
      "line_items": [
        { "item": "Enterprise Compute Nodes", "qty": 10, "unit_price": 450.00, "total": 4500.00 },
        { "item": "Security Firewall Suite", "qty": 1, "unit_price": 1200.00, "total": 1200.00 }
      ],
      "amount_total": 5700.00,
      "due_date": "2026-10-01"
    }
  },
  tech: {
    title: "Unstructured System Diagnostics Log",
    rawInput: `2026-09-07T14:22:01Z [WARN] DB connection pool node-3 high latency 840ms.
2026-09-07T14:22:04Z [ERROR] Failed to obtain write lock on Supabase shard auth_db. Retrying...
2026-09-07T14:22:06Z [CRITICAL] OOM error on microservice worker-prod-9. Signal SIGKILL.`,
    contextEval: {
      type: "Telemetry Root Cause Classifier",
      urgency: "CRITICAL",
      extractedEntities: ["node: worker-prod-9", "shard: auth_db", "event: OOM_SIGKILL"]
    },
    orchestration: "Parallel LLM Ensemble Router (Claude + GPT-4o)",
    latency: "340ms",
    structuredOutput: {
      "incident_id": "INC-9014",
      "severity": "CRITICAL",
      "affected_service": "worker-prod-9",
      "root_cause": "OOM_OUT_OF_MEMORY",
      "correlated_events": [
        "DB connection pool latency spike (840ms)",
        "Supabase shard write lock contention"
      ],
      "recommended_action": "RESTART_CONTAINER_&_SCALE_RAM",
      "auto_healing_dispatched": true
    }
  }
};

function initPipelineSimulator() {
  const tabs = document.querySelectorAll('.demo-tab-btn');
  const rawInputEl = document.getElementById('pipeline-raw-input');
  const contextEl = document.getElementById('pipeline-context');
  const engineEl = document.getElementById('pipeline-engine');
  const outputEl = document.getElementById('pipeline-json-output');
  const latencyEl = document.getElementById('pipeline-latency');
  const runBtn = document.getElementById('run-pipeline-btn');

  if (!tabs.length || !outputEl) return;

  let currentKey = 'support';

  function updateSimulatorUI(key, animate = true) {
    const data = PIPELINE_DEMOS[key];
    currentKey = key;

    // Update active tab button style
    tabs.forEach(t => {
      if (t.dataset.key === key) {
        t.classList.add('bg-blue-600', 'text-white', 'border-blue-500');
        t.classList.remove('bg-gray-800/60', 'text-gray-400', 'border-gray-700/50');
      } else {
        t.classList.remove('bg-blue-600', 'text-white', 'border-blue-500');
        t.classList.add('bg-gray-800/60', 'text-gray-400', 'border-gray-700/50');
      }
    });

    if (rawInputEl) rawInputEl.value = data.rawInput;
    if (engineEl) engineEl.textContent = data.orchestration;

    if (animate) {
      // Simulate pipeline processing sequence
      outputEl.textContent = `// Executing CAPI LLM Pipeline...\n// Analyzing context & validating JSON schema...`;
      if (latencyEl) latencyEl.textContent = 'Processing...';

      setTimeout(() => {
        if (contextEl) {
          contextEl.innerHTML = `
            <div class="text-xs text-blue-400 font-mono mb-1">> Type: ${data.contextEval.type}</div>
            <div class="text-xs text-emerald-400 font-mono mb-1">> Urgency: ${data.contextEval.urgency}</div>
            <div class="text-xs text-gray-400 font-mono">> Extracted: [${data.contextEval.extractedEntities.join(', ')}]</div>
          `;
        }
        outputEl.textContent = JSON.stringify(data.structuredOutput, null, 2);
        if (latencyEl) latencyEl.textContent = data.latency;
      }, 500);
    } else {
      if (contextEl) {
        contextEl.innerHTML = `
          <div class="text-xs text-blue-400 font-mono mb-1">> Type: ${data.contextEval.type}</div>
          <div class="text-xs text-emerald-400 font-mono mb-1">> Urgency: ${data.contextEval.urgency}</div>
          <div class="text-xs text-gray-400 font-mono">> Extracted: [${data.contextEval.extractedEntities.join(', ')}]</div>
        `;
      }
      outputEl.textContent = JSON.stringify(data.structuredOutput, null, 2);
      if (latencyEl) latencyEl.textContent = data.latency;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      updateSimulatorUI(tab.dataset.key, true);
    });
  });

  if (runBtn) {
    runBtn.addEventListener('click', () => {
      updateSimulatorUI(currentKey, true);
      showToast('⚡ LLM Pipeline executed successfully!');
    });
  }

  // Initial load without forced delay
  updateSimulatorUI('support', false);
}

/* ==========================================================================
   4. STAT COUNTERS ANIMATION ON SCROLL
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
   5. CONTACT & COLLABORATION MODAL & TOAST NOTIFICATION
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

  // Handle contact form submission mock
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

/* Helper Toast Notification */
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
