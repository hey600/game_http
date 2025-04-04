const express = require('express');
const https = require('https');
const app = express();

// Middleware to parse JSON requests
app.use(express.json());

// In-memory variable to store player states
let gameState = { players: [92995189, 3445648501, 2844903985, 118457665, 1393052218, 1017180128, 2353564431, 4677937692, 2542117515, 131965770, 7148239404, 288442818, 20137581, 116430143, 5355288926, 2518576562, 2701296276, 1242721354,1913963399, 4320823910, 1864488095, 1693618943, 886760249, 5041485324, 7729945748, 7223969206, 1668865697, 1509553684, 2276580523, 733618545, 3788471811, 283086588, 7601206866, 310475181, 1246317443, 7135281689, 151346278, 83665149, 3888076128, 1977047445, 2054639766, 3177450285, 104594292, 21694635, 617712672, 744518605, 4959248736, 7293614438, 658130642, 6041260107, 1254947521, 2433211999, 896315701, 1897816342, 110613208, 1166802636, 8031895652, 42357700534305, 138080016, 3258168873, 3027675324] };

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
