let players: Array<string> = []

export function addPlayers(player: string) {
    if (player !in players){
        players.push(player)
    }
}