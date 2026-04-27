/* ================================================================
   SOUND ENGINE + BUTTON FIXES + SCROLL SOUNDS
   ================================================================ */

// ============================================================
// PREMIUM SOUND ENGINE — Web Audio API (no external files)
// Cinematic click, hover, whoosh, reveal, scroll ticks
// ============================================================
window.SoundEngine = (function() {
  let ctx = null;
  let enabled = false;
  let lastScrollSound = 0;

  function getCtx() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) {}
    }
    return ctx;
  }

  function play(type) {
    if (!enabled) return;
    const c = getCtx();
    if (!c) return;

    const now = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.connect(gain);
    gain.connect(c.destination);

    const sounds = {
      // UI Click — sharp crisp
      click: () => {
        osc.type = 'square';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(400, now + 0.06);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now); osc.stop(now + 0.07);
      },
      // Hover — soft tap
      hover: () => {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        gain.gain.setValueAtTime(0.025, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
        osc.start(now); osc.stop(now + 0.05);
      },
      // Scroll tick — very soft
      scroll: () => {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(220, now);
        gain.gain.setValueAtTime(0.015, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now); osc.stop(now + 0.04);
      },
      // Section reveal — cinematic whoosh
      reveal: () => {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.exponentialRampToValueAtTime(440, now + 0.3);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now); osc.stop(now + 0.35);
      },
      // CTA button — success tone
      cta: () => {
        // Plays a mini chord
        [660, 880, 1100].forEach((freq, i) => {
          const o2 = c.createOscillator();
          const g2 = c.createGain();
          o2.connect(g2); g2.connect(c.destination);
          o2.type = 'sine';
          o2.frequency.setValueAtTime(freq, now + i * 0.04);
          g2.gain.setValueAtTime(0.04, now + i * 0.04);
          g2.gain.exponentialRampToValueAtTime(0.001, now + i * 0.04 + 0.15);
          o2.start(now + i * 0.04); o2.stop(now + i * 0.04 + 0.15);
        });
        osc.disconnect();
      },
      // Preloader countdown tick
      countdown: () => {
        osc.type = 'square';
        osc.frequency.setValueAtTime(660, now);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now); osc.stop(now + 0.09);
      },
      // FAQ open
      faq: () => {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.linearRampToValueAtTime(600, now + 0.12);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
        osc.start(now); osc.stop(now + 0.15);
      },
      // Filter / niche select
      filter: () => {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(700, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now); osc.stop(now + 0.08);
      },
      // Calculator chip select
      calc: () => {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(550, now);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);
        osc.start(now); osc.stop(now + 0.07);
      },
      // Theme toggle
      theme: () => {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now); osc.stop(now + 0.22);
      }
    };

    if (sounds[type]) sounds[type]();
  }

  function toggle() {
    enabled = !enabled;
    const btn = document.getElementById('sound-toggle');
    if (btn) {
      btn.classList.toggle('sound-on', enabled);
      btn.innerHTML = enabled
        ? '<i class="fas fa-volume-high"></i>'
        : '<i class="fas fa-volume-xmark"></i>';
      btn.title = enabled ? 'Sound: ON' : 'Sound: OFF';
    }
    if (enabled) {
      // Resume AudioContext if needed (browser policy)
      const c = getCtx();
      if (c && c.state === 'suspended') c.resume();
      play('cta');
    }
  }

  return { play, toggle, isEnabled: () => enabled };
})();

