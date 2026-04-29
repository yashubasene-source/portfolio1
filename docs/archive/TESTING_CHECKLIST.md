# Quick Testing Checklist - Dynamic Portfolio

## Test Scenario: Update Portfolio Slot 1 (Long-Form Video)

### Prerequisites:
- ✅ index.html has `data-slot` and `data-type` attributes
- ✅ script.js has `loadPortfolioFromStorage()` function
- ✅ Browser DevTools open (F12)

### 5-Minute Test:

**1. Open Browser DevTools**
```
F12 (Windows) or Cmd+Option+I (Mac)
→ Click "Console" tab
```

**2. Paste this test data (update Slot 1):**
```javascript
localStorage.setItem('portfolio_update_1', JSON.stringify({
  type: 'long-video',
  niche: 'documentary',
  slot: '1',
  title: '🎬 My Brand New Documentary Title',
  link: 'https://www.youtube.com/embed/IvO_S5sEPrY?autoplay=1'
}));
```
Press Enter ✓

**3. Hard Refresh Page:**
- Windows: `Ctrl+Shift+R`
- Mac: `Cmd+Shift+R`

**4. Verify Changes:**
- [ ] Title changed to "🎬 My Brand New Documentary Title"
- [ ] Category shows "Documentary"
- [ ] Thumbnail image updated
- [ ] Click card → lightbox plays video
- [ ] GSAP animations still work (card fades in on scroll)

### Expected Results:
```
✅ Title Updated: "🎬 My Brand New Documentary Title"
✅ Thumbnail: YouTube maxresdefault image loads
✅ Category Tag: "Documentary"
✅ Animations: All GSAP effects preserved
✅ Lightbox: Video plays on click
```

---

## Test Scenario 2: Update Short-Form Reel (Slot 2)

**Paste in Console:**
```javascript
localStorage.setItem('portfolio_update_2', JSON.stringify({
  type: 'short-reel',
  niche: 'commercial',
  slot: '2',
  title: 'Real Estate Luxury Home Tour',
  link: 'reel2.mp4'
}));
```

**Refresh & Verify:**
- [ ] Reel title changed
- [ ] Niche shows "Commercial"
- [ ] Reel card still animate smoothly (Lenis + GSAP)
- [ ] 3D tilt effect works on hover

---

## Test Scenario 3: Batch Update (All Slots)

**Update 3 cards at once:**
```javascript
// Slot 1 - Long Video
localStorage.setItem('portfolio_update_1', JSON.stringify({
  type: 'long-video', niche: 'documentary', slot: '1',
  title: 'Political Documentary: The Truth', 
  link: 'https://www.youtube.com/embed/2i8ru-UNhPM?autoplay=1'
}));

// Slot 2 - Long Video
localStorage.setItem('portfolio_update_2', JSON.stringify({
  type: 'long-video', niche: 'educational', slot: '2',
  title: 'MBA Management Lecture Series', 
  link: 'https://www.youtube.com/embed/SEDPUBFEMo4?autoplay=1'
}));

// Slot 3 - Short Reel
localStorage.setItem('portfolio_update_3', JSON.stringify({
  type: 'short-reel', niche: 'commercial', slot: '3',
  title: 'Brand Commercial BTS', 
  link: 'reel3.mp4'
}));
```

**Refresh & Verify:**
- [ ] All 3 cards updated simultaneously
- [ ] Categories filter still works
- [ ] Portfolio filter buttons functional
- [ ] Mobile responsiveness maintained

---

## Test: Filter Buttons Still Work

**Test the portfolio filter:**
1. Scroll to Portfolio section
2. Click "Documentary" filter
   - ✅ Should show only documentary videos
3. Click "Educational" filter
   - ✅ Should show only educational videos
4. Click "All Work" filter
   - ✅ Should show all updated + original videos

---

## Test: Animations Preserved

### Reveal Animations:
- [ ] Updated cards fade in on scroll (0.85s duration)
- [ ] Cards start at opacity 0, y: +35px
- [ ] End at opacity 1, y: 0

### 3D Tilt on Hover:
- [ ] Hover over any `port-card` → 3D perspective effect
- [ ] 10deg rotation based on mouse position
- [ ] Mouse leave → returns to normal

### Lenis Smooth Scroll:
- [ ] Scroll page → buttery smooth motion
- [ ] No jank or stuttering
- [ ] GSAP ScrollTrigger still synced

---

## Debugging Commands (Paste in Console)

**Check if localStorage has data:**
```javascript
console.log(localStorage);
```

**Check specific slot:**
```javascript
console.log(JSON.parse(localStorage.getItem('portfolio_update_1')));
```

**Check if card element exists:**
```javascript
console.log(document.querySelector('[data-slot="1"][data-type="long-video"]'));
```

**Manually trigger loading:**
```javascript
loadPortfolioFromStorage();
```

**Clear all portfolio data:**
```javascript
for (let i = 1; i <= 10; i++) {
  localStorage.removeItem(`portfolio_update_${i}`);
}
console.log('Cleared all portfolio updates');
location.reload();
```

---

## Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Data not updating | Hard refresh with Ctrl+Shift+R |
| Thumbnail not loading | Ensure correct YouTube video ID format |
| Lightbox not opening | Check if `type` parameter in onclick is correct |
| Animations not working | Verify GSAP is loaded (check Console for errors) |
| Cards not finding slots | Verify `data-slot` and `data-type` match in HTML |

---

## Performance Metrics (Expected)

- **Page Load**: < 2s (with 10 portfolio cards)
- **Lightbox Open**: < 300ms
- **Scroll Performance**: 60 FPS (no frame drops)
- **localStorage Read**: < 10ms
- **Card Update**: < 50ms per card

---

## Next Steps After Testing

1. ✅ **Verify all features work** with localStorage
2. ⬜ **Create Firebase project** (console.firebase.google.com)
3. ⬜ **Update admin.html** to use Firestore
4. ⬜ **Deploy to production** (Netlify/Vercel)
5. ⬜ **Enable admin authentication** (Firebase Auth)

---

**Test Created**: March 30, 2026
**Status**: Ready for local testing ✅
