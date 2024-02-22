const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const path = require('path');
const {sql} = require('@vercel/postgres');

const tableName = "task7games";
const TIC_TAC_TOE = "TicTacToe";
const ROCK_PAPER_SCISSORS = "RockPaperScissors";

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(
    bodyParser.urlencoded({
        extended: true
    }),
);

const PORT = process.env.PORT || 5000;

function generateId(){
    return btoa(Math.random().toString()+Date.now());
}

function answer(response, code = 200, content = '') {
    response.status(code);
    if (content)
        response.send(content);
    else
        response.end();
}

function getInitialState(type){
    return type === TIC_TAC_TOE
        ? {grid: [null, null, null, null, null, null, null, null, null]}
        : type === ROCK_PAPER_SCISSORS
            ? {lastMove: null}
            : (() => {throw new Error(`Unsupported game type ${type}`)})();
}

function invertTurn(turn)
{
    return turn === 1 ? 2 : 1;
}
function applyTicTacToeMove(grid, newMove, turn, player1Name, player2Name) {
    if (newMove > grid.length - 1)
        throw new Error();
    if (grid[newMove])
        throw new Error();
    grid[newMove] = turn === 1 ? 'X' : 'O';
    const winner = calculateWinner() ? turn === 1 ? player2Name : player1Name : '';
    return {
        newState: {grid: grid},
        winner: winner,
        nextTurn: invertTurn(turn)
    }

    function calculateWinner() {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (grid[a] && grid[a] === grid[b] && grid[a] === grid[c]) {
                return grid[a];
            }
        }
        return null;
    }
}

function applyRockPaperScissorsMove(lastMove, newMove, turn, player1Name, player2Name) {
    let winner = '';
    if (lastMove) {
        if (lastMove === newMove)
            winner = 'Draw';
        else if (
            lastMove === 'paper' && newMove === 'scissors' ||
            lastMove === 'rock' && newMove === 'paper' ||
            lastMove === 'scissors' && newMove === 'rock')
            winner = player2Name;
        else 
            winner = player1Name;
    }
    return {
        newState: { lastMove: (lastMove ? '' : newMove) },
        winner: winner,
        nextTurn: invertTurn(turn)
    }
}

app.use(express.static(path.join(__dirname, '../build')))

app.get('/api/games', async (req, res) => {
    try {
        const games = (await sql`select id, type from task7games where player1 is null or player2 is null`).rows;
        answer(res, 200, JSON.stringify(games));
    } catch (e){
        console.error(e);
        answer(res, 500, e.message);
    }
})

app.get('/api/games/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const games = (await sql`select * from task7games where id = ${id}`).rows;
        if (!games.length){
            answer(res,404, `Game with id ${id} not found`);
            return;
        }
        const game = games[0];
        if (game.type === ROCK_PAPER_SCISSORS)
            game.state = 'secured';
        else
            game.state = game.state ? JSON.parse(game.state) : null;

        game.player1 = game.player1 ? JSON.parse(game.player1) : null;
        game.player2 = game.player2 ? JSON.parse(game.player2) : null;
        answer(res, 200, JSON.stringify(game));
    } catch (e){
        console.error(e);
        answer(res, 500, e.message);
    }
});

app.post('/api/games/join/:id', async (req, res) => {
    try {
        console.log('join');
        const gameId = req.params.id;
        const {userId, name} = req.body;
        if (!userId || !name) {
            answer(res, 409, `User id and name have to be not empty.`)
            return;
        }

        const user = JSON.stringify({id:userId, name:name});
        const games = (await sql`select player1, player2 from task7games where Id = ${gameId}`).rows;
        if (!games.length){
            answer(res,404, `Game with id ${gameId} not found`);
            return;
        }
        const player1 = games[0].player1 ? JSON.parse(games[0].player1) : null;
        const player2 = games[0].player2 ? JSON.parse(games[0].player2) : null;
        if (player1?.id === userId || player2?.id === userId) {
            answer(res, 409, `User ${userId} already joined to game ${gameId}.`)
            return;
        }

        if (player1 && player2) {
            answer(res, 409, `Game ${gameId} is full.`)
            return;
        }

        if(!player1){
            await sql`update task7games set player1 = ${user} where id = ${gameId}`;
        } else {
            await sql`update task7games set player2 = ${user} where id = ${gameId}`;
        }
        answer(res, 200);
    }
    catch (e){
        console.error(e);
        answer(res, 500, e.message);
    }
});

