import {IApiClient} from "./type";


export interface ITicTacToeState {
    grid: string[][]
}

export interface IRockPaperScissorsState {
    lastMove: string
}

class ApiClient implements IApiClient {
    async getGames() {
        const response = await fetch('/api/games', {method: 'get',});
        return {
            status: response.status,
            data: await response.json(),
            headers: {
                'Content-Type': 'application/json'
            },
        }
    }

    async getGame<T>(gameId: string){
        const response = await fetch(`/api/games/${gameId}`, {method: 'get',});
        return {
            status: response.status,
            data: await response.json(),
            headers: {
                'Content-Type': 'application/json'
            },
        }
    }

    async joinToGame(gameId: string, name: string, userId:string) {
        const response = await fetch(
            `/api/games/join/${gameId}`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    name: name
                })
            });
        return {
            status: response.status,
            data: undefined
        }
    }

    async leaveGame(gameId: string, name: string, userId:string){
        const response = await fetch(
            `/api/games/leave/${gameId}`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                })
            });
        return {
            status: response.status,
            data: await response.json()
        }
    }

    async createGame(type: string) {
        const response = await fetch('/api/games', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({type: type}),
        });
        return {
            status: response.status,
            data: await response.json()
        }
    }

    async makeMove(gameId: string, type: 'TicTacToe' | 'RockPaperScissors', move: any) {
        const response = await fetch(
            `/api/games/${gameId}`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({type: type, move: move})
            });
        return {
            status: response.status,
            data: await response.json()
        }
    }
}

export default new ApiClient();