// ============================================================
// ATTACH SOUNDS TO ALL INTERACTIVE ELEMENTS
// ============================================================
document.addEventListener('DOMContentLoaded', function() {

  // Sound toggle button
  const soundBtn = document.getElementById('sound-toggle');
  if (soundBtn) soundBtn.addEventListener('click', () => window.SoundEngine.toggle());

  // Theme toggle
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', () => window.SoundEngine.play('theme'));

  // All CTA buttons — primary, WA, hire
  document.querySelectorAll('.btn-primary, .wa-btn, .nav-cta, #calc-wa-btn').forEach(el => {
    el.addEventListener('click', () => window.SoundEngine.play('cta'));
  });

  // Regular buttons
  document.querySelectorAll('.btn, .btn-outline, .btn-cv, .filter-btn').forEach(el => {
    el.addEventListener('click', () => window.SoundEngine.play('click'));
  });

  // Niche tags
  document.querySelectorAll('.niche-tag').forEach(el => {
    el.addEventListener('click', () => window.SoundEngine.play('filter'));
  });

  // Calculator chips
  document.querySelectorAll('.calc-chip').forEach(el => {
    el.addEventListener('click', () => window.SoundEngine.play('calc'));
  });

  // FAQ accordion
  document.querySelectorAll('.faq-q').forEach(el => {
    el.addEventListener('click', () => window.SoundEngine.play('faq'));
  });

  // Portfolio cards hover
  document.querySelectorAll('.port-card, .masonry-card').forEach(el => {
    el.addEventListener('mouseenter', () => window.SoundEngine.play('hover'));
  });

  // Nav links
  document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(el => {
    el.addEventListener('click', () => window.SoundEngine.play('click'));
  });

  // Scroll sound — throttled to 1 per 400ms
  window.addEventListener('scroll', () => {
    const now = Date.now();
    if (now - lastScrollSoundTime > 400) {
      window.SoundEngine.play('scroll');
      lastScrollSoundTime = now;
    }
  }, { passive: true });

  // Section reveal sound — when elements enter viewport
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > 0.3) {
        // Only play on section headings
        if (entry.target.classList.contains('title')) {
          window.SoundEngine.play('reveal');
        }
        revealObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  document.querySelectorAll('.title.reveal').forEach(el => revealObs.observe(el));

});

// Scroll time tracker
let lastScrollSoundTime = 0;

// ============================================================
// FIX: NICHE BAR FILTER — works with showcase.js data
// ============================================================
window.filterNiche = function(btn, niche) {
  // Active state
  document.querySelectorAll('.niche-tag').forEach(b => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  window.SoundEngine.play('filter');

  // Map niche to category keywords
  const map = {
    'all': null,
    'youtube': ['youtube', 'educational', 'reel', 'short', 'motivation'],
    'political': ['political', 'documentary', 'campaign'],
    'realestate': ['real estate', 'property', 'realestate', 'commercial'],
    'educational': ['educational', 'education', 'academic'],
    'commercial': ['commercial', 'brand', 'advertising', 'promo'],
    'graphics': ['graphic', 'poster', 'thumbnail', 'logo', 'design', 'typography']
  };
  const keywords = map[niche] || null;

  // Filter .masonry-card (showcase.js cards)
  document.querySelectorAll('#showcase-grid .masonry-card').forEach(card => {
    if (!keywords) {
      card.style.display = '';
      card.style.opacity = '1';
      return;
    }
    const cat = (card.dataset.category || '').toLowerCase();
    const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();
    const matches = keywords.some(k => cat.includes(k) || title.includes(k));
    card.style.display = matches ? '' : 'none';
    if (matches) {
      card.style.opacity = '0';
      setTimeout(() => card.style.opacity = '1', 50);
    }
  });

  // Also filter .port-card if any
  document.querySelectorAll('.port-card').forEach(card => {
    if (!keywords) { card.removeAttribute('data-niche-hidden'); return; }
    const cat = (card.dataset.category || '').toLowerCase();
    const matches = keywords.some(k => cat.includes(k));
    matches ? card.removeAttribute('data-niche-hidden') : card.setAttribute('data-niche-hidden','true');
  });

  // Update count
  const countEl = document.getElementById('sc-count');
  if (countEl && niche !== 'all') {
    const vis = document.querySelectorAll('#showcase-grid .masonry-card:not([style*="display: none"]):not([style*="display:none"])').length;
    countEl.textContent = vis > 0 ? `${vis} projects` : 'No projects in this niche yet';
  } else if (countEl) {
    countEl.textContent = '';
  }
};

// ============================================================
// FIX: WHATSAPP BRIEF WIDGET — Real phone number
// ============================================================
(function fixWAWidget() {
  const sendBtn = document.getElementById('wa-brief-send');
  const panel = document.getElementById('wa-brief-panel');
  const trigger = document.getElementById('wa-brief-trigger');
  const closeBtn = document.getElementById('wa-brief-close');

  if (trigger) {
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      panel?.classList.toggle('open');
      window.SoundEngine.play('click');
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      panel?.classList.remove('open');
    });
  }

  document.addEventListener('click', (e) => {
    if (panel && !panel.contains(e.target) && !trigger?.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const type = document.getElementById('wa-type')?.value || 'Not specified';
      const budget = document.getElementById('wa-budget')?.value || 'Flexible';
      const deadline = document.getElementById('wa-deadline')?.value || 'Flexible';

      if (type === 'Not specified' || type === '') {
        document.getElementById('wa-type')?.focus();
        return;
      }

      const msg = encodeURIComponent(
        `Hi Anshay! 👋 I want to hire you.\n\n` +
        `📌 Service: *${type}*\n` +
        `💰 Budget: *${budget}*\n` +
        `⏰ Deadline: *${deadline}*\n\n` +
        `Please share your availability and portfolio!`
      );
      // Real WhatsApp number
      window.open(`https://wa.me/918319610243?text=${msg}`, '_blank');
      panel?.classList.remove('open');
      window.SoundEngine.play('cta');
    });
  }
})();

