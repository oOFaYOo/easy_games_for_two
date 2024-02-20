const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path');
const {sql} = require('@vercel/postgres');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true
    }),
);

const PORT = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, '../build')))

app.get('/api/games', async (req, res) => {
    try{
        const games = await sql`select id, type, player1, player2 from task7games`;
        const availableGames = [];
        games.rows.forEach(item => {
            if(!item.player1 || !item.player2){
                availableGames.push({
                    id:item.id,
                    type:item.type,
                });
            }
        })
        res.send(availableGames);}
    catch (e){
        console.error(e);
        res.status(500);
        res.send(e.message);
    }
});

app.get('/api/games/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const game = (await sql`select * from task7games where id = ${id}`).rows[0];
        //?????
        res.send(game);
        }
    catch (e){
        console.error(e);
        res.status(500);
        res.send(e.message);
    }
});

app.post('/api/games/join/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const {userId, name} = req.body;
        const user = {id:userId, name:name};
        const {player1, player2} = (await sql`select player1, player2 from task7games where id = ${gameId}`).rows[0];
        if(!player1){
            await sql`update task7games set player1 = ${JSON.stringify(user)} where id = ${gameId}`;
        } else {
            await sql`update task7games set player2 = ${JSON.stringify(user)} where id = ${gameId}`;
        }
        res.status(200);
    }
    catch (e){
        console.error(e);
        res.status(500);
        res.send(e.message);
    }
});

app.post('/api/games/leave/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const {userId} = JSON.parse(req.body);
        const {player1, player2} = (await sql`select player1, player2 from task7games where id = ${gameId}`).rows[0];
        if(JSON.parse(player1).id === userId){
            await sql`update task7games set player1 = null where id = ${gameId}`;
            if(!player2){
                await sql`delete from task7games where id = ${gameId}`;
            }
        } else {
            await sql`update task7games set player2 = null where id = ${gameId}`;
            if(!player1){
                await sql`delete from task7games where id = ${gameId}`;
            }
        }
        res.status(200);
    }
    catch (e){
        console.error(e);
        res.status(500);
        res.send(e.message);
    }
});

app.post('/api/games', async (req, res) => {
    try {
        const type = req.body.type;
        const gameId = btoa(Math.random().toString()+Date.now());
        await sql`insert into task7games values (${gameId}, ${type}, null, null, null, 1, '')`;
        res.status(200);
        res.send(gameId);
    }
    catch (e){
        console.error(e);
        res.status(500);
        res.send(e.message);
    }
});

app.post('/api/games/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const {type, move} = JSON.parse(req.body);
        res.status(200);
    }
    catch (e){
        console.error(e);
        res.status(500);
        res.send(e.message);
    }
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});

module.exports = app;