/* ================================================================
   EXTRAS.JS — All New Premium Feature Interactions
   ================================================================ */

/* ============================================================
   1. CINEMATIC PRELOADER
   ============================================================ */
(function initPreloader() {
  const pl = document.getElementById('preloader');
  if (!pl) return;

  const ring = document.getElementById('pl-ring-fill');
  const numEl = document.getElementById('pl-number');
  const actionEl = document.getElementById('pl-action');
  const slateTop = pl.querySelector('.pl-slate-top');
  const slateBot = pl.querySelector('.pl-slate-bottom');

  const circumference = 408; // 2 * pi * 65 ≈ 408
  let current = 3;
  let frameCount = 0;
  const totalFrames = 90; // 3 seconds at 30fps ticks
  const framesPerNum = 30;

  function updateRing(progress) {
    if (!ring) return;
    ring.style.strokeDashoffset = circumference - (circumference * progress);
  }

  function dismissPreloader() {
    // Flash ACTION
    if (actionEl) {
      actionEl.classList.add('show');
      setTimeout(() => actionEl.classList.remove('show'), 300);
    }
    // Open slate
    setTimeout(() => {
      if (slateTop) slateTop.classList.add('open');
      if (slateBot) slateBot.classList.add('open');
    }, 400);
    // Hide preloader
    setTimeout(() => {
      pl.classList.add('pl-hidden');
      document.body.style.overflow = '';
    }, 1100);
  }

  // Lock scroll while preloader shows
  document.body.style.overflow = 'hidden';

  // Skip button
  const skipBtn = document.getElementById('pl-skip');
  if (skipBtn) skipBtn.addEventListener('click', () => {
    frameCount = totalFrames;
    if (numEl) numEl.textContent = '▶';
    updateRing(1);
    dismissPreloader();
  });

  // Tick animation
  const tick = setInterval(() => {
    frameCount++;
    const progress = frameCount / totalFrames;
    updateRing(progress);

    const remaining = Math.ceil((totalFrames - frameCount) / framesPerNum);
    if (numEl && remaining > 0 && remaining !== current) {
      current = remaining;
      numEl.textContent = remaining;
      // Pulse effect
      numEl.style.transform = 'scale(1.3)';
      setTimeout(() => { if(numEl) numEl.style.transform = 'scale(1)'; }, 200);
    }

    if (frameCount >= totalFrames) {
      clearInterval(tick);
      if (numEl) numEl.textContent = '▶';
      dismissPreloader();
    }
  }, 1000 / 30); // 30fps
})();

/* ============================================================
   2. DARK / LIGHT MODE TOGGLE
   ============================================================ */
(function initThemeToggle() {
  const btn = document.getElementById('theme-toggle');
  if (!btn) return;

  const saved = localStorage.getItem('portfolio-theme');
  if (saved === 'light') {
    document.body.classList.add('light-mode');
    btn.innerHTML = '<i class="fas fa-moon"></i>';
  }

  btn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    btn.innerHTML = isLight ? '<i class="fas fa-moon"></i>' : '<i class="fas fa-sun"></i>';
    localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');

    // Click sound
    if (window.playClickSound) window.playClickSound();
  });
})();

/* ============================================================
   3. SUBTLE SOUND FX (Web Audio API — no external files)
   ============================================================ */
(function initSoundFX() {
  let soundEnabled = false;
  let audioCtx = null;

  function getAudio() {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    return audioCtx;
  }

  function playTone(freq = 440, dur = 0.05, type = 'sine', vol = 0.06) {
    if (!soundEnabled) return;
    try {
      const ctx = getAudio();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = type;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(vol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + dur);
      osc.start(ctx.currentTime);
      osc.stop(ctx.currentTime + dur);
    } catch(e) {}
  }

  // Expose globally
  window.playClickSound = () => playTone(660, 0.06, 'sine', 0.07);
  window.playHoverSound = () => playTone(440, 0.04, 'sine', 0.03);

  // Sound toggle button
  const soundBtn = document.getElementById('sound-toggle');
  if (soundBtn) {
    soundBtn.addEventListener('click', () => {
      soundEnabled = !soundEnabled;
      soundBtn.classList.toggle('sound-on', soundEnabled);
      soundBtn.innerHTML = soundEnabled
        ? '<i class="fas fa-volume-high"></i>'
        : '<i class="fas fa-volume-xmark"></i>';
      soundBtn.title = soundEnabled ? 'Sound: ON' : 'Sound: OFF';
      if (soundEnabled) playTone(520, 0.15, 'sine', 0.08);
    });
  }

  // Attach to buttons
  document.addEventListener('click', (e) => {
    if (e.target.closest('.btn, .niche-tag, .filter-btn, .faq-q, .calc-chip')) {
      playTone(600, 0.05, 'sine', 0.06);
    }
  });
  document.addEventListener('mouseover', (e) => {
    if (e.target.closest('.port-card, .result-card, .achievement-card')) {
      playTone(380, 0.04, 'sine', 0.02);
    }
  });
})();

/* ============================================================
   4. PRICING CALCULATOR
   ============================================================ */
