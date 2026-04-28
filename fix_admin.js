const fs = require('fs');
let content = fs.readFileSync('admin.html', 'utf8');

// Update slotRules
const oldSlotRules = `    const slotRules = {
      'long-video': {
        'fun-edit': [1, 2],
        'daily-edit': [3, 4],
        'motion': [5, 6],
        'normal-edit': [7, 8],
        'typography': [9, 10]
      },
      'short-reel': {
        'fun-edit': [1, 2],
        'daily-edit': [3, 4],
        'motion': [5, 6],
        'normal-edit': [7, 8],
        'typography': [9, 10]
      },
      'graphic': {
        'fun-edit': [1, 2],
        'daily-edit': [3, 4],
        'motion': [5, 6],
        'normal-edit': [7, 8],
        'typography': [9, 10]
      }
    };`;

const newSlotRules = `    const slotRules = {
      'long-video': {
        'fun-edit': [1,2,3,4,5,6,7,8,9,10],
        'daily-edit': [1,2,3,4,5,6,7,8,9,10],
        'motion': [1,2,3,4,5,6,7,8,9,10],
        'normal-edit': [1,2,3,4,5,6,7,8,9,10],
        'typography': [1,2,3,4,5,6,7,8,9,10]
      },
      'short-reel': {
        'fun-edit': [1,2,3,4,5,6,7,8,9,10],
        'daily-edit': [1,2,3,4,5,6,7,8,9,10],
        'motion': [1,2,3,4,5,6,7,8,9,10],
        'normal-edit': [1,2,3,4,5,6,7,8,9,10],
        'typography': [1,2,3,4,5,6,7,8,9,10]
      },
      'graphic': {
        'fun-edit': [1,2,3,4,5,6,7,8,9,10],
        'daily-edit': [1,2,3,4,5,6,7,8,9,10],
        'motion': [1,2,3,4,5,6,7,8,9,10],
        'normal-edit': [1,2,3,4,5,6,7,8,9,10],
        'typography': [1,2,3,4,5,6,7,8,9,10]
      }
    };`;
content = content.replace(oldSlotRules, newSlotRules);

// Update Save to LocalStorage logic
const oldSaveLogic = `      // ========== SAVE TO LOCALSTORAGE ==========
      // Search/change this key format only if you also update script.js loadPortfolioData().
      const key = \`\${contentType}-\${slotNum}\`;
      const updateData = {
        type: contentType,
        niche: niche,
        slot: slotNum,
        title: title,
        description: description,
        link: link,
        thumbnail: thumbnail
      };`;

const newSaveLogic = `      // ========== SAVE TO LOCALSTORAGE ==========
      // Calculate global slot to avoid collisions between niches
      const nicheOffsets = {
        'fun-edit': 0,
        'daily-edit': 10,
        'motion': 20,
        'normal-edit': 30,
        'typography': 40
      };
      const globalSlotNum = (nicheOffsets[niche] || 0) + slotNum;
      const key = \`\${contentType}-\${globalSlotNum}\`;
      
      const updateData = {
        type: contentType,
        niche: niche,
        slot: globalSlotNum, // Save global slot to correctly bind
        title: title,
        description: description,
        link: link,
        thumbnail: thumbnail
      };`;

content = content.replace(oldSaveLogic, newSaveLogic);

fs.writeFileSync('admin.html', content, 'utf8');
console.log('admin.html fixed!');
