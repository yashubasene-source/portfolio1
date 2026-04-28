/**
 * compress-images.js — Round 2: Graphics folder JPGs
 * Run: node compress-images.js
 */

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const graphicsDir = path.join(__dirname, 'projects', 'graphics');

const conversions = [
  // HERO + ABOUT (already done, skip if webp exists)
  { input: path.join(__dirname, 'anshay.png'),          output: path.join(__dirname, 'anshay.webp'),          quality: 85, width: null },
  { input: path.join(__dirname, 'N1..png'),             output: path.join(__dirname, 'N1.webp'),             quality: 82, width: null },

  // GRAPHICS FOLDER — The BIG ones (12.5MB total → target <600KB)
  { input: path.join(graphicsDir, 'Artboard 1.jpg'),          output: path.join(graphicsDir, 'Artboard-1.webp'),          quality: 82, width: 1400 },
  { input: path.join(graphicsDir, 'Sistec-01.jpg'),           output: path.join(graphicsDir, 'Sistec-01.webp'),           quality: 82, width: 1400 },
  { input: path.join(graphicsDir, 'Sistec-02.jpg'),           output: path.join(graphicsDir, 'Sistec-02.webp'),           quality: 82, width: 1400 },
  { input: path.join(graphicsDir, 'Day-1.jpg'),               output: path.join(graphicsDir, 'Day-1.webp'),               quality: 80, width: 1200 },
  { input: path.join(graphicsDir, 'Untitled-1.jpg'),          output: path.join(graphicsDir, 'Untitled-1.webp'),          quality: 80, width: 1200 },
  { input: path.join(graphicsDir, 'youphoria-psoter-1.jpg'),  output: path.join(graphicsDir, 'youphoria-psoter-1.webp'),  quality: 80, width: 1200 },
  { input: path.join(graphicsDir, 'P-1.jpg'),                 output: path.join(graphicsDir, 'P-1.webp'),                 quality: 80, width: 1200 },
];

async function convert() {
  let totalSavedKB = 0;

  for (const { input, output, quality, width } of conversions) {
    if (!fs.existsSync(input)) { console.log(`⚠️  Skip (not found): ${path.basename(input)}`); continue; }
    if (fs.existsSync(output)) { console.log(`✓  Already exists: ${path.basename(output)}`); continue; }

    try {
      let pipeline = sharp(input);
      if (width) pipeline = pipeline.resize(width, null, { fit: 'inside', withoutEnlargement: true });
      await pipeline.webp({ quality }).toFile(output);

      const inKB  = Math.round(fs.statSync(input).size  / 1024);
      const outKB = Math.round(fs.statSync(output).size / 1024);
      totalSavedKB += inKB - outKB;
      console.log(`✅ ${path.basename(input).padEnd(30)} ${inKB}KB → ${outKB}KB  (-${inKB - outKB}KB)`);
    } catch (err) {
      console.error(`❌ ${path.basename(input)}: ${err.message}`);
    }
  }

  console.log(`\n💾 Total saved: ~${(totalSavedKB / 1024).toFixed(1)}MB`);
}

convert();
