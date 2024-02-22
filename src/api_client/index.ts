import {IApiClient} from "./type";

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

    async leaveGame(gameId: string, userId:string){
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
            data: undefined
        }
    }

    async restartGame(gameId: string, userId:string){
        const response = await fetch(
            `/api/games/restart/${gameId}`,
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
            data: undefined
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

    async makeMove(gameId: string, userId:string, move: any) {
        const response = await fetch(
            `/api/games/${gameId}`,
            {
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ move: move, userId:userId})
            });
        return {
            status: response.status,
            data: undefined
        }
    }
}

export default new ApiClient();