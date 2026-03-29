/* =========================================
   SCRIPT.JS — Anshay Basene Portfolio
   Complete Interactive Functionality
   
   CORE LIBRARIES:
   - Three.js: 3D graphics (hero canvas with rotating meshes + particles)
   - GSAP: Animation library (tweens, ScrollTrigger, timelines)
   - Lenis: Smooth scrolling library (better UX than default scroll)
   - Font Awesome: Icon library (UI elements & social icons)
   
   KEY FUNCTIONALITY SECTIONS:
   1. Smooth Scroll Setup (Lenis + GSAP integration)
   2. Navbar scroll detection
   3. Reveal animations (fade-in on scroll)
   4. Hero section parallax
   5. 3D canvas with Three.js
   6. Horizontal reel infinite scroll
   7. Counter animations (hero stats)
   8. Skill bar progress animation
   9. Portfolio card 3D tilt
   10. Mobile menu toggle
   11. Skills tab switching
   12. Portfolio category filter
   13. Lightbox video player
   14. Custom cursor system
   15. Scroll progress tracking (timecode + circle)
   16. Parallax background icons
   
   PERFORMANCE OPTIMIZATIONS:
   - RequestAnimationFrame for smooth animations
   - Debounced scroll listeners
   - Mobile-optimized particle count (300 vs 1000 desktop)
   - Reduced three.js quality on mobile
   - CSS will-change for GPU acceleration
   
   ========================================= */

// ========== 1. LENIS SMOOTH SCROLL SETUP ========== 
// DESCRIPTION: Initialize Lenis library for buttery smooth scrolling experience
// WHY: Default mousewheel/scrollbar scrolling is often janky; Lenis smooths it out
// PARAMETERS:
//   - duration: 1.2s - Time for scroll to settle (higher = more "inertia")
//   - easing: Custom easing function for smooth deceleration
//   - smoothWheel: true - Smooths mouse wheel scrolling
//   - syncTouch: false - Don't smooth touch scroll (mobile handles this differently)
// 
// PERFORMANCE: Continuously runs via RAF (requestAnimationFrame), uses minimal CPU
/* =========================================
   SCRIPT.JS — Anshay Basene Portfolio
   Complete Interactive Functionality
   
   CORE LIBRARIES:
   - Three.js: 3D graphics (hero canvas with rotating meshes + particles)
   - GSAP: Animation library (tweens, ScrollTrigger, timelines)
   - Lenis: Smooth scrolling library (better UX than default scroll)
   - Font Awesome: Icon library (UI elements & social icons)
   
   KEY FUNCTIONALITY SECTIONS:
   1. Smooth Scroll Setup (Lenis + GSAP integration)
   2. Navbar scroll detection
   3. Reveal animations (fade-in on scroll)
   4. Hero section parallax
   5. 3D canvas with Three.js
   6. Horizontal reel infinite scroll
   7. Counter animations (hero stats)
   8. Skill bar progress animation
   9. Portfolio card 3D tilt
   10. Mobile menu toggle
   11. Skills tab switching
   12. Portfolio category filter
   13. Lightbox video player
   14. Custom cursor system
   15. Scroll progress tracking (timecode + circle)
   16. Parallax background icons
   
   PERFORMANCE OPTIMIZATIONS:
   - RequestAnimationFrame for smooth animations
   - Debounced scroll listeners
   - Mobile-optimized particle count (300 vs 1000 desktop)
   - Reduced three.js quality on mobile
   - CSS will-change for GPU acceleration
   
   ========================================= */

// ========== 1. LENIS SMOOTH SCROLL SETUP ========== 
// DESCRIPTION: Initialize Lenis library for buttery smooth scrolling experience
// WHY: Default mousewheel/scrollbar scrolling is often janky; Lenis smooths it out
// PARAMETERS:
//   - duration: 1.2s - Time for scroll to settle (higher = more "inertia")
//   - easing: Custom easing function for smooth deceleration
//   - smoothWheel: true - Smooths mouse wheel scrolling
//   - syncTouch: false - Don't smooth touch scroll (mobile handles this differently)
// 
// PERFORMANCE: Continuously runs via RAF (requestAnimationFrame), uses minimal CPU
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false,
});

// ========== LENIS ANIMATION LOOP ========== 
// Continuously update Lenis on every frame
// raf = requestAnimationFrame callback function
function raf(time) {
  lenis.raf(time);  // Update Lenis with current time
  requestAnimationFrame(raf);  // Loop continuously
}
requestAnimationFrame(raf);

