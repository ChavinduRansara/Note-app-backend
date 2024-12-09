const express = require('express');
const cors = require('cors');
require('dotenv').config();
// const errorHandler = require('./middlewares/errorHandler');

// Import routes
const userRoutes = require('./routes/userRoutes');
const noteRoutes = require('./routes/noteRoutes');
// const categoryRoutes = require('./routes/categoryRoutes');
// const tagRoutes = require('./routes/tagRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/notes', noteRoutes);
// app.use('/api/categories', categoryRoutes);
// app.use('/api/tags', tagRoutes);

// Error handling
// app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});