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
        if (!userId || !name) {
            res.status(409);
            res.end();
            return;
        }
        const user = {id:userId, name:name};

        const {player1, player2} = (await sql`select player1, player2 from task7games where Id = ${gameId}`).rows[0];

        if(!player1){
            await sql`update task7games set player1 = ${JSON.stringify(user)} where id = ${gameId}`;
        } else {
            await sql`update task7games set player2 = ${JSON.stringify(user)} where id = ${gameId}`;
        }
        res.status(200);
        res.end();
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
        const {userId} = req.body;
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
        console.log(req.body);
        const gameId = btoa(Math.random().toString()+Date.now());
        let state;
        switch (type) {
            case 'TicTacToe':
                state = JSON.stringify({grid: []})
                break;
            case 'RockPaperScissors':
                state = JSON.stringify({lastMove:''})
                break;
            default:
                throw new Error(`Unsupported game type ${type}`);
        }
        await sql`insert into task7games values (${gameId}, ${type}, null, null, null, 1, ${state})`;
        res.status(200);
        res.send({gameId});
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
        const {type, playerId} = req.body;
        const nextMove = req.body.move;

        const {player1, player2, move, state} = (await (sql`select * from task7games where id = ${gameId}`)).rows[0];
        if (player1.id === playerId && move === 1 || player2.id === playerId && move === 2) {
            switch (type)
            {
                case 'TicTacToe':
                    let tttState = JSON.parse(state) ?? {grid:[]};
                    const {x, y} = nextMove;
                    tttState[x] ??= [];
                    if (!tttState[x][y])
                        tttState[x][y] = move === 1 ? 'X' : 'O';
                    else
                    {
                        res.status(409);
                        res.end('Not your turn');
                        return;
                    }
                    const newState = JSON.stringify(tttState);
                    const newMove = move === 1 ? 2 : 1;
                    await sql`update task7games set state = ${newState} set move = ${newMove} where id = ${gameId}`;
                    break;
                case 'RockPaperScissors':
                    let rpsState = JSON.parse(state);
                    if (!rpsState.lastMove)
                    {
                        const newState = JSON.stringify({lastMove: nextMove});
                        const newMove = move === 1 ? 2 : 1;
                        await sql`update task7games set state = ${newState} set move = ${newMove} where id = ${gameId}`;
                    } else {
                        const newState = JSON.stringify({lastMove: ''});
                        const newMove = move === 1 ? 2 : 1;
                        const winner = player2.name; // fix
                        await sql`update task7games set state = ${newState} set move = ${newMove} set winner = ${winner} where id = ${gameId}`;
                    }
                    break;
                default:
                    throw new Error(`Unsupported game type ${type}`);
            }
            res.status(200);
            res.end();
            return;
        }
        res.status(409);
        res.end();
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