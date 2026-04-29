/* ============================================================
   FEATURES.JS — Showreel Video, Urgency Slots, Niche Filter
   ============================================================ */

// ===== 1. SHOWREEL HERO VIDEO =====
(function initShowreel() {
  const video = document.getElementById('hero-showreel');
  if (!video) return;

  // Check if video has a direct src OR a child <source> tag
  const hasDirectSrc = video.src && video.src !== window.location.href;
  const source = video.querySelector('source');
  const hasSourceTag = source && source.src && source.src !== window.location.href;

  if (!hasDirectSrc && !hasSourceTag) return;

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

/* Showreel button styles moved to features.css — JS style injection removed to prevent FOUC and save main thread */
