/**
 * compress-images.js
 * Run: node compress-images.js
 * Requires: npm install sharp
 *
 * Converts PNG images to WebP for massive size reduction.
 * anshay.png (2.07MB) -> anshay.webp (~80-120KB)
 * N1..png (1.71MB)   -> N1.webp (~60-100KB)
 * Skill icons        -> webp (<8KB each)
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const dir = __dirname;

const conversions = [
  // Hero image - most critical LCP fix
  { input: 'anshay.png',          output: 'anshay.webp',         quality: 85, width: null },
  // About image - second largest file
  { input: 'N1..png',             output: 'N1.webp',             quality: 82, width: null },
  // Skill icons
  { input: 'premiere-pro.png',    output: 'premiere-pro.webp',   quality: 80, width: 64  },
  { input: 'after-effects.png',   output: 'after-effects.webp',  quality: 80, width: 64  },
  { input: 'davinci-resolve.png', output: 'davinci-resolve.webp',quality: 80, width: 64  },
  { input: 'adobe-audition.png',  output: 'adobe-audition.webp', quality: 80, width: 64  },
  { input: 'photoshop.png',       output: 'photoshop.webp',      quality: 80, width: 64  },
  { input: 'illustrator.png',     output: 'illustrator.webp',    quality: 80, width: 64  },
];

async function convert() {
  let totalSavedKB = 0;

  for (const { input, output, quality, width } of conversions) {
    const inPath = path.join(dir, input);
    const outPath = path.join(dir, output);

    if (!fs.existsSync(inPath)) {
      console.log(`⚠️  Skipped (not found): ${input}`);
      continue;
    }

    try {
      let pipeline = sharp(inPath);
      if (width) pipeline = pipeline.resize(width, width, { fit: 'inside', withoutEnlargement: true });
      await pipeline.webp({ quality }).toFile(outPath);

      const inSizeKB  = Math.round(fs.statSync(inPath).size  / 1024);
      const outSizeKB = Math.round(fs.statSync(outPath).size / 1024);
      const saved     = inSizeKB - outSizeKB;
      totalSavedKB   += saved;

      console.log(`✅ ${input.padEnd(25)} ${inSizeKB}KB  →  ${outSizeKB}KB  (-${saved}KB)`);
    } catch (err) {
      console.error(`❌ Failed: ${input} — ${err.message}`);
    }
  }

  console.log(`\n💾 Total saved: ~${Math.round(totalSavedKB / 1024 * 10) / 10}MB`);
  console.log('\n📝 Next: Update img src references in index.html to use .webp files');
}

convert();
