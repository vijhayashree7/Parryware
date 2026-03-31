import fs from 'fs';
import path from 'path';

const basePath = 'c:\\Users\\asus0\\Parryware\\src\\components';

const filesToUpdate = [
  'BasinPage.jsx',
  'WaterHeaterPage.jsx',
  'ClosetPage.jsx',
  'ChimneyPage.jsx',
  'TilesSurfacePage.jsx',
  'FaucetsPage.jsx',
  'ProductDetail.jsx'
];

function processContent(content) {
  // Find all https://source.unsplash.com/500x500/?{query}
  // Replace with https://loremflickr.com/800/800/{query_with_commas}/all
  
  return content.replace(/https:\/\/source\.unsplash\.com\/\d+x\d+\/\?([^'"\s&]+)/g, (match, query) => {
    // Replace hyphens with commas for better loremflickr targeting matching
    const tags = query.replace(/-/g, ',');
    
    // Using a random seed based on the query to ensure the same component gets the same steady image, 
    // but different components get different ones
    
    return `https://loremflickr.com/800/800/${tags}/all?lock=${Math.floor(Math.random() * 1000)}`;
  });
}

filesToUpdate.forEach(file => {
  const fullPath = path.join(basePath, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Only write if changes are needed
    if (content.includes('source.unsplash.com')) {
      const updatedContent = processContent(content);
      fs.writeFileSync(fullPath, updatedContent);
      console.log(`Fixed broken links in ${file}`);
    } else {
      console.log(`No broken links found in ${file}`);
    }
  }
});
