export interface IBoard {
    isYourTurn: boolean,
    xIsNext: boolean,
    squares: string[],
    onPlay: (move: number, newGrid: string[]) => void
}