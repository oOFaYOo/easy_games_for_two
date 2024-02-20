import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Button} from "@mui/material";
import {ITile} from "./type";
import {Link} from "react-router-dom";
import TicTacToeImage from "./free-icon-tic-tac-toe-2679549.png";
import RockPaperScissorsImage from "./free-icon-rock-paper-scissors-10199891.png";
import api from "../../api_client";

const Tile = ({id, game}: ITile) => {
    const {theme} = useSelector((state: RootState) => state.Task7Store);

    return (
        <div className={`${theme === 'dark'
            ? 'hover:border-cyan-500 text-white shadow-black'
            : 'hover:border-sky-500'}
             border-2 border-transparent shadow-md rounded-md min-w-[455px] w-[45%] h-44 p-4 flex justify-between`}>
            <div className={'flex flex-col justify-evenly items-center'}>
                <h3 title={game} className={'w-[200px] text-xl text-center whitespace-nowrap overflow-hidden text-ellipsis'}>
                    {game}
                </h3>
                <Link to={`/games/${game}/${id}`}>
                    <Button onClick={async ()=>{
                        let response = await api.joinToGame(id, localStorage.userName, localStorage.userId);
                        if(response.status === 200){
                            document.location = `/games/${game}/${id}`;
                        } else {
                            console.log('Error. ' + response.status);
                        }
                    }}
                        color={theme === 'dark' ? 'inherit' : 'info'}
                        variant="outlined">join the game</Button>
                </Link>
            </div>
            <div className={'h-full min-w-[200px] flex justify-center'}>
                <img className={`${theme === 'dark' ? 'invert' : ''} relative h-full`} src={game === 'TicTacToe' ? TicTacToeImage : RockPaperScissorsImage}
                     alt={game}/>
            </div>
        </div>
    )
}

export default Tile;