import fs from 'fs';
import path from 'path';

const srcFolder = 'C:\\Users\\asus0\\.gemini\\antigravity\\brain\\b3aec124-da66-4c05-811d-6937374a2f11';
const destFolder = 'c:\\Users\\asus0\\Parryware\\public\\images\\faucets';

// Sort by timestamp
const files = fs.readdirSync(srcFolder)
  .filter(f => f.startsWith('media__17752177') && f.endsWith('.jpg'))
  .sort((a, b) => a.localeCompare(b));

if (files.length >= 5) {
  for (let i = 0; i < 5; i++) {
    fs.copyFileSync(path.join(srcFolder, files[i]), path.join(destFolder, `crust_new_${i+1}.jpg`));
    console.log(`Copied ${files[i]} to crust_new_${i+1}.jpg`);
  }
} else {
  console.log("Found less than 5 files: ", files);
}
