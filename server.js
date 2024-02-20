import express from'express';
import bodyParser from 'body-parser';
import cookieParser from "cookie-parser";
import path from'path';

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
        const games;//get all games from sql
        res.send(games);}
    catch (e){
        console.error(e);
        res.status(500);
        res.send(e.message);
    }
});

app.get('/api/games/:id', async (req, res) => {
    try{
        const id = req.params.id;
        const game;//get game from sql
        res.send(game);}
    catch (e){
        console.error(e);
        res.status(500);
        res.send(e.message);
    }
});

app.post('/api/games/:id', async (req, res) => {
    try {
        const gameId = req.params.id;
        const userId = JSON.parse(req.body).userId
        //find game in sql
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
        const type = JSON.parse(req.body).type;
        //add game in sql
        res.status(200);
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