import fs from 'fs';
import path from 'path';

const basinUrls = [
  'https://images.unsplash.com/photo-1620626011761-996317b8d101?w=500&auto=format',
  'https://images.unsplash.com/photo-1582582494700-54f7b3d8b9b5?w=500&auto=format',
  'https://images.unsplash.com/photo-1595514535415-dae2c3b8c5a5?w=500&auto=format',
  'https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=500&auto=format',
  'https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=500&auto=format',
  'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=500&auto=format',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&auto=format',
  'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=500&auto=format',
  'https://images.unsplash.com/photo-1581091870627-3d1d6c4a44b5?w=500&auto=format',
  'https://images.unsplash.com/photo-1618220179428-22790b461013?w=500&auto=format'
];

const basinKeys = [
  'bowl-basin',
  'wall-hung-full-pedestal',
  'wall-hung-half-pedestal',
  'wall-hung-no-pedestal',
  'integrated-basin',
  'countertop-basin',
  'below-counter-basin',
  'pedestals',
  'lab-sink',
  'freestanding-basin'
];

const exactMap = {};
basinKeys.forEach((k, i) => exactMap[k] = basinUrls[i]);

function processContent(content) {
  const lines = content.split('\n');
  let currentKey = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match ID array
    let idMatch = line.match(/id:\s*'([^']+)'/);
    if (!idMatch) idMatch = line.match(/^\s*'([^']+)':\s*\{/); // ProductDetail match
    
    if (idMatch) {
      if (exactMap[idMatch[1]]) {
        currentKey = idMatch[1];
      } else {
        currentKey = null;
      }
    }
    
    if (currentKey && line.match(/image:\s*['"].*['"]/)) {
      lines[i] = line.replace(/image:\s*['"].*['"]/, `image: '${exactMap[currentKey]}'`);
      currentKey = null;
    }
  }
  return lines.join('\n');
}

const basePath = 'c:\\Users\\asus0\\Parryware\\src\\components';
['BasinPage.jsx', 'ProductDetail.jsx'].forEach(file => {
  const fileP = path.join(basePath, file);
  if (fs.existsSync(fileP)) {
    fs.writeFileSync(fileP, processContent(fs.readFileSync(fileP, 'utf8')));
    console.log(`Updated ${file}`);
  }
});
