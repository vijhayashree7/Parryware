import fs from 'fs';
import path from 'path';

// Exactly mapped known-good original states to RESTORE the non-basin entries
const goodMap = {
  // Faucets
  'faucet-cardinal': '/images/faucets/faucet_cardinal_1774835577142.png',
  'faucet-praseo': '/images/faucets/faucet_praseo_1774835616136.png',
  'faucet-quattro': '/images/faucets/faucet_quattro_1774835852581.png',
  'faucet-sensor': '/images/faucets/faucet_sensor_1774835921942.png',
  'faucet-espirion': '/images/faucets/faucet_espirion_1774835952503.png',
  'faucet-thermostatic': '/images/faucets/faucet_thermostatic_1774836019478.png',
  'faucet-crust': '/images/faucets/faucet_quattro_1774835852581.png',
  'faucet-agate-pro': '/images/faucets/faucet_espirion_1774835952503.png',
  'faucet-aqua': '/images/faucets/faucet_sensor_1774835921942.png',
  'faucet-uno': '/images/faucets/faucet_praseo_1774835616136.png',

  // Heaters
  'heater-storage': 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=1200',
  'heater-tankless': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200',
  'heater-heat-pump': 'https://images.unsplash.com/photo-1581092580497-e0d23cbdf1dc?auto=format&fit=crop&q=80&w=1200',
  'heater-solar': 'https://images.unsplash.com/photo-1581093450021-4a7360e9a6b5?auto=format&fit=crop&q=80&w=1200',
  'heater-condensing': 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=1200',
  'heater-electric-pump': 'https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&q=80&w=1200',
  'heater-gas': 'https://images.unsplash.com/photo-1581091238491-15fe2b415aef?auto=format&fit=crop&q=80&w=1200',
  'heater-point-of-use': 'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?auto=format&fit=crop&q=80&w=1200',
  'heater-smart': 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=1200',
  'heater-hydrolic-boiler': 'https://images.unsplash.com/photo-1581090466373-c558c73d9e07?auto=format&fit=crop&q=80&w=1200',

  // Chimneys
  'chimney-wall-mounted': 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1200',
  'chimney-island': 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200',
  'chimney-built-in': 'https://images.unsplash.com/photo-1596767677764-ee09b691ec55?auto=format&fit=crop&q=80&w=1200',
  'chimney-corner': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
  'chimney-auto-clean': 'https://images.unsplash.com/photo-1574691458021-3965fcbd7ad5?auto=format&fit=crop&q=80&w=1200',
  'chimney-filterless': 'https://images.unsplash.com/photo-1600494603980-362f8319f07a?auto=format&fit=crop&q=80&w=1200',
  'chimney-ducted': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
  'chimney-ductless': 'https://images.unsplash.com/photo-1593368297059-4fefdbd5c64c?auto=format&fit=crop&q=80&w=1200',
  'chimney-smart': 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200',
  'chimney-slim': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',

  // Tiles and Surfaces
  'tiles-floor': 'https://images.unsplash.com/photo-1581093588401-fbb62a02f120?auto=format&fit=crop&q=80&w=1200',
  'tiles-wall': 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200',
  'tiles-vitrified': 'https://images.unsplash.com/photo-1596767677764-ee09b691ec55?auto=format&fit=crop&q=80&w=1200',
  'tiles-ceramic': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
  'tiles-porcelain': 'https://images.unsplash.com/photo-1574691458021-3965fcbd7ad5?auto=format&fit=crop&q=80&w=1200',
  'tiles-mosaic': 'https://images.unsplash.com/photo-1600494603980-362f8319f07a?auto=format&fit=crop&q=80&w=1200',
  'surface-marble': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
  'surface-granite': 'https://images.unsplash.com/photo-1593368297059-4fefdbd5c64c?auto=format&fit=crop&q=80&w=1200',
  'surface-quartz': 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200',
  'surface-wooden-finish': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',

  // Closets
  'closet-one-piece': 'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&q=80&w=1200',
  'closet-two-piece': 'https://images.unsplash.com/photo-1620626011761-996317b8d101?auto=format&fit=crop&q=80&w=1200',
  'closet-wall-hung': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=1200',
  'closet-floor-mounted': 'https://images.unsplash.com/photo-1600566753086-00f18efc2294?auto=format&fit=crop&q=80&w=1200',
  'closet-smart': 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&q=80&w=1200',
  'closet-western': 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&q=80&w=1200',
  'closet-indian': 'https://images.unsplash.com/photo-1596767677764-ee09b691ec55?auto=format&fit=crop&q=80&w=1200',
  'closet-rimless': 'https://images.unsplash.com/photo-1600494603980-362f8319f07a?auto=format&fit=crop&q=80&w=1200',
  'closet-compact': 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
  'closet-concealed': 'https://images.unsplash.com/photo-1581090466373-c558c73d9e07?auto=format&fit=crop&q=80&w=1200'
};

const basePath = 'c:\\Users\\asus0\\Parryware\\src\\components';

function processContent(content) {
  const lines = content.split('\n');
  let currentKey = null;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    let idMatch = line.match(/id:\s*'([^']+)'/);
    if (!idMatch) idMatch = line.match(/^\s*'([^']+)':\s*\{/);
    
    if (idMatch) {
      const key = idMatch[1];
      if (goodMap[key]) {
        currentKey = key;
      } else {
        // basins or anything not in goodMap should be untouched
        currentKey = null;
      }
    }
    
    if (currentKey && line.match(/image:\s*['"].*['"]/)) {
      lines[i] = line.replace(/image:\s*['"].*['"]/, `image: '${goodMap[currentKey]}'`);
      currentKey = null;
    }
  }
  return lines.join('\n');
}

// Ensure the specific page components are perfectly synced with the map!
const filesToUpdate = [
  'FaucetsPage.jsx',
  'ClosetPage.jsx',
  'WaterHeaterPage.jsx',
  'ChimneyPage.jsx',
  'TilesSurfacePage.jsx',
  'ProductDetail.jsx'
];

filesToUpdate.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = processContent(content);
    fs.writeFileSync(fullPath, content);
    console.log(`Repaired ${file}`);
  }
});
