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
    1: { type: 'short-reel', niche: 'typography', slot: 1, title: 'Typography Reel 1', description: 'Quick type tips', link: 'https://drive.google.com/file/d/1oDlWKCllIaxpr2z_iTrpo_Ljk5aY0xKM/view?usp=drive_link', thumbnail: '' },
    2: { type: 'short-reel', niche: 'typography', slot: 2, title: 'Typography Reel 2', description: 'Font selection guide', link: 'https://drive.google.com/file/d/126otPutZdsfM41pbBf4KjaNIlq4SCJ1Q/view?usp=drive_link', thumbnail: '' },
    3: { type: 'short-reel', niche: 'typography', slot: 3, title: 'Typography Reel 3', description: 'Kerning mastery', link: 'https://drive.google.com/file/d/1p610O3d1bWwvwwBebU1RasUnPkzhWnKo/view?usp=sharing', thumbnail: '' },
    4: { type: 'short-reel', niche: 'educational', slot: 4, title: 'Educational Reel 1', description: 'Learning module', link: 'https://drive.google.com/file/d/12epLhWaMjgHPTAtkOu0T_8ZVNObF4vpl/view?usp=sharing', thumbnail: '' },
    5: { type: 'short-reel', niche: 'educational', slot: 5, title: 'Educational Reel 2', description: 'Quick lesson', link: 'https://drive.google.com/file/d/1364b9rqRDyPVRpk4iaVbl7iCc3yHM5Ws/view?usp=sharing', thumbnail: '' },
    6: { type: 'short-reel', niche: 'educational', slot: 6, title: 'Educational Reel 3', description: 'Tutorial snippet', link: 'https://drive.google.com/file/d/1xFGkP7lmJLOq67ciTKun8KnlfdwpXHRX/view?usp=sharing', thumbnail: '' },
    7: { type: 'short-reel', niche: 'documentary', slot: 7, title: 'Documentary Reel 1', description: 'Real footage highlight', link: 'https://drive.google.com/file/d/1n0TMFMyOcX_y3zS9tO_5ugQMuJ-ZqbTY/view?usp=sharing', thumbnail: '' },
    8: { type: 'short-reel', niche: 'documentary', slot: 8, title: 'Documentary Reel 2', description: 'Behind the scenes', link: 'https://drive.google.com/file/d/1x1O2CZ6fc46aWaEgyj6HPa-8HuGze8D8/view?usp=sharing', thumbnail: '' },
    9: { type: 'short-reel', niche: 'documentary', slot: 9, title: 'Documentary Reel 3', description: 'Key moments', link: 'https://drive.google.com/file/d/1w50xLMWFU7JpahY25pSJP9BP4UUPdQ5Y/view?usp=sharing', thumbnail: '' },
    10: { type: 'short-reel', niche: 'commercial', slot: 10, title: 'Commercial Reel', description: 'Brand showcase', link: 'reel8.mp4', thumbnail: '' }
  },
  graphic: {
    1: { type: 'graphic', niche: 'typography', slot: 1, title: 'Typography Design 1', description: 'Poster design', link: 'DE1.jpg', thumbnail: '' },
    2: { type: 'graphic', niche: 'typography', slot: 2, title: 'Typography Design 2', description: 'Logo concept', link: 'DE2.jpg', thumbnail: '' },
    3: { type: 'graphic', niche: 'typography', slot: 3, title: 'Typography Design 3', description: 'Brand identity', link: 'DE3.jpg', thumbnail: '' },
    4: { type: 'graphic', niche: 'educational', slot: 4, title: 'Educational Design 1', description: 'Infographic', link: 'DE4.jpg', thumbnail: '' },
    5: { type: 'graphic', niche: 'educational', slot: 5, title: 'Educational Design 2', description: 'Course cover', link: 'DE5.jpg', thumbnail: '' },
    6: { type: 'graphic', niche: 'educational', slot: 6, title: 'Educational Design 3', description: 'Study material', link: 'DE6.jpg', thumbnail: '' },
    7: { type: 'graphic', niche: 'documentary', slot: 7, title: 'Documentary Design 1', description: 'Thumbnail art', link: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600', thumbnail: '' },
    8: { type: 'graphic', niche: 'documentary', slot: 8, title: 'Documentary Design 2', description: 'Promo poster', link: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600', thumbnail: '' },
    9: { type: 'graphic', niche: 'documentary', slot: 9, title: 'Documentary Design 3', description: 'Key visual', link: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?q=80&w=600', thumbnail: '' },
    10: { type: 'graphic', niche: 'commercial', slot: 10, title: 'Commercial Design', description: 'Brand campaign', link: 'https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=600', thumbnail: '' }
  }
};

let caseStudyMap = {};

function loadPortfolioData() {
  // Keep a fresh copy on every load so saved edits never mutate the defaults object.
  const data = JSON.parse(JSON.stringify(portfolioDefaults));

  // Search here if you ever want to change how admin updates are loaded.
  // Supports two formats:
  // 1) Admin form: "<content-type>-<slot-number>" (e.g., "long-video-1")
  // 2) Docs/console tests: "portfolio_update_{slot}" (optionally with _{type})
  // Is loop ka kaam: admin.html se save hua data + console updates dono ko apply karna.
  for (let key in localStorage) {
    const storedValue = localStorage.getItem(key);
    if (storedValue === null) continue;

    try {
      // Handle documented console/localStorage keys
      if (key.startsWith('portfolio_update_')) {
        const override = JSON.parse(storedValue);
        const remainingKey = key.slice('portfolio_update_'.length);
        const [slotSegment, typeFromKey] = remainingKey.split('_');
        const slotFromKey = parseInt(slotSegment, 10);
        const slotNumber = parseInt(override?.slot ?? slotFromKey, 10);
        if (Number.isNaN(slotNumber)) continue;
        const contentType = override?.type || typeFromKey;

        if (contentType && data[contentType]) {
          data[contentType][slotNumber] = { ...(data[contentType][slotNumber] || {}), ...override };
        }
        continue;
      }

      // Handle admin (type-slot) keys
      if (key.includes('-')) {
        const parts = key.split('-');
        const slotNum = parts.pop();
        const contentType = parts.join('-');
        const slotNumber = parseInt(slotNum, 10);

        if (data[contentType]) {
          const override = JSON.parse(storedValue);
          data[contentType][slotNumber] = { ...(data[contentType][slotNumber] || {}), ...override };
        }
      }
    } catch (error) {
      console.error('Error loading portfolio data:', error);
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

function formatLabel(value) {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function getCaseCategory(item, sourceType) {
  if (sourceType === 'video') return 'video';
  const text = `${item?.title || ''} ${item?.description || ''}`.toLowerCase();
  if (text.includes('thumb')) return 'thumbnail';
  return 'poster';
}

function getCaseCategoryLabel(category) {
  if (category === 'thumbnail') return 'Thumbnail';
  if (category === 'poster') return 'Poster';
  return 'Video Editing';
}

function getCaseRatio(category, index) {
  if (category === 'video') return index % 2 === 0 ? '9 / 16' : '5 / 8';
  if (category === 'thumbnail') return index % 2 === 0 ? '16 / 9' : '4 / 3';
  return index % 2 === 0 ? '3 / 4' : '4 / 5';
}

function isImageUrl(url) {
  if (!url) return false;
  return /\.(avif|webp|png|jpe?g|gif|bmp|svg)(\?.*)?$/i.test(url);
}

function isVideoUrl(url) {
  if (!url) return false;
  return /\.(mp4|mov|webm|m4v|mkv)(\?.*)?$/i.test(url);
}

function parseDriveFileId(url) {
  if (!url) return null;
  const dMatch = url.match(/\/d\/([^/]+)/);
  if (dMatch) return dMatch[1];
  const idMatch = url.match(/[?&]id=([^&]+)/);
  if (idMatch) return idMatch[1];
  return null;
}

function getPreviewMedia(item, sourceType, fallbackImage) {
  if (sourceType !== 'video') {
    return { previewType: 'image', previewUrl: fallbackImage };
  }

  const raw = (item?.link || '').trim();
  if (!raw) return { previewType: 'image', previewUrl: fallbackImage };

  if (isVideoUrl(raw)) {
    return { previewType: 'video', previewUrl: raw };
  }

  const ytId = extractYoutubeId(raw);
  if (ytId) {
    return { previewType: 'iframe', previewUrl: `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0` };
  }

  const driveId = parseDriveFileId(raw);
  if (driveId) {
    return { previewType: 'iframe', previewUrl: `https://drive.google.com/file/d/${driveId}/preview` };
  }

  if (raw.startsWith('http')) {
    return { previewType: 'iframe', previewUrl: raw };
  }

  return { previewType: 'image', previewUrl: fallbackImage };
}

function resolveCaseImage(item, category, index) {
  const fallbackPools = {
    video: ['projects/case-video-01.webp', 'projects/case-video-02.webp', 'projects/case-video-03.webp', 'projects/case-video-04.webp'],
    thumbnail: ['projects/case-thumb-01.webp', 'projects/case-thumb-02.webp', 'projects/case-thumb-03.webp'],
    poster: ['projects/case-poster-01.webp', 'projects/case-poster-02.webp', 'projects/case-poster-03.webp']
  };

  const fallback = fallbackPools[category][index % fallbackPools[category].length];
  const mediaUrl = item?.thumbnail || item?.link || '';
  const looksLikeVideo = isVideoUrl(mediaUrl);
  const looksLikeImage = isImageUrl(mediaUrl);

  if (looksLikeImage && category !== 'video') {
    if (/^https?:\/\//i.test(mediaUrl)) {
      return { webp: mediaUrl, fallback: mediaUrl };
    }
    return { webp: mediaUrl, fallback };
  }

  if (category === 'video') {
    const youtubeId = extractYoutubeId(toEmbedUrl(item?.link || ''));
    if (youtubeId) {
      const ytThumb = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`;
      return { webp: ytThumb, fallback: ytThumb };
    }
    if (looksLikeImage) {
      if (/^https?:\/\//i.test(mediaUrl)) return { webp: mediaUrl, fallback: mediaUrl };
      return { webp: mediaUrl, fallback };
    }
  }

  return { webp: fallback, fallback };
}

function buildCaseNarrative(item, category) {
  const nicheLabel = formatLabel(item?.niche || 'creator');
  if (category === 'thumbnail') {
    return {
      problem: item?.problem || `${nicheLabel} videos had weak click-through even with strong topics.`,
      solution: item?.solution || 'Redesigned thumbnail hierarchy with cleaner hooks, stronger contrast, and intent-based text placement.',
      result: item?.result || 'CTR improved from around 3% to 9%, resulting in significantly higher early views.'
    };
  }

  if (category === 'poster') {
    return {
      problem: item?.problem || 'Campaign creatives looked good but message clarity and conversion focus were low.',
      solution: item?.solution || 'Built a cleaner poster layout with stronger CTA visibility and better mobile readability.',
      result: item?.result || 'Engagement increased and campaign response rate improved by more than 40%.'
    };
  }

  return {
    problem: item?.problem || `${nicheLabel} edits were not holding attention long enough in key moments.`,
    solution: item?.solution || 'Optimized pacing, hook placement, and visual rhythm to keep retention high throughout.',
    result: item?.result || 'Watch time and views increased noticeably, with retention uplift across new uploads.'
  };
}

function buildCaseStudyProjects(data) {
  const projects = [];
  let index = 0;

  const pushProject = (item, sourceType) => {
    if (!item || !item.title) return;

    const category = getCaseCategory(item, sourceType);
    const categoryLabel = getCaseCategoryLabel(category);
    const ratio = getCaseRatio(category, index);
    const { webp, fallback } = resolveCaseImage(item, category, index);
    const previewMedia = getPreviewMedia(item, sourceType, fallback);
    const { problem, solution, result } = buildCaseNarrative(item, category);
    const client = item.client || `Client: ${formatLabel(item.niche || 'Content')} Project`;
    const id = `case-${sourceType}-${item.slot || index + 1}-${index}`;

    projects.push({
      id,
      title: item.title,
      category,
      categoryLabel,
      client,
      problem,
      solution,
      result,
      imageWebp: webp,
      imageFallback: fallback,
      ratio,
      previewType: previewMedia.previewType,
      previewUrl: previewMedia.previewUrl,
      niche: item.niche
    });

    index += 1;
  };

  Object.values(data['long-video'] || {}).forEach((item) => pushProject(item, 'video'));
  Object.values(data['short-reel'] || {}).forEach((item) => pushProject(item, 'video'));
  Object.values(data.graphic || {}).forEach((item) => pushProject(item, 'design'));

  return projects;
}

function createCaseStudyCard(item) {
  // Case-study card banata hai jo click par detailed modal open karta hai.
  const card = document.createElement('article');
  card.className = 'port-card reveal';
  card.dataset.category = item.category;
  if (item.niche) card.dataset.niche = item.niche;
  card.dataset.caseId = item.id;
  card.tabIndex = 0;
  card.setAttribute('role', 'button');
  card.setAttribute('aria-label', `View case study for ${item.title}`);
  card.style.setProperty('--thumb-ratio', item.ratio);

  const hasWebp = /\.webp(\?.*)?$/i.test(item.imageWebp);
  const primaryImageSrc = hasWebp ? item.imageFallback : item.imageWebp;
  const webpSourceTag = hasWebp
    ? `<source srcset="${item.imageWebp}" type="image/webp">`
    : '';

  card.innerHTML = `
    <div class="port-thumb">
      <picture>
        ${webpSourceTag}
        <img src="${primaryImageSrc}" alt="${item.title}" loading="lazy" decoding="async">
      </picture>
      <div class="port-overlay"><span>View Case Study</span></div>
    </div>
    <div class="port-info">
      <p class="port-cat">${item.categoryLabel}</p>
      <h4>${item.title}</h4>
      <p class="port-client">${item.client}</p>
    </div>
  `;

  const openCard = () => openCaseStudy(item.id);
  card.addEventListener('click', openCard);
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openCard();
    }
  });

  const imageEl = card.querySelector('img');
  if (imageEl) {
    imageEl.addEventListener('error', () => {
      if (imageEl.dataset.fallbackApplied === 'true') return;
      imageEl.dataset.fallbackApplied = 'true';
      if (item.imageFallback && imageEl.src !== item.imageFallback) imageEl.src = item.imageFallback;
    });
  }

  return card;
}

function openCaseStudy(caseId) {
  const study = caseStudyMap[caseId];
  const modal = document.getElementById('case-study-modal');
  if (!study || !modal) return;

  const imageWrap = document.getElementById('case-study-image-wrap');
  const titleEl = document.getElementById('case-study-title');
  const categoryEl = document.getElementById('case-study-category');
  const clientEl = document.getElementById('case-study-client');
  const problemEl = document.getElementById('case-study-problem');
  const solutionEl = document.getElementById('case-study-solution');
  const resultEl = document.getElementById('case-study-result');
  const webpSource = document.getElementById('case-study-image-webp');
  const imageEl = document.getElementById('case-study-image');
  const videoEl = document.getElementById('case-study-video');
  const iframeEl = document.getElementById('case-study-iframe');

  if (titleEl) titleEl.textContent = study.title;
  if (categoryEl) categoryEl.textContent = study.categoryLabel;
  if (clientEl) clientEl.textContent = study.client;
  if (problemEl) problemEl.textContent = study.problem;
  if (solutionEl) solutionEl.textContent = study.solution;
  if (resultEl) resultEl.textContent = study.result;

  if (imageWrap) imageWrap.style.display = 'none';
  if (videoEl) {
    videoEl.pause();
    videoEl.style.display = 'none';
    videoEl.src = '';
  }
  if (iframeEl) {
    iframeEl.style.display = 'none';
    iframeEl.src = '';
  }

  if (study.previewType === 'video' && videoEl) {
    videoEl.style.display = 'block';
    videoEl.src = study.previewUrl;
    videoEl.currentTime = 0;
    const playPromise = videoEl.play();
    if (playPromise && typeof playPromise.catch === 'function') playPromise.catch(() => {});
  } else if (study.previewType === 'iframe' && iframeEl) {
    iframeEl.style.display = 'block';
    iframeEl.src = study.previewUrl;
  } else if (imageWrap && imageEl) {
    imageWrap.style.display = 'block';
    if (webpSource) {
      if (/\.webp(\?.*)?$/i.test(study.imageWebp)) webpSource.srcset = study.imageWebp;
      else webpSource.removeAttribute('srcset');
    }
    const primaryImageSrc = /\.webp(\?.*)?$/i.test(study.imageWebp)
      ? study.imageFallback
      : (study.imageWebp || study.imageFallback);
    imageEl.dataset.fallbackApplied = 'false';
    imageEl.src = primaryImageSrc;
    imageEl.alt = `${study.title} thumbnail`;
    imageEl.onerror = () => {
      if (imageEl.dataset.fallbackApplied === 'true') return;
      imageEl.dataset.fallbackApplied = 'true';
      if (study.imageFallback && imageEl.src !== study.imageFallback) imageEl.src = study.imageFallback;
    };
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  lenis.stop();
}

function closeCaseStudy(event) {
  const modal = document.getElementById('case-study-modal');
  if (!modal) return;

  const target = event?.target;
  const clickedBackdrop = target === modal;
  const clickedClose = target && typeof target.closest === 'function' && Boolean(target.closest('.case-close'));
  const shouldClose = !event || clickedBackdrop || clickedClose;
  if (!shouldClose) return;

  const videoEl = document.getElementById('case-study-video');
  const iframeEl = document.getElementById('case-study-iframe');
  if (videoEl) {
    videoEl.pause();
    videoEl.src = '';
  }
  if (iframeEl) iframeEl.src = '';

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  lenis.start();
}

function createReelCard(item) {
  // Short reel ke liye card banata hai.
  const isYoutube = item.link && (item.link.includes('youtube.com') || item.link.includes('youtu.be'));
  const card = document.createElement('div');
  card.className = 'reel-card reel-card--reel';
  
  if (isYoutube) {
    const ytId = extractYoutubeId(item.link);
    const thumb = item.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/maxresdefault.jpg` : '');
    card.innerHTML = `
      <div class="reel-video" style="background: url('${thumb}') center/cover; position: relative;">
        <div class="reel-play-icon" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"><i class="fas fa-play"></i></div>
      </div>
      <div class="reel-info">
        <h5>${item.title}</h5>
        <p>${item.description}</p>
      </div>
    `;
    card.dataset.mediaType = 'iframe';
  } else {
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
  }
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
  // 1. case-study masonry grid
  // 2. reels track
  // 3. graphics track
  const data = loadPortfolioData();
  const caseStudies = buildCaseStudyProjects(data);
  caseStudyMap = caseStudies.reduce((acc, item) => {
    acc[item.id] = item;
    return acc;
  }, {});

  const portGrid = document.getElementById('port-grid');
  if (portGrid) {
    portGrid.innerHTML = '';
    caseStudies.forEach((item) => portGrid.appendChild(createCaseStudyCard(item)));
  }

  const reelsTrack = document.getElementById('reels-track');
  if (reelsTrack) {
    reelsTrack.innerHTML = '';
    for (let i = 1; i <= 50; i += 1) {
      if (data['short-reel'] && data['short-reel'][i] && data['short-reel'][i].title) {
        reelsTrack.appendChild(createReelCard(data['short-reel'][i]));
      }
    }
  }

  const graphicsTrack = document.getElementById('graphics-track');
  if (graphicsTrack) {
    graphicsTrack.innerHTML = '';
    for (let i = 1; i <= 50; i += 1) {
      if (data.graphic && data.graphic[i] && data.graphic[i].title) {
        graphicsTrack.appendChild(createGraphicCard(data.graphic[i]));
      }
    }
  }
}

const lenis = new Lenis({
  // Smooth scrolling settings — mobile pe syncTouch true rakhna zaroori hai
  duration: window.innerWidth <= 768 ? 0.8 : 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  smoothWheel: true,
  syncTouch: window.innerWidth <= 768, // Mobile pe native-feel scroll
  touchMultiplier: 1.5
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
  // Mobile pe skip karte hain - Three.js bahut heavy hai low-end devices ke liye.
  if (window.innerWidth <= 768) return; // Skip on mobile/small screens
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
  // Masonry cards ke liye extra tilt avoid karte hain taki readability aur hover smooth rahe.
  return;
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
  // selected category ko show karo aur smooth masonry transition do.
  document.querySelectorAll('.filter-btn').forEach((button) => button.classList.remove('active'));
  if (btn) btn.classList.add('active');

  document.querySelectorAll('.port-card').forEach((card) => {
    const show = cat === 'all' || card.dataset.category === cat;
    const existingTimer = card.dataset.hideTimer ? parseInt(card.dataset.hideTimer, 10) : NaN;
    if (!Number.isNaN(existingTimer)) window.clearTimeout(existingTimer);

    if (show) {
      card.classList.remove('is-hidden');
      requestAnimationFrame(() => card.classList.remove('is-hiding'));
      return;
    }

    card.classList.add('is-hiding');
    const hideTimer = window.setTimeout(() => {
      if (card.classList.contains('is-hiding')) card.classList.add('is-hidden');
    }, 240);
    card.dataset.hideTimer = String(hideTimer);
  });
}

function openLightbox(url, mediaType = 'iframe', title = 'Preview') {
  if (url && (url.includes('youtube.com') || url.includes('youtu.be'))) {
    mediaType = 'iframe';
    const ytId = extractYoutubeId(url);
    if (ytId) {
      url = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
    }
  }
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
  if (event.key !== 'Escape') return;
  closeLightbox({ target: document.getElementById('lightbox') });
  closeCaseStudy();
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
  const activeFilterBtn = document.querySelector('.filter-btn.active');
  if (activeFilterBtn) filterWork('all', activeFilterBtn);
  initInfiniteGraphicsTrack();
  initReelsRTL();
  initReelCardInteractions();
  initGraphicCardInteractions();
  attachPortfolioTilt();
  attachHoverEvents();
});
