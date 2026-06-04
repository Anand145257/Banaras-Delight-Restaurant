// backend/seed/menuSeed.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const FoodItem = require('../models/FoodItem');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding');
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

let seedData = [
  // ─── Indian ────────────────────────────────────────────────
  {
    name: 'Butter Chicken',
    description: 'Tender chicken pieces simmered in a rich, creamy tomato-based sauce with aromatic spices and butter.',
    price: 14.99,
    category: 'Indian',
    imageUrl: '/uploads/butter-chicken.jpg',
    rating: 4.8,
    veg: false,
    tags: ['spicy', 'classic', 'creamy'],
    bestSeller: true,
  },
  {
    name: 'Paneer Butter Masala',
    description: 'Soft cottage cheese cubes in a velvety, rich and creamy buttery tomato gravy.',
    price: 12.50,
    category: 'Indian',
    imageUrl: '/uploads/paneer-butter-masala.jpg',
    rating: 4.6,
    veg: true,
    tags: ['vegetarian', 'creamy'],
    bestSeller: false,
  },
  {
    name: 'Dal Makhani',
    description: 'Slow-cooked black lentils and kidney beans in a creamy, buttery gravy. A North Indian classic.',
    price: 11.99,
    category: 'Indian',
    imageUrl: '/uploads/dal-makhani.jpg',
    rating: 4.7,
    veg: true,
    tags: ['vegetarian', 'comfort food'],
    bestSeller: true,
  },
  {
    name: 'Tandoori Chicken',
    description: 'Marinated chicken roasted in a traditional clay oven with yogurt and aromatic spices.',
    price: 15.99,
    category: 'Indian',
    imageUrl: '/uploads/tandoori-chicken.jpg',
    rating: 4.9,
    veg: false,
    tags: ['grilled', 'signature', 'smoky'],
    bestSeller: true,
  },
  // ─── South Indian ─────────────────────────────────────────
  {
    name: 'Masala Dosa',
    description: 'Crispy golden rice and lentil crepe filled with spiced potato filling, served with chutneys and sambar.',
    price: 10.99,
    category: 'South Indian',
    imageUrl: '/uploads/masala-dosa.jpg',
    rating: 4.7,
    veg: true,
    tags: ['crispy', 'breakfast'],
    bestSeller: true,
  },
  {
    name: 'Hyderabadi Biryani',
    description: 'Aromatic basmati rice layered with tender meat, saffron, and whole spices, slow-cooked to perfection.',
    price: 16.99,
    category: 'South Indian',
    imageUrl: '/uploads/hyderabadi-biryani.jpg',
    rating: 4.9,
    veg: false,
    tags: ['spicy', 'signature', 'aromatic'],
    bestSeller: true,
  },
  {
    name: 'Idli Sambar',
    description: 'Fluffy steamed rice cakes served with piping hot lentil sambar and fresh coconut chutney.',
    price: 8.99,
    category: 'South Indian',
    imageUrl: '/uploads/idli-sambar.jpg',
    rating: 4.5,
    veg: true,
    tags: ['healthy', 'breakfast'],
    bestSeller: false,
  },
  {
    name: 'Chettinad Chicken',
    description: 'Fiery and aromatic chicken curry from Tamil Nadu, made with freshly ground spices.',
    price: 15.50,
    category: 'South Indian',
    imageUrl: '/uploads/chettinad-chicken.jpg',
    rating: 4.6,
    veg: false,
    tags: ['spicy', 'bold'],
    bestSeller: false,
  },
  // ─── Chinese ──────────────────────────────────────────────
  {
    name: 'Hakka Noodles',
    description: 'Wok-tossed noodles with crisp vegetables, soy sauce, and a hint of chili. Indo-Chinese favorite.',
    price: 11.99,
    category: 'Chinese',
    imageUrl: '/uploads/hakka-noodles.jpg',
    rating: 4.4,
    veg: true,
    tags: ['wok', 'noodles'],
    bestSeller: false,
  },
  {
    name: 'Chilli Chicken',
    description: 'Crispy deep-fried chicken bites tossed with peppers, onions in a spicy sweet-savory sauce.',
    price: 13.50,
    category: 'Chinese',
    imageUrl: '/uploads/chilli-chicken.jpg',
    rating: 4.6,
    veg: false,
    tags: ['spicy', 'crispy'],
    bestSeller: true,
  },
  {
    name: 'Veg Manchurian',
    description: 'Deep-fried vegetable dumplings tossed in a tangy, umami-rich Manchurian sauce.',
    price: 11.50,
    category: 'Chinese',
    imageUrl: '/uploads/veg-manchurian.jpg',
    rating: 4.5,
    veg: true,
    tags: ['vegetarian', 'tangy'],
    bestSeller: false,
  },
  {
    name: 'Spring Roll',
    description: 'Golden crispy rolls stuffed with seasoned vegetables, served with sweet chili dipping sauce.',
    price: 9.99,
    category: 'Chinese',
    imageUrl: '/uploads/spring-roll.jpg',
    rating: 4.3,
    veg: true,
    tags: ['appetizer', 'crispy'],
    bestSeller: false,
  },
  // ─── Bengaluru Special ────────────────────────────────────
  {
    name: 'Bisi Bele Bath',
    description: 'Karnataka\'s signature spiced rice dish with lentils, vegetables, and a special masala blend.',
    price: 10.99,
    category: 'Bengaluru Special',
    imageUrl: '/uploads/bisi-bele-bath.jpg',
    rating: 4.7,
    veg: true,
    tags: ['traditional', 'comfort food'],
    bestSeller: true,
  },
  {
    name: 'Mysore Masala Dosa',
    description: 'Crispy dosa with a layer of spicy red chutney inside, filled with masala potatoes.',
    price: 11.99,
    category: 'Bengaluru Special',
    imageUrl: '/uploads/mysore-masala-dosa.jpg',
    rating: 4.8,
    veg: true,
    tags: ['spicy', 'crispy', 'signature'],
    bestSeller: true,
  },
  {
    name: 'Ragi Mudde',
    description: 'Traditional finger millet balls served with spicy mutton or vegetable saaru.',
    price: 9.99,
    category: 'Bengaluru Special',
    imageUrl: '/uploads/ragi-mudde.jpg',
    rating: 4.4,
    veg: true,
    tags: ['healthy', 'traditional'],
    bestSeller: false,
  },
  {
    name: 'Filter Coffee',
    description: 'Authentic South Indian filter coffee brewed with chicory, served frothy in a traditional tumbler.',
    price: 4.99,
    category: 'Bengaluru Special',
    imageUrl: '/uploads/filter-coffee.jpg',
    rating: 4.9,
    veg: true,
    tags: ['beverage', 'classic'],
    bestSeller: true,
  },
  // ─── Desserts ─────────────────────────────────────────────
  {
    name: 'Classic Tiramisu',
    description: 'Layered Italian dessert with espresso-soaked ladyfingers, mascarpone cream, and cocoa.',
    price: 8.50,
    category: 'Desserts',
    imageUrl: '/uploads/classic-tiramisu.jpg',
    rating: 4.7,
    veg: true,
    tags: ['sweet', 'italian'],
    bestSeller: true,
  },
  {
    name: 'Gulab Jamun',
    description: 'Soft, golden milk-solid dumplings soaked in fragrant rose and cardamom sugar syrup.',
    price: 6.99,
    category: 'Desserts',
    imageUrl: '/uploads/gulab-jamun.jpg',
    rating: 4.9,
    veg: true,
    tags: ['traditional', 'sweet'],
    bestSeller: true,
  },
  {
    name: 'Rasmalai',
    description: 'Delicate flattened paneer balls immersed in chilled, saffron-infused sweetened milk.',
    price: 7.50,
    category: 'Desserts',
    imageUrl: '/uploads/rasmalai.jpg',
    rating: 4.8,
    veg: true,
    tags: ['traditional', 'chilled'],
    bestSeller: false,
  },
  {
    name: 'Chocolate Lava Cake',
    description: 'Warm, rich chocolate cake with a molten center, served with vanilla ice cream.',
    price: 9.99,
    category: 'Desserts',
    imageUrl: '/uploads/chocolate-lava-cake.jpg',
    rating: 4.8,
    veg: true,
    tags: ['chocolate', 'indulgent'],
    bestSeller: true,
  },
  // ─── Drinks ───────────────────────────────────────────────
  {
    name: 'Mango Drink',
    description: 'Freshly blended sweet ripe mango juice, served chilled in a glass.',
    price: 5.99,
    category: 'Drinks',
    imageUrl: '/uploads/mango-drink.jpg',
    rating: 4.8,
    veg: true,
    tags: ['refreshing', 'chilled'],
    bestSeller: true,
  },
  {
    name: 'Masala Chai',
    description: 'Aromatic Indian spiced tea brewed with ginger, cardamom, cinnamon, and fresh milk.',
    price: 3.99,
    category: 'Drinks',
    imageUrl: '/uploads/masala-chai.jpg',
    rating: 4.7,
    veg: true,
    tags: ['hot', 'spiced'],
    bestSeller: true,
  },
  {
    name: 'Fresh Lime Soda',
    description: 'Refreshing sparkling lime drink with a choice of sweet, salty, or mixed preparation.',
    price: 3.50,
    category: 'Drinks',
    imageUrl: '/uploads/fresh-lime-soda.jpg',
    rating: 4.3,
    veg: true,
    tags: ['refreshing', 'citrus'],
    bestSeller: false,
  },
  {
    name: 'Cold Coffee',
    description: 'Rich, creamy iced coffee blended with milk and a touch of chocolate. A Bengaluru café staple.',
    price: 5.50,
    category: 'Drinks',
    imageUrl: '/uploads/cold-coffee.jpg',
    rating: 4.6,
    veg: true,
    tags: ['iced', 'creamy'],
    bestSeller: false,
  },
];

const importData = async () => {
  try {
    // Convert dollar prices to Indian Rupees
    const conversionMap = {
      12: 299,
      15: 349,
      20: 499
    };
    seedData = seedData.map(item => {
      const usdPrice = Number(item.price);
      const inrPrice = conversionMap[usdPrice] || Math.round(usdPrice * 25);
      return { ...item, price: inrPrice };
    });
    await FoodItem.deleteMany();
    await FoodItem.insertMany(seedData);
    console.log(`✅ ${seedData.length} menu items imported successfully`);
    process.exit();
  } catch (err) {
    console.error('❌ Error importing data:', err);
    process.exit(1);
  }
};

connectDB().then(importData);
