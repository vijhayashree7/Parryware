import fs from 'fs';
import path from 'path';

const destFolder = 'c:\\Users\\asus0\\Parryware\\public\\images\\faucets';
const srcFolder = 'C:\\Users\\asus0\\.gemini\\antigravity\\brain\\9d4b31ed-56af-4924-8f11-23c4536dceb8';

fs.copyFileSync(
  path.join(srcFolder, 'media__1774864939296.png'),
  path.join(destFolder, 'cardinal_bg.png')
);
console.log('Background artifact cleanly migrated to public assets!');
