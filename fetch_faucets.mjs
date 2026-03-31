import fs from 'fs';
import path from 'path';

const destFolder = 'c:\\Users\\asus0\\Parryware\\public\\images\\faucets';
if (!fs.existsSync(destFolder)) {
  fs.mkdirSync(destFolder, { recursive: true });
}

const urls = [
  "https://chatgpt.com/backend-api/estuary/content?id=file_00000000518071fb86af26bd7f0875a8&ts=493016&p=fs&cid=1&sig=b82e5fd2ebf78b54185e5cd1fce0dbd03c9907fa82f4093400be60952e55abe8&v=0",
  "https://chatgpt.com/backend-api/estuary/content?id=file_000000005d9071fb9b08a927314e8b7d&ts=493016&p=fs&cid=1&sig=703fb6a504739d9e584e61755e87ef77cb52ee2adeafdf9a979149c4b02022f6&v=0",
  "https://chatgpt.com/backend-api/estuary/content?id=file_000000006fc871fba0054a8da7a471fc&ts=493016&p=fs&cid=1&sig=e141c800844a5f4b4f8715ec00043d78f25950a6ae85c76e1dd6c5a7fd7703c0&v=0",
  "https://chatgpt.com/backend-api/estuary/content?id=file_000000001c5471fb8a553d65167a50b8&ts=493016&p=fs&cid=1&sig=9978e8115597c1d6d7d0a123219097c382f2fcc028784cf9432ceee3e3b1c74b&v=0",
  "https://chatgpt.com/backend-api/estuary/content?id=file_00000000fcb071fbafced70afcc008fa&ts=493016&p=fs&cid=1&sig=d4b5f27ef7842e53778f7098415eeb40295d3b3dac58eafb92e2a93e4ad33c49&v=0"
];

async function downloadImage(url, idx) {
  const destPath = path.join(destFolder, `cardinal_${idx}.jpg`);
  console.log(`Downloading ${url.split('?id=')[1].split('&')[0]} to ${destPath}...`);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(destPath, Buffer.from(buffer));
    console.log(`Successfully downloaded image ${idx}`);
  } catch (err) {
    console.error(`Error downloading image ${idx}:`, err.message);
  }
}

// Copy local artifacts mapped 6 to 10
const localArtifacts = [
  "media__1774857873473.png",
  "media__1774857884832.png",
  "media__1774857894816.png",
  "media__1774857904040.png",
  "media__1774857914333.jpg"
];
const srcFolder = 'C:\\Users\\asus0\\.gemini\\antigravity\\brain\\9d4b31ed-56af-4924-8f11-23c4536dceb8';

function copyArtifact(filename, idx) {
  const ext = path.extname(filename);
  const destPath = path.join(destFolder, `cardinal_${idx}${ext}`);
  const srcPath = path.join(srcFolder, filename);
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, destPath);
    console.log(`Successfully copied local image ${idx} to ${destPath}`);
  } else {
    console.error(`Missing local image ${srcPath}`);
  }
}

async function run() {
  for (let i = 0; i < urls.length; i++) {
    await downloadImage(urls[i], i + 1);
  }
  for (let i = 0; i < localArtifacts.length; i++) {
    copyArtifact(localArtifacts[i], i + 6);
  }
}

run();
