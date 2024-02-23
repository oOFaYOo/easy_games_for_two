import React, {useEffect, useRef, useState} from "react";
import Board from "./Board";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {GameOfType, ITicTacToeState} from "../../api_client/type";
import api from "../../api_client";

const TicTacToe = (props: { game: GameOfType<ITicTacToeState> }) => {
    const {theme} = useSelector((state: RootState) => state.Task7Store);

    const [game, setGame] = useState(props.game);
    const [grid, setGrid] = useState(props.game.state.grid);
    const timer = useRef<NodeJS.Timer | null>(null);

    const isYourTurn = (game.turn === 1 && localStorage.userId === game.player1?.id) ||
        (game.turn === 2 && localStorage.userId === game.player2?.id);

    async function handleNextMove(move: number, nextGrid: string[]) {
        setGrid(nextGrid);
        await api.makeMove(game.id, localStorage.userId, move);
        const response = await api.getGame(game.id);
        setGrid(response.data.state.grid);
        setGame(response.data);
    }

    useEffect(() => {
        if (!isYourTurn)
            timer.current ??= setInterval(async () => {
                const response = await api.getGame(game.id);
                setGrid(response.data.state.grid);
                setGame(response.data);}, 1000);
        else if (timer.current)
        {
            clearInterval(timer.current);
            timer.current = null;
        }
    });

    return (
        <div className={'flex flex-col items-center text-white'}>
            <div className={'mb-8'}>
                <Board
                    isYourTurn={isYourTurn}
                    xIsNext={game.turn === 1}
                    squares={grid}
                    onPlay={(move, grid) => {handleNextMove(move, grid);}}/>
            </div>
            <Button disabled={!game.winner}
                    className={'w-48'}
                    color={theme === 'dark' ? 'inherit' : 'info'}
                    sx={{
                        "&.Mui-disabled": {
                            borderColor: theme ==='dark' ? "rgba(255,255,255,0.25)" : '',
                            color: theme ==='dark' ? "rgba(255,255,255,0.25)" : ''
                        }
                    }} variant="outlined" onClick={async () => {
                await api.restartGame(game.id, localStorage.userId);
                const response = await api.getGame(game.id);
                setGame(response.data);
            }}
            > {game.winner
                ? game.winner === 'Draw'
                    ? 'Draw! '
                    : game.winner === localStorage.userName
                        ? 'You win! '
                        : 'You Lose! '
                : ''}
                Restart?</Button>
        </div>
    );
}

export default TicTacToe;