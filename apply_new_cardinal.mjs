import fs from 'fs';
import path from 'path';

const basePath = 'c:\\Users\\asus0\\Parryware\\src\\components';
const destFolder = 'c:\\Users\\asus0\\Parryware\\public\\images\\faucets';
const srcFolder = 'C:\\Users\\asus0\\.gemini\\antigravity\\brain\\9d4b31ed-56af-4924-8f11-23c4536dceb8';

const localArtifacts = [
  "media__1774863144031.png",
  "media__1774863157437.png",
  "media__1774863171237.png",
  "media__1774863183249.png",
  "media__1774863196208.jpg"
];

const updates = {};

for (let i = 0; i < localArtifacts.length; i++) {
  const filename = localArtifacts[i];
  const ext = path.extname(filename);
  const idx = i + 6;
  const newName = `cardinal_new_${idx}${ext}`;
  const destPath = path.join(destFolder, newName);
  const srcPath = path.join(srcFolder, filename);

  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    updates[idx] = `/images/faucets/${newName}`;
    console.log(`Copied ${filename} to ${newName}`);
  }
}

// Safely modify the array holding the IDs
const componentPath = path.join(basePath, 'CardinalCollection.jsx');
let content = fs.readFileSync(componentPath, 'utf8');

let lines = content.split('\n');
let currentId = null;

for (let i = 0; i < lines.length; i++) {
  const idMatch = lines[i].match(/id:\s*(\d+)/);
  if (idMatch) {
    currentId = parseInt(idMatch[1]);
  }

  // Rewrite image bindings for items 6 to 10
  if (currentId && currentId >= 6 && currentId <= 10 && lines[i].match(/image:\s*['"]/)) {
    if (updates[currentId]) {
      lines[i] = lines[i].replace(/image:\s*['"][^'"]+['"]/, `image: '${updates[currentId]}'`);
      currentId = null;
    }
  }
}

fs.writeFileSync(componentPath, lines.join('\n'));
console.log('Successfully updated CardinalCollection.jsx React bindings!');