// ========== 2. GSAP & ScrollTrigger INITIALIZATION ========== 
// Register ScrollTrigger plugin to enable scroll-based animations
// ScrollTrigger allows animations to trigger based on scroll position
/* ───────────────────────────────────────── */
gsap.registerPlugin(ScrollTrigger);

// ========== SYNC LENIS WITH GSAP SCROLLTRIGGER ========== 
// CRITICAL: Lenis and ScrollTrigger must communicate for proper sync
// - Lenis scroll event updates ScrollTrigger position
// - GSAP ticker updates Lenis continuously
// - lagSmoothing(0) prevents animation stutter
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ========== 3. NAVBAR SCROLL DETECTION ========== 
// DESCRIPTION: Add .scrolled class to navbar when page is scrolled > 20px
// PURPOSE: Trigger navbar background fade-in and border styling
// TRIGGERS: 
//   - ScrollTrigger.create watches scroll start position
//   - Toggles 'scrolled' class based on scroll position
ScrollTrigger.create({
  start: 'top -20',
  onUpdate: (self) => {
    document.getElementById('navbar').classList.toggle('scrolled', self.scroll() > 20);
  }
});

// ========== 4. REVEAL ANIMATIONS ========== 
// DESCRIPTION: Fade-in animations for all elements with .reveal class
// TIMING: Triggers when element reaches 88% down the viewport
// ANIMATION: 0-1 opacity, 35px upward movement, 0.85s duration
// EASING: power3.out (starts fast, ends slow - premium feel)
// ONCE: toggleActions 'play none none none' means play only once, don't reverse
/* ───────────────────────────────────────── */
gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 35 },  // Start state: invisible, 35px down
    {
      opacity: 1, y: 0,  // End state: visible, at natural position
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',  // When top of element is 88% down viewport
        toggleActions: 'play none none none'  // Only play on enter
      }
    }
  );
});

// ========== 5. HERO PARALLAX EFFECT ========== 
// DESCRIPTION: Parallax scroll effect on hero left content
// EFFECT: Content moves upward slower than page scroll (negative parallax)
// yPercent: -15 means moves up 15% from final position as you scroll
// scrub: true means animation is scrubbed to scroll position (no easing)
/* ───────────────────────────────────────── */
gsap.to('.hero-left', {
  yPercent: -15,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',  // Start when hero top reaches viewport top
    end: 'bottom top',  // End when hero bottom leaves top
    scrub: true  // 1:1 sync with scroll (no delay)
  }
});

// ========== 6. THREE.JS 3D HERO CANVAS ========== 
// DESCRIPTION: 3D graphics in Hero section using Three.js
// SCENE SETUP: Creates WebGL canvas with 3D scene containing:
//   1. Violet wireframe icosahedron (main rotating shape)
//   2. Smaller octahedron (secondary accent shape)
//   3. Particle field (1000+ animated points)
//   4. Lighting (ambient + point light)
//
// INTERACTIONS:
//   - Mouse movement controls particle field rotation angle
//   - Main mesh follows mouse with smooth easing
//   - Continuous geometric rotation for animation
//
// PERFORMANCE: Adaptive particle count (mobile = 300, desktop = 1000)
/* ───────────────────────────────────────── */

// Sync Lenis with GSAP ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => { lenis.raf(time * 1000); });
gsap.ticker.lagSmoothing(0);

// ── 3. NAVBAR ──
ScrollTrigger.create({
  start: 'top -20',
  onUpdate: (self) => {
    document.getElementById('navbar').classList.toggle('scrolled', self.scroll() > 20);
  }
});

// ── 4. REVEAL ANIMATIONS ──
gsap.utils.toArray('.reveal').forEach((el) => {
  gsap.fromTo(el,
    { opacity: 0, y: 35 },
    {
      opacity: 1, y: 0,
      duration: 0.85,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none'
      }
    }
  );
});

