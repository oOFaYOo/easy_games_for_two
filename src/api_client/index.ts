import {IApiClient} from "./type";

class ApiClient implements IApiClient {
    async getGames() {
        const response = await fetch('/api/games', {method: 'get',});
        return {
            status: response.status,
            data: await response.json()
        }
    }

    async getGame(gameID: string) {
        const response = await fetch(`/api/games/${gameID}`, {method: 'get',});
        return {
            status: response.status,
            data: await response.json()
        }
    }

    async joinToGame(gameID: string, name: string) {
        const userID = btoa(name+Date.now());
        const response = await fetch(
            `/api/games/join/${gameID}`,
            {
                method: 'post',
                body: JSON.stringify({
                    userID: userID,
                    name: name
                })
            });
        return {
            status: response.status,
            data: await response.json()
        }
    }

    async leaveGame(gameID: string, name: string){
        const userID = btoa(name+Date.now());
        const response = await fetch(
            `/api/games/leave/${gameID}`,
            {
                method: 'post',
                body: JSON.stringify({
                    userID: userID,
                })
            });
        return {
            status: response.status,
            data: await response.json()
        }
    }

    async createGame(type: string) {
        const response = await fetch('/api/games', {method: 'post', body: JSON.stringify({type: type})});
        return {
            status: response.status,
            data: await response.json()
        }
    }

    async makeMove(gameID: string, type: 'TicTacToe' | 'RockPaperScissors', move: any) {
        const response = await fetch(
            `/api/games/${gameID}`,
            {
                method: 'post',
                body: JSON.stringify({type: type, move: move})
            });
        return {
            status: response.status,
            data: await response.json()
        }
    }
}

export default new ApiClient();