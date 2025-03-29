const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// Route for POST requests to '/'
app.post('/', (req, res) => {
    console.log('Received request body:', req.body);
    res.send({ message: 'Root POST endpoint reached!' });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
