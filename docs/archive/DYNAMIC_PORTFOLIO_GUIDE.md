# Dynamic Portfolio System - Implementation Guide

## Overview
Your portfolio website now dynamically loads content from `localStorage` (for local testing) before migrating to Firestore (for live production). This allows the admin panel to update portfolio content instantly without touching HTML.

---

## 🎯 How It Works

### 1. **Data Structure**
The admin panel saves data to localStorage with keys in this format:
```
Key: portfolio_update_{slot}
Value: {
  "type": "long-video" | "short-reel",
  "niche": "documentary" | "educational" | "commercial",
  "slot": "1-10",
  "title": "Your Content Title",
  "link": "https://youtube.com/embed/videoId?autoplay=1" (for long-video)
         OR "path/to/video.mp4" (for short-reel)
}
```

### 2. **Cards Identification**
Each portfolio card now has **two data attributes**:
- `data-slot="1-10"` — Identifies which slot this card belongs to
- `data-type="long-video" | "short-reel"` — Identifies content type

Example:
```html
<!-- Long-form video at slot 1 -->
<div class="port-card" data-slot="1" data-type="long-video">...</div>

<!-- Short-form reel at slot 2 -->
<div class="reel-card" data-slot="2" data-type="short-reel">...</div>
```

### 3. **Loading Process** (in script.js)
The new `loadPortfolioFromStorage()` function:
1. ✅ Runs when DOM is ready (`DOMContentLoaded` event)
2. ✅ Scans localStorage for all `portfolio_update_*` keys
3. ✅ Finds matching card using `data-slot` and `data-type`
4. ✅ Updates card HTML:
   - Title (`<h4>` or `<h5>`)
   - Description/Niche (`<p>` tags)
   - Category tag (`.port-cat`)
   - Thumbnail image (auto-extracts YouTube video ID)
   - Video source (`<video src>` for reels)
   - Click handler (`onclick`)

---

## 🧪 Testing Locally with localStorage

### Step 1: Open Browser DevTools
```
Windows: F12 or Right-click → Inspect → Console tab
Mac: Cmd + Option + I → Console tab
```

### Step 2: Save Test Data to localStorage
Paste this into the browser console to test updating **Slot 1 (Long-Form Video)**:

```javascript
localStorage.setItem('portfolio_update_1', JSON.stringify({
  type: 'long-video',
  niche: 'documentary',
  slot: '1',
  title: 'My Amazing New Documentary',
  link: 'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1'
}));
```

### Step 3: Update Slot 2 (Short-Form Reel)
Paste this to update a short-form reel:

```javascript
localStorage.setItem('portfolio_update_2', JSON.stringify({
  type: 'short-reel',
  niche: 'commercial',
  slot: '2',
  title: 'Luxury Real Estate Showcase',
  link: 'reel2.mp4'
}));
```

### Step 4: Reload the Page
- Hard refresh: **Ctrl+Shift+R** (Windows) or **Cmd+Shift+R** (Mac)
- The portfolio cards should now display your updated content!

### Step 5: Verify the Changes
- Check that the title updated (e.g., "My Amazing New Documentary")
- Verify the thumbnail image changed (auto-extracted from YouTube ID)
- Confirm the category tag updated (e.g., "Documentary")
- Test the lightbox opens with the correct video

---

## 🧹 Clearing localStorage (for testing)
To reset all portfolio updates and use original data:

```javascript
// Clear a single slot
localStorage.removeItem('portfolio_update_1');

// Clear ALL portfolio updates
for (let i = 1; i <= 10; i++) {
  localStorage.removeItem(`portfolio_update_${i}`);
}
localStorage.removeItem('portfolio_update_long');
localStorage.removeItem('portfolio_update_short');

// Then reload the page
location.reload();
```

---

## 📋 Available Slots

### Long-Form Videos (port-grid) - Slots 1-6
1. Slot 1 → "ED: Action on Corruption..." (Documentary)
2. Slot 2 → "Liquor Policy Case..." (Documentary)
3. Slot 3 → "Recent Trends..." (Educational)
4. Slot 4 → "Why is Hate against BJP..." (Documentary)
5. Slot 5 → "Economic Environment..." (Educational)
6. Slot 6 → "Conference | Communication" (Educational)

### Short-Form Reels (reels-track) - Slots 1-10
1. Slot 1 → "Real Estate Reel"
2. Slot 2 → "Motivational Typography"
3. Slot 3 → "Inspiring Textography"
...and so on up to Slot 10

---

## ✨ Features Preserved

### GSAP Animations ✅
- All reveal animations (fade-in on scroll) work perfectly
- Hero parallax effect maintained
- Portfolio card 3D tilt hover effect works with updated cards
- Skill bar animations functional

### Lenis Smooth Scrolling ✅
- Smooth scroll behavior preserved
- ScrollTrigger integration unaffected
- Custom cursor animations work with dynamic content

### Existing Functionality ✅
- Portfolio filter buttons still work (by niche category)
- Lightbox video player fully functional
- Mobile responsiveness maintained
- Horizontal reel infinite scroll works

