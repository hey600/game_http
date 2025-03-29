const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Sample route to handle requests
app.post('/webhook', (req, res) => {
    console.log('Received from Roblox:', req.body);
    res.send({ message: 'Request received successfully!' });
});

const port = process.env.PORT || 3000; // Use Vercel's port or default to 3000
app.listen(port, () => {
    console.log(`HTTP server running on port ${port}`);
});
