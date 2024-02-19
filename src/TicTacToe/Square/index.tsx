import React from "react";

const Square = ({value, onSquareClick}: { value: string, onSquareClick: () => void }) => {
    return (
        <button className={'w-12 h-12 border border-black bg-white m-[-1px] float-left'} onClick={onSquareClick}>
            {value}
        </button>
    )
}

export default Square;