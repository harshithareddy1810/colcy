const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware to parse JSON requests and enable CORS
app.use(express.json());
app.use(cors());

// MongoDB connection
const dbURI = 'mongodb://localhost:27017/colcy'; // Use your database URL
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.error('MongoDB Connection Error:', err));

// User Schema
const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  balance: { type: Number, default: 0 },
});

// User Model
const User = mongoose.model('User', userSchema);

// Conversion rate: 1 real unit = 10 points
const CONVERSION_RATE = 10;

// Route: Convert money to points
app.post('/convert', async (req, res) => {
  const { userId, amount } = req.body;

  if (!userId || !amount || amount <= 0) {
    return res.status(400).json({ message: 'Invalid user ID or amount' });
  }

  try {
    // Find user or create a new one
    let user = await User.findOne({ userId });
    if (!user) {
      user = new User({ userId, balance: 0 });
    }

    // Add converted points to balance
    const points = amount * CONVERSION_RATE;
    user.balance += points;
    await user.save();

    res.json({ message: 'Points added successfully', balance: user.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Route: Get user balance
app.get('/balance/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ balance: user.balance });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
