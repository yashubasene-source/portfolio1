// === MOBILE PERFORMANCE + BEFORE/AFTER SLIDER INIT ===
// Ye script.js ke end me add karo, ya DOMContentLoaded me call karo

// ===== MOBILE PERFORMANCE DETECTION =====
// Ye check karta hai ki device low-end hai ya nahi
const IS_MOBILE = window.innerWidth <= 768 || !window.matchMedia('(pointer: fine)').matches;
const IS_LOW_END = IS_MOBILE && (navigator.hardwareConcurrency || 4) <= 4;

// Mobile pe Three.js canvas skip karna (CSS display:none se hidden rahega)
// Grain animation JS se bhi off karo
if (IS_MOBILE) {
  // Lenis smooth scroll bhi mobile pe lite mode me
  // (already initialized upar, but isko override karte hain)
  try {
    // Reduce GSAP animation complexity on mobile
    gsap.globalTimeline.timeScale(IS_LOW_END ? 1.5 : 1.2);
  } catch(e) {}
}

// ===== VIDEO AUTOPLAY OPTIMIZATION =====
// Auto-pause background videos when they scroll out of view to save CPU/GPU
function initVideoOptimization() {
  const videos = document.querySelectorAll('video[autoplay]');
  if (!videos.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.play().catch(e => console.log('Autoplay prevented:', e));
      } else {
        entry.target.pause();
      }
    });
  }, { rootMargin: '200px' });

  videos.forEach(vid => observer.observe(vid));
}

// ===== BEFORE/AFTER SLIDER LOGIC =====
function initBeforeAfterSliders() {
  const sliders = [
    { wrap: 'ba-wrap-1', after: 'ba-after-1', divider: 'ba-div-1' },
    { wrap: 'ba-wrap-2', after: 'ba-after-2', divider: 'ba-div-2' }
  ];

  sliders.forEach(({ wrap, after, divider }) => {
    const wrapEl = document.getElementById(wrap);
    const afterEl = document.getElementById(after);
    const divEl = document.getElementById(divider);
    if (!wrapEl || !afterEl || !divEl) return;

    let isDragging = false;

    function updateSlider(clientX) {
      const rect = wrapEl.getBoundingClientRect();
      let pct = (clientX - rect.left) / rect.width;
      pct = Math.max(0.02, Math.min(0.98, pct));
      const pctStr = `${pct * 100}%`;
      afterEl.style.clipPath = `polygon(0 0, ${pctStr} 0, ${pctStr} 100%, 0 100%)`;
      divEl.style.left = pctStr;
    }

    // Mouse events
    wrapEl.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
      e.preventDefault();
    });

    window.addEventListener('mousemove', (e) => {
      if (!isDragging) return;
      updateSlider(e.clientX);
    });

    window.addEventListener('mouseup', () => { isDragging = false; });

    // Touch events (for mobile)
    wrapEl.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateSlider(e.touches[0].clientX);
      e.preventDefault();
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      updateSlider(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchend', () => { isDragging = false; });

    // Auto-animate on first viewport entry to hint the interaction
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Animate from 20% to 50% to hint draggability
          let progress = 0.2;
          const hint = setInterval(() => {
            progress = Math.min(progress + 0.015, 0.5);
            const p = `${progress * 100}%`;
            afterEl.style.clipPath = `polygon(0 0, ${p} 0, ${p} 100%, 0 100%)`;
            divEl.style.left = p;
            if (progress >= 0.5) clearInterval(hint);
          }, 16);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(wrapEl);
  });
}

// ===== RESULTS COUNTER ANIMATION =====
function initResultCounters() {
  const counters = document.querySelectorAll('.result-number');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const text = el.textContent;
      // Only animate pure numbers
      const numMatch = text.match(/^(\d+)/);
      if (!numMatch) return;

      const target = parseInt(numMatch[1], 10);
      const suffix = text.slice(numMatch[1].length);
      let current = 0;
      const duration = 1800;
      const startTime = performance.now();

      const tick = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3); // easeOutCubic
        current = Math.floor(ease * target);
        el.textContent = current + suffix;
        if (progress < 1) requestAnimationFrame(tick);
        else el.textContent = target + suffix;
      };

      requestAnimationFrame(tick);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  initBeforeAfterSliders();
  initResultCounters();
  initVideoOptimization();
});
