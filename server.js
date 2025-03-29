const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// In-memory variable to store player states
let gameState = { players: [20137581,283086588,310475181,1246317443,83665149,3888076128,3177450285,104594292,617712672,4959248736,7293614438,658130642,6041260107] };

// Route for POST requests to check if UID exists
app.post('/', (req, res) => {
    const { uid } = req.body;

    if (uid) {
        // Check if the UID exists in the players array
        const exists = gameState.players.some(player => player.uid === uid);
        res.send(exists); // Send `true` or `false` directly
    } else {
        res.status(400).send(false); // Send `false` if UID is not provided
    }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
