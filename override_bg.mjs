import fs from 'fs';
import path from 'path';

const srcFolder = 'C:\\Users\\asus0\\.gemini\\antigravity\\brain\\9d4b31ed-56af-4924-8f11-23c4536dceb8';
const destFolder = 'c:\\Users\\asus0\\Parryware\\public\\images\\faucets';

const files = fs.readdirSync(srcFolder).filter(f => f.startsWith('media__') && (f.endsWith('.png') || f.endsWith('.jpg')));
// Sort alphabetically, which sorts timestamps properly
files.sort();

const latestFile = files[files.length - 1];
const targetDest = path.join(destFolder, 'cardinal_bg.png');

fs.copyFileSync(path.join(srcFolder, latestFile), targetDest);
console.log(`Deep Rich Brown Override Applied! Copied newest artifact ${latestFile} perfectly over to public assets!`);
