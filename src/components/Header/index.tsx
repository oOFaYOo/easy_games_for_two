import React, {useState} from "react";
import {Button, Switch} from "@mui/material";
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store";
import {setTheme} from "../../store/slice";
import {useLocation} from "react-router-dom";
import Modal from "../Modal";

const Header = () => {
    const dispatch = useDispatch();
    const {theme} = useSelector((state: RootState) => state.Task7Store);
    let location = useLocation().pathname;

    const [openModal, setOpenModal] = useState<boolean>(false);
    const [game, setGame] = useState<number>(-1);

    return (
        <>
            {
                openModal
                    ? <Modal text={'Please select the game'} type={'selector'} modalValue={game} setModalValue={setGame}
                             selectorProps={{title: 'Game', variants: ['TicTacToe', 'RockPaperScissors']}}
                             buttonText={'ok'} closeFromOutside={setOpenModal} action={() => {
                        if (game > 0) {
                            setOpenModal(false);
                        }
                    }}/>
                    : null
            }
            <header className={`bg-gradient-to-r 
                ${theme === 'light' ? 'from-sky-500 via-cyan-500 to-sky-500' : 'from-sky-700 via-cyan-600 to-sky-700'}
        w-full text-white shadow-lg sticky top-0 h-16 flex justify-between items-center grow-0`}>
                <div className={'w-[30%] flex justify-center items-center'}>
                    <LightModeIcon/>
                    <Switch data-testid={'switch'} checked={theme !== 'light'}
                            id={'theme-switcher'} color={'default'} onChange={
                        (e) => {
                            const theme = e.currentTarget.checked ? 'dark' : 'light';
                            localStorage.setItem('theme', theme)
                            dispatch(setTheme(theme));
                        }
                    }/>
                    <DarkModeIcon/>
                </div>
                <h2 className={'w-[30%] text-center'}>{localStorage.userName ? 'Hello, ' + localStorage.userName : ''}</h2>
                <div className={'w-[30%] flex justify-center items-center'}>
                    <Button color={'inherit'} variant="outlined"
                            onClick={() => {
                                location === '/games'
                                    ? (setOpenModal(true))
                                    : document.location = '/games'
                            }}>
                        {location === '/games'
                            ? 'Create new game'
                            : 'Go back to games'
                        }
                    </Button>
                </div>
            </header>
        </>

    )
}

export default Header;