(function initPricingCalculator() {
  const priceEl = document.getElementById('calc-price');
  const breakdownEl = document.getElementById('calc-breakdown');
  const deliveryEl = document.getElementById('calc-delivery-time');
  if (!priceEl) return;

  // Base prices (INR)
  const basePrices = {
    reel:       { base: 1200, label: 'Short Reel (< 60s)' },
    typography: { base: 700,  label: 'Typography Video' },
    longform:   { base: 3500, label: 'Long-Form Video' },
    documentary:{ base: 6000, label: 'Documentary Edit' },
    thumbnail:  { base: 400,  label: 'Thumbnail Design' },
    logo:       { base: 1800, label: 'Logo Design' },
    brand:      { base: 6000, label: 'Full Brand Identity' },
  };

  const turnaroundMult = { normal: 1.0, rush: 1.5 };
  const revisionAdd    = { two: 0, unlimited: 800 };
  const durationAdd    = { short: 0, medium: 800, long: 1800 };

  let state = {
    type: 'reel',
    duration: 'short',
    turnaround: 'normal',
    revisions: 'two',
  };

  function calcPrice() {
    const base = basePrices[state.type].base;
    const mult = turnaroundMult[state.turnaround];
    const dur  = durationAdd[state.duration];
    const rev  = revisionAdd[state.revisions];
    const subtotal = base + dur;
    const rush_add = state.turnaround === 'rush' ? Math.round(subtotal * 0.5) : 0;
    const total = Math.round(subtotal * mult) + rev;

    // Animate price
    animateValue(priceEl, parseInt(priceEl.dataset.current || '0'), total, 500);
    priceEl.dataset.current = total;

    // Update breakdown
    if (breakdownEl) {
      breakdownEl.innerHTML = `
        <div class="calc-breakdown-row"><span>${basePrices[state.type].label}</span><span>₹${subtotal.toLocaleString('en-IN')}</span></div>
        ${rush_add > 0 ? `<div class="calc-breakdown-row"><span>Rush Delivery (+50%)</span><span>+₹${rush_add.toLocaleString('en-IN')}</span></div>` : ''}
        ${rev > 0 ? `<div class="calc-breakdown-row"><span>Unlimited Revisions</span><span>+₹${rev}</span></div>` : ''}
        <div class="calc-breakdown-row total"><span>Estimated Total</span><span>₹${total.toLocaleString('en-IN')}</span></div>
      `;
    }

    if (deliveryEl) {
      deliveryEl.textContent = state.turnaround === 'rush' ? '24–48 hours' : '3–5 working days';
    }
  }

  function animateValue(el, from, to, dur) {
    const start = performance.now();
    function step(now) {
      const progress = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      el.textContent = '₹' + Math.round(from + (to - from) * ease).toLocaleString('en-IN');
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  // Handle chip clicks
  document.querySelectorAll('.calc-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const group = chip.dataset.group;
      const val = chip.dataset.val;
      // Deselect siblings
      document.querySelectorAll(`.calc-chip[data-group="${group}"]`).forEach(c => c.classList.remove('selected'));
      chip.classList.add('selected');
      state[group] = val;
      calcPrice();
    });
  });

  // WhatsApp CTA from calculator
  const calcWaBtn = document.getElementById('calc-wa-btn');
  if (calcWaBtn) {
    calcWaBtn.addEventListener('click', () => {
      const type = basePrices[state.type].label;
      const price = priceEl.textContent;
      const del = deliveryEl ? deliveryEl.textContent : '3-5 days';
      const msg = encodeURIComponent(`Hi Anshay! 👋\nI'm interested in: *${type}*\nEstimated Budget: *${price}*\nDelivery needed: ${del}\n\nCan we discuss further?`);
      window.open(`https://wa.me/917869XXXXXX?text=${msg}`, '_blank');
    });
  }

  // Init
  calcPrice();
})();

/* ============================================================
   5. FAQ ACCORDION
   ============================================================ */
(function initFAQ() {
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    if (!q) return;
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(i => i.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });
})();

/* ============================================================
   6. WHATSAPP QUICK BRIEF WIDGET
   ============================================================ */
(function initWABrief() {
  const trigger = document.getElementById('wa-brief-trigger');
  const panel   = document.getElementById('wa-brief-panel');
  const closeBtn= document.getElementById('wa-brief-close');
  const sendBtn = document.getElementById('wa-brief-send');
  if (!trigger || !panel) return;

  trigger.addEventListener('click', () => panel.classList.toggle('open'));
  if (closeBtn) closeBtn.addEventListener('click', () => panel.classList.remove('open'));

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!trigger.contains(e.target) && !panel.contains(e.target)) {
      panel.classList.remove('open');
    }
  });

  if (sendBtn) {
    sendBtn.addEventListener('click', () => {
      const type     = document.getElementById('wa-type')?.value || 'Video Editing';
      const budget   = document.getElementById('wa-budget')?.value || 'Flexible';
      const deadline = document.getElementById('wa-deadline')?.value || 'Flexible';
      const msg = encodeURIComponent(
        `Hi Anshay! 👋 I want to hire you.\n\n` +
        `📌 Service: *${type}*\n` +
        `💰 Budget: *${budget}*\n` +
        `⏰ Deadline: *${deadline}*\n\n` +
        `Please share your availability!`
      );
      // Replace with your actual WhatsApp number
      window.open(`https://wa.me/917869XXXXXX?text=${msg}`, '_blank');
      panel.classList.remove('open');
    });
  }
})();

/* ============================================================
   7. ANIMATED SKILL BARS (triggered on scroll)
   ============================================================ */
(function initSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  if (!bars.length) return;

  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const level = bar.dataset.level || '80';
      bar.style.width = level + '%';
      obs.unobserve(bar);
    });
  }, { threshold: 0.3 });

  bars.forEach(bar => obs.observe(bar));
})();

/* ============================================================
   8. OG IMAGE — meta tag update (runtime fallback)
   ============================================================ */
(function setOGMeta() {
  // Ensure OG tags are correct at runtime (backup for SSR-less env)
  const ogImg = document.querySelector('meta[property="og:image"]');
  if (ogImg && !ogImg.content.startsWith('http')) {
    ogImg.content = window.location.origin + '/' + ogImg.content;
  }
})();
