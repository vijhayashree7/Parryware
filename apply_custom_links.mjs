import fs from 'fs';
import path from 'path';

const exactIdMap = {
  // Basins
  'bowl-basin': 'https://source.unsplash.com/500x500/?bowl-basin',
  'wall-hung-full-pedestal': 'https://source.unsplash.com/500x500/?pedestal-basin',
  'wall-hung-half-pedestal': 'https://source.unsplash.com/500x500/?half-pedestal-basin',
  'wall-hung-no-pedestal': 'https://source.unsplash.com/500x500/?wall-mounted-basin',
  'integrated-basin': 'https://source.unsplash.com/500x500/?integrated-basin',
  'countertop-basin': 'https://source.unsplash.com/500x500/?countertop-basin',
  'below-counter-basin': 'https://source.unsplash.com/500x500/?undermount-sink',
  'pedestals': 'https://source.unsplash.com/500x500/?pedestal-sink',
  'lab-sink': 'https://source.unsplash.com/500x500/?utility-sink',
  'freestanding-basin': 'https://source.unsplash.com/500x500/?freestanding-basin',

  // Heaters
  'heater-storage': 'https://source.unsplash.com/500x500/?water-heater',
  'heater-tankless': 'https://source.unsplash.com/500x500/?tankless-water-heater',
  'heater-heat-pump': 'https://source.unsplash.com/500x500/?heat-pump-water-heater',
  'heater-solar': 'https://source.unsplash.com/500x500/?solar-water-heater',
  'heater-condensing': 'https://source.unsplash.com/500x500/?boiler',
  'heater-electric-pump': 'https://source.unsplash.com/500x500/?electric-water-heater',
  'heater-gas': 'https://source.unsplash.com/500x500/?gas-water-heater',
  'heater-point-of-use': 'https://source.unsplash.com/500x500/?under-sink-heater',
  'heater-smart': 'https://source.unsplash.com/500x500/?smart-water-heater',
  'heater-hydrolic-boiler': 'https://source.unsplash.com/500x500/?boiler-system',

  // Closets
  'closet-one-piece': 'https://source.unsplash.com/500x500/?one-piece-toilet',
  'closet-two-piece': 'https://source.unsplash.com/500x500/?two-piece-toilet',
  'closet-wall-hung': 'https://source.unsplash.com/500x500/?wall-hung-toilet',
  'closet-floor-mounted': 'https://source.unsplash.com/500x500/?floor-mounted-toilet',
  'closet-smart': 'https://source.unsplash.com/500x500/?smart-toilet',
  'closet-western': 'https://source.unsplash.com/500x500/?western-toilet',
  'closet-indian': 'https://source.unsplash.com/500x500/?indian-toilet',
  'closet-rimless': 'https://source.unsplash.com/500x500/?rimless-toilet',
  'closet-compact': 'https://source.unsplash.com/500x500/?small-toilet',
  'closet-concealed': 'https://source.unsplash.com/500x500/?concealed-toilet',

  // Chimneys
  'chimney-wall-mounted': 'https://source.unsplash.com/500x500/?kitchen-chimney',
  'chimney-island': 'https://source.unsplash.com/500x500/?island-chimney',
  'chimney-built-in': 'https://source.unsplash.com/500x500/?built-in-chimney',
  'chimney-corner': 'https://source.unsplash.com/500x500/?corner-kitchen',
  'chimney-auto-clean': 'https://source.unsplash.com/500x500/?modern-chimney',
  'chimney-filterless': 'https://source.unsplash.com/500x500/?filterless-chimney',
  'chimney-ducted': 'https://source.unsplash.com/500x500/?kitchen-duct',
  'chimney-ductless': 'https://source.unsplash.com/500x500/?recirculating-chimney',
  'chimney-smart': 'https://source.unsplash.com/500x500/?smart-kitchen',
  'chimney-slim': 'https://source.unsplash.com/500x500/?small-kitchen-chimney'
};

const basePath = 'c:\\Users\\asus0\\Parryware\\src\\components';

function processContent(content) {
  const lines = content.split('\n');
  let currentKey = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Match definitions like: id: 'bowl-basin',
    let idMatch = line.match(/id:\s*'([^']+)'/);
    
    // Match definitions like: 'bowl-basin': {
    if (!idMatch) idMatch = line.match(/^\s*'([^']+)':\s*\{/);
    
    if (idMatch) {
      const key = idMatch[1];
      if (exactIdMap[key]) {
        currentKey = key;
      } else {
        // Drop context if we hit an unmapped item (like faucet-*)
        currentKey = null;
      }
    }
    
    // When inside a matched key context, replace the very next 'image:' occurrence
    if (currentKey && line.match(/image:\s*['"].*['"]/)) {
      lines[i] = line.replace(/image:\s*['"].*['"]/, `image: '${exactIdMap[currentKey]}'`);
      currentKey = null; // Consume the key so we don't accidentally replace a different image field
    }
  }
  return lines.join('\n');
}

const filesToUpdate = [
  'BasinPage.jsx',
  'WaterHeaterPage.jsx',
  'ClosetPage.jsx',
  'ChimneyPage.jsx',
  'ProductDetail.jsx'
];

filesToUpdate.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = processContent(content);
    fs.writeFileSync(fullPath, content);
    console.log(`Successfully mapped explicit Unsplash URLs inside ${file}`);
  }
});