// ── 5. HERO PARALLAX ──
gsap.to('.hero-left', {
  yPercent: -15,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

// ── 6. THREE.JS 3D HERO CANVAS ──
(function initThreeJS() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Violet wireframe icosahedron
  const geom = new THREE.IcosahedronGeometry(1.8, 1);
  const mat = new THREE.MeshPhongMaterial({
    color: 0xa855f7,
    wireframe: true,
    transparent: true,
    opacity: 0.12,
  });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.set(3, 0, 0);
  scene.add(mesh);

  // Second smaller shape
  const geom2 = new THREE.OctahedronGeometry(0.9, 0);
  const mat2 = new THREE.MeshPhongMaterial({
    color: 0xc084fc, wireframe: true, transparent: true, opacity: 0.15,
  });
  const mesh2 = new THREE.Mesh(geom2, mat2);
  mesh2.position.set(-3.5, 1, -2);
  scene.add(mesh2);

  // Particle field - Optimized for mobile
  const isMobile = window.innerWidth < 768;
  const count = isMobile ? 300 : 1000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i++) positions[i] = (Math.random() - 0.5) * 12;
  const pGeom = new THREE.BufferGeometry();
  pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.012, color: 0xa855f7, transparent: true, opacity: 0.30 });
  const particles = new THREE.Points(pGeom, pMat);
  scene.add(particles);

  // Lights
  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const pt = new THREE.PointLight(0xa855f7, 2);
  pt.position.set(5, 5, 5);
  scene.add(pt);

  camera.position.z = 6;

  let mX = 0, mY = 0;
  document.addEventListener('mousemove', (e) => {
    mX = (e.clientX / window.innerWidth - 0.5);
    mY = (e.clientY / window.innerHeight - 0.5);
  });

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.003;
    mesh.rotation.y += 0.004;
    mesh2.rotation.x -= 0.004;
    mesh2.rotation.y -= 0.003;
    particles.rotation.y = mX * 0.08;
    particles.rotation.x = -mY * 0.08;
    mesh.position.x += ((3 + mX * 0.8) - mesh.position.x) * 0.04;
    mesh.position.y += (-mY * 0.8 - mesh.position.y) * 0.04;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

// ── 7. HORIZONTAL REEL SCROLL ──
function initHorizontalReels() {
  const track = document.querySelector('.reels-track');
  if (!track) return;

  // Clone cards for infinite seamless loop
  const items = track.innerHTML;
  track.innerHTML = items + items;

  // Start CSS infinite scroll
  track.classList.add('animating');
}
initHorizontalReels();

// ── 8. COUNTER ANIMATION ──
function animateCounter(el, target, suffix) {
  let start = 0;
  const duration = 1500;
  const step = timestamp => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

ScrollTrigger.create({
  trigger: '.hero-stats',
  start: 'top 85%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.hero-stat h3').forEach(el => {
      const text = el.textContent;
      const num = parseInt(text);
      const suffix = text.replace(String(num), '');
      animateCounter(el, num, suffix);
    });
  }
});

// ── 9. SKILL BAR ANIMATION ──
ScrollTrigger.create({
  trigger: '.skills-grid',
  start: 'top 80%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.skill-bar').forEach(bar => {
      const w = bar.style.width;
      bar.style.width = '0';
      setTimeout(() => { bar.style.width = w; }, 100);
    });
  }
});

// ── 10. PORTFOLIO CARD 3D TILT ──
document.querySelectorAll('.port-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 10;
    card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// ── 11. MOBILE MENU ──
function toggleMenu() {
  document.getElementById('mobileMenu').classList.toggle('open');
}
function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

// ── 12. SKILLS TAB ──
function switchTab(tab) {
  document.querySelectorAll('.skill-tab').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.skills-panel').forEach(p => p.classList.remove('active'));
  event.target.classList.add('active');
  document.getElementById('panel-' + tab).classList.add('active');
  // Re-trigger skill bars
  document.querySelectorAll('#panel-' + tab + ' .skill-bar').forEach(bar => {
    const w = bar.getAttribute('data-width') || bar.style.width;
    bar.setAttribute('data-width', w);
    bar.style.width = '0';
    setTimeout(() => { bar.style.width = w; }, 50);
  });
}

// ── 13. PORTFOLIO FILTER ──
function filterWork(cat, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.querySelectorAll('.port-card').forEach(card => {
    const show = cat === 'all' || card.dataset.cat === cat;
    gsap.to(card, { opacity: show ? 1 : 0, scale: show ? 1 : 0.9, duration: 0.3 });
    card.style.display = show ? 'block' : 'none';
  });
}

// ── 14. LIGHTBOX ──
function openLightbox(url, isVideo = false) {
  const iframe = document.getElementById('lightbox-iframe');
  const videoEl = document.getElementById('lightbox-video');
  const inner = document.querySelector('.lightbox-inner');
  const lightbox = document.getElementById('lightbox');

  if (isVideo) {
    iframe.style.display = 'none';
    videoEl.style.display = 'block';
    videoEl.src = url;
    // For vertical reels/shorts
    inner.style.aspectRatio = '9/16';
    inner.style.width = 'auto';
    inner.style.height = '85vh';
  } else {
    videoEl.style.display = 'none';
    iframe.style.display = 'block';
    iframe.src = url;
    // For horizontal youtube videos
    inner.style.aspectRatio = '16/9';
    inner.style.width = '100%';
    inner.style.height = 'auto';
  }

  lightbox.classList.add('open');
  // Pause the reel track when lightbox is open
  const track = document.querySelector('.reels-track');
  if (track) track.style.animationPlayState = 'paused';
  
  lenis.stop(); // Pause smooth scroll
}

function closeLightbox(e) {
  const lightbox = document.getElementById('lightbox');
  if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
    lightbox.classList.remove('open');
    
    // Stop iframe
    document.getElementById('lightbox-iframe').src = '';
    
    // Stop video
    const videoEl = document.getElementById('lightbox-video');
    videoEl.pause();
    videoEl.src = '';

    // Resume the reel track
    const track = document.querySelector('.reels-track');
    if (track) track.style.animationPlayState = '';

    lenis.start(); // Resume smooth scroll
  }
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeLightbox({ target: document.getElementById('lightbox') });
});

