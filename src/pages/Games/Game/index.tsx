import React from "react";
import RockPaperScissors from "../../../components/RockPaperScissors";
import TicTacToe from "../../../components/TicTacToe";
import {useParams} from "react-router-dom";

const Game = () => {
    const game = useParams().type;

    return (
        <div className={'relative w-full flex grow justify-center items-center'}>
            {
                game === 'TicTacToe'
                ? <TicTacToe />
                :  <RockPaperScissors />
            }
        </div>
    )
}

export default Game;