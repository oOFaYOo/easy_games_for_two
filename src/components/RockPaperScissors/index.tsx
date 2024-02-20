import React, {useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import StoneImage from "./free-icon-fist-1527443.png";
import PaperImage from "./free-icon-palm-4866399.png";
import ScissorsImage from "./free-icon-victory-735804.png";
import {Button} from "@mui/material";
import {GameType} from "../../api_client/type";

const RockPaperScissors = ({data}: { data: GameType }) => {
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
    const [stepOne, setStepOne] = useState<string>('');
    const [stepTwo, setStepTwo] = useState<string>('');
    const [winner1, setWinner] = useState<string>('');

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

    function getWinner(step1: string, step2: string) {
        if (step1 === 'stone') {
            switch (step2) {
                case 'stone':
                    return 'draw';
                case 'scissors':
                    return 'step2 lose';
                case 'paper':
                    return 'step2 win'
            }
        }
        if (step1 === 'paper') {
            switch (step2) {
                case 'paper':
                    return 'draw';
                case 'scissors':
                    return 'step2 win';
                case 'stone':
                    return 'step2 lose'
            }
        }
        if (step1 === 'scissors') {
            switch (step2) {
                case 'scissors' :
                    return 'draw'
                case 'stone':
                    return 'step2 win'
                case 'paper':
                    return 'step2 lose'
            }
        }
    }

    return (
        <div
            className={`${theme === 'dark' ? 'text-white' : ''} relative w-full flex h-full flex-col justify-evenly items-center`}>
            <div className={'relative w-full h-[100px] flex justify-center'}>
                {
                    actions.map((item, i) =>
                        <button className={'relative h-full opacity-30 cursor-default'} onClick={() => {
                            if (!winner1)
                                setStepOne(item.name)
                        }}>
                            <img
                                className={`${theme === 'dark' ? 'invert' : ''} relative h-[60%]`}
                                src={item.img} alt={item.name}/>
                        </button>
                    )
                }
            </div>
            <div className={'relative w-full h-[40%] flex justify-center items-center'}>
                <p className={'text-5xl'}>{winner1}</p>
            </div>
            <div className={'relative w-full h-[170px] flex justify-center'}>
                {
                    actions.map((item, i) =>
                        <button className={'relative h-full'} onClick={() => {
                            if (!winner1)
                                setStepTwo(item.name)
                        }}>
                            <img
                                className={`${theme === 'dark' ? 'invert' : ''} ${stepTwo === item.name ? 'opacity-100 scale-125' : 'opacity-80 hover:scale-105'} relative h-[60%]`}
                                src={item.img} alt={item.name}/>
                        </button>
                    )
                }
            </div>
            <Button className={'w-48'} color={theme === 'dark' ? 'inherit' : 'info'}
                    variant="outlined" onClick={() => {
                if (winner1) {
                    setWinner('');
                    setStepOne('');
                    setStepTwo('');
                } else {
                    if (stepTwo && stepOne)
                        setWinner(getWinner(stepOne, stepTwo) as string);
                    setStepOne('');
                    setStepTwo('');
                }
            }}
            >{
                winner1
                    ? 'Restart'
                    : 'ok'
            }</Button>
        </div>
    )

}

export default RockPaperScissors;