app.post('/api/games/leave/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const {userId} = req.body;
        const {player1, player2} = (await sql`select player1, player2 from task7games where Id = ${gameId}`).rows[0];
        const playerOne = JSON.parse(player1);
        const playerTwo = JSON.parse(player2);
        if(playerOne.id === userId){
            await sql`update task7games set player1 = ${JSON.stringify(playerTwo)}, player2 = null where id = ${gameId}`;
            return;
        }
        if(playerTwo.id === userId){
            await sql`update task7games set player2 = null where id = ${gameId}`;
            return;
        }
        answer(res,200);
    }
    catch (e){
        console.error(e);
        answer(res, 500, e.message);
    }
});

app.post('/api/games/restart/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const {userId} = req.body;
        const games = (await sql`select * from task7games where Id = ${gameId}`).rows;
        if (!games.length){
            answer(res,404, `Game with id ${gameId} not found`);
            return;
        }
        const game = games[0];
        const player1 = games[0].player1 ? JSON.parse(games[0].player1) : null;
        const player2 = games[0].player2 ? JSON.parse(games[0].player2) : null;
        if (player1?.id !== userId && player2?.id !== userId) {
            answer(res, 409, `User ${userId} is not joined to game ${gameId}.`)
            return;
        }
        await sql`update task7games set state = ${JSON.stringify(getInitialState(game.type))}, winner = null,turn = 1 where id = ${gameId}`;
        answer(res);
    }
    catch (e){
        console.error(e);
        answer(res, 500, e.message);
    }
});

app.post('/api/games', async (req, res) => {
    try {
        const type = req.body.type;
        const gameId = generateId();
        let state = getInitialState(type);

        await sql`insert into task7games values (${gameId}, ${type}, null, null, null, 1, ${JSON.stringify(state)}, 1)`;
        answer(res, 200, JSON.stringify({gameId}));
    }
    catch (e){
        console.error(e);
        answer(res, 500, e.message);
    }
});

app.post('/api/games/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const {userId, move} = req.body;
        const games = (await sql`select * from task7games where id = ${gameId}`).rows;
        if (!games.length){
            answer(res,404, `Game with id ${gameId} not found`);
            return;
        }
        const game = games[0];
        const player1 = game.player1 ? JSON.parse(game.player1) : null;
        const player2 = game.player2 ? JSON.parse(game.player2) : null;
        const state = game.state ? JSON.parse(game.state) : null;
        if (player1?.id !== userId && player2?.id !== userId) {
            answer(res, 409, `User ${userId} is not joined to game ${gameId}.`)
            return;
        }
        if (player1?.id === userId && game.turn !== 1 || player2?.id === userId && game.turn !== 2)
        {
            answer(res, 409, `User ${userId} can't do nothing. It's not his turn.`);
            return;
        }
        const {newState, winner, nextTurn} = game.type === TIC_TAC_TOE
            ? applyTicTacToeMove(state.grid, move, game.turn, player1?.name, player2?.name)
            : game.type === ROCK_PAPER_SCISSORS
                ? applyRockPaperScissorsMove(state.lastMove, move, game.turn, player1?.name, player2?.name)
                : (() => {throw new Error(`Unsupported game type ${game.type}`)})();

        const newStateJSON = JSON.stringify(newState);
        if (!winner)
            await sql`update task7games set state = ${newStateJSON}, turn = ${nextTurn} where id = ${gameId}`;
        else
            await sql`update task7games set state = ${newStateJSON}, turn = ${nextTurn}, winner = ${winner} where id = ${gameId}`;

        answer(res, 200);
    } catch (e) {
        console.error(e);
        answer(res, 500, e.message);
    }
})

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`)
});

module.exports = app;