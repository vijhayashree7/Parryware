import fs from 'fs';
import path from 'path';

// Links mapped from user request
const links = {
  basin: [
    'https://source.unsplash.com/500x500/?wash-basin',
    'https://source.unsplash.com/500x500/?bathroom-sink',
    'https://source.unsplash.com/500x500/?countertop-basin',
    'https://source.unsplash.com/500x500/?wall-hung-basin'
  ],
  faucet: [
    'https://source.unsplash.com/500x500/?faucet',
    'https://source.unsplash.com/500x500/?bathroom-faucet'
  ],
  toilet: [
    'https://source.unsplash.com/500x500/?toilet',
    'https://source.unsplash.com/500x500/?modern-toilet'
  ],
  heater: [
    'https://source.unsplash.com/500x500/?water-heater',
    'https://source.unsplash.com/500x500/?geyser'
  ],
  chimney: [
    'https://source.unsplash.com/500x500/?kitchen-chimney'
  ],
  tiles: [
    'https://source.unsplash.com/500x500/?tiles'
  ],
  surface: [
    'https://source.unsplash.com/500x500/?marble-surface'
  ]
};

// Global counters for round-robin assignment
const counters = {
  basin: 0,
  faucet: 0,
  toilet: 0,
  heater: 0,
  chimney: 0,
  tiles: 0,
  surface: 0
};

function getNextLink(category) {
  const arr = links[category];
  const idx = counters[category] % arr.length;
  counters[category]++;
  return arr[idx];
}

function processContent(content, isProductDetail) {
  // Regex to match:
  // id: 'prefix-something', ... image: 'old_url',
  // OR 'prefix-something': { ... image: 'old_url',
  
  // We'll replace lines matching image: '...' IF we know the most recent ID parsed!
  
  const lines = content.split('\n');
  let currentCategory = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect ID in arrays (e.g., id: 'faucet-crust',)
    let idMatch = line.match(/id:\s*'([a-z]+)[^']*'/);
    // Detect ID in ProductDetail (e.g., 'faucet-crust': {)
    if (!idMatch) idMatch = line.match(/^\s*'([a-z]+)[^']*':\s*\{/);
    
    // Edge case for ClosetPage ids (they might be 'one-piece', etc without prefix in ClosetPage, but wait, I used generic terms)
    // Let's rely on file name context as a fallback, or robust regex
    
    if (idMatch) {
      const prefix = idMatch[1]; 
      // map prefix to category
      if (['basin', 'bowl', 'wall', 'integrated', 'countertop', 'below', 'pedestals', 'lab', 'freestanding'].includes(prefix)) currentCategory = 'basin';
      else if (prefix === 'faucet') currentCategory = 'faucet';
      else if (['closet', 'one', 'two'].includes(prefix)) currentCategory = 'toilet';
      else if (prefix === 'heater') currentCategory = 'heater';
      else if (prefix === 'chimney') currentCategory = 'chimney';
      else if (prefix === 'tiles') currentCategory = 'tiles';
      else if (prefix === 'surface') currentCategory = 'surface';
    } 
    // Manual override based on specific IDs if prefix fails
    if (line.includes('bowl-basin') || line.includes('wall-hung')) currentCategory = 'basin';
    if (line.includes('closet-')) currentCategory = 'toilet';
    
    
    // If we find an image field and we have an active category
    if (line.match(/image:\s*['"].*['"]/) && currentCategory) {
      const newImg = getNextLink(currentCategory);
      lines[i] = line.replace(/image:\s*['"].*['"]/, `image: '${newImg}'`);
      currentCategory = null; // consume it so we don't accidentally replace something else
    }
  }
  
  return lines.join('\n');
}

const filesToUpdate = [
  'BasinPage.jsx',
  'FaucetsPage.jsx',
  'ClosetPage.jsx',
  'WaterHeaterPage.jsx',
  'ChimneyPage.jsx',
  'TilesSurfacePage.jsx',
  'ProductDetail.jsx'
];

const basePath = 'c:\\Users\\asus0\\Parryware\\src\\components';

filesToUpdate.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (fs.existsSync(fullPath)) {
    // Reset counters for each file so grids match details perfectly
    Object.keys(counters).forEach(k => counters[k] = 0);
    
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // For specific pages, hardcode category if parsing fails
    if (file === 'ClosetPage.jsx') {
      content = content.replace(/image:\s*['"][^'"]*['"]/g, () => `image: '${getNextLink('toilet')}'`);
    } else if (file === 'BasinPage.jsx') {
      content = content.replace(/image:\s*['"][^'"]*['"]/g, () => `image: '${getNextLink('basin')}'`);
    } else if (file === 'FaucetsPage.jsx') {
      content = content.replace(/image:\s*['"][^'"]*['"]/g, () => `image: '${getNextLink('faucet')}'`);
    } else if (file === 'WaterHeaterPage.jsx') {
      content = content.replace(/image:\s*['"][^'"]*['"]/g, () => `image: '${getNextLink('heater')}'`);
    } else if (file === 'ChimneyPage.jsx') {
      content = content.replace(/image:\s*['"][^'"]*['"]/g, () => `image: '${getNextLink('chimney')}'`);
    } else if (file === 'TilesSurfacePage.jsx') {
      // mix tiles and surfaces
      content = content.replace(/image:\s*['"][^'"]*['"]/g, (match, offset, str) => {
         // Look back in the string to see if it's a tile or surface
         const priorText = str.substring(Math.max(0, offset - 150), offset);
         if (priorText.includes('surface')) return `image: '${getNextLink('surface')}'`;
         return `image: '${getNextLink('tiles')}'`;
      });
    } else {
      // ProductDetail.jsx uses robust parsing
      content = processContent(content, true);
    }
    
    fs.writeFileSync(fullPath, content);
    console.log(`Updated ${file}`);
  } else {
    console.error(`File not found: ${file}`);
  }
});
