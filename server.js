const express = require('express');
const https = require('https');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// In-memory variable to store player states
let gameState = { players: [20137581, 1913963399, 5041485324, 2276580523, 3788471811, 283086588, 7601206866, 310475181, 1246317443, 151346278, 83665149, 3888076128, 1977047445, 2054639766, 3177450285, 104594292, 21694635, 617712672, 744518605, 4959248736, 7293614438, 658130642, 6041260107, 1254947521, 2433211999, 896315701, 1897816342, 110613208, 1166802636, 8031895652, 42357700534305, 138080016, 3258168873, 3027675324] };

// Route for POST requests to check if UID exists
app.post('/', (req, res) => {
    const { uid } = req.body;

    if (uid) {
        const uidNum = Number(uid);
        const exists = gameState.players.includes(uidNum);
        res.send(exists);
    } else {
        res.status(400).send(false);
    }
});

app.get('/luau-script', (req, res) => {
    const rawUrl = 'https://raw.githubusercontent.com/hey600/game_http/refs/heads/main/MainServer.lua'; // The working raw URL

    https.get(rawUrl, (response) => {
        if (response.statusCode !== 200) {
            res.status(response.statusCode).send('Error fetching Lua file');
            return;
        }

        let data = '';
        response.on('data', (chunk) => {
            data += chunk;
        });

        response.on('end', () => {
            // Send the Lua script exactly as it is fetched
            res.send(data); // No line formatting applied
        });
    }).on('error', (error) => {
        console.error('Error fetching Lua file:', error);
        res.status(500).send('Error fetching Lua file');
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
