import fs from 'fs';
import path from 'path';

const srcFolder = 'C:\\Users\\asus0\\.gemini\\antigravity\\brain\\9d4b31ed-56af-4924-8f11-23c4536dceb8';
const destFolder = 'c:\\Users\\asus0\\Parryware\\public\\images\\faucets';

const getLatestMedia = (count) => {
  const files = fs.readdirSync(srcFolder).filter(f => f.startsWith('media__') && (f.endsWith('.png') || f.endsWith('.jpg')));
  files.sort();
  return files.slice(-count);
};

const latest5 = getLatestMedia(5);
// Based on visual analysis of user uploads:
// latest5[0] = Gold Swan -> Aurum
// latest5[1] = Chrome curved -> Praseo
// latest5[2] = Chrome geometric -> Quattro
// latest5[3] = L-Shape silver -> Nero
// latest5[4] = Rose Gold -> Elara

const mappings = [
  { img: latest5[1], name: 'praseo_1' },
  { img: latest5[2], name: 'quattro_1' },
  { img: latest5[4], name: 'elara_1' },
  { img: latest5[3], name: 'nero_1' },
  { img: latest5[0], name: 'aurum_1' }
];

mappings.forEach(m => {
  const ext = path.extname(m.img);
  fs.copyFileSync(path.join(srcFolder, m.img), path.join(destFolder, `${m.name}${ext}`));
  console.log(`Copied ${m.img} to ${m.name}${ext}`);
});