// ── 15. CUSTOM CURSOR ──
// SUDHAAR: Ab Desktop + Touchscreen dono par kaam karega!
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

// Remove pointer check - ab sabpe kaam karega
if (cursorDot && cursorOutline) {
  // Desktop mouse movement
  window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = e.clientX + 'px';
    cursorDot.style.top = e.clientY + 'px';
    gsap.to(cursorOutline, { x: e.clientX, y: e.clientY, duration: 0.15, ease: "power2.out" });
  });

  // Touch support for mobile/tablet
  window.addEventListener('touchmove', (e) => {
    if (e.touches.length > 0) {
      const touch = e.touches[0];
      cursorDot.style.left = touch.clientX + 'px';
      cursorDot.style.top = touch.clientY + 'px';
      gsap.to(cursorOutline, { x: touch.clientX, y: touch.clientY, duration: 0.15, ease: "power2.out" });
    }
  });

  const attachHoverEvents = () => {
    document.querySelectorAll('a, button, .filter-btn').forEach(el => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover-link'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover-link'));
    });

    document.querySelectorAll('.port-card, .reel-card').forEach(el => {
      el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover-video'));
      el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover-video'));
    });
  };
  
  // Attach initially
  attachHoverEvents();
}

// ── 16. SCROLL TIMECODE & PROGRESS ──
window.addEventListener('scroll', () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
  
  // Total frames for 2 hours at 24fps = 7200 * 24 = 172800 frames
  const totalFrames = Math.floor(progress * 172800);
  
  let h = Math.floor(totalFrames / (3600 * 24)) + 1; // Start at 01 hr
  let m = Math.floor((totalFrames % (3600 * 24)) / (60 * 24));
  let s = Math.floor((totalFrames % (60 * 24)) / 24);
  let f = totalFrames % 24;
  
  const hEl = document.getElementById('tc-hours');
  if(hEl) hEl.innerText = String(h).padStart(2,'0');
  const mEl = document.getElementById('tc-mins');
  if(mEl) mEl.innerText = String(m).padStart(2,'0');
  const sEl = document.getElementById('tc-secs');
  if(sEl) sEl.innerText = String(s).padStart(2,'0');
  const fEl = document.getElementById('tc-frames');
  if(fEl) fEl.innerText = String(f).padStart(2,'0');

  // Scroll Progress Circle
  const pct = Math.min(progress * 100, 100);
  const circle = document.getElementById('scroll-circle');
  if(circle) {
    const offset = 283 - (pct / 100) * 283;
    circle.style.strokeDashoffset = offset;
  }
  
  const progBtn = document.querySelector('.scroll-progress');
  if(progBtn) {
    if(progress > 0.05) progBtn.classList.add('visible');
    else progBtn.classList.remove('visible');
  }
});

// ── 17. PARALLAX BACKGROUND ──
const parallaxIcons = document.querySelectorAll('.parallax-icon');
const isHighEnd = window.innerWidth > 1024 && window.matchMedia("(pointer: fine)").matches;

if (parallaxIcons.length > 0 && isHighEnd) {
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 2;
    const y = (e.clientY / window.innerHeight - 0.5) * 2;
    
    gsap.to(parallaxIcons, {
      x: (i, el) => x * 40 * parseFloat(el.getAttribute('data-speed')),
      y: (i, el) => y * 40 * parseFloat(el.getAttribute('data-speed')),
      duration: 1,
      ease: "power2.out"
    });
  });
} else {
  // Static position or subtle animation for mobile/low-end
  parallaxIcons.forEach(el => {
    gsap.set(el, { opacity: 0.1 }); // Faint icons for mobile
  });
}
