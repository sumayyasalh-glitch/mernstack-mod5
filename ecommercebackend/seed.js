require('dotenv').config();
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const User = require('./models/user');
const Product = require('./models/product');

const products = [
  { name: 'Aurora Wireless Headphones', description: 'Comfortable noise-isolating headphones with 30-hour battery life.', price: 7499, category: 'Electronics', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80', stock: 18 },
  { name: 'Minimal Desk Lamp', description: 'Warm LED desk lamp with three brightness levels.', price: 3299, category: 'Home', image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80', stock: 12 },
  { name: 'Everyday Carry Backpack', description: 'Water-resistant backpack for work, travel, and weekends.', price: 5499, category: 'Fashion', image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80', stock: 20 },
  { name: 'Smart Fitness Watch', description: 'Track activity, sleep, and notifications in a lightweight design.', price: 9999, category: 'Electronics', image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=800&q=80', stock: 8 },
  { name: 'Ceramic Pour-over Set', description: 'A simple ceramic brewer for a more considered morning coffee.', price: 2899, category: 'Home', image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80', stock: 15 },
  { name: 'Classic Linen Shirt', description: 'Breathable long-sleeve shirt in a relaxed regular fit.', price: 4499, category: 'Fashion', image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80', stock: 14 }
];

async function seed() {
  if (!process.env.MONGODB_URI) throw new Error('Set MONGODB_URI in .env before seeding.');
  await mongoose.connect(process.env.MONGODB_URI);
  await Product.deleteMany({});
  await Product.insertMany(products);
  const password = await bcrypt.hash('Admin123!', 10);
  await User.findOneAndUpdate({ email: 'admin@shopverse.test' }, { name: 'ShopVerse Admin', email: 'admin@shopverse.test', password, role: 'admin' }, { upsert: true, returnDocument: 'after', setDefaultsOnInsert: true });
  console.log('Seed complete. Admin login: admin@shopverse.test / Admin123!');
  await mongoose.disconnect();
}

seed().catch((error) => { console.error(error.message); process.exit(1); });
