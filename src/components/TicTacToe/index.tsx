import React, {useState} from "react";
import Board from "./Board";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {GameType, ITicTacToeState} from "../../api_client/type";

const TicTacToe = ({data}: { data: GameType<ITicTacToeState> }) => {
    const {
        id,
        type,
        player1,
        player2,
        winner,
        move,
        state
    } = data;
    const {theme} = useSelector((state: RootState) => state.Task7Store);
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    // const isYourTurn = move === 1 && player1.i;

    function handlePlay(nextSquares: any) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: any) {
        setCurrentMove(nextMove);
    }

    return (
        <div className={'flex flex-col items-center text-white'}>
            <div className={'mb-8'}>
                {/*<Board isYourTurn={isYourTurn} xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>*/}
            </div>
            <Button className={'w-48'} color={theme === 'dark' ? 'inherit' : 'info'}
                    variant="outlined" onClick={() => jumpTo(0)}
            >Restart</Button>
        </div>
    );
}

export default TicTacToe;