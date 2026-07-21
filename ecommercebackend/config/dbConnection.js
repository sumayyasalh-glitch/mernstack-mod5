const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    console.warn('No MONGODB_URI configured. Running with in-memory fallback.');
    return false;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
    return true;
  } catch (error) {
    console.warn('MongoDB unavailable, falling back to in-memory storage.', error.message);
    return false;
  }
};

module.exports = connectDB;
