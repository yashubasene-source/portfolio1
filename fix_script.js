const fs = require('fs');

let content = fs.readFileSync('script.js', 'utf8');

// 1. Fix loadPortfolioData dynamic slots
content = content.replace(
  /if \(contentType && data\[contentType\] && data\[contentType\]\[slotNumber\]\) \{/g,
  `if (contentType && data[contentType]) {`
);
content = content.replace(
  /data\[contentType\]\[slotNumber\] = \{ \.\.\.data\[contentType\]\[slotNumber\], \.\.\.override \};/g,
  `data[contentType][slotNumber] = { ...(data[contentType][slotNumber] || {}), ...override };`
);
content = content.replace(
  /if \(data\[contentType\] && data\[contentType\]\[slotNumber\]\) \{/g,
  `if (data[contentType]) {`
);

// 2. Fix createReelCard to support YouTube iframe
const oldCreateReelCard = `card.innerHTML = \`
    <div class="reel-video">
      <video src="\${item.link}" \${item.thumbnail ? \`poster="\${item.thumbnail}"\` : ''} preload="auto" muted playsinline></video>
      <div class="reel-play-icon"><i class="fas fa-play"></i></div>
    </div>
    <div class="reel-info">
      <h5>\${item.title}</h5>
      <p>\${item.description}</p>
    </div>
  \`;
  card.dataset.mediaType = 'video';`;

const newCreateReelCard = `const isYoutube = item.link && (item.link.includes('youtube.com') || item.link.includes('youtu.be'));
  if (isYoutube) {
    const ytId = extractYoutubeId(item.link);
    const thumb = item.thumbnail || (ytId ? \`https://img.youtube.com/vi/\${ytId}/maxresdefault.jpg\` : '');
    card.innerHTML = \`
      <div class="reel-video" style="background: url('\${thumb}') center/cover; position: relative;">
        <div class="reel-play-icon" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"><i class="fas fa-play"></i></div>
      </div>
      <div class="reel-info">
        <h5>\${item.title}</h5>
        <p>\${item.description}</p>
      </div>
    \`;
    card.dataset.mediaType = 'iframe';
  } else {
    card.innerHTML = \`
      <div class="reel-video">
        <video src="\${item.link}" \${item.thumbnail ? \`poster="\${item.thumbnail}"\` : ''} preload="auto" muted playsinline></video>
        <div class="reel-play-icon"><i class="fas fa-play"></i></div>
      </div>
      <div class="reel-info">
        <h5>\${item.title}</h5>
        <p>\${item.description}</p>
      </div>
    \`;
    card.dataset.mediaType = 'video';
  }`;
content = content.replace(oldCreateReelCard, newCreateReelCard);

// 3. Fix reelsTrack loop
const oldReelsLoop = `const reelsTrack = document.getElementById('reels-track');
  if (reelsTrack) {
    reelsTrack.innerHTML = '';
    for (let i = 1; i <= 10; i += 1) {
      reelsTrack.appendChild(createReelCard(data['short-reel'][i]));
    }
  }`;
const newReelsLoop = `const reelsTrack = document.getElementById('reels-track');
  if (reelsTrack) {
    reelsTrack.innerHTML = '';
    Object.values(data['short-reel']).forEach(item => {
      if (item && item.title) reelsTrack.appendChild(createReelCard(item));
    });
  }`;
content = content.replace(oldReelsLoop, newReelsLoop);

// 4. Fix graphicsTrack loop
const oldGraphicsLoop = `const graphicsTrack = document.getElementById('graphics-track');
  if (graphicsTrack) {
    graphicsTrack.innerHTML = '';
    for (let i = 1; i <= 10; i += 1) {
      graphicsTrack.appendChild(createGraphicCard(data.graphic[i]));
    }
  }`;
const newGraphicsLoop = `const graphicsTrack = document.getElementById('graphics-track');
  if (graphicsTrack) {
    graphicsTrack.innerHTML = '';
    Object.values(data.graphic).forEach(item => {
      if (item && item.title) graphicsTrack.appendChild(createGraphicCard(item));
    });
  }`;
content = content.replace(oldGraphicsLoop, newGraphicsLoop);

// 5. Fix openLightbox
content = content.replace(
  "function openLightbox(url, mediaType = 'iframe', title = 'Preview') {",
  "function openLightbox(url, mediaType = 'iframe', title = 'Preview') {\n  if (url && (url.includes('youtube.com') || url.includes('youtu.be'))) mediaType = 'iframe';"
);

fs.writeFileSync('script.js', content, 'utf8');
console.log('script.js fixed!');
