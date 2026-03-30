/* =========================================
   SCRIPT.JS - Anshay Basene Portfolio
   Cleaned interactive functionality
   ========================================= */

// ========== 0. PORTFOLIO DATA MODEL ==========
// Ye default portfolio data hai.
// Agar localStorage me koi custom update na mile to site isi data ko dikhati hai.
const portfolioDefaults = {
  'long-video': {
    1: { type: 'long-video', niche: 'typography', slot: 1, title: 'Typography Mastery', description: 'Professional type treatment', link: 'https://www.youtube.com/embed/IvO_S5sEPrY?autoplay=1', thumbnail: '' },
    2: { type: 'long-video', niche: 'typography', slot: 2, title: 'Font Pairing Secrets', description: 'Harmonious font combinations', link: 'https://www.youtube.com/embed/IvO_S5sEPrY?autoplay=1', thumbnail: '' },
    3: { type: 'long-video', niche: 'typography', slot: 3, title: 'Type in Motion', description: 'Kinetic typography techniques', link: 'https://www.youtube.com/embed/IvO_S5sEPrY?autoplay=1', thumbnail: '' },
    4: { type: 'long-video', niche: 'educational', slot: 4, title: 'Recent Trends in Management', description: 'High-retention educational module', link: 'https://www.youtube.com/embed/keqzmkbFjuk?autoplay=1', thumbnail: '' },
    5: { type: 'long-video', niche: 'educational', slot: 5, title: 'Economic Environment | MBA', description: 'Educational content with clean structuring', link: 'https://www.youtube.com/embed/SEDPUBFEMo4?autoplay=1', thumbnail: '' },
    6: { type: 'long-video', niche: 'educational', slot: 6, title: 'Conference | Communication', description: 'Corporate communication module', link: 'https://www.youtube.com/embed/La4w4EGENLg?autoplay=1', thumbnail: '' },
    7: { type: 'long-video', niche: 'documentary', slot: 7, title: 'ED: Action on Corruption', description: 'Investigative political documentary', link: 'https://www.youtube.com/embed/IvO_S5sEPrY?autoplay=1', thumbnail: '' },
    8: { type: 'long-video', niche: 'documentary', slot: 8, title: 'Liquor Policy Case Explained', description: 'Political controversy breakdown', link: 'https://www.youtube.com/embed/MZxV0dsYfrA?autoplay=1', thumbnail: '' },
    9: { type: 'long-video', niche: 'documentary', slot: 9, title: 'Why is Hate against BJP?', description: 'Comprehensive political documentary', link: 'https://www.youtube.com/embed/2i8ru-UNhPM?autoplay=1', thumbnail: '' },
    10: { type: 'long-video', niche: 'commercial', slot: 10, title: 'Commercial Showcase', description: 'Premium brand content', link: 'https://www.youtube.com/embed/IvO_S5sEPrY?autoplay=1', thumbnail: '' }
  },
  'short-reel': {
    1: { type: 'short-reel', niche: 'typography', slot: 1, title: 'Typography Reel 1', description: 'Quick type tips', link: 'reel1.mp4', thumbnail: '' },
    2: { type: 'short-reel', niche: 'typography', slot: 2, title: 'Typography Reel 2', description: 'Font selection guide', link: 'reel2.mp4', thumbnail: '' },
    3: { type: 'short-reel', niche: 'typography', slot: 3, title: 'Typography Reel 3', description: 'Kerning mastery', link: 'reel3.mp4', thumbnail: '' },
    4: { type: 'short-reel', niche: 'educational', slot: 4, title: 'Educational Reel 1', description: 'Learning module', link: 'reel4.mp4', thumbnail: '' },
    5: { type: 'short-reel', niche: 'educational', slot: 5, title: 'Educational Reel 2', description: 'Quick lesson', link: 'reel1.mp4', thumbnail: '' },
    6: { type: 'short-reel', niche: 'educational', slot: 6, title: 'Educational Reel 3', description: 'Tutorial snippet', link: 'reel2.mp4', thumbnail: '' },
    7: { type: 'short-reel', niche: 'documentary', slot: 7, title: 'Documentary Reel 1', description: 'Real footage highlight', link: 'reel3.mp4', thumbnail: '' },
    8: { type: 'short-reel', niche: 'documentary', slot: 8, title: 'Documentary Reel 2', description: 'Behind the scenes', link: 'reel8.mp4', thumbnail: '' },
    9: { type: 'short-reel', niche: 'documentary', slot: 9, title: 'Documentary Reel 3', description: 'Key moments', link: 'reel4.mp4', thumbnail: '' },
    10: { type: 'short-reel', niche: 'commercial', slot: 10, title: 'Commercial Reel', description: 'Brand showcase', link: 'reel8.mp4', thumbnail: '' }
  },
  graphic: {
    1: { type: 'graphic', niche: 'typography', slot: 1, title: 'Typography Design 1', description: 'Poster design', link: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600', thumbnail: '' },
    2: { type: 'graphic', niche: 'typography', slot: 2, title: 'Typography Design 2', description: 'Logo concept', link: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600', thumbnail: '' },
    3: { type: 'graphic', niche: 'typography', slot: 3, title: 'Typography Design 3', description: 'Brand identity', link: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=600', thumbnail: '' },
    4: { type: 'graphic', niche: 'educational', slot: 4, title: 'Educational Design 1', description: 'Infographic', link: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600', thumbnail: '' },
    5: { type: 'graphic', niche: 'educational', slot: 5, title: 'Educational Design 2', description: 'Course cover', link: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600', thumbnail: '' },
    6: { type: 'graphic', niche: 'educational', slot: 6, title: 'Educational Design 3', description: 'Study material', link: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=600', thumbnail: '' },
    7: { type: 'graphic', niche: 'documentary', slot: 7, title: 'Documentary Design 1', description: 'Thumbnail art', link: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600', thumbnail: '' },
    8: { type: 'graphic', niche: 'documentary', slot: 8, title: 'Documentary Design 2', description: 'Promo poster', link: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600', thumbnail: '' },
    9: { type: 'graphic', niche: 'documentary', slot: 9, title: 'Documentary Design 3', description: 'Key visual', link: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600', thumbnail: '' },
    10: { type: 'graphic', niche: 'commercial', slot: 10, title: 'Commercial Design', description: 'Brand campaign', link: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600', thumbnail: '' }
  }
};

function loadPortfolioData() {
  // Keep a fresh copy on every load so saved edits never mutate the defaults object.
  const data = JSON.parse(JSON.stringify(portfolioDefaults));

  // Search here if you ever want to change how admin updates are loaded.
  // The admin page saves each slot with the key format: "<content-type>-<slot-number>".
  // Is loop ka kaam: admin.html se save hua data dhoondh kar default data ke upar laga dena.
  for (let key in localStorage) {
    if (key.includes('-') && !key.startsWith('portfolio_')) {
      try {
        const parts = key.split('-');
        const slotNum = parts.pop();
        const contentType = parts.join('-');
        const slotNumber = parseInt(slotNum, 10);

        if (data[contentType] && data[contentType][slotNumber]) {
          const override = JSON.parse(localStorage.getItem(key));
          data[contentType][slotNumber] = { ...data[contentType][slotNumber], ...override };
        }
      } catch (error) {
        console.error('Error loading portfolio data:', error);
      }
    }
  }

  return data;
}

function extractYoutubeId(url) {
  // YouTube embed ya short URL se video id nikalta hai.
  // Iska use thumbnail auto-generate karne ke liye hota hai.
  if (!url) return null;
  const match = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? match[1] : null;
}

function toEmbedUrl(url) {
  // Normal YouTube link ko embed URL me convert karta hai.
  const videoId = extractYoutubeId(url);
  if (!videoId) return url;
  return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
}

function createLongVideoCard(item) {
  // Long-form video ke liye ek card banata hai aur click par lightbox open karta hai.
  const card = document.createElement('div');
  card.className = 'port-card reveal';
  card.dataset.cat = item.niche;

  const embedUrl = toEmbedUrl(item.link);
  const videoId = extractYoutubeId(embedUrl);
  const thumbnail = item.thumbnail || (videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : 'https://via.placeholder.com/400x300?text=Video');

  card.innerHTML = `
    <div class="port-thumb">
      <img src="${thumbnail}" alt="${item.title}" loading="lazy">
      <div class="port-overlay"></div>
      <div class="port-play"><i class="fas fa-play"></i></div>
    </div>
    <div class="port-info">
      <p class="port-cat">${item.niche.charAt(0).toUpperCase() + item.niche.slice(1)}</p>
      <h4>${item.title}</h4>
      <p>${item.description}</p>
      <div class="port-tags"><span>Dynamic</span><span>${item.niche}</span></div>
    </div>
  `;

  card.onclick = () => openLightbox(embedUrl, 'iframe', item.title);
  return card;
}

function createReelCard(item) {
  // Short reel ke liye card banata hai.
  const card = document.createElement('div');
  card.className = 'reel-card reel-card--reel';
  card.innerHTML = `
    <div class="reel-video">
      <video src="${item.link}" ${item.thumbnail ? `poster="${item.thumbnail}"` : ''} preload="auto" muted playsinline></video>
      <div class="reel-play-icon"><i class="fas fa-play"></i></div>
    </div>
    <div class="reel-info">
      <h5>${item.title}</h5>
      <p>${item.description}</p>
    </div>
  `;
  card.dataset.mediaType = 'video';
  card.dataset.mediaUrl = item.link;
  card.dataset.mediaTitle = item.title;
  return card;
}

function createGraphicCard(item) {
  // Graphic/image item ke liye card banata hai.
  const card = document.createElement('div');
  card.className = 'reel-card reel-card--graphic';
  card.innerHTML = `
    <div class="reel-video">
      <img class="reel-image" src="${item.link}" alt="${item.title}">
      <div class="reel-play-icon"><i class="fas fa-image"></i></div>
    </div>
    <div class="reel-info">
      <h5>${item.title}</h5>
      <p>${item.description}</p>
    </div>
  `;
  card.dataset.mediaType = 'image';
  card.dataset.mediaUrl = item.link;
  card.dataset.mediaTitle = item.title;
  return card;
}

function renderPortfolioGrids() {
  // Ye function teen jagah data fill karta hai:
  // 1. long videos grid
  // 2. reels track
  // 3. graphics track
  const data = loadPortfolioData();

  const portGrid = document.getElementById('port-grid');
  if (portGrid) {
    portGrid.innerHTML = '';
    for (let i = 1; i <= 10; i += 1) {
      portGrid.appendChild(createLongVideoCard(data['long-video'][i]));
    }
  }

  const reelsTrack = document.getElementById('reels-track');
  if (reelsTrack) {
    reelsTrack.innerHTML = '';
    for (let i = 1; i <= 10; i += 1) {
      reelsTrack.appendChild(createReelCard(data['short-reel'][i]));
    }
  }

  const graphicsTrack = document.getElementById('graphics-track');
  if (graphicsTrack) {
    graphicsTrack.innerHTML = '';
    for (let i = 1; i <= 10; i += 1) {
      graphicsTrack.appendChild(createGraphicCard(data.graphic[i]));
    }
  }
}

const lenis = new Lenis({
  // Smooth scrolling settings
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: false
});

function raf(time) {
  // Har frame me Lenis ko update karte rehna padta hai.
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

gsap.registerPlugin(ScrollTrigger);
lenis.on('scroll', ScrollTrigger.update);
gsap.ticker.add((time) => {
  // GSAP aur Lenis ko sync rakhta hai taki scroll animations smooth chalti rahein.
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

ScrollTrigger.create({
  // Navbar ko scroll ke baad solid background dene ke liye.
  start: 'top -20',
  onUpdate: (self) => {
    const navbar = document.getElementById('navbar');
    if (navbar) navbar.classList.toggle('scrolled', self.scroll() > 20);
  }
});

gsap.utils.toArray('.reveal').forEach((el) => {
  // Jitne bhi .reveal elements hain unhe scroll par fade-up animation milega.
  gsap.fromTo(el, { opacity: 0, y: 35 }, {
    opacity: 1,
    y: 0,
    duration: 0.85,
    ease: 'power3.out',
    scrollTrigger: {
      trigger: el,
      start: 'top 88%',
      toggleActions: 'play none none none'
    }
  });
});

gsap.to('.hero-left', {
  // Hero ke left content ko halka sa parallax move deta hai.
  yPercent: -15,
  ease: 'none',
  scrollTrigger: {
    trigger: '.hero',
    start: 'top top',
    end: 'bottom top',
    scrub: true
  }
});

(function initThreeJS() {
  // Hero section ka 3D background yahan banta hai.
  // Agar canvas na mile to pura block skip ho jata hai.
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const geom = new THREE.IcosahedronGeometry(1.8, 1);
  const mat = new THREE.MeshPhongMaterial({ color: 0xa855f7, wireframe: true, transparent: true, opacity: 0.12 });
  const mesh = new THREE.Mesh(geom, mat);
  mesh.position.set(3, 0, 0);
  scene.add(mesh);

  const geom2 = new THREE.OctahedronGeometry(0.9, 0);
  const mat2 = new THREE.MeshPhongMaterial({ color: 0xc084fc, wireframe: true, transparent: true, opacity: 0.15 });
  const mesh2 = new THREE.Mesh(geom2, mat2);
  mesh2.position.set(-3.5, 1, -2);
  scene.add(mesh2);

  const count = window.innerWidth < 768 ? 300 : 1000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count * 3; i += 1) positions[i] = (Math.random() - 0.5) * 12;

  const pGeom = new THREE.BufferGeometry();
  pGeom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.012, color: 0xa855f7, transparent: true, opacity: 0.3 });
  const particles = new THREE.Points(pGeom, pMat);
  scene.add(particles);

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const pointLight = new THREE.PointLight(0xa855f7, 2);
  pointLight.position.set(5, 5, 5);
  scene.add(pointLight);

  camera.position.z = 6;

  let mouseX = 0;
  let mouseY = 0;
  document.addEventListener('mousemove', (event) => {
    // Mouse position save kar rahe hain taki 3D shapes cursor ke hisab se react karein.
    mouseX = event.clientX / window.innerWidth - 0.5;
    mouseY = event.clientY / window.innerHeight - 0.5;
  });

  function animate() {
    requestAnimationFrame(animate);
    mesh.rotation.x += 0.003;
    mesh.rotation.y += 0.004;
    mesh2.rotation.x -= 0.004;
    mesh2.rotation.y -= 0.003;
    particles.rotation.y = mouseX * 0.08;
    particles.rotation.x = -mouseY * 0.08;
    mesh.position.x += ((3 + mouseX * 0.8) - mesh.position.x) * 0.04;
    mesh.position.y += (-mouseY * 0.8 - mesh.position.y) * 0.04;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();

function initInfiniteGraphicsTrack() {
  // Graphics row ko duplicate karke infinite scrolling effect diya gaya hai.
  const graphicTrack = document.querySelector('.graphics-track');
  if (graphicTrack) {
    const graphicItems = graphicTrack.innerHTML;
    graphicTrack.innerHTML = graphicItems + graphicItems;
    graphicTrack.classList.add('animating');
  }
}

function initReelsRTL() {
  // Reels ko right-to-left infinite loop me chalane ke liye cards clone kiye ja rahe hain.
  const track = document.querySelector('.reels-track-rtl');
  if (!track) return;

  const cards = Array.from(track.children);
  if (cards.length === 0) return;

  cards.forEach((card) => track.appendChild(card.cloneNode(true)));

  const gap = parseFloat(window.getComputedStyle(track).gap || '16');
  const singleLoopWidth = cards.reduce((width, el) => width + el.getBoundingClientRect().width, 0) + (cards.length * gap);
  track.style.setProperty('--reels-loop-width', `${singleLoopWidth}px`);
}

function initReelCardInteractions() {
  // Reel cards ko hover-pause aur popup-preview behavior deta hai.
  const track = document.querySelector('.reels-track-rtl');
  if (!track) return;

  track.querySelectorAll('.reel-card').forEach((card) => {
    if (card.dataset.reelBound === 'true') return;

    const video = card.querySelector('video');
    if (video) {
      video.pause();
      video.removeAttribute('autoplay');
      video.removeAttribute('loop');
      video.controls = false;
      video.muted = true;

      const setPreviewFrame = () => {
        if (video.dataset.previewReady === 'true') return;
        const previewTime = video.duration && Number.isFinite(video.duration) ? Math.min(0.1, Math.max(video.duration / 10, 0.05)) : 0;
        video.dataset.previewTime = String(previewTime);

        if (previewTime <= 0) {
          video.dataset.previewReady = 'true';
          return;
        }

        const handleSeeked = () => {
          video.pause();
          video.dataset.previewReady = 'true';
        };

        video.addEventListener('seeked', handleSeeked, { once: true });

        try {
          video.currentTime = previewTime;
        } catch (error) {
          video.dataset.previewReady = 'true';
        }
      };

      if (video.readyState >= 2) setPreviewFrame();
      else video.addEventListener('loadeddata', setPreviewFrame, { once: true });

      video.addEventListener('error', () => {
        card.classList.add('reel-card--missing');
      });
    }

    card.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });

    card.addEventListener('mouseleave', () => {
      const lightbox = document.getElementById('lightbox');
      const isLightboxOpen = lightbox && lightbox.classList.contains('open');
      if (!isLightboxOpen) track.style.animationPlayState = '';
    });

    card.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openLightbox(card.dataset.mediaUrl, card.dataset.mediaType, card.dataset.mediaTitle);
    });

    card.dataset.reelBound = 'true';
  });
}

function initGraphicCardInteractions() {
  // Graphics cards ko bhi same popup viewer deta hai jo portfolio me use ho raha hai.
  document.querySelectorAll('.graphics-track .reel-card').forEach((card) => {
    if (card.dataset.graphicBound === 'true') return;

    card.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      openLightbox(card.dataset.mediaUrl, card.dataset.mediaType, card.dataset.mediaTitle);
    });

    card.dataset.graphicBound = 'true';
  });
}

function animateCounter(el, target, suffix) {
  // Number counter animation: 0 se target number tak text update karta hai.
  let start = 0;
  const duration = 1500;

  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    el.textContent = Math.floor(progress * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
}

ScrollTrigger.create({
  // Hero stats tab animate honge jab user un tak scroll karega.
  trigger: '.hero-stats',
  start: 'top 85%',
  once: true,
  onEnter: () => {
    document.querySelectorAll('.hero-stat h3').forEach((el) => {
      const text = el.textContent;
      const num = parseInt(text, 10);
      const suffix = text.replace(String(num), '');
      animateCounter(el, num, suffix);
    });
  }
});

function attachPortfolioTilt() {
  // Portfolio cards par mouse move hone par 3D tilt effect lagta hai.
  document.querySelectorAll('.port-card').forEach((card) => {
    if (card.dataset.tiltBound === 'true') return;

    card.addEventListener('mousemove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = -((event.clientY - rect.top) / rect.height - 0.5) * 10;
      card.style.transform = `perspective(600px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });

    card.dataset.tiltBound = 'true';
  });
}

function toggleMenu() {
  // Mobile menu open/close
  document.getElementById('mobileMenu').classList.toggle('open');
}

function closeMenu() {
  document.getElementById('mobileMenu').classList.remove('open');
}

function switchTab(tab, btn) {
  // Skills section me Video / Design tabs switch karta hai.
  document.querySelectorAll('.skill-tab').forEach((button) => button.classList.remove('active'));
  document.querySelectorAll('.skills-panel').forEach((panel) => panel.classList.remove('active'));
  if (btn) btn.classList.add('active');
  document.getElementById(`panel-${tab}`).classList.add('active');
}

function filterWork(cat, btn) {
  // Portfolio filter buttons ka logic:
  // selected category ko show karo, baaki cards hide karo.
  document.querySelectorAll('.filter-btn').forEach((button) => button.classList.remove('active'));
  btn.classList.add('active');

  document.querySelectorAll('.port-card').forEach((card) => {
    const show = cat === 'all' || card.dataset.cat === cat;
    gsap.to(card, { opacity: show ? 1 : 0, scale: show ? 1 : 0.9, duration: 0.3 });
    card.style.display = show ? 'block' : 'none';
  });
}

function openLightbox(url, mediaType = 'iframe', title = 'Preview') {
  // Lightbox teen mode me kaam karta hai:
  // iframe -> long-form / YouTube
  // video  -> short reel
  // image  -> graphic design work
  const iframe = document.getElementById('lightbox-iframe');
  const videoEl = document.getElementById('lightbox-video');
  const imageEl = document.getElementById('lightbox-image');
  const titleEl = document.getElementById('lightbox-title');
  const inner = document.querySelector('.lightbox-inner');
  const lightbox = document.getElementById('lightbox');

  if (!iframe || !videoEl || !imageEl || !inner || !lightbox) return;

  iframe.style.display = 'none';
  videoEl.style.display = 'none';
  imageEl.style.display = 'none';
  iframe.src = '';
  videoEl.pause();
  videoEl.src = '';
  imageEl.src = '';
  if (titleEl) titleEl.textContent = title;

  if (mediaType === 'video') {
    videoEl.style.display = 'block';
    videoEl.src = url;
    videoEl.currentTime = 0;
    videoEl.loop = true;
    inner.style.aspectRatio = '9/16';
    inner.style.width = 'auto';
    inner.style.height = '85vh';

    const playPromise = videoEl.play();
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {});
    }
  } else if (mediaType === 'image') {
    imageEl.style.display = 'block';
    imageEl.src = url;
    inner.style.aspectRatio = '16/9';
    inner.style.width = '100%';
    inner.style.height = 'auto';
  } else {
    videoEl.loop = false;
    iframe.style.display = 'block';
    iframe.src = url;
    inner.style.aspectRatio = '16/9';
    inner.style.width = '100%';
    inner.style.height = 'auto';
  }

  lightbox.classList.add('open');
  const track = document.querySelector('.reels-track');
  if (track) track.style.animationPlayState = 'paused';
  lenis.stop();
}

function closeLightbox(event) {
  // Backdrop, close icon, ya Escape se lightbox band hota hai.
  const lightbox = document.getElementById('lightbox');
  if (!lightbox) return;

  if (event.target === lightbox || event.target.classList.contains('lightbox-close')) {
    lightbox.classList.remove('open');
    document.getElementById('lightbox-iframe').src = '';

    const videoEl = document.getElementById('lightbox-video');
    videoEl.pause();
    videoEl.src = '';
    document.getElementById('lightbox-image').src = '';

    const track = document.querySelector('.reels-track');
    if (track) track.style.animationPlayState = '';
    lenis.start();
  }
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeLightbox({ target: document.getElementById('lightbox') });
});

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

function attachHoverEvents() {
  // Custom cursor ko batata hai ki kis element par hover-link aur kis par hover-video style lagani hai.
  if (!cursorDot || !cursorOutline) return;

  document.querySelectorAll('a, button, .filter-btn').forEach((el) => {
    if (el.dataset.cursorBound === 'true') return;
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover-link'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover-link'));
    el.dataset.cursorBound = 'true';
  });

  document.querySelectorAll('.port-card, .reel-card').forEach((el) => {
    if (el.dataset.cursorBound === 'true') return;
    el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover-video'));
    el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover-video'));
    el.dataset.cursorBound = 'true';
  });
}

if (cursorDot && cursorOutline) {
  // Cursor dot aur outline ko mouse/touch ke sath move karna.
  window.addEventListener('mousemove', (event) => {
    cursorDot.style.left = `${event.clientX}px`;
    cursorDot.style.top = `${event.clientY}px`;
    gsap.to(cursorOutline, { x: event.clientX, y: event.clientY, duration: 0.15, ease: 'power2.out' });
  });

  window.addEventListener('touchmove', (event) => {
    if (event.touches.length > 0) {
      const touch = event.touches[0];
      cursorDot.style.left = `${touch.clientX}px`;
      cursorDot.style.top = `${touch.clientY}px`;
      gsap.to(cursorOutline, { x: touch.clientX, y: touch.clientY, duration: 0.15, ease: 'power2.out' });
    }
  });
}

window.addEventListener('scroll', () => {
  // Scroll ke hisab se niche wala timecode aur circular progress update hota hai.
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  const maxScroll = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const progress = maxScroll > 0 ? scrollTop / maxScroll : 0;
  const totalFrames = Math.floor(progress * 172800);

  const hours = Math.floor(totalFrames / (3600 * 24)) + 1;
  const mins = Math.floor((totalFrames % (3600 * 24)) / (60 * 24));
  const secs = Math.floor((totalFrames % (60 * 24)) / 24);
  const frames = totalFrames % 24;

  const hEl = document.getElementById('tc-hours');
  if (hEl) hEl.innerText = String(hours).padStart(2, '0');
  const mEl = document.getElementById('tc-mins');
  if (mEl) mEl.innerText = String(mins).padStart(2, '0');
  const sEl = document.getElementById('tc-secs');
  if (sEl) sEl.innerText = String(secs).padStart(2, '0');
  const fEl = document.getElementById('tc-frames');
  if (fEl) fEl.innerText = String(frames).padStart(2, '0');

  const circle = document.getElementById('scroll-circle');
  if (circle) {
    const offset = 283 - (Math.min(progress * 100, 100) / 100) * 283;
    circle.style.strokeDashoffset = offset;
  }

  const progressBtn = document.querySelector('.scroll-progress');
  if (progressBtn) {
    if (progress > 0.05) progressBtn.classList.add('visible');
    else progressBtn.classList.remove('visible');
  }
});

const parallaxIcons = document.querySelectorAll('.parallax-icon');
const isHighEnd = window.innerWidth > 1024 && window.matchMedia('(pointer: fine)').matches;

if (parallaxIcons.length > 0 && isHighEnd) {
  // High-end desktop par background icons mouse ke hisab se move karte hain.
  window.addEventListener('mousemove', (event) => {
    const x = (event.clientX / window.innerWidth - 0.5) * 2;
    const y = (event.clientY / window.innerHeight - 0.5) * 2;

    gsap.to(parallaxIcons, {
      x: (i, el) => x * 40 * parseFloat(el.getAttribute('data-speed')),
      y: (i, el) => y * 40 * parseFloat(el.getAttribute('data-speed')),
      duration: 1,
      ease: 'power2.out'
    });
  });
} else {
  parallaxIcons.forEach((el) => {
    gsap.set(el, { opacity: 0.1 });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  // Page fully load hote hi ye startup sequence chalta hai.
  // Isi jagah se dynamic content, track cloning aur hover effects start hote hain.
  renderPortfolioGrids();
  initInfiniteGraphicsTrack();
  initReelsRTL();
  initReelCardInteractions();
  initGraphicCardInteractions();
  attachPortfolioTilt();
  attachHoverEvents();
});
