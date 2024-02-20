import React, {useEffect, useState} from "react";
import RockPaperScissors from "../../../components/RockPaperScissors";
import TicTacToe from "../../../components/TicTacToe";
import {useParams} from "react-router-dom";
import api from "../../../api_client";
import {GameType, IRockPaperScissorsState, ITicTacToeState} from "../../../api_client/type";
import {CircularProgress} from "@mui/material";

const Game = () => {
    const {type, id} = useParams();
    const [data, setData] = useState<GameType<ITicTacToeState | IRockPaperScissorsState>| null>(null);

    useEffect(() => {
        (async () => {
            if (!data) {
                let response;
                if(type === 'TicTacToe'){
                    response = await api.getGame<ITicTacToeState>(id!);
                } else {
                    response = await api.getGame<IRockPaperScissorsState>(id!);
                }
                if (response.status === 200) {
                    setData(response.data);
                } else {
                    console.log('Error.' + response.status)
                }
            }
        })()
    }, [])


    return (
        <div className={'relative w-full flex grow justify-center items-center'}>
            {
                !data
                    ? <CircularProgress/>
                    : type === 'TicTacToe'

                        ? <TicTacToe data={data!}/>

                        : <RockPaperScissors data={data!}/>
            }
        </div>
    )
}

export default Game;