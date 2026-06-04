const fs = require('fs');
const https = require('https');
const path = require('path');

const images = [
  { name: 'butter-chicken.jpg', url: 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?q=80&w=600&auto=format&fit=crop' },
  { name: 'paneer-butter-masala.jpg', url: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?q=80&w=600&auto=format&fit=crop' },
  { name: 'dal-makhani.jpg', url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?q=80&w=600&auto=format&fit=crop' },
  { name: 'tandoori-chicken.jpg', url: 'https://images.unsplash.com/photo-1610057099443-fde6c99db8f1?q=80&w=600&auto=format&fit=crop' },
  { name: 'masala-dosa.jpg', url: 'https://images.unsplash.com/photo-1630383249896-424e482df921?q=80&w=600&auto=format&fit=crop' },
  { name: 'hyderabadi-biryani.jpg', url: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?q=80&w=600&auto=format&fit=crop' },
  { name: 'idli-sambar.jpg', url: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?q=80&w=600&auto=format&fit=crop' },
  { name: 'chettinad-chicken.jpg', url: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop' },
  { name: 'hakka-noodles.jpg', url: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=600&auto=format&fit=crop' },
  { name: 'chilli-chicken.jpg', url: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?q=80&w=600&auto=format&fit=crop' },
  { name: 'veg-manchurian.jpg', url: 'https://images.unsplash.com/photo-1626804475297-41609ea004eb?q=80&w=600&auto=format&fit=crop' },
  { name: 'spring-rolls.jpg', url: 'https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=600&auto=format&fit=crop' },
  { name: 'bisi-bele-bath.jpg', url: 'https://images.unsplash.com/photo-1626015462557-415843a85fc6?q=80&w=600&auto=format&fit=crop' },
  { name: 'mysore-masala-dosa.jpg', url: 'https://images.unsplash.com/photo-1668236543090-82eb5eab6fee?q=80&w=600&auto=format&fit=crop' },
  { name: 'ragi-mudde.jpg', url: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?q=80&w=600&auto=format&fit=crop' },
  { name: 'filter-coffee.jpg', url: 'https://images.unsplash.com/photo-1610889556528-9a770e32642f?q=80&w=600&auto=format&fit=crop' },
  { name: 'classic-tiramisu.jpg', url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?q=80&w=600&auto=format&fit=crop' },
  { name: 'gulab-jamun.jpg', url: 'https://images.unsplash.com/photo-1593719608141-692ab62970de?q=80&w=600&auto=format&fit=crop' },
  { name: 'rasmalai.jpg', url: 'https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?q=80&w=600&auto=format&fit=crop' },
  { name: 'chocolate-lava-cake.jpg', url: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=600&auto=format&fit=crop' },
  { name: 'mango-lassi.jpg', url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?q=80&w=600&auto=format&fit=crop' },
  { name: 'masala-chai.jpg', url: 'https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?q=80&w=600&auto=format&fit=crop' },
  { name: 'fresh-lime-soda.jpg', url: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed514?q=80&w=600&auto=format&fit=crop' },
  { name: 'cold-coffee.jpg', url: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?q=80&w=600&auto=format&fit=crop' }
];

const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

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
