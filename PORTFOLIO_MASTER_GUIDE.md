# 🎬 Portfolio Master Guide & Documentation

This document serves as the **single source of truth** for your portfolio. It will help you (or any future developer) quickly understand the structure, update projects, modify the design, and deploy new changes.

---

## 📂 1. Directory Structure

Your portfolio follows a clean, optimized structure:

```text
/portfolio1-master/
│
├── assets/                  # All your media and scripts
│   ├── css/                 # Stylesheets (both source and minified)
│   ├── js/                  # JavaScript logic (both source and minified)
│   └── images/              # WebP/PNG/JPG images (e.g. your photo, tools icons)
│
├── docs/
│   └── archive/             # Old markdown documentation from previous versions
│
├── index.html               # Main portfolio page
├── admin.html               # Admin panel to add/manage new projects
├── 404.html                 # Error page
├── sw.js                    # Service worker for offline caching and fast loads
├── package.json             # NPM config for minification scripts
├── netlify.toml / vercel.json # Deployment configuration files
└── PORTFOLIO_MASTER_GUIDE.md # You are reading this file
```

---

## 🛠️ 2. How the Portfolio Works (Architecture)

1. **Static HTML + Dynamic JS**: The portfolio is built using raw HTML, CSS, and vanilla JavaScript. 
2. **30-Slot Project System**: The `assets/js/showcase.js` file handles your portfolio grid. You have up to 30 empty "slots" initialized. 
3. **Data Storage**: Projects added via the Admin Panel are saved in the browser's `localStorage` and injected dynamically into the 3D grid in `index.html`.
4. **Cinematic Preloader & Layout**: Controlled via `assets/css/style.css` and `assets/js/script.js` (which uses GSAP and Lenis for smooth scrolling).

---

## 📝 3. How to Update Your Portfolio

### A. Adding New Projects
You have a custom Admin Panel built to make updating easy without touching the code.
1. Open the website and go to `/admin.html` (e.g., `http://localhost:3000/admin.html`).
2. Fill out the project details:
   - **Niche/Category**: (e.g., Normal Edit, Fun Edit, Motion).
   - **Title**: The name of the project.
   - **Media Type**: Is it an Image, Video, or YouTube Link?
   - **File Path**: The path to your file (e.g., `projects/new_video.mp4` or a YouTube link).
3. Click "Save & Update". The new project will instantly appear in the 3D Masonry grid on `index.html`.

*Note: Since the site relies on LocalStorage for the admin panel, any changes made locally via Admin won't persist across different devices for a static site. For a permanent update, you should hardcode the project inside `assets/js/showcase.js` within the `portfolioData` array.*

### B. Updating Skills & Tools
To update the tools shown in the "My Creative Arsenal" section:
1. Open `index.html`.
2. Locate the `<section id="skills">` block.
3. You will see `<div class="skill-card">`.
4. Update the `<img src="...">`, `<h4>`, and `<p>` tags to add or remove software icons.
*Tip: Place any new software icons (WebP format) inside `assets/images/`.*

### C. Updating Pricing & Services
1. Open `index.html`.
2. Search for `<section class="section calc-section" id="calculator">`.
3. To add a new service chip, duplicate one of the `<button class="calc-chip">` tags.
4. Open `assets/js/extras.js` and locate the `basePrices` object to update the actual numeric values for the calculator.

---

## 🚀 4. Deployment & Performance

To maintain the Lighthouse Grade A score, this project uses a minification pipeline.

### Modifying CSS or JavaScript
If you want to edit styles or logic, **DO NOT edit the `.min.css` or `.min.js` files.**
1. Edit the source files: `assets/css/style.css`, `assets/js/script.js`, etc.
2. Open your terminal in the root folder (`portfolio1-master`).
3. Run the build command:
   ```bash
   npm run build
   ```
4. This command will automatically compress your changes into the `.min.css` and `.min.js` files, which are the ones actually linked in `index.html`.

### Service Worker Caching
If you add a new crucial image (e.g., a new background) or a new CSS file, make sure to add its path to the `ASSETS_TO_CACHE` array at the top of `sw.js` so it loads instantly for returning visitors.

---

## 🎨 5. Styling Guidelines

* **Colors**: Uses CSS Variables declared in `:root` inside `style.css` (e.g., `--bg: #050505`, `--accent: #a855f7`).
* **Fonts**: `Plus Jakarta Sans`, `Inter`, and `Outfit` via Google Fonts.
* **Animations**: Handled primarily via GSAP ScrollTrigger in `script.js` (elements with `.reveal` class automatically animate on scroll).

---
*Keep this guide updated whenever major structural changes occur!*