---

## 🚀 Migration to Firebase/Firestore (5 Steps)

### Step 1: Set Up Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Create a new project (or use existing)
3. Enable Firestore Database
4. Set security rules (important!):

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /portfolio/{document=**} {
      allow read: if true; // Anyone can read
      allow write: if request.auth != null; // Only authenticated users can write
    }
  }
}
```

5. Enable Authentication (Email/Password)
6. Get your Firebase config keys from Project Settings

---

### Step 2: Add Firebase SDK to index.html

Add this to the `<head>` section of index.html (before closing `</head>`):

```html
<!-- Firebase SDK -->
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js"></script>
<script src="https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js"></script>
```

---

### Step 3: Replace localStorage with Firestore in script.js

Replace the `loadPortfolioFromStorage()` function with this:

```javascript
// Firebase Configuration (get from Firebase Console)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Load from Firestore instead of localStorage
async function loadPortfolioFromStorage() {
  try {
    const snapshot = await db.collection('portfolio').get();
    snapshot.forEach(doc => {
      const data = doc.data();
      updatePortfolioCard(data);
    });
  } catch (error) {
    console.error('Error loading portfolio data:', error);
  }
}

// Call on page load
loadPortfolioFromStorage();
```

---

### Step 4: Update Admin Panel (admin.html)

Update the form submission to save to Firestore instead of localStorage:

Replace the existing submit handler with:

```javascript
document.getElementById('updateForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const contentType = document.getElementById('contentType').value;
  const nicheType = document.getElementById('nicheType').value;
  const slotNumber = document.getElementById('slotNumber').value;
  const videoTitle = document.getElementById('videoTitle').value;
  const videoLink = document.getElementById('videoLink').value;

  const portfolioData = {
    type: contentType,
    niche: nicheType,
    slot: slotNumber,
    title: videoTitle,
    link: videoLink,
    updatedAt: new Date()
  };

  try {
    // Save to Firestore
    await db.collection('portfolio').doc(`${contentType}_${slotNumber}`).set(portfolioData);
    
    // Show success message
    const statusMsg = document.getElementById('status-msg');
    statusMsg.textContent = '✅ Portfolio updated successfully!';
    statusMsg.classList.add('success');
    statusMsg.style.display = 'block';
    
    // Reset form
    document.getElementById('updateForm').reset();
    
    // Hide message after 3 seconds
    setTimeout(() => {
      statusMsg.style.display = 'none';
    }, 3000);
  } catch (error) {
    alert('Error updating portfolio: ' + error.message);
  }
});
```

---

### Step 5: Deploy

1. **Local Testing**: Test Firestore connection locally
2. **Deploy index.html & script.js** to Netlify/Vercel
3. **Deploy admin.html** (with proper authentication)
4. **Test live**: Update from admin panel → See changes on website instantly

---

## 🔐 Security Considerations

### Before Expanding Public Access:
1. **Implement Admin Authentication**
   ```javascript
   firebase.auth().onAuthStateChanged(user => {
     if (!user) {
       window.location.href = 'login.html';
     }
   });
   ```

2. **Use Environment Variables** (not hardcoded keys)
   - Use `.env` files in deployment
   - Never commit Firebase keys to Git

3. **Firestore Security Rules** (important!)
   ```javascript
   allow write: if request.auth != null && request.auth.uid in ['admin_uid1', 'admin_uid2'];
   ```

4. **Read Rules** (keep public for website visitors)
   ```javascript
   allow read: if true;
   ```

---

## 📝 Niche Categories Available

The system supports 3 niches (customize as needed):
- **documentary** - Best for political/investigative content
- **educational** - Perfect for MBA, lectures, tutorials
- **commercial** - Ideal for brand ads, real estate, B2B

You can add more by:
1. Adding options in admin.html `<select>`
2. Updating Firestore rules if needed
3. Updating CSS filters (optional, for styling)

---

## 🐛 Troubleshooting

### Portfolio card not updating?
```javascript
// Check if key exists in localStorage
console.log(localStorage.getItem('portfolio_update_1'));

// Check if card HTML is present
console.log(document.querySelector('[data-slot="1"][data-type="long-video"]'));
```

### Image not changing?
- Ensure YouTube video ID is correct in link
- Use format: `https://www.youtube.com/embed/VIDEO_ID?autoplay=1`
- Extract ID from: `https://youtu.be/VIDEO_ID` or YouTube URL

### Video not playing in lightbox?
- Check video file path (relative paths work)
- Ensure `onclick="openLightbox('path', true)"` has `true` parameter for reels

### Animations not working after update?
- Animations are preserved! They apply to new cards automatically
- If not, run: `gsap.ticker.lagSmoothing(0)` in console

---

## 📞 Support & Next Steps

1. **Test locally first** using the localStorage method
2. **Verify all animations** work with updated content
3. **Set up Firebase** when ready for live deployment
4. **Update your admin panel** to use Signle sign-on (SSO) or email auth

---

**Last Updated**: March 30, 2026
**Status**: Ready for local testing with localStorage ✅
