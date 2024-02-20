import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import StoneImage from "./free-icon-fist-1527443.png";
import PaperImage from "./free-icon-palm-4866399.png";
import ScissorsImage from "./free-icon-victory-735804.png";
import {Button} from "@mui/material";
import {GameType, IRockPaperScissorsState} from "../../api_client/type";
import api from "../../api_client";
import {useParams} from "react-router-dom";

const RockPaperScissors = ({data}: { data: GameType<IRockPaperScissorsState> }) => {
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
    const gameId = useParams().id;
    const gameType = useParams().type as 'TicTacToe'|'RockPaperScissors';
    const [stepTwo, setStepTwo] = useState<string>('');
    // const [stepOne, setStepOne] = useState<string>('');

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

    // function getWinner(step1: string, step2: string) {
    //     if (step1 === 'stone') {
    //         switch (step2) {
    //             case 'stone':
    //                 return 'draw';
    //             case 'scissors':
    //                 return 'step2 lose';
    //             case 'paper':
    //                 return 'step2 win'
    //         }
    //     }
    //     if (step1 === 'paper') {
    //         switch (step2) {
    //             case 'paper':
    //                 return 'draw';
    //             case 'scissors':
    //                 return 'step2 win';
    //             case 'stone':
    //                 return 'step2 lose'
    //         }
    //     }
    //     if (step1 === 'scissors') {
    //         switch (step2) {
    //             case 'scissors' :
    //                 return 'draw'
    //             case 'stone':
    //                 return 'step2 win'
    //             case 'paper':
    //                 return 'step2 lose'
    //         }
    //     }
    // }

    return (
        <div
            className={`${theme === 'dark' ? 'text-white' : ''} relative w-full flex h-full flex-col justify-evenly items-center`}>
            <div className={'relative w-full h-[100px] flex justify-center'}>
                {
                    actions.map((item, i) =>
                        <div className={'relative mt-8 h-full opacity-30 cursor-default'}>
                            <img
                                className={`${theme === 'dark' ? 'invert' : ''} relative h-[60%]`}
                                src={item.img} alt={item.name}/>
                        </div>
                    )
                }
            </div>
            <div className={'relative w-full h-[40%] flex justify-center items-center'}>
                <p className={'text-5xl'}>{winner ? `${winner} is win!` : null}</p>
            </div>
            <div className={'relative w-full h-[170px] flex justify-center'}>
                {
                    actions.map((item, i) =>
                        <button className={'relative h-full'} onClick={() => {
                            if (!winner)
                                setStepTwo(item.name)
                        }}>
                            <img
                                className={`${theme === 'dark' ? 'invert' : ''} ${stepTwo === item.name 
                                    ? 'opacity-100 scale-125' 
                                    : 'opacity-80 hover:scale-105'} relative h-[60%]`}
                                src={item.img} alt={item.name}/>
                        </button>
                    )
                }
            </div>
            <Button className={'w-48'} color={theme === 'dark' ? 'inherit' : 'info'}
                    variant="outlined" onClick={() => {
                if (winner) {
                    // setWinner('');
                    // setStepOne('');
                    // setStepTwo('');
                } else {
                    if(stepTwo) {
                        api.makeMove(gameId!, gameType!, localStorage.userId, stepTwo);
                        //call getGame again
                    }
                }
            }}
            >{
                winner
                    ? 'Restart'
                    : 'ok'
            }</Button>
        </div>
    )

}

export default RockPaperScissors;