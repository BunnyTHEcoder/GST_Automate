// server.js
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const gstRoutes = require('./routes/gst');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

app.use(bodyParser.json());
app.use('/api', gstRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
