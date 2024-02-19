import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {Button} from "@mui/material";
import {ITile} from "./type";
import {Link} from "react-router-dom";

const Tile = ({id, game}: ITile) => {
    const {theme} = useSelector((state: RootState) => state.Task7Store);

    return (
        <div className={`${theme === 'dark'
            ? 'hover:border-cyan-500 text-white shadow-black'
            : 'hover:border-sky-500'}
             border-2 border-transparent shadow-md rounded-md min-w-[455px] w-[45%] h-44 p-4 flex justify-between`}>
            <div className={'flex flex-col justify-evenly items-center'}>
                <h3 title={game} className={'w-[200px] text-center whitespace-nowrap overflow-hidden text-ellipsis'}>
                    {game}
                </h3>
                <Link to={`/games/${id}`}>
                    <Button
                        color={theme === 'dark' ? 'inherit' : 'info'}
                        variant="outlined">join the game</Button>
                </Link>
            </div>
            <div className={'bg-neutral-600 h-full min-w-[200px]'}>

            </div>
        </div>
    )
}

export default Tile;