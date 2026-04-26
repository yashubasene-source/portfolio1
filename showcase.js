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

  /* ── REELS DATA (all 30 local MP4s) ── */
  const REEL_FILES = [
    'Portfolio-Reel (1).mp4','Portfolio-Reel (2).mp4','Portfolio-Reel (3).mp4','Portfolio-Reel (4).mp4',
    'Portfolio-Reel (5).mp4','Portfolio-Reel (6).mp4','Portfolio-Reel (7).mp4','Portfolio-Reel (8).mp4',
    'Portfolio-Reel (9).mp4','Portfolio-Reel (10).mp4','Portfolio-Reel (11).mp4','Portfolio-Reel (12).mp4',
    'Portfolio-Reel (13).mp4','Portfolio-Reel (14).mp4','Portfolio-Reel (15).mp4','Portfolio-Reel (16).mp4',
    'Portfolio-Reel (17).mp4','Portfolio-Reel (18).mp4','Portfolio-Reel (19).mp4','Portfolio-Reel (20).mp4',
    'Portfolio-Reel (21).mp4','Portfolio-Reel (22).mp4','Portfolio-Reel (23).mp4','Portfolio-Reel (24).mp4',
    'Portfolio-Reel (25).mp4','Portfolio-Reel (26).mp4','POrtfolio-Reel (27).mp4','Portfolio-Reel (28).mp4',
    'Protfolio-Reel (29).mp4','Protfolio-Reel (30).mp4'
  ];
  const RATIOS_REEL = ['ratio-9-16','ratio-9-16','ratio-9-16','ratio-4-5','ratio-9-16','ratio-9-16','ratio-9-16','ratio-4-5','ratio-9-16','ratio-9-16'];
  const MOTIONS = REEL_FILES.map((f, i) => {
    const src = 'projects/video/' + f;
    return {
      id: 'sr-' + String(i+1).padStart(2,'0'),
      type: 'motion',
      title: 'Portfolio Reel — Cut ' + String(i+1).padStart(2,'0'),
      client: 'Short Form Edit',
      ratio: RATIOS_REEL[i % RATIOS_REEL.length],
      videoSrc: src,
      link: src,
      openType: 'video',
      tags: ['Reel','Cinematic']
    };
  });

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

  /* ── MERGE ALL ── */
  const SHOWCASE_PROJECTS = [...VIDEOS, ...MOTIONS, ...GRAPHIC_FILES];

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
     RENDER
  ================================================ */
  function renderShowcase(filter) {
    var grid = document.getElementById('showcase-grid');
    if (!grid) return;
    var list = filter==='all' ? SHOWCASE_PROJECTS : SHOWCASE_PROJECTS.filter(function(p){ return p.type===filter; });
    grid.innerHTML = '';
    list.forEach(function(proj, i){ grid.appendChild(buildCard(proj, Math.min(i*0.05, 0.5))); });
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
    var tabs=document.querySelectorAll('.showcase-tab'), countEl=document.getElementById('sc-count');
    tabs.forEach(function(tab){
      tab.addEventListener('click',function(){
        tabs.forEach(function(t){ t.classList.remove('active'); });
        tab.classList.add('active');
        var f=tab.dataset.filter;
        var n=f==='all'?SHOWCASE_PROJECTS.length:SHOWCASE_PROJECTS.filter(function(p){return p.type===f;}).length;
        if(countEl) countEl.innerHTML='<strong>'+n+'</strong> projects';
        renderShowcase(f);
        requestAnimationFrame(function(){ attachTilt(); attachCursor(); });
      });
    });
    if(countEl) countEl.innerHTML='<strong>'+SHOWCASE_PROJECTS.length+'</strong> projects';
  }

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
    renderShowcase('all');
    requestAnimationFrame(function(){ initFilters(); attachTilt(); attachCursor(); initSpotlight(); });
  }

  if (document.readyState==='loading') document.addEventListener('DOMContentLoaded',boot);
  else boot();
})();
