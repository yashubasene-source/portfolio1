/* ============================================================
   FEATURES.JS — Showreel Video, Urgency Slots, Niche Filter
   ============================================================ */

// ===== 1. SHOWREEL HERO VIDEO — load only on desktop =====
(function initShowreel() {
  if (window.innerWidth <= 768) return; // Skip on mobile
  const video = document.getElementById('hero-showreel');
  if (!video) return;

  // Only activate if a <source> tag exists with actual src
  const source = video.querySelector('source');
  if (!source || !source.src || source.src === window.location.href) return;

  video.style.display = 'block';
  video.load();
  video.addEventListener('canplay', () => {
    video.classList.add('loaded');
  }, { once: true });
})();

// ===== 2. URGENCY SLOTS — Dynamic slot countdown =====
(function initUrgencySlots() {
  // Realistic: changes based on day of month to feel dynamic
  // (not truly live but gives authentic feel)
  const today = new Date();
  const dayOfMonth = today.getDate();
  // Slots decrease through the month: 3 slots first half, 2 mid, 1 last week
  let slots;
  if (dayOfMonth <= 10) slots = 3;
  else if (dayOfMonth <= 20) slots = 2;
  else if (dayOfMonth <= 27) slots = 1;
  else slots = 0;

  const el = document.querySelector('.urgency-badge span:last-child');
  if (!el) return;

  if (slots === 0) {
    el.innerHTML = '<strong>Fully booked</strong> this month — DM for next month';
    const badge = document.querySelector('.urgency-badge');
    if (badge) badge.style.borderColor = 'rgba(255,80,80,0.5)';
  } else if (slots === 1) {
    el.innerHTML = 'Only <strong>1 slot</strong> left this month!';
  } else {
    el.innerHTML = `Only <strong>${slots} slots</strong> open this month`;
  }
})();

// ===== 3. NICHE FILTER FUNCTION — Removed, now handled in showcase.js =====

// ===== 4. HERO SHOWREEL VIDEO TOGGLE =====
// Ek small "Play Showreel" button add karna — hero right image click pe
(function initHeroShowreelTrigger() {
  const heroRight = document.querySelector('.hero-right');
  if (!heroRight) return;

  // Add play showreel CTA overlay on hero image
  const pill = document.querySelector('.hero-tools-pill');
  if (pill) {
    const reelBtn = document.createElement('button');
    reelBtn.className = 'hero-showreel-btn';
    reelBtn.id = 'hero-showreel-btn';
    reelBtn.innerHTML = '<i class="fas fa-play"></i> Play Showreel';
    reelBtn.title = 'Watch my showreel';
    reelBtn.onclick = function() {
      // Open lightbox with showreel — replace with your actual showreel link
      const reelUrl = 'https://www.youtube.com/embed/IvO_S5sEPrY?autoplay=1&rel=0';
      if (typeof openLightbox === 'function') {
        openLightbox(reelUrl, 'iframe', 'Anshay Basene — Showreel 2025');
      }
    };
    heroRight.appendChild(reelBtn);
  }
})();

// ===== 5. SMOOTH SHOWREEL BUTTON STYLE (injected via JS) =====
(function injectShowreelBtnStyles() {
  const s = document.createElement('style');
  s.textContent = `
    .hero-showreel-btn {
      margin-top: 20px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 12px 28px;
      border-radius: 100px;
      background: rgba(168,85,247,0.15);
      border: 1px solid rgba(168,85,247,0.4);
      color: #c084fc;
      font-family: 'Outfit', sans-serif;
      font-size: 0.85rem;
      font-weight: 700;
      letter-spacing: 1px;
      cursor: pointer;
      transition: all 0.25s;
      width: 100%;
      justify-content: center;
    }
    .hero-showreel-btn:hover {
      background: var(--accent);
      border-color: var(--accent);
      color: #fff;
      box-shadow: 0 8px 28px rgba(168,85,247,0.4);
      transform: translateY(-2px);
    }
    .hero-showreel-btn i {
      font-size: 0.9rem;
    }
    @media (max-width: 768px) {
      .hero-showreel-btn { font-size: 0.78rem; padding: 10px 20px; }
    }
  `;
  document.head.appendChild(s);
})();
