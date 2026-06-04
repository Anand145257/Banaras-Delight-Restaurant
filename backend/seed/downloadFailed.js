const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  { name: 'tandoori-chicken.jpg', url: 'https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?w=600&auto=format&fit=crop' },
  { name: 'veg-manchurian.jpg', url: 'https://images.unsplash.com/photo-1645696301019-35adcc18a1c0?w=600&auto=format&fit=crop' },
  { name: 'bisi-bele-bath.jpg', url: 'https://images.unsplash.com/photo-1567337710282-00832b415979?w=600&auto=format&fit=crop' },
  { name: 'mysore-masala-dosa.jpg', url: 'https://images.unsplash.com/photo-1668236543090-82eb5eab6fee?w=600&auto=format&fit=crop' },
  { name: 'gulab-jamun.jpg', url: 'https://images.unsplash.com/photo-1666190064844-5cfe5da38a4a?w=600&auto=format&fit=crop' },
  { name: 'fresh-lime-soda.jpg', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed514?w=600&auto=format&fit=crop' }
];

const uploadDir = path.join(__dirname, '..', 'uploads');

function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (response) => {
      if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        return downloadImage(response.headers.location, filename).then(resolve).catch(reject);
      }
      
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to get '${url}' (${response.statusCode})`));
      }

      const file = fs.createWriteStream(filename);
      response.pipe(file);
      file.on('finish', () => {
        file.close(resolve);
      });
      file.on('error', (err) => {
        fs.unlink(filename, () => reject(err));
      });
    }).on('error', reject);
  });
}

async function run() {
  for (const img of images) {
    const dest = path.join(uploadDir, img.name);
    console.log(`Downloading ${img.name}...`);
    try {
      await downloadImage(img.url, dest);
      console.log(`Successfully downloaded ${img.name}`);
    } catch (e) {
      console.error(`Error downloading ${img.name}: ${e.message}`);
    }
  }
}

run();
