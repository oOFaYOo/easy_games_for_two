import React, {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import StoneImage from "./free-icon-fist-1527443.png";
import PaperImage from "./free-icon-palm-4866399.png";
import ScissorsImage from "./free-icon-victory-735804.png";
import {Button} from "@mui/material";
import {GameOfType, IRockPaperScissorsState} from "../../api_client/type";
import api_client from "../../api_client";

const RockPaperScissors = (props: { game: GameOfType<IRockPaperScissorsState> }) => {
    const {theme} = useSelector((state: RootState) => state.Task7Store);
    const [game, setGame] = useState(props.game);
    const isYourTurn = game.turn === 1 && localStorage.userId === game.player1?.id ||
        game.turn === 2 && localStorage.userId === game.player2?.id;
    const timer = useRef<NodeJS.Timer | null>(null);

    const actions = [
        {
            name: 'stone',
            img: StoneImage,
        },
        {
            name: 'scissors',
            img: ScissorsImage,
        },
        {
            name: 'paper',
            img: PaperImage,
        },
    ];

    useEffect(() => {
        timer.current ??= setInterval(async () => {
            const response = await api_client.getGame(game.id);
            console.log(isYourTurn);
            setGame(response.data);}, 1000);
    }, []);

    return (
        <div
            className={`${theme === 'dark' ? 'text-white' : ''} relative w-full flex h-full flex-col justify-evenly items-center`}>
            <div className={'relative w-full h-[100px] flex justify-center'}>
                {
                    actions.map((item, i) =>
                        <div key={i} className={'relative mt-8 h-full opacity-30 cursor-default'}>
                            <img
                                className={`${theme === 'dark' ? 'invert' : ''} relative h-[60%]`}
                                src={item.img} alt={item.name}/>
                        </div>
                    )
                }
            </div>
            <div className={'relative w-full h-[170px] flex justify-center'}>
                {
                    actions.map((item, i) =>
                        <button key={i} className={'relative h-full'} onClick={async () => {
                            if(!game.winner)
                            await api_client.makeMove(game.id, localStorage.userId, item.name);
                        }}>
                            <img
                                className={`${theme === 'dark' ? 'invert' : ''} ${!isYourTurn 
                                    ? 'opacity-100 scale-125' 
                                    : 'opacity-80 hover:scale-105 hover:opacity-100'} relative h-[60%]`}
                                src={item.img} alt={item.name}/>
                        </button>
                    )
                }
            </div>
            <Button disabled={!game.winner}
                    className={'w-48'}
                    color={theme === 'dark' ? 'inherit' : 'info'}
                    sx={{
                        "&.Mui-disabled": {
                            borderColor: theme ==='dark' ? "rgba(255,255,255,0.25)" : '',
                            color: theme ==='dark' ? "rgba(255,255,255,0.25)" : ''
                        }
                    }}
                    variant="outlined" onClick={async () => {
                await api_client.restartGame(game.id, localStorage.userId);
                const response = await api_client.getGame(game.id);
                setGame(response.data);
            }}
            >
                {game.winner
                    ? game.winner === 'Draw'
                        ? 'Draw! '
                        : game.winner === localStorage.userName
                            ? 'You win! '
                            : 'You Lose! '
                    : ''}
                Restart?
            </Button>
        </div>
    )
}

export default RockPaperScissors;