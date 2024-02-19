import React, {useState} from "react";

const RockPaperScissors = () => {
    const [stepOne, setStepOne] = useState<string>('');
    const [stepTwo, setStepTwo] = useState<string>('');
    const [winner, setWinner] = useState<string>('');

    function getWinner (step1:string, step2:string) {
        if(step1 === 'stone'){
            switch (step2){
                case 'stone':
                    return 'draw';
                case 'scissors':
                    return 'step2 lose';
                case 'paper':
                    return 'step2 win'
            }
        }
        if(step1 === 'paper'){
            switch (step2){
                case 'paper':
                    return 'draw';
                case 'scissors':
                    return 'step2 win';
                case 'stone':
                    return 'step2 lose'
            }
        }
        if(step1 === 'scissors'){
            switch (step2){
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
        <div className={'flex flex-col w-36'}>
            <input type={'text'} className={'border-black border'} onChange={(e)=>{setStepOne(e.currentTarget.value)}}/>
            <input type={'text'} className={'border-black border'} onChange={(e)=>{setStepTwo(e.currentTarget.value)}}/>
            <button onClick={()=>{
                setWinner(getWinner(stepOne, stepTwo) as string);
            }}>
                ok
            </button>
            <p>{winner}</p>
        </div>
    )

}

export default RockPaperScissors;