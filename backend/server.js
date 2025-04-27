const express = require('express');
const app = express();
require('dotenv').config(); // Load .env file

const simpleRoutes = require('./routes/simpleRoutes'); // We'll create this file next!

app.use(express.json()); // So server can read JSON

// Use routes
app.use('/api', simpleRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
