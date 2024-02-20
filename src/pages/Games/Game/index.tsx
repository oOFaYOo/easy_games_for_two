import React, {useEffect, useState} from "react";
import RockPaperScissors from "../../../components/RockPaperScissors";
import TicTacToe from "../../../components/TicTacToe";
import {useParams} from "react-router-dom";
import api from "../../../api_client";
import {GameType} from "../../../api_client/type";

const Game = () => {
    const {type, id} = useParams();
    const [data, setData] = useState<GameType | null>(null);

    useEffect(() => {
        (async ()=>{
            const response = await api.getGame(id!);
            if(response.status === 200){
                setData(response.data);
            }
            console.log(data)
        })()
    }, [])

    return (
        <div className={'relative w-full flex grow justify-center items-center'}>
            {
                type === 'TicTacToe'
                ? <TicTacToe data={data!} />
                :  <RockPaperScissors data={data!} />
            }
        </div>
    )
}

export default Game;