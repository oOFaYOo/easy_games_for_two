import React, {useEffect, useRef, useState} from "react";
import Board from "./Board";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {GameOfType, ITicTacToeState} from "../../api_client/type";
import api_client from "../../api_client";

const TicTacToe = (props: { game: GameOfType<ITicTacToeState> }) => {
    const {theme} = useSelector((state: RootState) => state.Task7Store);
    const [game, setGame] = useState(props.game);
    console.log(game);
    const [grid, setGrid] = useState(props.game.state.grid);
    const isYourTurn = (game.turn === 1 && localStorage.userId === game.player1?.id) ||
        (game.turn === 2 && localStorage.userId === game.player2?.id);


    console.log(localStorage.userId === game.player1?.id);
    console.log(isYourTurn);
    const timer = useRef<NodeJS.Timer | null>(null);
    async function handleNextMove(move: number, nextGrid: string[]) {
        console.log("HEre");
        setGrid(nextGrid);
        await api_client.makeMove(game.id, localStorage.userId, move);
        const response = await api_client.getGame(game.id);
        setGame(response.data);
    }

    useEffect(() => {
        timer.current ??= setInterval(async () => {
            const response = await api_client.getGame(game.id);
            setGame(response.data);}, 1000);
    }, []);

    return (
        <div className={'flex flex-col items-center text-white'}>
            <div className={'mb-8'}>
                <Board
                    isYourTurn={isYourTurn}
                    xIsNext={game.turn === 1}
                    squares={grid}
                    onPlay={(move, grid) => {handleNextMove(move, grid);}}/>
            </div>
            <Button disabled={!game.winner} className={'w-48'} color={theme === 'dark' ? 'inherit' : 'info'}
                    variant="outlined" onClick={async () => {
                await api_client.restartGame(game.id, localStorage.userId);
                const response = await api_client.getGame(game.id);
                setGame(response.data);
            }}
            >{(game.winner ? game.winner === localStorage.userName ? 'You win! ' : 'You Lose! ' : null) + 'Restart?'}</Button>
        </div>
    );
}

export default TicTacToe;