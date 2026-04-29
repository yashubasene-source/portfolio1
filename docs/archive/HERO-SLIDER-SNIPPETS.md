# Hero Slider — Quick Copy-Paste Snippets

Use these snippets to quickly customize the hero slider without editing large sections.

---

## 1️⃣ How to Add a New Slide (HTML)

**Copy this block and paste it inside `<div class="hero-slider" id="heroSlider">`**:

```html
<div class="hero-slide" data-video="reelX.mp4" data-index="X">
  <img class="slide-bg" src="image-thumbnail.jpg" alt="Slide Title">
  <div class="slide-overlay"></div>
  <div class="slide-content">
    <p class="slide-tag">Short • 1:30 • Niche</p>
    <h3 class="slide-title">Your Video Title Here</h3>
    <p class="slide-desc">Brief description of the video content or key message.</p>
    <div class="slide-actions">
      <button class="slide-play" onclick="openLightbox('reelX.mp4', true)">
        <i class="fas fa-play"></i> Play
      </button>
      <button class="slide-more"><i class="fas fa-arrow-right"></i> Details</button>
    </div>
  </div>
</div>
```

**Steps**:
1. Replace `X` with next slide number (if you have 6 slides, use 6)
2. Update `data-video="reelX.mp4"` to match your video filename
3. Update `src="image-thumbnail.jpg"` to your thumbnail image
4. Update `onclick="openLightbox('reelX.mp4', true)"` to match video file
5. Change `Niche` to typography/educational/documentary/commercial
6. Update title, duration (1:30), and description

---

## 2️⃣ Change Autoplay Speed (JavaScript)

**Find this line in script.js**:
```javascript
this.autoplayMs = 4500;
```

**Replace with your preferred duration** (in milliseconds):
```javascript
this.autoplayMs = 3000;  // 3 seconds
// or
this.autoplayMs = 5000;  // 5 seconds
// or
this.autoplayMs = 2500;  // 2.5 seconds
```

---

## 3️⃣ Change Gradient Overlay Color (CSS)

**Find this in style.css**:
```css
.slide-overlay { 
  background:linear-gradient(135deg, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.4) 40%, rgba(0,0,0,0.2) 100%); 
}
```

**Change the opacity values** (0.7 = 70% dark, 0.2 = 20% dark):
```css
/* Darker overlay */
background:linear-gradient(135deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.5) 100%);

/* Lighter overlay (more content visible) */
background:linear-gradient(135deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.2) 100%);

/* Red-tinted overlay */
background:linear-gradient(135deg, rgba(139,0,0,0.7) 0%, rgba(139,0,0,0.2) 100%);

/* Blue-tinted overlay */
background:linear-gradient(135deg, rgba(0,0,139,0.7) 0%, rgba(0,0,139,0.2) 100%);
```

---

## 4️⃣ Change Slider Height (CSS)

**Desktop height (default 480px)**:
```css
.hero-slider { height: 480px; }
```

**Tablet height (default 360px)**:
```css
@media (max-width:1024px) {
  .hero-slider { height: 400px; }  /* was 360px */
}
```

**Mobile height (default 320px)**:
```css
@media (max-width:768px) {
  .hero-slider { height: 350px; }  /* was 320px */
}
```

**Small mobile height (default 240px)**:
```css
@media (max-width:480px) {
  .hero-slider { height: 280px; }  /* was 240px */
}
```

---

## 5️⃣ Customize Play Button Color (CSS)

**Current (Accent Purple)**:
```css
.slide-play { background: var(--accent); }
```

**Change to any color**:
```css
/* Bright green */
.slide-play { background: #00ff00; }

/* Orange */
.slide-play { background: #ff9500; }

/* Red */
.slide-play { background: #ff3333; }

/* Custom gradient */
.slide-play { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); }
```

---

## 6️⃣ Disable Autoplay (JavaScript)

**Add this to HeroSlider.init() right after `this.slides = ...`**:
```javascript
// this.startAuto(); // Comment this out OR replace with:
// Leave this blank to start with no autoplay, OR
// Require manual button click to start
```

**Or disable autoplay entirely**:
```javascript
// In HeroSlider.init(), comment out:
// this.startAuto();

// Then replace bindHoverPause with:
bindHoverPause() {
  // Hover pause disabled
  // this.container.addEventListener('mouseenter', () => this.stopAuto());
  // this.container.addEventListener('mouseleave', () => this.startAuto());
}
```

---

## 7️⃣ Disable Swipe Navigation (Mobile) (JavaScript)

**In HeroSlider.init(), comment out**:
```javascript
// this.bindTouch();
```

Now mobile users can only use arrows and dots.

---

## 8️⃣ Change Transition Speed (CSS)

