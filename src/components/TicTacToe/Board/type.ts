export interface IBoard {
    xIsNext: boolean,
    squares: string[],
    onPlay: (nextSquares: string[]) => void
}