/* =========================================================
   SHOWCASE.JS — Premium 3D Masonry Portfolio
   ========================================================= */
(function () {
  'use strict';

  const isMobile = () => window.innerWidth <= 768;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── VIDEO DATA (YouTube) ── */
  const VIDEOS = [
    { id:'sv-01', title:'Political Documentary — ED Case',    client:'Political Creator',   ytId:'IvO_S5sEPrY', link:'https://www.youtube.com/embed/IvO_S5sEPrY?autoplay=1&rel=0',   tags:['Documentary','Cinematic'] },
    { id:'sv-02', title:'MBA Educational Module',             client:'Educational Channel', ytId:'keqzmkbFjuk', link:'https://www.youtube.com/embed/keqzmkbFjuk?autoplay=1&rel=0',   tags:['Educational','Motion'] },
    { id:'sv-03', title:'Liquor Policy Case Explained',       client:'Political Niche',     ytId:'MZxV0dsYfrA', link:'https://www.youtube.com/embed/MZxV0dsYfrA?autoplay=1&rel=0',   tags:['Documentary','Long-Form'] },
    { id:'sv-04', title:'Why Is Hate Against BJP?',           client:'Political Documentary',ytId:'2i8ru-UNhPM', link:'https://www.youtube.com/embed/2i8ru-UNhPM?autoplay=1&rel=0',   tags:['Documentary','Viral'] },
    { id:'sv-05', title:'Conference Communication Module',    client:'Corporate Training',  ytId:'La4w4EGENLg', link:'https://www.youtube.com/embed/La4w4EGENLg?autoplay=1&rel=0',   tags:['Corporate','Educational'] },
    { id:'sv-06', title:'Economic Environment — MBA',         client:'Educational Channel', ytId:'SEDPUBFEMo4', link:'https://www.youtube.com/embed/SEDPUBFEMo4?autoplay=1&rel=0',   tags:['Educational','Documentary'] }
  ].map(v => ({ ...v, type:'video', ratio:'ratio-16-9', openType:'iframe' }));

  /* ── REELS DATA (YouTube Playlist) ── */
    const MOTIONS = [
    {
      id: 'mo-01',
      type: 'motion',
      title: 'Fun edit-2',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/PdRET3BPOEw/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/PdRET3BPOEw?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'fun-edit',
      tags: ['fun-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-02',
      type: 'motion',
      title: 'Fun edit-1',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/Hl6tbrqNzLA/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/Hl6tbrqNzLA?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'fun-edit',
      tags: ['fun-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-03',
      type: 'motion',
      title: 'Daily-Documentry-5',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/rDedeIV_Aps/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/rDedeIV_Aps?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'daily-edit',
      tags: ['daily-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-04',
      type: 'motion',
      title: 'Daily-Documentry-4',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/q4jkMc7PH5k/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/q4jkMc7PH5k?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'daily-edit',
      tags: ['daily-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-05',
      type: 'motion',
      title: 'Daily-Documentry-3',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/gfHHf6p3VrA/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/gfHHf6p3VrA?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'daily-edit',
      tags: ['daily-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-06',
      type: 'motion',
      title: 'Typography-9',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/nPS2mbhDqY0/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/nPS2mbhDqY0?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'typography',
      tags: ['typography', 'Reel', 'Shorts']
    },
    {
      id: 'mo-07',
      type: 'motion',
      title: 'Typography-8',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/Q-z70AQ_LEM/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/Q-z70AQ_LEM?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'typography',
      tags: ['typography', 'Reel', 'Shorts']
    },
    {
      id: 'mo-08',
      type: 'motion',
      title: 'Normal edit-4',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/Y9moP0Zoax8/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/Y9moP0Zoax8?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'normal-edit',
      tags: ['normal-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-09',
      type: 'motion',
      title: 'Typography-7',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/GzTTDmcxJ3s/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/GzTTDmcxJ3s?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'typography',
      tags: ['typography', 'Reel', 'Shorts']
    },
    {
      id: 'mo-10',
      type: 'motion',
      title: 'Fun edit-3',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/d6dCSs67AOI/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/d6dCSs67AOI?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'fun-edit',
      tags: ['fun-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-11',
      type: 'motion',
      title: 'Typography-6',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/BbWgPZrcxck/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/BbWgPZrcxck?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'typography',
      tags: ['typography', 'Reel', 'Shorts']
    },
    {
      id: 'mo-12',
      type: 'motion',
      title: 'Typography-4',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/QAo0moIKqMg/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/QAo0moIKqMg?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'typography',
      tags: ['typography', 'Reel', 'Shorts']
    },
    {
      id: 'mo-13',
      type: 'motion',
      title: 'Daily-Documentry-7',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/g0ZplnuAQUM/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/g0ZplnuAQUM?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'daily-edit',
      tags: ['daily-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-14',
      type: 'motion',
      title: 'Typography-5',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/coYHW222eFs/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/coYHW222eFs?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'typography',
      tags: ['typography', 'Reel', 'Shorts']
    },
    {
      id: 'mo-15',
      type: 'motion',
      title: 'Typography-4',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/dsxddBiZ-Ek/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/dsxddBiZ-Ek?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'typography',
      tags: ['typography', 'Reel', 'Shorts']
    },
    {
      id: 'mo-16',
      type: 'motion',
      title: 'Normal esdit-6',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/kj55nEi4sYE/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/kj55nEi4sYE?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'normal-edit',
      tags: ['normal-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-17',
      type: 'motion',
      title: 'Fun edit-4',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/avDr-1331LU/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/avDr-1331LU?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'fun-edit',
      tags: ['fun-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-18',
      type: 'motion',
      title: 'Normal esdit-5',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/I3fNfDbYT_M/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/I3fNfDbYT_M?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'normal-edit',
      tags: ['normal-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-19',
      type: 'motion',
      title: 'Daily-Documentry-2',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/0PmcMrtTJlM/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/0PmcMrtTJlM?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'daily-edit',
      tags: ['daily-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-20',
      type: 'motion',
      title: 'Daily-Documentry-1',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/XRrLmvfPpKM/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/XRrLmvfPpKM?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'daily-edit',
      tags: ['daily-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-21',
      type: 'motion',
      title: 'Motion-1',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/D4qD8ZG4MIE/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/D4qD8ZG4MIE?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'motion',
      tags: ['motion', 'Reel', 'Shorts']
    },
    {
      id: 'mo-22',
      type: 'motion',
      title: 'Normal edit-1',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/z1h96HEBA8g/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/z1h96HEBA8g?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'normal-edit',
      tags: ['normal-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-23',
      type: 'motion',
      title: 'Reelstate-1',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/4RDrmm_QBZw/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/4RDrmm_QBZw?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'motion',
      tags: ['motion', 'Reel', 'Shorts']
    },
    {
      id: 'mo-24',
      type: 'motion',
      title: 'Typography-3',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/_gVvYlMeuLw/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/_gVvYlMeuLw?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'typography',
      tags: ['typography', 'Reel', 'Shorts']
    },
    {
      id: 'mo-25',
      type: 'motion',
      title: 'Normal edit-2',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/4Ku6Ve7zIHY/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/4Ku6Ve7zIHY?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'normal-edit',
      tags: ['normal-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-26',
      type: 'motion',
      title: 'Normal edit-3',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/V_V1EGIMNj0/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/V_V1EGIMNj0?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'normal-edit',
      tags: ['normal-edit', 'Reel', 'Shorts']
    },
    {
      id: 'mo-27',
      type: 'motion',
      title: 'Typography-2',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/He4asxOy3CQ/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/He4asxOy3CQ?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'typography',
      tags: ['typography', 'Reel', 'Shorts']
    },
    {
      id: 'mo-28',
      type: 'motion',
      title: 'Typography -1',
      client: 'YouTube Shorts',
      ratio: 'ratio-9-16',
      img: 'https://img.youtube.com/vi/IqK1a7_fuTw/maxresdefault.jpg',
      link: 'https://www.youtube.com/embed/IqK1a7_fuTw?autoplay=1&rel=0&loop=1',
      openType: 'iframe',
      niche: 'typography',
      tags: ['typography', 'Reel', 'Shorts']
    }
  ];

  /* ── GRAPHICS DATA (all 17 local files) ── */
  const GRAPHIC_FILES = [
    { file:'Sistec-01.jpg',           title:'SISTEC Campaign — Visual 01',  client:'Educational Institute', ratio:'ratio-4-3',  tags:['Poster','Campaign'] },
    { file:'Sistec-02.jpg',           title:'SISTEC Campaign — Visual 02',  client:'Educational Institute', ratio:'ratio-4-3',  tags:['Poster','Design'] },
    { file:'Artboard 1.jpg',          title:'Brand Identity — Artboard',    client:'Brand Design',          ratio:'ratio-16-9', tags:['Branding','Identity'] },
    { file:'youphoria-psoter-1.jpg',  title:'Youphoria Event Poster',       client:'Event Promoter',        ratio:'ratio-4-5',  tags:['Poster','Event'] },
    { file:'Day-1.jpg',               title:'Day-1 Campaign Visual',        client:'Social Media Campaign', ratio:'ratio-4-5',  tags:['Social Media','Brand'] },
    { file:'P-1.jpg',                 title:'Premium Poster — P-1',         client:'Graphic Design Work',   ratio:'ratio-4-5',  tags:['Poster','Premium'] },
    { file:'Untitled-1.jpg',          title:'Layout Design',                client:'Creative Brief',        ratio:'ratio-16-9', tags:['Layout','Design'] },
    { file:'case-thumb-01.webp',      title:'Thumbnail Design — Series A',  client:'YouTube Channel',       ratio:'ratio-16-9', tags:['Thumbnail','YouTube'] },
    { file:'case-thumb-02.webp',      title:'Thumbnail Design — Series B',  client:'Content Creator',       ratio:'ratio-16-9', tags:['Thumbnail','Promo'] },
    { file:'case-thumb-03.webp',      title:'Thumbnail Design — Series C',  client:'Content Creator',       ratio:'ratio-16-9', tags:['Thumbnail','Design'] },
    { file:'case-poster-01.webp',     title:'Cinematic Poster — 01',        client:'Film Project',          ratio:'ratio-3-4',  tags:['Poster','Cinematic'] },
    { file:'case-poster-02.webp',     title:'Cinematic Poster — 02',        client:'Film Project',          ratio:'ratio-3-4',  tags:['Poster','Documentary'] },
    { file:'case-poster-03.webp',     title:'Cinematic Poster — 03',        client:'Film Project',          ratio:'ratio-3-4',  tags:['Poster','Campaign'] },
    { file:'case-video-01.webp',      title:'Documentary Key Visual — 01',  client:'Documentary Series',    ratio:'ratio-16-9', tags:['Poster','Documentary'] },
    { file:'case-video-02.webp',      title:'Documentary Key Visual — 02',  client:'Documentary Series',    ratio:'ratio-16-9', tags:['Poster','Cinematic'] },
    { file:'case-video-03.webp',      title:'Documentary Key Visual — 03',  client:'Documentary Series',    ratio:'ratio-16-9', tags:['Visual','Motion'] },
    { file:'case-video-04.webp',      title:'Documentary Key Visual — 04',  client:'Documentary Series',    ratio:'ratio-16-9', tags:['Visual','Brand'] }
  ].map((g, i) => ({
    id: 'gr-' + String(i+1).padStart(2,'0'),
    type: 'graphic',
    title: g.title,
    client: g.client,
    ratio: g.ratio,
    img: 'projects/graphics/' + g.file,
    link: 'projects/graphics/' + g.file,
    openType: 'image',
    tags: g.tags
  }));

  /* ── DYNAMIC PROJECTS FROM LOCALSTORAGE ── */
  function extractYoutubeId(url) {
    if (!url) return null;
    var match = url.match(/(?:youtube\.com\/(?:embed\/|watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? match[1] : null;
  }

  var DYNAMIC_PROJECTS = [];
  try {
    for (var key in localStorage) {
      if (key.startsWith('portfolio_update_') || key.includes('-')) {
        var val = localStorage.getItem(key);
        if (val && val.startsWith('{')) {
          var item = JSON.parse(val);
          if (item && item.title) {
            var typeMap = { 'long-video': 'video', 'short-reel': 'motion', 'graphic': 'graphic' };
            var type = typeMap[item.type] || 'video';
            var idMatch = extractYoutubeId(item.link);
            var isGraphic = type === 'graphic';
            var ytTh = idMatch ? 'https://img.youtube.com/vi/' + idMatch + '/maxresdefault.jpg' : '';
            var img = item.thumbnail || ytTh || (isGraphic ? item.link : '');
            
            DYNAMIC_PROJECTS.push({
              id: key,
              type: type,
              title: item.title,
              client: item.description || 'Admin Upload',
              ratio: isGraphic ? 'ratio-4-5' : 'ratio-16-9',
              img: img,
              link: item.link,
              openType: item.link && (item.link.includes('youtube') || item.link.includes('youtu.be')) ? 'iframe' : (isGraphic ? 'image' : 'video'),
              niche: item.niche || 'all',
              tags: [item.niche]
            });
          }
        }
      }
    }
  } catch(e) {}

  /* ── MERGE ALL ── */
  const SHOWCASE_PROJECTS = [...VIDEOS, ...MOTIONS, ...GRAPHIC_FILES, ...DYNAMIC_PROJECTS];

  /* ================================================
     HELPERS
  ================================================ */
  function ytThumb(ytId) { return 'https://img.youtube.com/vi/' + ytId + '/maxresdefault.jpg'; }

  function badgeClass(type) { return type==='video'?'badge-video':type==='graphic'?'badge-graphic':'badge-motion'; }
  function badgeLabel(type) {
    return type==='video'?'<i class="fas fa-film"></i> Video':
           type==='graphic'?'<i class="fas fa-image"></i> Graphic':
           '<i class="fas fa-magic"></i> Motion';
  }
  function typeIcon(type) { return type==='video'?'fa-play':type==='motion'?'fa-bolt':'fa-expand'; }

  function buildMedia(proj) {
    if (proj.ytId) return '<img src="'+ytThumb(proj.ytId)+'" alt="'+proj.title+'" loading="lazy" decoding="async" onerror="this.parentElement.style.background=\'linear-gradient(135deg,#1a0a2e,#0d1a3a)\'">';
    if (proj.img)  return '<img src="'+proj.img+'" alt="'+proj.title+'" loading="lazy" decoding="async" onerror="this.parentElement.style.background=\'linear-gradient(135deg,#1a0a2e,#0d1a3a)\'">';
    if (proj.videoSrc) return '<video src="'+proj.videoSrc+'" muted playsinline preload="metadata" class="sc-video-preview" onerror="this.parentElement.style.background=\'linear-gradient(135deg,#1a0a2e,#0d1a3a)\'"></video>';
    return '<div class="sc-shimmer" style="width:100%;height:100%;"></div>';
  }

  /* ================================================
     BUILD CARD
  ================================================ */
  function buildCard(proj, delay) {
    var card = document.createElement('article');
    card.className = 'sc-card';
    card.dataset.type = proj.type;
    card.dataset.projId = proj.id;
    card.style.transitionDelay = delay + 's';
    card.setAttribute('tabindex','0');
    card.setAttribute('role','button');
    card.setAttribute('aria-label','View project: '+proj.title);

    card.innerHTML =
      '<div class="sc-card-inner">'+
        '<div class="sc-media '+proj.ratio+'">'+
          buildMedia(proj)+
          '<div class="sc-overlay"></div>'+
          '<div class="sc-gloss" aria-hidden="true"></div>'+
          '<div class="sc-video-badge" aria-hidden="true"><i class="fas '+typeIcon(proj.type)+'"></i></div>'+
        '</div>'+
        '<div class="sc-info">'+
          '<div class="sc-badge '+badgeClass(proj.type)+'">'+badgeLabel(proj.type)+'</div>'+
          '<div class="sc-title">'+proj.title+'</div>'+
          '<div class="sc-client">'+proj.client+'</div>'+
        '</div>'+
        '<div class="sc-cta"><span class="sc-cta-btn"><i class="fas fa-eye"></i> View Project</span></div>'+
      '</div>';

    /* local video hover-play */
    if (proj.videoSrc) {
      var vid = card.querySelector('.sc-video-preview');
      if (vid) {
        vid.addEventListener('loadedmetadata', function(){ vid.currentTime = 0.1; });
        card.addEventListener('mouseenter', function(){ vid.loop=true; var p=vid.play(); if(p&&p.catch)p.catch(function(){}); });
        card.addEventListener('mouseleave', function(){ vid.pause(); vid.currentTime=0.1; });
      }
    }

    /* click → lightbox */
    function open() {
      if (proj.link && typeof openLightbox==='function')
        openLightbox(proj.link, proj.openType||'iframe', proj.title);
    }
    card.addEventListener('click', open);
    card.addEventListener('keydown', function(e){ if(e.key==='Enter'||e.key===' '){ e.preventDefault(); open(); } });
    return card;
  }

  /* ================================================
     STATE & RENDER
  ================================================ */
  var currentSkill = 'all';
  var currentNiche = 'all';

  function renderShowcase() {
    var grid = document.getElementById('showcase-grid');
    if (!grid) return;

    var nicheToCategory = {
      'all': null,
      'fun-edit': ['fun edit', 'fun-edit', 'fun'],
      'daily-edit': ['daily edit', 'daily-edit', 'daily'],
      'motion': ['motion'],
      'normal-edit': ['normal edit', 'normal-edit', 'normal'],
      'typography': ['typography']
    };

    var list = SHOWCASE_PROJECTS.filter(function(p) {
      // Check Skill Filter (Video/Graphic/Motion)
      var skillMatch = (currentSkill === 'all') || (p.type === currentSkill);
      
      // Check Niche Filter (Fun Edit/Daily Edit/etc.)
      var targetCats = nicheToCategory[currentNiche];
      var nicheMatch = true;
      if (targetCats) {
        var cNiche = (p.niche || '').toLowerCase();
        var cTags = (p.tags || []).join(' ').toLowerCase();
        nicheMatch = targetCats.some(function(tc) {
          return cNiche.includes(tc) || cTags.includes(tc);
        });
      }
      return skillMatch && nicheMatch;
    });

    grid.innerHTML = '';
    list.forEach(function(proj, i){ grid.appendChild(buildCard(proj, Math.min(i*0.05, 0.5))); });
    
    var countEl = document.getElementById('sc-count');
    if (countEl) {
      countEl.innerHTML = '<strong>' + list.length + '</strong> projects';
    }
    
    requestAnimationFrame(observeCards);
  }

  /* ================================================
     SCROLL REVEAL
  ================================================ */
  var revealObs = null;
  function observeCards() {
    if (revealObs) revealObs.disconnect();
    var cards = document.querySelectorAll('.sc-card');
    revealObs = new IntersectionObserver(function(entries){
      entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('card-visible'); revealObs.unobserve(e.target); } });
    },{ rootMargin:'0px 0px -60px 0px', threshold:0.06 });
    cards.forEach(function(c){ revealObs.observe(c); });
  }

  /* ================================================
     3D TILT
  ================================================ */
  var TMAX=14, TPERSP=900;
  function applyTilt(card,e) {
    if (isMobile()||prefersReducedMotion) return;
    var inner=card.querySelector('.sc-card-inner'), gloss=card.querySelector('.sc-gloss');
    if (!inner) return;
    var r=card.getBoundingClientRect(), x=(e.clientX-r.left)/r.width, y=(e.clientY-r.top)/r.height;
    inner.style.transform='perspective('+TPERSP+'px) rotateX('+( -(y-0.5)*2*TMAX )+'deg) rotateY('+( (x-0.5)*2*TMAX )+'deg) scale3d(1.04,1.04,1.04)';
    inner.style.transition='transform 0.05s linear';
    if (gloss) gloss.style.background='radial-gradient(circle at '+(x*100).toFixed(1)+'% '+(y*100).toFixed(1)+'%, rgba(255,255,255,0.18) 0%, transparent 55%)';
  }
  function resetTilt(card) {
    var inner=card.querySelector('.sc-card-inner'); if(!inner) return;
    card.classList.add('leaving-tilt');
    inner.style.transform='perspective('+TPERSP+'px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    inner.style.transition='';
    setTimeout(function(){ card.classList.remove('leaving-tilt'); },600);
  }
  function attachTilt() {
    document.querySelectorAll('.sc-card').forEach(function(c){
      c.addEventListener('mousemove', function(e){ applyTilt(c,e); });
      c.addEventListener('mouseleave',function(){ resetTilt(c); });
    });
  }

  /* ================================================
     FILTERS
  ================================================ */
  function initFilters() {
    var tabs = document.querySelectorAll('.showcase-tab');
    tabs.forEach(function(tab){
      tab.addEventListener('click',function(){
        tabs.forEach(function(t){ t.classList.remove('active'); });
        tab.classList.add('active');
        currentSkill = tab.dataset.filter;
        renderShowcase();
        requestAnimationFrame(function(){ attachTilt(); attachCursor(); });
      });
    });
  }

  // Override the global filterNiche to sync with our dual-filter state
  window.filterNiche = function(btn, niche) {
    document.querySelectorAll('.niche-tag').forEach(function(b){ b.classList.remove('active'); });
    if (btn) btn.classList.add('active');
    
    if (window.SoundEngine && window.SoundEngine.play) {
      window.SoundEngine.play('filter');
    }
    
    currentNiche = niche;
    renderShowcase();
    requestAnimationFrame(function(){ attachTilt(); attachCursor(); });

    // Also update any old .port-card items just in case they exist
    var map = {
      'all': null,
      'fun-edit': ['fun edit', 'fun-edit', 'fun'],
      'daily-edit': ['daily edit', 'daily-edit', 'daily'],
      'motion': ['motion'],
      'normal-edit': ['normal edit', 'normal-edit', 'normal'],
      'typography': ['typography']
    };
    var keywords = map[niche] || null;
    document.querySelectorAll('.port-card').forEach(function(card) {
      if (!keywords) { card.removeAttribute('data-niche-hidden'); return; }
      var cat = (card.dataset.category || '').toLowerCase();
      var cNiche = (card.dataset.niche || '').toLowerCase();
      var matches = keywords.some(function(k){ return cat.includes(k) || cNiche.includes(k); });
      matches ? card.removeAttribute('data-niche-hidden') : card.setAttribute('data-niche-hidden','true');
    });
  };

  /* ================================================
     SPOTLIGHT
  ================================================ */
  function initSpotlight() {
    var sec=document.getElementById('portfolio'); if(!sec) return;
    var sp=sec.querySelector('.showcase-spotlight');
    if(!sp){ sp=document.createElement('div'); sp.className='showcase-spotlight'; sec.appendChild(sp); }
    sec.addEventListener('mousemove',function(e){
      var r=sec.getBoundingClientRect();
      sp.style.left=(e.clientX-r.left)+'px';
      sp.style.top=(e.clientY-r.top+sec.scrollTop)+'px';
    });
  }

  /* ================================================
     CURSOR
  ================================================ */
  function attachCursor() {
    var co=document.querySelector('.cursor-outline'); if(!co) return;
    document.querySelectorAll('.sc-card').forEach(function(el){
      if(el.dataset.scCursor==='1') return;
      el.addEventListener('mouseenter',function(){ co.classList.add('hover-video'); });
      el.addEventListener('mouseleave',function(){ co.classList.remove('hover-video'); });
      el.dataset.scCursor='1';
    });
  }

  /* ================================================
     BOOT
  ================================================ */
  function boot() {
    if (!document.getElementById('showcase-grid')) return;
    renderShowcase();
    requestAnimationFrame(function(){ initFilters(); attachTilt(); attachCursor(); initSpotlight(); });
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
