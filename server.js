const express = require('express');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// In-memory variable to store player states
let gameState = {
    players: [] // Array to hold all player states
};

// Route for POST requests to update player state
app.post('/', (req, res) => {
    const { playerName, playinganim, playerBelly } = req.body;

    if (playerName && playinganim && playerBelly) {
        // Check if the player already exists
        const existingPlayerIndex = gameState.players.findIndex(player => player.playerName === playerName);

        if (existingPlayerIndex !== -1) {
            // Update existing player state
            gameState.players[existingPlayerIndex] = { playerName, playinganim, playerBelly };
        } else {
            // Add new player state
            gameState.players.push({ playerName, playinganim, playerBelly });
        }

        // Respond with the updated game state
        res.send({
            message: 'Player state updated successfully!',
            playerStates: gameState.players
        });
    } else {
        res.status(400).send({ error: 'Invalid data provided! Ensure all fields are included.' });
    }
});

// Route for GET requests to retrieve the state of all players
app.get('/', (req, res) => {
    res.send(gameState);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
