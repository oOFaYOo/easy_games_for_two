export interface IApiClient {
    getGames: () => Promise<{ status: number, data: AllGamesType }>;
    getGame: (gameID:string) => Promise<{ status: number, data: GameType }>;
    joinToGame: (gameID:string, name:string) => Promise<{ status: number, data: undefined }>;
    leaveGame: (gameID:string, name:string) => Promise<{ status: number, data: undefined }>;
    createGame: (type:string) => Promise<{ status: number, data: {gameId:string} }>;
    makeMove: (gameID:string, type:'TicTacToe' | 'RockPaperScissors', move:any) => Promise<{ status: number, data: undefined }>;
}

export type AllGamesType = {
    id: string;
    type: 'TicTacToe' | 'RockPaperScissors';
}[]

export type GameType = {
    id: string;
    type: 'TicTacToe' | 'RockPaperScissors';
    player1: null | string;
    player2: null | string;
    winner: null | string;
    move: string;
    state: any;
}




