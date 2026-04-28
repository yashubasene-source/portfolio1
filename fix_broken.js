const fs = require('fs');
let content = fs.readFileSync('script.js', 'utf8');

// The broken part starts after closeCaseStudy's `}` which is around line 432.
// Let's replace the broken block from `}` to `return card;\n}` (the end of graphic card)
const brokenRegex = /lenis\.start\(\);\n\}\n  card\.className = 'reel-card reel-card--graphic';\n  card\.innerHTML = `[\s\S]*?return card;\n\}/;

const fixedFunctions = \`lenis.start();
}

function createReelCard(item) {
  // Short reel ke liye card banata hai.
  const isYoutube = item.link && (item.link.includes('youtube.com') || item.link.includes('youtu.be'));
  const card = document.createElement('div');
  card.className = 'reel-card reel-card--reel';
  
  if (isYoutube) {
    const ytId = extractYoutubeId(item.link);
    const thumb = item.thumbnail || (ytId ? \\\`https://img.youtube.com/vi/\${ytId}/maxresdefault.jpg\\\` : '');
    card.innerHTML = \\\`
      <div class="reel-video" style="background: url('\${thumb}') center/cover; position: relative;">
        <div class="reel-play-icon" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"><i class="fas fa-play"></i></div>
      </div>
      <div class="reel-info">
        <h5>\${item.title}</h5>
        <p>\${item.description}</p>
      </div>
    \\\`;
    card.dataset.mediaType = 'iframe';
  } else {
    card.innerHTML = \\\`
      <div class="reel-video">
        <video src="\${item.link}" \${item.thumbnail ? \\\`poster="\${item.thumbnail}"\\\` : ''} preload="auto" muted playsinline></video>
        <div class="reel-play-icon"><i class="fas fa-play"></i></div>
      </div>
      <div class="reel-info">
        <h5>\${item.title}</h5>
        <p>\${item.description}</p>
      </div>
    \\\`;
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
  card.innerHTML = \\\`
    <div class="reel-video">
      <img class="reel-image" src="\${item.link}" alt="\${item.title}">
      <div class="reel-play-icon"><i class="fas fa-image"></i></div>
    </div>
    <div class="reel-info">
      <h5>\${item.title}</h5>
      <p>\${item.description}</p>
    </div>
  \\\`;
  card.dataset.mediaType = 'image';
  card.dataset.mediaUrl = item.link;
  card.dataset.mediaTitle = item.title;
  return card;
}\`;

content = content.replace(brokenRegex, fixedFunctions);
fs.writeFileSync('script.js', content, 'utf8');
console.log('Script fixed!');
