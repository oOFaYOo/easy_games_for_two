import React from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../../store";
import ZeroImage from "./free-icon-circle-shape-outline-25477.png";
import CrossImage from "./free-icon-delete-32178.png";
import {ISquare} from "./type";

const Square = ({value, onSquareClick, disabled}: ISquare) => {
    const {theme} = useSelector((state: RootState) => state.Task7Store);

    return (
        <button disabled={disabled} className={`${theme === 'dark' ? 'hover:border-cyan-500 border-white' : 'hover:border-sky-500'}
        w-24 h-24 border rounded-md border m-1 border-black flex justify-center items-center bg-inherit float-left`
        }
                onClick={onSquareClick}>
            {
                value
                    ? <img className={`
                    ${theme === 'dark' ? 'invert' : ''}
                     hover:scale-105 relative h-[60%]`} src={value === 'X' ? CrossImage : ZeroImage}
                     alt={value}/>
                    : null
            }
        </button>
    )
}

export default Square;