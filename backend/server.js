const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Enhanced MongoDB connection with better error handling
const connectDB = async () => {
  try {
    console.log('Attempting to connect to MongoDB...');
    console.log('MongoDB URI:', process.env.MONGODB_URI ? 'URI found' : 'URI not found');
    
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  }
};

connectDB();

app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
