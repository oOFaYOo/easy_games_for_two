export interface IBoard {
    isYourTurn: boolean,
    xIsNext: boolean,
    squares: string[],
    onPlay: (nextSquares: string[]) => void
}