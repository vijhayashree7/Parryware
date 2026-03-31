import fs from 'fs';
import path from 'path';

const basePath = 'c:\\Users\\asus0\\Parryware\\src\\components';
const destFolder = 'c:\\Users\\asus0\\Parryware\\public\\images\\basins';
const srcFolder = 'C:\\Users\\asus0\\.gemini\\antigravity\\brain\\9d4b31ed-56af-4924-8f11-23c4536dceb8';

// Attempt to wire the secondary image the user uploaded earlier for the half pedestal.
if (fs.existsSync(path.join(srcFolder, 'media__1774851297398.png'))) {
  fs.copyFileSync(
    path.join(srcFolder, 'media__1774851297398.png'),
    path.join(destFolder, 'wall_hung_half_pedestal.png')
  );
}

const updates = {
  'wall-hung-half-pedestal': '/images/basins/wall_hung_half_pedestal.png',
  'countertop-basin': 'https://loremflickr.com/800/800/countertop,ceramic,basin/all?lock=101',
  'below-counter-basin': 'https://loremflickr.com/800/800/undermount,ceramic,basin/all?lock=102',
  'pedestals': 'https://loremflickr.com/800/800/pedestal,ceramic,sink/all?lock=103',
  'lab-sink': 'https://loremflickr.com/800/800/utility,ceramic,sink/all?lock=104',
  'freestanding-basin': 'https://loremflickr.com/800/800/freestanding,ceramic,basin/all?lock=105'
};

function updateFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  let content = fs.readFileSync(filePath, 'utf8');
  let lines = content.split('\n');
  let currentKey = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    let idMatch = line.match(/id:\s*'([^']+)'/);
    if (!idMatch) idMatch = line.match(/^\s*'([^']+)':\s*\{/);
    
    if (idMatch) {
      if (updates[idMatch[1]]) {
        currentKey = idMatch[1];
      } else {
        currentKey = null;
      }
    }
    
    if (currentKey && line.match(/image:\s*['"].*['"]/)) {
      lines[i] = line.replace(/image:\s*['"].*['"]/, `image: '${updates[currentKey]}'`);
      currentKey = null;
    }
  }
  
  fs.writeFileSync(filePath, lines.join('\n'));
}

updateFile(path.join(basePath, 'BasinPage.jsx'));
updateFile(path.join(basePath, 'ProductDetail.jsx'));
console.log('Swapped images completely!');