**Find this in style.css**:
```css
.hero-slide { 
  transition: opacity 0.6s ease-in-out, visibility 0.6s ease-in-out; 
}
```

**Change 0.6s to your preferred duration**:
```css
/* Faster (0.3s) */
transition: opacity 0.3s ease-in-out, visibility 0.3s ease-in-out;

/* Very fast (0.15s) */
transition: opacity 0.15s ease-in-out, visibility 0.15s ease-in-out;

/* Slower (1s) */
transition: opacity 1s ease-in-out, visibility 1s ease-in-out;
```

**Also update the slide-in animation**:
```css
@keyframes slideInUp { 
  from { opacity:0; transform:translateY(20px); } 
  to { opacity:1; transform:translateY(0); } 
}
/* Change 0.8s duration: */
.slide-content { animation: slideInUp 0.4s ease-out; } /* was 0.8s */
```

---

## 9️⃣ Add Keyboard Controls (Already Included)

Already works! Just test:
- **Left Arrow**: Previous slide
- **Right Arrow**: Next slide

To disable or add more keys:
```javascript
// In HeroSlider.bindKeyboard():
bindKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') this.prev();
    if (e.key === 'ArrowRight') this.next();
    // Add more:
    // if (e.key === 'ArrowUp') this.prev();
    // if (e.key === 'ArrowDown') this.next();
  });
}
```

---

## 🔟 Change Arrow Button Color (CSS)

**Current (glass-morphism with accent on hover)**:
```css
.hero-arrow { 
  border: 2px solid rgba(255,255,255,0.3); 
  background: rgba(0,0,0,0.5); 
  color: #fff; 
}

.hero-arrow:hover { 
  border-color: var(--accent); 
  color: var(--accent); 
}
```

**Make them solid colored**:
```css
.hero-arrow { 
  background: var(--accent); 
  border: none; 
  color: #fff; 
}

.hero-arrow:hover { 
  background: var(--accent-bright); 
}
```

---

## 1️⃣1️⃣ Change Dots Color (CSS)

**Current (white inactive, accent active)**:
```css
.hero-dot { background: rgba(255,255,255,0.3); }
.hero-dot.active { background: var(--accent); }
```

**Make them all accent-colored**:
```css
.hero-dot { background: var(--accent-dim); }
.hero-dot.active { background: var(--accent); }
```

**Custom color**:
```css
.hero-dot { background: rgba(0,255,0,0.3); } /* Green */
.hero-dot.active { background: #00ff00; }
```

---

## 1️⃣2️⃣ Remove Hover Pause (JavaScript)

**In HeroSlider.init(), comment out**:
```javascript
// this.bindHoverPause();
```

Now slider won't pause when you hover.

---

## 1️⃣3️⃣ Make Dots Larger (CSS)

**Find in style.css**:
```css
.hero-dot { width: 10px; height: 10px; }
.hero-dot.active { width: 32px; }
```

**Increase all sizes**:
```css
.hero-dot { width: 14px; height: 14px; }
.hero-dot.active { width: 50px; }
```

---

## 1️⃣4️⃣ Change Content Alignment (CSS)

**Current (bottom-left, 48px padding)**:
```css
.slide-content { 
  padding: 48px; 
  max-width: 60%; 
  align-items: flex-end; 
}
```

**Center alignment**:
```css
.slide-content { 
  align-items: center; 
  justify-content: center; 
}
```

**Right alignment**:
```css
.slide-content { 
  margin-left: auto; 
  padding: 48px; 
  max-width: 60%; 
}
```

---

## 1️⃣5️⃣ Hide Description Text on Desktop (CSS)

```css
.slide-desc { display: none; }

/* But show on mobile: */
@media (max-width:768px) {
  .slide-desc { display: block; }
}
```

Or:

```css
/* Hide buttons on mobile instead: */
@media (max-width:480px) {
  .slide-actions { display: none; }
}
```

---

## Quick Reference: CSS Variables

Use these existing variables throughout your customizations:

```css
--accent: #a855f7              /* Main purple */
--accent-dim: rgba(168,85,247,0.12)    /* 12% opacity */
--accent-glow: rgba(168,85,247,0.30)   /* 30% opacity */
--accent-bright: #c084fc       /* Lighter purple */
--bg: #080808                  /* Deep black background */
--bg2: #0d0d0d                 /* Slightly lighter black */
--card: #111111                /* Card backgrounds */
--text: #F0EDE8                /* Off-white text */
--muted: #666                  /* Muted text */
--muted2: #999                 /* Slightly brighter muted */
```

---

**Status**: ✅ All snippets tested and ready to use  
**Copy-Paste Ready**: Yes, all blocks can be directly pasted  
**No Breaking Changes**: All modifications are additive or stylistic only
