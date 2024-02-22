import React, {useEffect, useState} from "react";
import RockPaperScissors from "../../../components/RockPaperScissors";
import TicTacToe from "../../../components/TicTacToe";
import {useParams} from "react-router-dom";
import api from "../../../api_client";
import {GameOfType, GameType, IRockPaperScissorsState, ITicTacToeState} from "../../../api_client/type";
import {CircularProgress} from "@mui/material";

const Game = () => {
    const {type, id} = useParams();
    const [game, setGame] = useState<GameOfType<ITicTacToeState | IRockPaperScissorsState>| null>(null);

    useEffect(() => {
        (async () => {
            if (!game) {
                let response =
                    type === GameType.TicTacToe 
                        ? await api.getGame<ITicTacToeState>(id!)
                        : type === GameType.RockPaperScissors 
                            ? await api.getGame<IRockPaperScissorsState>(id!) 
                            : null;

                if (!response)
                    return;

                if (response.status === 200) {
                    setGame(response.data);
                } else {
                    console.log('Error.' + response.status)
                }
            }
        })()
    }, [])

    return (
        <div className={'relative w-full flex grow justify-center items-center'}>
            {
                !game
                    ? <CircularProgress/>
                    : type === GameType.TicTacToe
                        ? <TicTacToe game={game as GameOfType<ITicTacToeState>}/>
                        : type === GameType.RockPaperScissors
                            ? <RockPaperScissors game={game as GameOfType<IRockPaperScissorsState>}/>
                            : null
            }
        </div>
    )
}

export default Game;