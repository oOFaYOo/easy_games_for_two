export interface IApiClient {
    getGames: () => Promise<{ status: number, data: AllGamesType }>;
    getGame:<T>(gameId:string) => Promise<{ status: number, data: GameType<T> }>;
    joinToGame: (gameId:string, name:string, userId:string) => Promise<{ status: number, data: undefined }>;
    leaveGame: (gameId:string, name:string, userId:string) => Promise<{ status: number, data: undefined }>;
    createGame: (type:string) => Promise<{ status: number, data: {gameId:string} }>;
    makeMove: (gameId:string, type:'TicTacToe' | 'RockPaperScissors', userId:string, move:string) => Promise<{ status: number, data: undefined }>;
}

export type AllGamesType = {
    id: string;
    type: 'TicTacToe' | 'RockPaperScissors';
}[]

export type GameType<T> = {
    id: string;
    type: 'TicTacToe' | 'RockPaperScissors';
    player1: null | string;
    player2: null | string;
    winner: null | string;
    move: string;
    state: T;
}

export interface ITicTacToeState {
    grid: string[][]
}

export interface IRockPaperScissorsState {
    player1: string | null;
    player2: string | null;
}

