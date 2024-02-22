export interface IApiClient {
    getGames: () => Promise<{ status: number, data: AllGamesType }>;
    getGame:<T>(gameId:string) => Promise<{ status: number, data: GameOfType<T> }>;
    joinToGame: (gameId:string, name:string, userId:string) => Promise<{ status: number, data: undefined }>;
    leaveGame: (gameId:string, userId:string) => Promise<{ status: number, data: undefined }>;
    createGame: (type:string) => Promise<{ status: number, data: {gameId:string} }>;
    makeMove: (gameId:string, userId:string, move:string|number) => Promise<{ status: number, data: undefined }>;
}

export type AllGamesType = {
    id: string;
    type: GameType;
}[]

export type GameOfType<T> = {
    id: string;
    type: GameType;
    player1: null | {id: string, userName: string};
    player2: null | {id: string, userName: string};
    winner: null | string;
    turn: number;
    state: T;
}

export interface ITicTacToeState {
    grid: string[]
}

export interface IRockPaperScissorsState {
    lastMove: string
}

export enum GameType {
    TicTacToe = 'TicTacToe',
    RockPaperScissors = 'RockPaperScissors'
}

