import fs from 'fs';
import path from 'path';

const srcFolder = 'C:\\Users\\asus0\\.gemini\\antigravity\\brain\\9d4b31ed-56af-4924-8f11-23c4536dceb8';
const latestImage = 'media__1774851297353.png';
const destFolder = 'c:\\Users\\asus0\\Parryware\\public\\images\\basins';
const destImageName = 'wall_hung_pedestal.png';

// Ensure directory exists
if (!fs.existsSync(destFolder)) {
  fs.mkdirSync(destFolder, { recursive: true });
}

// Copy image from private cache to public assets
fs.copyFileSync(path.join(srcFolder, latestImage), path.join(destFolder, destImageName));

function updateFile(filePath) {
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let lines = content.split('\n');
  let currentKey = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Check for ID
    let idMatch = line.match(/id:\s*'([^']+)'/);
    if (!idMatch) idMatch = line.match(/^\s*'([^']+)':\s*\{/);
    
    if (idMatch) {
      if (idMatch[1] === 'wall-hung-full-pedestal') {
        currentKey = 'wall-hung-full-pedestal';
      } else {
        currentKey = null;
      }
    }
    
    // Replace if within `wall-hung-full-pedestal` object context
    if (currentKey && line.match(/image:\s*['"].*['"]/)) {
      lines[i] = line.replace(/image:\s*['"].*['"]/, `image: '/images/basins/${destImageName}'`);
      currentKey = null;
    }
  }
  
  fs.writeFileSync(filePath, lines.join('\n'));
}

updateFile('c:\\Users\\asus0\\Parryware\\src\\components\\BasinPage.jsx');
updateFile('c:\\Users\\asus0\\Parryware\\src\\components\\ProductDetail.jsx');

console.log('Successfully copied image and updated components.');
