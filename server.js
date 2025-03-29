const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// In-memory table to store messages
let messageTable = [];

// In-memory variable to store player states
let gameState = { players: [20137581,283086588,310475181,1246317443,83665149,3888076128,3177450285,104594292,21694635,617712672,744518605,4959248736,7293614438,658130642,6041260107,1254947521,2433211999,896315701,1897816342,110613208,1166802636,8031895652,42357700534305,138080016,3258168873,3027675324] };

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
