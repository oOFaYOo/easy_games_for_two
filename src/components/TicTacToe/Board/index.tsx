import React from "react";
import Square from "../Square";
import {IBoard} from "./type";

const Board = ({
    isYourTurn,
    xIsNext,
    squares,
    onPlay}: IBoard) => {
    function handleClick(i: any) {
        const nextSquares = squares.slice();
        if (xIsNext) {
            nextSquares[i] = 'X';
        } else {
            nextSquares[i] = 'O';
        }
        onPlay(i, nextSquares);
    }

    function createCell(i: number): React.ReactElement{
        return <Square disabled={(!isYourTurn || !!squares[i])} value={squares[i]} onSquareClick={() => handleClick(i)}/>
    }

    return (
        <>
            <div>
                {createCell(0)}
                {createCell(1)}
                {createCell(2)}
            </div>
            <div>
                {createCell(3)}
                {createCell(4)}
                {createCell(5)}
            </div>
            <div>
                {createCell(6)}
                {createCell(7)}
                {createCell(8)}
            </div>
        </>
    );
}

export default Board;