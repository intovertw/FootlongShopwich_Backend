require("node:dns/promises").setServers(["1.1.1.1", "8.8.8.8"]);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const {
    login,
    createPlayer,
    deletePlayerById,
    getAllPlayers,
    getPlayerDataById,
    getScore,
    updateScore
} = require('./controllers/playerController');

dotenv.config();

const app = express();

app.use(express.json());


mongoose.connect(process.env.MONGODB_URI)
    .then(()=> console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to Connect to MongoDB: ', err));

const PORT = process.env.PORT || 3000;

app.post('/players/login', login);
app.post('/players/register', createPlayer);
app.delete('/players/:id', deletePlayerById);
app.get('/players', getAllPlayers);
app.get('/players/:id', getPlayerDataById);
app.put('/players/score/:id', updateScore);
app.get('/players/score/:id', getScore);


app.post('/test-jwt', (req, res)=>{
    const {generateToken, verifyToken} = require('./utils/jwt');

    const testPlayerId = '64as12321134dvasdkjn0789';
    const token = generateToken(testPlayerId);
    console.log('Generated Token: ', token);

    const decoded = verifyToken(token);

    console.log('Decoded Payload: ', decoded);

    res.json({
        success: true,
        token,
        decoded,
        matches: decoded ? decoded.id === testPlayerId : false
    });
});

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`)
});