// ============================================================
// FIX: PRICING CALCULATOR WhatsApp — Real number
// ============================================================
(function fixCalcWA() {
  const btn = document.getElementById('calc-wa-btn');
  if (!btn) return;
  // Override the href to use WhatsApp instead of #contact
  btn.removeAttribute('href');
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const price = document.getElementById('calc-price')?.textContent || 'Flexible';
    const delivery = document.getElementById('calc-delivery-time')?.textContent || 'Standard';
    const msg = encodeURIComponent(
      `Hi Anshay! 👋 I got a price estimate from your portfolio.\n\n` +
      `💰 My Budget Range: *${price}*\n` +
      `⏰ Delivery: *${delivery}*\n\n` +
      `Can we discuss my project?`
    );
    window.open(`https://wa.me/918319610243?text=${msg}`, '_blank');
    window.SoundEngine.play('cta');
  });
})();

// ============================================================
// FIX: PRELOADER COUNTDOWN SOUNDS
// ============================================================
(function hookPreloaderSounds() {
  // Wait for preloader to be in DOM
  const observer = new MutationObserver(() => {
    const numEl = document.getElementById('pl-number');
    if (!numEl) return;
    let lastNum = numEl.textContent;
    setInterval(() => {
      const curr = numEl.textContent;
      if (curr !== lastNum && /^\d$/.test(curr)) {
        window.SoundEngine.play('countdown');
        lastNum = curr;
      }
    }, 100);
    observer.disconnect();
  });
  observer.observe(document.body, { childList: true, subtree: true });
})();

// ============================================================
// SCROLL MOMENTUM MICRO-ANIMATION (Smooth elastic feel)
// ============================================================
(function initScrollMomentum() {
  if (window.innerWidth <= 768) return; // desktop only

  let scrollVelocity = 0;
  let lastScrollY = window.scrollY;
  let ticking = false;

  window.addEventListener('scroll', () => {
    scrollVelocity = window.scrollY - lastScrollY;
    lastScrollY = window.scrollY;

    if (!ticking) {
      requestAnimationFrame(() => {
        // Subtle parallax momentum on hero elements
        const skew = Math.max(-2, Math.min(2, scrollVelocity * 0.08));
        const heroInner = document.querySelector('.hero-inner');
        if (heroInner) {
          heroInner.style.transform = `skewY(${skew}deg)`;
          heroInner.style.transition = skew === 0 ? 'transform 0.5s ease' : 'none';
        }

        // Add gravity tilt to floating icons
        document.querySelectorAll('.parallax-icon').forEach(icon => {
          const speed = parseFloat(icon.dataset.speed || 1);
          const translate = scrollVelocity * speed * 0.3;
          icon.style.transform = `translateY(${translate}px)`;
        });

        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Reset on scroll stop
  let scrollStopTimer;
  window.addEventListener('scroll', () => {
    clearTimeout(scrollStopTimer);
    scrollStopTimer = setTimeout(() => {
      const heroInner = document.querySelector('.hero-inner');
      if (heroInner) {
        heroInner.style.transform = '';
        heroInner.style.transition = 'transform 0.6s ease';
      }
      document.querySelectorAll('.parallax-icon').forEach(icon => {
        icon.style.transform = '';
        icon.style.transition = 'transform 0.5s ease';
      });
    }, 150);
  }, { passive: true });
})();
